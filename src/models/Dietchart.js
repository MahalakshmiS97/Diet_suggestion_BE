import mongoose from "./index.js"

const DietSchema = new mongoose.Schema({
    BMIRange:{type:Number},
    Breakfast:{type:String},
    Lunch:{type:String},
    EveningSnack:{type:String},
    Dinner:{type:String},
    Water:{type:String},
    Walking:{type:String},
    Workout:{type:String}

},{
    collection:'diet',
    versionKey:false
})

const dietModel = mongoose.model('diet',DietSchema)
export default dietModel