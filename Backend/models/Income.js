const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    icon:{
        type: String,
    },
    source:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    amount:{
        type:Number,
        require: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Income', IncomeSchema)