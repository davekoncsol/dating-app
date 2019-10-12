const mongoose = require('mongoose'); 
    

// Schema defines how chat messages will be stored in MongoDB
const conversationSchema = new mongoose.Schema({  
  profileId: String,
  participants: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});



const messageSchema = new mongoose.Schema({  
  participants: [conversationSchema],
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  }},
   {
  timestamps: true 
  });


messageSchema.statics.getActiveForUser = function(user) {
  return this.findOne({'participants.participants': user._id});
}

messageSchema.statics.createForUser = async function(user) {
  const message = new this();
  message.participants.push({profileId: profile._id, participants: user._id});
  await message.save();
  return Promise.resolve(message);
}


module.exports = mongoose.model('Conversation', messageSchema);  