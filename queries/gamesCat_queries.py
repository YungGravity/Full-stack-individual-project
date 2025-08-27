games_name_query = "SELECT id, title, genre, tags, img, description FROM gamescatdb.games;"
games_tags_shooter = "SELECT title, genre, tags, description FROM gamescatdb.games WHERE tags = 'Shooter';"

insert_game_query = "INSERT INTO gamescatdb.games (title, genre, tags, img, description) VALUES (%s, %s, %s, %s, %s);"