json.id track.id
json.title track.title
json.album_id track.album_id
json.release_date track.release_date.to_s
json.bonus_track track.bonus_track
json.track_order track.track_order
json.lyrics track.lyrics.to_s
json.audio_file track.audio_file.attached? ? url_for(track.audio_file) : ''
json.audio_size track.audio_file.attached? ? track.audio_file.byte_size : ''
json.filename track.audio_file.attached? ? track.audio_file.filename : ''