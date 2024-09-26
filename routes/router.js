const express = require('express');
const router = express.Router();
const MainController = require('../controller/MainController');
router.get('/', MainController.index);
router.get('/songs', MainController.songs);
router.post('/songs/add', MainController.addSong);
router.delete('/songs/delete/:id', MainController.delete);
router.get('/songs/play/:id', MainController.playSong);

module.exports = router;

