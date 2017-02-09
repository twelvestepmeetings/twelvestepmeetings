import mongoose, { Schema } from 'mongoose';

/**
 * Meeting
 */
const MeetingSchema = new Schema({
  participants: {
    'type': [Schema.Types.ObjectId],
    'default': [],
    'ref': 'User'
  },
  speaker: Schema.Types.ObjectId,
  leader: Schema.Types.ObjectId,
  live: {
    'type': Boolean,
    'default': false
  },
  fellowship: String,
  topic: String,
  time: Date,
  tags: [String]
});
const Meeting = mongoose.model('Meeting', MeetingSchema);

const UserSchema = new Schema({
  name: String
});
const User = mongoose.model('User', UserSchema);

module.exports = {
  Meeting,
  User
};
