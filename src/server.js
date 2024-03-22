const express = require(`express`);
const mongoose = require(`mongoose`);
const Books = require(`./books`);

const redis = require(`redis`);
const REDIS_URL = process.env.REDIS_URL || `redis://storage`;
const client = redis.createClient({ url: REDIS_URL });

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL || `mongodb://localhost:27017/`;

const app = express();

(async () => {
    try {
        await mongoose.connect(MONGO_URL, { dbName: `books` });
    } catch (e) {
        console.log(e);
    }
})();

const Book = (data) => {
    let {
        id = uuid(),
        title = ``,
        description = ``,
        authors = ``,
        favorite = false,
        fileCover = ``,
        fileName = ``,
        fileBook = ``,
    } = data;

    const book = {
        id,
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook,
    };

    return book;
};

app.get(`/api/books`, async (req, res) => {
    try {
        const books = await Books.find().select("-__v");
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
app.get(`/api/books/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        const books = await Books.findById(id).select("-__v");
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
app.post(`/api/books/`, async (req, res) => {
    const { title, description } = req.params;
    try {
        const book = Book({ title, description });
        await book.save();
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
app.put(`/api/books/:id`, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.params;
    try {
        await Books.findByIdAndUpdate(id, { title, description });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
app.delete(`/api/books/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        await Books.deleteOne({ _id: id });
        res.json(true);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

//
app.get(`/counter/:id`, async (req, res) => {
    const { id } = req.params;

    try {
        const cnt = await client.incr(id);

        res.json({ cnt });
    } catch (error) {
        res.json({ code: 500, message: `Redis error ${error}` });
    }
});
app.post(`/counter/:id/incr`, async (req, res) => {
    const { id } = req.params;

    try {
        const cnt = await client.incr(id);

        res.json({ cnt });
    } catch (error) {
        res.json({ code: 500, message: `Redis error ${error}` });
    }
});

app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
