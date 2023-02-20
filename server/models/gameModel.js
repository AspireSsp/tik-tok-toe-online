const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    player1_Id:{
        type:String,
    },
    player2_Id:{
        type:String,
    },
    moves: {
        type: Object
    },
    status:{
        type: String,
        default : 'running'
    },
    lastMove: {
        type : String
    },
    winner: {
        type: String
    },
},{
    timestamps: true
});

const Game = mongoose.model('game',gameSchema);
module.exports=Game;