from flask import Flask,render_template,request
from flask_login import LoginManager,login_required, login_user, logout_user, current_user



import example_data
from build import Build
from models.status import Status
from models.user import User

app = Flask(__name__)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

@app.route("/", methods=['GET', 'POST'])
def main():
    return render_template("index.html")

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method=="POST":
        pass
    return render_template("login.html")


@app.route("/show_status")
def show_status():
    elements = []
    status = Status.select()
    for element in status:
        elements.append(element.status)
    return jsonify(elements)

@app.route("/save_data",methods=['GET','POST'])
def save():
    result=request.get_json()
    print(result)

    return 'alma'

@app.route("/load_board",methods=['GET','POST'])
def load():
    cell1={'name':'Elso'}
    cell2= {'name':'Masodik'}
    cell3={'name':'Harmadik'}
    cell_list = [cell1,cell2,cell3]
    data={'new':cell_list}
    return jsonify(data)


if __name__ == "__main__":
    Build.create_tables()
    example_data.create_example_data()
    app.run(debug=True)
