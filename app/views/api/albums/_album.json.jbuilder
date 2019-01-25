# json.extract! album, 
#   :id,
#   :title,
#   :artist_name,
#   :release_date,
#   :description,
#   :upc_ean,
#   :catalog_number,
#   :published,
#   :administrator_id,
#   photo: url_for(photo) if photo.attached?
json.id album.id
json.title album.title
json.artist_name album.artist_name
json.release_date album.release_date
json.description album.description
json.upc_ean album.upc_ean
json.catalog_number album.catalog_number
json.published album.published
json.administrator_id album.administrator_id
json.photo url_for(album.photo) if album.photo.attached?