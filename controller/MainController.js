const multer = require('multer');
const path = require('path');
const Song = require('../model/songModel');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const songDir = "./public/songs";
      const imageDir = "./public/covers";
  
      // Determine directory based on the file field
      const dir = file.fieldname === "songFile" ? songDir : imageDir;
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      // Save the file with the current timestamp to avoid collisions
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  // Initialize multer with the storage configuration
  const upload = multer({ storage });

module.exports = {
    index:(req, res) => {
        res.render('index');
    },

    save:(req, res) => {
        const data = req.body;
        products.create(data, (err) => {
            if(err) throw err;
            res.redirect('/');
        });
    },

    playlist:(req, res) => {
        res.render('playlist');
    },
    songs: (req, res) => {
        Song.find((error, songs) => { // Remove the empty object
            if (error) {
                return res.status(500).send('Error retrieving songs');
            }
            res.render('songs', { songs }); // Render the songs view with the songs data
        });
    }
    ,

    addSong: [
        upload.fields([{ name: "songFile" }, { name: "imageFile" }]),
    
        (req, res) => {
            const { title, artist, album, genre, releaseDate } = req.body;
    
            const songFilePath = `/songs/${req.files["songFile"][0].filename}`;
            const imageFilePath = `/covers/${req.files["imageFile"][0].filename}`;
    
            const newSongData = {
                title,
                artist,
                album,
                genre,
                releaseDate,
                songFilePath,
                imageFilePath,
            };
    
            Song.create(newSongData, (error, result) => {
                if (error) {
                    console.error("Error adding song:", error);
                    return res.status(500).json({ message: "Failed to add song" });
                }
    
                res.redirect('/songs');
            });
        },
    ],

    findSongs : (req, res) => {
        const criteria = {
            title: req.query.title,  // Getting title from query parameters
            artist: req.query.artist, // Getting artist from query parameters
            album: req.query.album,   // Getting album from query parameters
        };
    
        Song.find(criteria, (error, songs) => {
            if (error) {
                return res.status(500).json({ message: 'Failed to find songs' });
            }
            res.json(songs);
        });
    },
    delete: (req, res) => {
        const songId = req.params.id;
        
        Song.delete(songId, (error) => {
            if (error) {
                return res.status(500).send('Error deleting song');
            }
            res.status(200).send('Song deleted successfully');
        });
    },

    playSong: (req, res) => {
        const { id } = req.params;

        // Fetch the current song by ID
        Song.findById(id, (error, song) => {
            if (error) {
                return res.status(500).send('Error retrieving song');
            }

            // Fetch all songs for the playlist
            Song.findAll((error, songs) => {
                if (error) {
                    return res.status(500).send('Error retrieving songs');
                }

                res.render('play', { song, songs }); // Render the play view with the song and playlist data
            });
        });
    }
}








