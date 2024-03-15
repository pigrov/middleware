const { Router } = require(`express`);
const router = Router();
const inx = require(`../index`);
const path = require(`path`);
const fileMulter = require("../middleware/file");

router
    .get(`/`, (req, res) => {
        res.json(inx.books);
    })
    .get(`/:id`, (req, res) => {
        const { id } = req.params;
        const book = inx.books.filter((x) => x.id == id)[0];

        !book && res.status(404);
        res.json(book || { result: `error`, message: `book not found` });
    })
    .get(`/:id/download`, (req, res) => {
        const { id } = req.params;
        const book = inx.books.filter((x) => x.id == id)[0];

        book
            ? book.fileBook
                ? res.download(path.join(__dirname, `..`, `upload-folder`, book.fileBook))
                : res.json({ result: `error`, message: `file not found` })
            : res.json({ result: `error`, message: `book not found` });
    })

    .post(`/`, (req, res) => {
        console.log(`body`, req);
        const book = inx.Book(req.body);
        inx.books.push(book);

        res.json(book);
    })
    .post(`/upload`, fileMulter.single(`book`), (req, res) => {
        if (req.file) {
            const { path } = req.file;
            inx.books.push(inx.Book({ fileBook: path }));
            res.json({ result: `success`, message: `uploaded`, path });
        }
    })

    .put(`/`, (req, res) => {
        res.json({ result: `error`, message: `id must set` });
    })
    .put(`/:id`, (req, res) => {
        const { id } = req.params;
        const book = inx.books.filter((x) => x.id == id)[0];

        book &&
            inx.books
                .filter((x) => x.id == id)
                .map((o) => {
                    Object.keys(req.body).map((p) => {
                        o[p] = req.body[p];
                    });
                });

        !book && res.status(404);
        res.json({ result: book ? `updated` : `book not found` });
    })

    .delete(`/`, (req, res) => {
        res.json({ result: `error`, message: `id must set` });
    })
    .delete(`/:id`, (req, res) => {
        const { id } = req.params;
        const book = inx.books.filter((x) => x.id == id)[0];
        book && (inx.books = inx.books.filter((x) => x.id != id));

        !book && res.status(404);
        res.json({ result: book ? `success` : `book not found` });
    });

module.exports = router;
