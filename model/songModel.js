const db = require('../db');

module.exports = {
    addSong : (songData, callback) => {
        const { title, artist, album, genre, releaseDate, songFilePath, imageFilePath } = songData;

        const sql = `
            INSERT INTO spotify (title, artist, album, genre, releaseDate, songFilePath, imageFilePath)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [title, artist, album, genre, releaseDate, songFilePath, imageFilePath], callback);
    },

    create : (songData, callback) => {
        const sql = `
        INSERT INTO spotify (title, artist, album, genre, releaseDate, songFilePath, imageFilePath)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const { title, artist, album, genre, releaseDate, songFilePath, imageFilePath } = songData;

        db.query(sql, [title, artist, album, genre, releaseDate, songFilePath, imageFilePath], (error, result) => {
        if (error) {
            return callback(error);
        }
        callback(null, result);
        });
    },
    find: (callback) => {
        const sql = 'SELECT * FROM spotify'; 
    
        db.query(sql, (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results); 
        });
    },
    delete: (songId, callback) => {
        const sql = 'DELETE FROM spotify WHERE id = ?'; // Assuming 'id' is the primary key

        db.query(sql, [songId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    },
    findById: (id, callback) => {
        const sql = 'SELECT * FROM spotify WHERE id = ?';
        db.query(sql, [id], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results[0]); 
        });
    },

    findAll: (callback) => {
        const sql = 'SELECT * FROM spotify';
        db.query(sql, (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }
};




