from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_login import LoginManager, login_required, login_user, logout_user, current_user
from peewee import DoesNotExist

import example_data
from build import Build
from cell_list import Cell_list
from models.board import Board
from models.boardstable import Boardstable
from models.cell import Cell
from models.status import Status
from models.user import User

app = Flask(__name__)
app.secret_key = "asdasdasds"

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


@login_manager.user_loader
def load_user(user_id):
    return User.get(User.id == user_id)


@login_manager.unauthorized_handler
def unauthorized_handler():
    return redirect(url_for("login"))


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("login"))


@app.route("/", methods=['GET', 'POST'])
@login_required
def main():
    return render_template("index.html")


@app.route("/user_main/board/", methods=['GET'])
@login_required
def user_board():
    return render_template("user_board.html")


@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        try:
            username = request.form['username']
            user = User.get(username == User.login_name)
        except DoesNotExist:
            return render_template("login.html")
        login_user(user)
        return redirect(url_for("user_main"))
    return render_template("login.html")


@app.route("/user_main", methods=['GET', 'POST'])
def user_main():
    return render_template("user_main.html")


@app.route("/current_user", methods=['GET', 'POST'])
def curr_user():
    try:
        return jsonify(current_user.id)
    except AttributeError:
        return jsonify(0)


@app.route("/save_data", methods=['GET', 'POST'])
def save():
    result = request.get_json()
    print(result)
    return 'alma'


@app.route("/load_board", methods=['GET', 'POST'])
def load_board():
    board_list = get_user_boards(current_user.id)
    return jsonify(board_list)


def get_user_boards(userid):
    boards = Board.select().join(Boardstable).where(Boardstable.user == userid)
    boardlist = []
    for board in boards:
        boardlist.append(board_to_json(board))
    return boardlist


def board_to_json(board):
    return {'name': board.name, 'id_in_db': board.id}


@app.route("/update_data")
def update_data():
    result = request.get_json()
    newid = result["newid"]
    oldid = result["oldid"]
    newstatus = result["newstatus"]
    oldstatus = result["oldstatus"]
    if (newid != oldid):
        query = Cell.update(order=newid, status=newstatus).where(Cell.order == oldid and Cell.status == oldstatus)
        query.execute()
        query = Cell.update(order=oldid, status=newid).where(Cell.order == newid and Cell.status == newstatus)
        query.execute()


def cell_to_json(cell):
    return {'name': cell.name, 'text': cell.text, 'order': cell.order, 'status': cell.status.status}


def init_cell_list(board_id):
    cells = Cell.select().join(Board).where(Cell.board == board_id)
    Cell_list.cell_list.clear()
    for cell in cells:
        Cell_list.cell_list.append(cell_to_json(cell))


@app.route("/get_status_list", methods=['GET', 'POST'])
def get_status_list():
    status_list = Status.select()
    board_id = request.form["board_id"]
    result = []
    for status in status_list:
        result.append(status.status)
    init_cell_list(board_id)
    return jsonify(result)


def init_cell_list(board_id):
    cells = Cell.select().join(Board).where(Cell.board == board_id)
    Cell_list.cell_list.clear()
    for cell in cells:
        Cell_list.cell_list.append(cell_to_json(cell))



def get_board_cells(status):
    result = []
    for cell in Cell_list.cell_list:
        if cell['status'] == status:
            result.append(cell)
    return result


@app.route("/load_cells_by_status", methods=['GET', 'POST'])
def load_cells():
    status = request.form["status"]
    selected_cells_by_status = get_board_cells(status)
    sorted_cell_list = sorted(selected_cells_by_status, key=lambda cell_list_key: cell_list_key['order'])
    return jsonify(sorted_cell_list)


@app.route("/update_cell_data")
def save_cell_data():
    pass

@app.route("/mini_game", methods=['GET', 'POST'])
def game():
    return render_template("game.html")


@app.route("/create_new_board", methods=['POST'])
@login_required
def create_new_board():
    board_title = request.form["input_field"]
    if board_title != "":
        new_board = Board.create(name=board_title)
        Boardstable.create(board=new_board, user=current_user.id)
    return jsonify(board_title)


if __name__ == "__main__":
    Build.create_tables()
    example_data.create_example_data()
    app.run(debug=True)
