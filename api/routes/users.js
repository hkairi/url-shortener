import express from 'express';

import { nanoid } from 'nanoid';
import { validateEmail } from '../utils/utils.js';
import User from '../models/user.js';
import Url from '../models/url.js';

const router = express.Router();

router.get('/:user_id/urls', async(req, res) =>{
  const user_id = req.params.user_id;
  try {
    let urls = await Url.find({ user_id });
    if (urls) {
      res.json({data: urls});
    } else {
      res.json({data: []});
    }

  } catch(error) {
    res.status(500).json({message: 'Error', error: error});
  }
});

router.post('/register', async (req, res) => {
  const { email } = req.body;

  if (validateEmail(email)) {
    try {
      let existing_user = await User.findOne({ email });
      if (existing_user) {
        res.json(existing_user);
      } else {
        const id = nanoid(20);

        let new_user = new User({
          id,
          email,
          date: new Date(),
        });

        await new_user.save();
        res.json(new_user);
      }
    } catch (err) {
      res.status(500).json({error: 'Server Error'});
    }
  } else {
    res.status(400).json({error: 'Invalid E-mail address', email});
  }
});

export default router;
