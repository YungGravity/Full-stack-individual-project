from pydantic import BaseModel

class Game(BaseModel):
    title: str
    genre: str
    tags: str
    img: str
    description: str