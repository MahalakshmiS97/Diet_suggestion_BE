import dietModel from "../models/Dietchart.js";

const create =async(req,res)=>{
    try {
        await dietModel.create(req.body)
            res.status(202).send({
                message:"Diet chart created successfully",
    
            })
    } 
    catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
            
        })
    }
}

const getDietchart = async(req,res)=>{
    try {
        let Bmi = req.headers.BMI
            let diet = await dietModel.find({BMIRange:Bmi},{BMIRange:0,_id:0})
            res.status(200).send({
                message:"Diet Chart Fetched Successfully",
                diet
            })
}
    catch (error) {
        res.status(500).send({
        message:"Internal Server Error",
        error:error.message
            
        })
    }
}
export default {
    create,
    getDietchart
}