const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    elo: Number
});

UserSchema.methods.welcome = function() {
    const welcomeMessage = this.username
        ? `Welcome, ${this.username}!`
        : 'Welcome!';
    console.log(welcomeMessage);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
