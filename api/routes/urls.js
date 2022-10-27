import express from 'express';

import { nanoid } from 'nanoid';
import { validateUrl } from '../utils/utils.js';
import Url from '../models/url.js';

import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });

const router = express.Router();
const base = process.env.BASE_URL || 'http://localhost:4000';

// Short URL Generator
router.post('/shorten', async (req, res) => {
  const { url, name, user_id } = req.body;

  if (validateUrl(url)) {
    try {
      let result_url = await Url.findOne({ original_url: url, user_id });
      if (result_url) {
        res.json({...result_url, valid: true});
      } else {

        const id = nanoid(10);
        const short_url = `${base}/${id}`;

        let new_url = new Url({
          id,
          original_url: url,
          name,
          short_url,
          user_id,
          date: new Date(),
          visits: 0,
        });

        await new_url.save();
        res.json({...new_url, valid: true});
      }
    } catch (err) {
      console.log("Error :", err);
      res.status(500).json({message: 'Server Error', err: err, url: url});
    }
  } else {
    res.status(400).json({message: 'Invalid Original Url', valid: false});
  }
});

export default router;
