json.album do
  json.partial! '/api/albums/album', album: @album
end
json.tracks do
  @tracks.each do |track|
    json.set! track.id do
      json.partial! "api/tracks/track", track: track
    end
  end
end
