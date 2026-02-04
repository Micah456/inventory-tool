from flask import Flask, render_template

app = Flask("inv-tool")

@app.route("/")
def index():
    return render_template("invtool.html")

if __name__=="__main__":
    app.run(debug=True, port=5000) 
    # When no port is specified, starts at default port 5000