from flask import *

import example_data
from build import Build
from models.status import Status
from models.cell import Cell

app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def main():
    return render_template("index.html")


@app.route("/show_status")
def show_status():
    elements = []
    status = Status.select()
    for element in status:
        elements.append(element.status)
    return jsonify(elements)


@app.route("/update_data")
def update_data():
    result = request.get_json()
    newid = result["newid"]
    oldid = result["oldid"]
    newstatus = result["newstatus"]
    oldstatus = result["oldstatus"]
    if (newid != oldid):
        query = Cell.update(order=newid, status =newstatus).where(Cell.order == oldid and Cell.status == oldstatus)
        query.execute()
        query = Cell.update(order=oldid, status=newid).where(Cell.order == newid and Cell.status == newstatus)
        query.execute()

@app.route("/load_data")
def load_data():
    pass


@app.route("/save_data")
def save_data():
    pass


if __name__ == "__main__":
    Build.create_tables()
    example_data.create_example_data()
    app.run(debug=True)
