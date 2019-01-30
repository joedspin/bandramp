# == Schema Information
#
# Table name: tracks
#
#  id           :bigint(8)        not null, primary key
#  title        :string           not null
#  album_id     :integer          not null
#  track_order  :integer          default(0), not null
#  duration     :string
#  lyrics       :text
#  release_date :datetime
#  bonus_track  :boolean          default(FALSE)
#

class Track < ApplicationRecord

  validates :title, :album_id, :track_order, presence: true
  validates :track_order, uniqueness: { scope: :album_id }
  validates :bonus_track, inclusion: { in: [ true, false ] }

  belongs_to :album

  has_one_attached :audio_file

end
