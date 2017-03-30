from models.board import Board
from models.boardstable import Boardstable
from models.user import User
from models.models import *
from models.cell import Cell
from models.status import Status


class Build:
    @classmethod
    def create_tables(cls):
        db.connect()
        #db.drop_tables([User, Status, Board, Boardstable, Cell])
        db.create_tables([User, Status, Board, Boardstable, Cell], safe=True)
        cls.create_status()

    @staticmethod
    def create_status():
        if not Status.select():
            status = Status(status="new")
            status.save()
            status = Status(status="progress")
            status.save()
            status = Status(status="review")
            status.save()
            status = Status(status="done")
            status.save()