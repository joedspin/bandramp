class CreateAlbums < ActiveRecord::Migration[5.2]
  def change
    create_table :albums do |t|
      t.string :title, null: false
      t.string :artist_name, null: false
      t.datetime :release_date, null: false
      t.text :description
      t.string :upc_ean
      t.string :catalog_number
      t.boolean :published, default: false

      t.timestamps
    end
    add_index :albums, :artist_name
  end
end
