const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  post: {
    type: String,
    required: true,
    validate: [
      ({ length }) => length >= 3 && length <= 15,
      "Word should be at least 3 characters.",
    ],
  },
  date: { type: Date, default: Date.now },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
