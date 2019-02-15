class Api::AlbumsController < ApplicationController
  before_action :pro_signed_in?, only: [:create, :update]

  def index
    @albums = Album.all
  end

  def show
    @album = Album.find(params[:id])
    @tracks = @album.tracks
  end

  def create
    @album = Album.new(album_params)
    @album.administrator_id = current_user.id
    if @album.save
      @tracks = @album.tracks
      render "api/albums/show"
    else
      render json: @album.errors.full_messages, status: 422
    end
  end

  def destroy 
    @album = current_user.administered_albums.find(params[:id])
    if @album
      @album.destroy
      render "api/albums"
    else
      render json: @album.errors.full_messages, status: 422
    end
  end

  def update
    albumErrors = []
    savedAlbum = true
    savedTracks = true
    @album = current_user.administered_albums.find(params[:id])
    if @album.photo.attached? && album_params['photo'] === 'delete'
      @album.photo.purge
      @tracks = @album.tracks
      render :show
    else
      if params[:album][:changed] === 'true'
        unless @album.update(album_params)
          albumErrors.push(@album.errors.full_messages)
          savedAlbum = false
        end
      end
      params[:album][:changedTrackIds].split(",").each do |trackId|
        tData = track_params[trackId.to_s]
        tParams = {}
        tParams[:id] = trackId
        tParams[:album_id] = tData["album_id"]
        tParams[:duration] = tData["duration"]
        tParams[:title] = tData["title"]
        tParams[:release_date] = tData["release_date"]
        tParams[:bonus_track] = tData["bonus_track"]
        tParams[:track_order] = tData["track_order"]
        tParams[:lyrics] = tData["lyrics"]
        newAudio = ''
        unless audio_params[:audio_file][trackId.to_s] === '' ||
            audio_params[:audio_file][trackId.to_s] === "null"
          newAudio = audio_params[:audio_file][trackId.to_s]
        end
        if trackId.include?('add')
          tParams.delete(:id)
          track = Track.new(tParams)
          unless track.save
            albumErrors.push(track.errors.full_messages)
            savedTracks = false
          end
          unless newAudio === '' || newAudio.nil? || newAudio === 'undefined'
            track.audio_file.attach(newAudio)
          end
        else
          tParams[:id] = tParams[:id].to_i
          track = Track.find(trackId)
          unless (track && track.update(tParams))
            albumErrors.push(track.errors.full_messages)
            savedTracks = false
          end
          unless newAudio === '' || newAudio.nil? || newAudio === 'undefined'
            track.audio_file.attach(newAudio)
          end
        end
      end
      if savedAlbum && savedTracks
        @tracks = @album.tracks
        render :show
      else
        render json: albumErrors, status: 422
      end
    end
  end

  private

  def album_params
    params.require(:album).permit(
      :title,
      :artist_name,
      :release_date,
      :description,
      :upc_ean,
      :catalog_number,
      :published,
      :administrator_id,
      :photo
    )
  end

  def track_params
    JSON.parse(params[:tracks])

  end

  def audio_params
    params.require(:track)
  end

end
