import mongoose from "mongoose";

// Do not declare methods using ES6 arrow functions (=>).
// http://mongoosejs.com/docs/guide.html#methods

const {
    Schema
} = mongoose;

const userSchema = new Schema({
    username: String
});

const User = mongoose.model("User", userSchema);

export default User;