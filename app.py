from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_login import LoginManager, login_required, login_user, logout_user, current_user
from peewee import DoesNotExist

import example_data
from build import Build
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


@login_required
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


@app.route("/get_status_list", methods=['GET', 'POST'])
def get_status_list():
    status_list = Status.select()
    result = []
    for status in status_list:
        result.append(status.status)
    return jsonify(result)


@app.route("/load_cells_by_status", methods=['GET', 'POST'])
def load_cells():
    board_id = request.form["board_id"]
    status = request.form["status"]
    cell_list = get_board_cells(board_id, status)
    ordered_cell_list = sorted(cell_list, key=lambda cell_list_key: cell_list_key['order'])
    return jsonify(ordered_cell_list)


def get_board_cells(board_id, status):
    cells = Cell.select().join(Board).where(Cell.board == board_id)
    cell_list = []
    for cell in cells:
        if (cell.status.status == status):
            cell_list.append(cell_to_json(cell))
    return cell_list


def cell_to_json(cell):
    return {'name': cell.name, 'text': cell.text, 'order': cell.order, 'status': cell.status.status}


@app.route("/save_data")
def save_data():
    pass


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
