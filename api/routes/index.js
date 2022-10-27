import express from 'express';
import Url from '../models/url.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const url = await Url.findOne({ id: req.params.id });

    if (url) {
      await Url.updateOne({ id: url.id, }, { $inc: { visits: 1 } });

      return res.status(200).json({url: url.original_url});
    } else {
      res.status(404).json('Not found');
    }

  } catch (err) {
    res.status(500).json('Server Error');
  }
});

export default router;
