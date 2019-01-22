class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, allow_null: false
      t.string :email, allow_null: false
      t.string :password_digest, allow_null: false
      t.string :session_token, allow_null: false
      t.boolean :pro_account, default: false

      t.timestamps
    end
    add_index :users, :username, unique: true
    add_index :users, :session_token, unique: true
    add_index :users, :email, unique: true
  end
end
