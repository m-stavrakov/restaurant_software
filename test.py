import shelve

class User:
    def __init__(self, id, username, password, names):
        self.id = id
        self.username = username
        self.password = password
        self.names = names

class UserDatabase:
    def __init__(self, filename):
        self.filename = filename
        self.db = shelve.open('UserData')
