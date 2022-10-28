import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: false
    },
    index: {
      type: Number,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Note', noteSchema);
