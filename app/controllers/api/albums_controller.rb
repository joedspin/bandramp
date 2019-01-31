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
      render :show
    end
    if params[:album][:changed] === 'true'
      unless @album.update(album_params)
        albumErrors.push(@album.errors.full_messages)
        savedAlbum = false
      end
    end
    params[:album][:changedTrackIds].split(",").each do |trackId|
      if trackId.include?('add')
        track = Track.new(track_params[trackId.to_s])
        unless track.save
          albumErrors.push(track.errors.full_messages)
          savedTracks = false
        end
      else
        track = Track.find(trackId)
        unless (track && track.update(track_params[trackId.to_s]))
          albumErrors.push(track.errors.full_messages)
          savedTracks = false
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

end