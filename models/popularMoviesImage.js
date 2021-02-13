const mongoose = require('mongoose');
const user = process.env.MONGODB_USER
const password = process.env.MONGODB_PASSWORD
const uri = `mongodb+srv://${user}:${password}@movies.9gsbi.mongodb.net/movies?retryWrites=true&w=majority`;
const client = mongoose.connect(uri, { useNewUrlParser: true })

var popularMoviesImageSchema = new mongoose.Schema({
    backdrop_path:String,
    id:Number,
    poster_path:String,
    backdrop_img:Buffer,
    poster_img:Buffer,
});

var popularMoviesImage = mongoose.model('PopularMoviesImage', popularMoviesImageSchema);

module.exports = popularMoviesImage;
