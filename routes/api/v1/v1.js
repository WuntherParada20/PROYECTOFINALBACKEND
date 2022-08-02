const router = require('express').Router();

//Routes
router.use('/auth', require('./auth/auth.route'));
router.use('/board', require('./board/board.route'));
router.use('/note', require('./notes/notes.route'));

module.exports = router;