# == Schema Information
#
# Table name: albums
#
#  id               :bigint(8)        not null, primary key
#  title            :string           not null
#  artist_name      :string           not null
#  release_date     :datetime         not null
#  description      :text
#  upc_ean          :string
#  catalog_number   :string
#  published        :boolean          default(FALSE)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  administrator_id :integer
#

class Album < ApplicationRecord
  validates :title, :artist_name, :release_date, :administrator_id, presence: true
  validates :published, inclusion: { in: [ true, false ] }

    belongs_to :administrator,
    class_name: 'User',
    foreign_key: :administrator_id

    has_many :tracks, 
      -> { order(:track_order) },
      class_name: 'Track',
      foreign_key: :album_id

    has_one_attached :photo

    # def tracks
    #   Track.select(*).joins("albums ON albums.id = tracks.album_id").order(:track_order)
    # end

end
