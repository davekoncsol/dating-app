const Conversation = require('../models/conversation');

module.exports ={
    newMessage
}

async function newMessage (req, res) {
   
        const message = new Conversation(req.body);
        try {
          await message.save();
          res.status(200).json(message);
        } catch (err) {
          // Probably a duplicate email
          res.status(400).json(err);
        }
      

}