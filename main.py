from flask import Flask,render_template
from build import Build

app = Flask(__name__)

@app.route("/",methods=['GET','POST'])
def main():
    return render_template("index.html")

if __name__=="__main__":
    Build.create_tables()
    app.run(debug=True)