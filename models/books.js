const { Schema, model } = require(`mongoose`);

const booksSchema = new Schema({
    title: String,
    description: String,
    authors: String,
    favorite: String,
    fileCover: String,
    fileName: String,
});

module.exports = model("Books", booksSchema);
