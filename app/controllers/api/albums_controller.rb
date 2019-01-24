class Api::AlbumsController < ApplicationController
  before_action :pro_signed_in?, only: [:create, :update]

  def index
    @albums = Album.all
  end

  def show
    @album = Album.find(params[:id])
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

  def update
    @album = current_user.administered_albums.find(params[:id])
    if @album.update(album_params)
      render json: @album
      # will want to add , include: :tracks once we implement those
    else
      render json: @album.errors.full_messages, status: 422
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
      :administrator_id
      # , :cover_art
    )
  end

end