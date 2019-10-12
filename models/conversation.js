const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
const ConversationSchema = new Schema({  
  participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
});



const MessageSchema = new Schema({  
  participants: [ConversationSchema],
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },


  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

module.exports = mongoose.model('Conversation', MessageSchema);  