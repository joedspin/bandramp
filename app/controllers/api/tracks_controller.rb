class TracksController < ApplicationController

  def create

  end

  def update

  end

  def track_params
    params.require(:track).permit(:title, :album_id, :track_order, :duration, 
      :lyrics, :release_date, :bonus_track, :audio_file)
  end

end