json.id track.id
json.title track.title
json.album_id track.album_id
json.release_date track.release_date
json.bonus_track track.bonus_track
json.track_order track.track_order
json.lyrics track.lyrics
json.audio_file track.audio_file.attached? ? url_for(track.audio_file) : ''