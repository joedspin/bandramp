class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.integer :album_id, null: false
      t.integer :track_order, null: false, default: 0
      t.string :duration
      t.text :lyrics
      t.datetime :release_date
      t.boolean :bonus_track, default: false
    end
    add_index :tracks, :album_id
    add_index :tracks, [:album_id, :track_order], unique: true
  end
end