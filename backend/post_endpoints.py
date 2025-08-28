from fastapi import APIRouter
import database
from models import models
from queries import gamesCat_queries as queries

app = APIRouter()

@app.post("/add_game")
def create_game(game: models.Game):
    query = queries.insert_game_query
    success = database.execute_sqL_query(query, (
        game.title,
        game.genre,
        game.tags,
        game.img,
        game.description,
    ))
    if success == True:
        return game
    else:
        return {"error": "Something went rong"}