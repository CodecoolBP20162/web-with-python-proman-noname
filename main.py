from flask import *

import example_data
from build import Build
from models.status import Status

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


if __name__ == "__main__":
    Build.create_tables()
    example_data.create_example_data()
    app.run(debug=True)
