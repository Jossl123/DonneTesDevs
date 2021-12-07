const sqlite3 = require('sqlite3');

function openDb() {
    db = new sqlite3.Database('./database/DonneTesDevs.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });
}

function closeDb(db) {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

function showAllUsers() {
    openDb()
    db.serialize(() => {
        db.each(`SELECT * FROM Users`, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            console.log(row);
        });
    });
    closeDb(db)
}

function removeUser() {
    openDb()
    db.serialize(() => {
        db.run(`DELETE FROM Users WHERE userId = 2`, (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    });
    closeDb(db)
}

function addUserToDb(username, password, email) {
    openDb()
    db.serialize(() => {
        db.run(`INSERT INTO Users(username, password, email) VALUES("${username}", "${password}", "${email}")`, (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    });
    closeDb(db)
}
module.exports = { showAllUsers, addUserToDb, removeUser };