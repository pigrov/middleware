const express = require(`express`);
const router = express.Router();

router
    .get(`/`, (rq, rs) => {
        rs.json(books);
    })
    .get(`/:id`, (rq, rs) => {
        const { id } = rq.params;
        const book = books.filter((x) => x.id == id)[0];

        !book && rs.status(404);
        rs.json(book || { result: `error`, message: `book not found` });
    })
    .post(`/`, (rq, rs) => {
        const book = Book(rq.body);
        books.push(book);

        rs.json(book);
    })

    .put(`/`, (rq, rs) => {
        rs.json({ result: `error`, message: `id must set` });
    })
    .put(`/:id`, (rq, rs) => {
        const { id } = rq.params;
        const book = books.filter((x) => x.id == id)[0];

        book &&
            books
                .filter((x) => x.id == id)
                .map((o) => {
                    Object.keys(rq.body).map((p) => {
                        o[p] = rq.body[p];
                    });
                });

        !book && rs.status(404);
        rs.json({ result: book ? `updated` : `book not found` });
    })
    .delete(`/`, (rq, rs) => {
        rs.json({ result: `error`, message: `id must set` });
    })
    .delete(`/:id`, (rq, rs) => {
        const { id } = rq.params;
        const book = books.filter((x) => x.id == id)[0];
        book && (books = books.filter((x) => x.id != id));

        !book && rs.status(404);
        rs.json({ result: book ? `success` : `book not found` });
    });

module.exports = router;
