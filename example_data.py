from models.board import Board
from models.boardstable import Boardstable
from models.cell import Cell
from models.user import User
from models.status import Status


def create_example_data():
    if not Cell.select():
        user = User(name='Example User', login_name='user', password='user')
        batman = User(name='Batman', login_name='batman', password='batman')
        user.save()
        batman.save()

        board1 = Board(name='First')
        board2 = Board(name='Second')
        board3 = Board(name='Third')
        batman1=Board(name='Batmobil')
        batman2=Board(name='BatBarlang')
        batman3=Board(name='BatRobin')

        board1.save()
        board2.save()
        board3.save()
        batman1.save()
        batman2.save()
        batman3.save()

        Boardstable.create(board=board1, user=user)
        Boardstable.create(board=board2, user=user)
        Boardstable.create(board=board3, user=user)

        Boardstable.create(board=batman1, user=batman)
        Boardstable.create(board=batman2, user=batman)
        Boardstable.create(board=batman3, user=batman)

        Cell.create(text="Rocket",name="Weapon", order=1, board=board1, status=Status.get(Status.status == "New"))
        Cell.create(text="Kalasnyikov", name="Weapon", order=2, board=board1, status=Status.get(Status.status == "In progress"))
        Cell.create(text="Grenade", name="Weapon", order=3, board=board1, status=Status.get(Status.status == "Done"))