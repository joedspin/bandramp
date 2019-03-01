class Api::TracksController < ApplicationController

  def index
    @tracks = Track.find_by_album_id(params[:album_id])
  end

  def show
    @track = Track.find(params[:id])
  end



end
