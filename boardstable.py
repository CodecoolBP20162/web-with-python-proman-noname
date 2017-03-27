from models import *
from user import User
from board import Board

class Boardstable(BaseModel):
    board_id = ForeignKeyField(Board)
    user_id = ForeignKeyField(User)