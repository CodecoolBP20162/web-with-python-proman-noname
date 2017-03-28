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
        db.drop_tables([User, Status, Board, Boardstable, Cell])
        db.create_tables([User, Status, Board, Boardstable, Cell], safe=True)
        cls.create_status()

    @staticmethod
    def create_status():
        if not Status.select():
            status = Status(status="New")
            status.save()
            status = Status(status="In progress")
            status.save()
            status = Status(status="Review")
            status.save()
            status = Status(status="Done")
            status.save()