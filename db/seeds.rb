# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Album.destroy_all

User.create!([{
  username: 'demouser', 
  password: 'demouserpassword', 
  email: 'bandrampdemo@gmail.com',
  pro_account: true}])

Album.create!([{
  title: 'Test album',
  artist_name: 'the beatles',
  release_date: '2018-01-12',
  administrator_id: User.first.id
}])