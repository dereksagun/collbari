import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    minLength: 3
  },
  passwordHash: String,
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


const UserModel = mongoose.model('User', userSchema)

export default UserModel
