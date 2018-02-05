const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  privacy: Boolean,
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  usePushEach: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
