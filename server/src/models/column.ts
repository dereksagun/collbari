import mongoose from 'mongoose'

const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  taskIds: {
    type: [String],
    required: true,
  },
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


const ColumnModel = mongoose.model('Column', columnSchema)

export default ColumnModel
