from models.board import Board
from models.boardstable import Boardstable
from models.cell import Cell
from models.user import User
from models.status import Status


def create_example_data():
    if not User.select():
        user = User(name='Example User', login_name='user', password='user')
        user.save()

        board1 = Board(name='First')
        board2 = Board(name='Second')
        board3 = Board(name='Third')
        board1.save()
        board2.save()
        board3.save()

        Boardstable.create(board=board1, user=user)
        Boardstable.create(board=board2, user=user)
        Boardstable.create(board=board3, user=user)

        Cell.create(text="Rocket",name="Weapon", board=board1, status=Status.get(Status.status == "New"))
        Cell.create(text="Kalasnyikov", name="Weapon", board=board1, status=Status.get(Status.status == "In progress"))
        Cell.create(text="Grenade", name="Weapon", board=board1, status=Status.get(Status.status == "Done"))