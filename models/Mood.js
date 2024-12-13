import mongoose from 'mongoose';

const MoodSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  mood: {
    feeling: {
      type: Number,
      required: true
    },
    mood: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    required: false
  },
  note: {
    type: String,
    required: false
  }
});

export default mongoose?.models?.Mood || mongoose.model('Mood', MoodSchema);
