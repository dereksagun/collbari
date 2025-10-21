import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
  },
  columnIds: {
    type: [String],
    required: true,
  },
  owner: {
    type: String,
    require: true
  },
  sharedWith: {
    type: [String],
    require: true
  }
},{
  toJSON: {
    virtuals: true,     // includes `id`
    versionKey: false,  // removes `__v`
    transform: (_, ret: any) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      //delete ret.passwordHash; // hides sensitive data
      return ret;
    },
    toObject: {
      virtuals: true,
    }
  },
});


const BoardModel = mongoose.model('Board', boardSchema)

export default BoardModel
