json.id album.id
json.title album.title
json.artist_name album.artist_name
json.release_date album.release_date.to_s
json.description album.description
json.upc_ean album.upc_ean
json.catalog_number album.catalog_number
json.published album.published
json.administrator_id album.administrator_id
json.photo album.photo.attached? ? url_for(album.photo) : ''
json.track_ids album.track_ids