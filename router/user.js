const express = require(`express`);
const router = express.Router();

const Book = require("../index");

router.post(`/login`, (rq, rs) => {
    const book = Book(rq.body);
    books.push(book);

    rs.json({ id: 1, mail: `test@mail.ru` }).status(201);
});

module.exports = router;
