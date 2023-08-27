import mongoose from "mongoose"


const validateMongoId = (id:string) => {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) throw new Error ("Invalid Id")
}


export {validateMongoId}