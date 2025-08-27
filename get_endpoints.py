from fastapi import APIRouter
import database
from queries import gamesCat_queries as queries

app = APIRouter()



@app.get("/games")
def get_games():
    query = queries.games_name_query
    games = database.execute_sqL_query(query)
    if isinstance(games, Exception):
        return {"error": str(games)}, 500

    games_to_return = []
    for game in games:
        games_to_return.append({
            "id": game[0],
            "title": game[1],
            "genre": game[2],
            "tags": game[3],        # make sure this is a list or text[]
            "img": game[4],
            "description": game[5]
        })

    return {"games": games_to_return}

    """" 
    convert rows to JSON
    games_to_return = []
    for game in games:
       ## games.append({
            "id": game[0],
            "title": game[1],
            "genre": game[2],
            "tags": game[3],  # make sure tags is text[] in Postgres
            "img": game[4],
            "description": game[5]
        })
        """

@app.get("/shooter_games")
def get_shooter_games():
    query = queries.games_tags_shooter
    shooters = database.execute_sqL_query(query)
    if isinstance(shooters, Exception):
        return shooters, 500
    shooter_to_return = []
    for shooter in shooters:
        games_dictionary = {"title": shooter[0],
                            "genre": shooter[1],
                            "tags": shooter[2],
                            "description": shooter[3]}
        shooter_to_return.append(games_dictionary)
        return ({'shooters': shooter_to_return})