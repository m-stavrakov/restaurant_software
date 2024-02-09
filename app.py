from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_login import LoginManager, login_user, current_user, login_required, logout_user
from models import User_Database, User
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

if __name__ == '__app__':
    app.run(debug=True)

app.secret_key = 'heheh34434grgrgrg'
login_manager = LoginManager()
login_manager.init_app(app)

user_database = User_Database()

@app.route('/')
# @login_required
def home():
    if 'username' in session and session['username'] not in user_database:
        return redirect(url_for('logout'))
    return render_template('home.html', users = user_database.get_users())

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        existing_user = user_database[email] == email

        if existing_user:
            if check_password_hash(existing_user[email].password, password):
                flash('Logged in successfully!', category='success')
                login_user(existing_user, remember=True)
                return redirect(url_for('app.home'))
            else:
                flash('Incorrect password, try again.', category='error')
        else:
            flash('Email does not exist.', category='error')
        
    return render_template('login.html', existing_user = current_user)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    # username = session.pop('username', None)

    # user_database.pop(username, None)

    return redirect(url_for('app.login'))

@app.route('/signup', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        #Getting information from the form
        email = request.form.get('email')
        username = request.form.get('username')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')
        
        existing_user = user_database[email] == email
        if existing_user:
            flash('Email already exists.', category='error')
        elif len(email) < 4:
            flash('Email must be greater than 4 characters.', category='error')
        elif len(username) < 2:
            flash("Username must be more than 2 characters.", category='error')
        elif password1 != password2:
            flash('Passwords don\'t match.', category='error')
        elif len(password1) < 7:
            flash('Password must be at least 7 characters.', category='error')
        else:
            new_user = user_database.create_user(email, username, password1 = generate_password_hash(password1, method='pbkdf2:sha256'))
            login_user(new_user, remember=True)
            flash('Account created!', category='success')
            return redirect(url_for('app.home'))
    
    return render_template('sign_up.html', existing_user = current_user)

@login_manager.user_loader
def load_user():
    return User.get_email()