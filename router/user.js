const express = require(`express`);
const router = express.Router();

const inx = require("../index");

router.post(`/login`, (req, res) => {
    const book = inx.Book(req.body);
    inx.books.push(book);

    res.json({ id: 1, mail: `test@mail.ru` }).status(201);
});

module.exports = router;
