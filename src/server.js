const express = require(`express`);
const redis = require(`redis`);

const app = express();

const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || `localhost`;

const client = redis.createClient({ url: REDIS_URL });

(async () => await client.connect())();

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
