const Game = require("../models/gameModel");
const User = require("../models/userModel");


exports.createNewGame = async(req, res)=>{
    try {
        const email = req.body.email;
        const player1_Id = req.body.userId
        const user2 = await User.findOne({email})
        const newGame = await Game.create({player1_Id,player2_Id:user2._id});
        res.status(200).json({newGame,user2});
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

exports.updateGame = async(req, res)=>{
    try {
        const gameDetails = await Game.findOneAndUpdate({_id: req.params.id},req.body)
        res.status(200).json({message: "updated successed..!"});
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
exports.deleteGame = async(req, res)=>{
    try {
        const gameDetails = await Game.findOneAndDelete({_id: req.params.id})
        res.status(200).json({message: "deleted successed..!"});
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
exports.getGameDetails = async(req, res)=>{
    try {
        const gameDetails = await Game.findOne({_id: req.params.id})
        const user1 = await User.findOne({_id: gameDetails.player1_Id})
        const user2 = await User.findOne({_id: gameDetails.player2_Id})
        res.status(200).json({...gameDetails._doc,player1:user1.name, player2: user2.name});
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

exports.updateMoves = async(req, res)=>{
    try {
        const move = req.body;
        const game = await Game.findOne({_id: req.params.id})
        console.log("gmm", game);
        if(game.status == "complete"){
            res.status(421).json({ message : "game is over"});
        }
        const moves = {...game.moves, ["place"+move.place]: move.user}
        console.log(moves.place1)
        if((moves.place1 == moves.place2 && moves.place2 == moves.place3 && moves.place1 != undefined) || 
        (moves.place4 == moves.place5 && moves.place5 == moves.place6 && moves.place1 != undefined) || 
        (moves.place7 == moves.place8 && moves.place8 == moves.place9 && moves.place1 != undefined) || 
        (moves.place1 == moves.place4 && moves.place4 == moves.place7 && moves.place1 != undefined) || 
        (moves.place2 == moves.place5 && moves.place5 == moves.place8 && moves.place1 != undefined) || 
        (moves.place3 == moves.place6 &&  moves.place6 == moves.place9 && moves.place1 != undefined) || 
        (moves.place1 == moves.place5 && moves.place5 == moves.place9 && moves.place1 != undefined) || 
        (moves.place3 == moves.place5 && moves.place5 == moves.place7 && moves.place1 != undefined)){
            const updateMoves = await Game.findOneAndUpdate({_id:req.params.id},{ moves,lastMove: move.user,status: "complete", winner: move.user})
        }
        if(Object.keys(moves).length == 9){
            const updateMoves = await Game.findOneAndUpdate({_id:req.params.id},{ moves,lastMove: move.user, status: "complete", winner: "draw"})
        }
        const updateMoves = await Game.findOneAndUpdate({_id:req.params.id},{ moves,lastMove: move.user})
        const updatedGame = await Game.findOne({_id: req.params.id})
        console.log(updatedGame)
        const user1 = await User.findOne({_id: updatedGame.player1_Id})
        const user2 = await User.findOne({_id: updatedGame.player2_Id})
        console.log({...updatedGame, player1: user1.name, player2 : user2.name})
        res.status(200).json({...updatedGame._doc, player1: user1.name, player2 : user2.name});

        
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

exports.getAllGames = async(req, res)=>{
    try {
        var allGames = []
        const games = await Game.find({ $or:[ {'player1_Id':req.params.id}, {'player2_Id':req.params.id}]})
        for(var obj of games){
            const st1 = await User.findOne({_id:obj.player1_Id })
            const st2 = await User.findOne({_id:obj.player2_Id })
            // obj = {...obj, player1: st1.name,player2: st2.name}
            newOBj = {...obj._doc,player1: st1.name,player2: st2.name}
            allGames.push(newOBj);
        }
        console.log(allGames)
        res.status(200).json(allGames);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}