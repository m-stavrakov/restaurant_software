from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from collections import defaultdict
import traceback

app = Flask(__name__)

if __name__ == '__app__':
    app.run(debug=True, port=8080, threaded=True)

app.secret_key = 'heheh34434grgrgrg'
results = []
notes_list = []
test_orders = []

@app.route('/')
def home():
    return render_template('base.html')

@app.route('/login', methods=['GET'])
def login():
    # Log in page for the app
    if 'email' in session:
        flash('Successful login', category='success')
        return render_template(url_for('home'))
    
    # flash('Please login', category='error')
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login_user():
    session['email'] = request.form['email']
    session['name'] = request.form['name']

    return redirect(url_for('home'))

@app.route('/logout')
def logout():
    session.pop('email', None)
    session.pop('name', None)

    flash('Logged out successfully', category='success')
    return redirect(url_for('home'))

@app.route('/calculator', methods=['GET', 'POST'])
def calculator():
    if request.method == 'POST':
        table_id = int(request.form['table-id'])
        total = float(request.form['total'])
        tip = float(request.form['tip'])
        split = int(request.form['split'])

        tip_amount = total * (tip / 100)
        total_amount = total + tip_amount
        split_amount = total_amount / split

        results.append({'table_id': table_id, 'total': round(total_amount,2), 'tip': round(tip_amount,2), 'split': round(split_amount,2)})

    return render_template('calculator.html', results=results)

@app.route('/delete_result/<int:result_id>', methods=['POST'])
def delete_result(result_id):
    if 0 <= result_id < len(results):
        del results[result_id]
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'error': 'Invalid index'})
    
@app.route('/notes', methods=['GET', 'POST'])
def notes():
    if request.method == 'POST':
        table_num = request.form.get('table')
        drinks = request.form.get('drinks-order')
        food = request.form.get('food-order')
        notes_list.append({'table_num': table_num, 'drinks': drinks, 'food': food})

    return render_template('notes.html', notes_list=notes_list)

@app.route('/delete_order/<int:order_id>', methods=['POST'])
def delete_order(order_id):
    if order_id < len(notes_list):
        del notes_list[order_id]
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'error': 'Invalid index'})
