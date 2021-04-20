const { model, Schema, models } = require("mongoose");

const blacklistSchema = new Schema({
  discordId: { type: String, required: true },
});

module.exports = models.Blacklisted || model("Blacklisted", blacklistSchema);
