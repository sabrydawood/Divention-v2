const mongoose = require("mongoose")

const UserSchemas = new mongoose.Schema({ 
discordId:{
    type: String,
    required: true,
    unique: true
},
discordTag:{
    type: String,
},
avatar:{
    type:String,
},
globalXp:{
    type: Number,
    default: 0
},
coins: {
    type : Number , 
    default : 1
},
guildXp:{
    type:Number,
    default: 0
},
rep:{
    type : Number,
    default : 0
},
profilePic : {
    type : String,
    default : "https://cdn.discordapp.com/attachments/800023817480568852/800730959342207027/unknown.jpeg"
},
bio : {
    type : String,
    default : " "
},
})


module.exports = mongoose.model("User", UserSchemas)