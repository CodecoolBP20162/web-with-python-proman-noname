from models.board import Board
from models.user import User
from models.models import *


class Boardstable(BaseModel):
    board = ForeignKeyField(Board)
    user = ForeignKeyField(User)