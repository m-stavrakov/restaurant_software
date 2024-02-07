from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)

if __name__ == '__app__':
    app.run(debug=True)

app.secret_key = 'hehehehehehe'

user_database = {}

@app.route('/')
def home():
    if 'username' in session and session['username'] not in user_database:
        return redirect(url_for('logout'))
    return render_template('home.html', logged_users = user_database)

@app.route('/login', methods=['GET', 'POST'])
def login():
    username = request.form['username']

    session['username'] = username

    user_database['username'] = 'online'

    if 'username' in session:
        return redirect(url_for('home'))
    
    return render_template('login.html')

@app.route('logout')
def logout():
    username = session.pop('username', None)

    user_database.pop(username, None)

    return redirect(url_for('home'))

@app.route('/status', methods=['POST'])
def set_status():
    if 'username' not in session:
        return redirect(url_for('login_form'))
    
    status = request.form['status']

    username = session['username']

    user_database[username] = status

    return redirect(url_for('home'))