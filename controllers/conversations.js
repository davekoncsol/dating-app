const Conversation = require('../models/conversation');

module.exports ={
    newMessage
}

async function newMessage (req, res) {
   
        const message = new Conversation(req.body);
        try {
          await message.save();
          
        } catch (err) {
          // Probably a duplicate email
          res.status(400).json(err);
        }
      

}