from flask import Flask, render_template, request, redirect, url_for, jsonify, json
from flask_login import LoginManager, login_required, login_user, logout_user, current_user
from peewee import DoesNotExist

import example_data
from build import Build
from models.status import Status
from models.user import User
from models.cell import Cell
from models.board import Board
from models.boardstable import Boardstable

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


@app.route("/show_status")
def show_status():
    elements = []
    status = Status.select()
    for element in status:
        elements.append(element.status)
    return jsonify(elements)


@app.route("/save_data", methods=['GET', 'POST'])
def save():
    result = request.get_json()
    print(result)

    return 'alma'


@app.route("/load_board", methods=['GET', 'POST'])
def load_board():
    board_list=get_user_boards(current_user.id)
    return jsonify(board_list)

def get_user_boards(userid):
    boards = Board.select().join(Boardstable).where(Boardstable.user == userid)
    boardlist = []
    for board in boards:
        boardlist.append(board_to_json(board))
    return boardlist



def board_to_json(board):
    return {'name': board.name}


def cell_to_json(cell):
    return {'name': cell.name, 'text': cell.text}


if __name__ == "__main__":
    Build.create_tables()
    example_data.create_example_data()
    app.run(debug=True)