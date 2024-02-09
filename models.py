import shelve
from flask_login import UserMixin

class User_Database:
    def __init__(self):
        self.__database = shelve.open('data/users.db')
    
    def __del__(self):
        self.__database.close()
    
    # def add_user(self, User):
    #     self.__database[str(hash(User))] = User
    def create_user(self, email, username, password):
        if email in self.__database:
            print("Email already exists, please Login")
            return False
        else:
            self.__database[email] = User(email, username, password)
            print("User created successfully")
            return True
    
    def authenticate_user(self, email, password):
        if email in self.__database and self.__database[email].password == password:
            print("Authentication successful. Welcome", self.__database[email].username)
            return True
        else:
            print('Invalid username or password')
            return False

    def delete_user(self, hash):
        del self.__database[hash]
    
    def get_users(self):
        return self.__database

class User(UserMixin):
    def __init__(self, email, username, password):
        self.__email = email
        self.username = username
        self.__password = password

    def __hash__(self):
        return abs(hash(str(self.__class__)))
    
    def get_email(self):
        return self.__email
    
    def get_username(self):
        return self.__usernames
    
    def get_password(self):
        return self.__password