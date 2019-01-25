# == Schema Information
#
# Table name: albums
#
#  id             :bigint(8)        not null, primary key
#  title          :string           not null
#  artist_name    :string           not null
#  release_date   :datetime         not null
#  description    :text
#  upc_ean        :string
#  catalog_number :string
#  published      :boolean          default(FALSE)
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Album < ApplicationRecord
  validates :title, :artist_name, :release_date, :administrator_id, presence: true
  validates :published, inclusion: { in: [ true, false ] }

    belongs_to :administrator,
    class_name: 'User',
    foreign_key: :administrator_id

    has_one_attached :photo

end
