from models import *
from board import Board

class Cell(BaseModel):
    text = CharField()
    name = CharField()
    board_id = ForeignKeyField(Board)
