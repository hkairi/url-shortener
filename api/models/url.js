import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  original_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  visits: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

export default mongoose.model('Url', UrlSchema);
