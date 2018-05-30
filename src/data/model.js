import mongoose from "mongoose";

// Do not declare methods using ES6 arrow functions (=>).
// http://mongoosejs.com/docs/guide.html#methods

const {
    Schema
} = mongoose;

const playerSchema = new Schema({
    username: String
});

const Player = mongoose.model("Player", playerSchema);

export default Player;