import mongoose from 'mongoose'

const managerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },

    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },

    password : {
      type: String,
      required: true,
      minlength: 8,
      select : false,
    },

     role: {
      type: String,
      enum: ["manager"],
      default: "manager",
    },

     isActive: {
      type: Boolean,
      default: true,
    },
},

 {
    timestamps: true,
  })

const ManagerModel = mongoose.model('Manager',managerSchema)
export default ManagerModel