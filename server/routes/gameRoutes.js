const express = require('express');
const { getGameDetails, createNewGame, updateMoves, getAllGames, updateGame, deleteGame } = require('../controller/gameController');
const router = express.Router();


router.route("/newgame").post(createNewGame)
router.route("/getgame/:id").get(getGameDetails)
router.route("/updatemove/:id").put(updateMoves)
router.route("/getallgames/:id").get(getAllGames)
router.route("/updategame/:id").put(updateGame)
router.route("/deletegame/:id").delete(deleteGame)


 


module.exports = router; 