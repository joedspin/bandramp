class AddAdministratorIdToAlbums < ActiveRecord::Migration[5.2]
  def change
    add_column :albums, :administrator_id, :integer
    add_index :albums, :administrator_id
  end
end
