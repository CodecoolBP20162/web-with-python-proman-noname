from board import Board
from boardstable import Boardstable
from cell import Cell
from models import *
from user import User


class Build:
    @classmethod
    def create_tables(cls):
        db.connect()
        db.create_tables([User, Board, Boardstable, Cell], safe=True)
