class Api::TracksController < ApplicationController

  def index
    @tracks = Track.find_by_album_id(params[:album_id])
  end

  def show
    @track = Track.find(params[:id])
  end

  def destroy
    @track = current_user.administered_tracks.find(params[:id])
    if @track
      @track.destroy
      otherTracks = Track.where("track_order > :track_order AND album_id = :album_id", 
        {track_order: @track.track_order, album_id: @track.album_id})
      otherTracks.each do |track|
        track.track_order = track.track_order - 1
        track.save
      end
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

end
