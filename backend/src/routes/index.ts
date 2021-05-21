import express from 'express';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.json({ success: true, message: "BabyTracker API" });
});

module.exports = router;