const { Router } = require(`express`);
const router = Router();

router.get(`/`, (req, res) => {
    const { url } = req;
    res.json({ url });
});

module.exports = router;
