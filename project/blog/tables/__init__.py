from orator import DatabaseManager
from orator import Model

config = {
    'default': 'database',
    'database': {
        'driver': 'sqlite',
        'database': './database.db'
    }
}

db = DatabaseManager(config)
Model.set_connection_resolver(db)