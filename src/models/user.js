
import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, trim: true, required: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      required: false,
      default: "https://ac.goit.global/fullstack/react/default-avatar.jpg",
    },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' }
  },
  { versionKey:false, timestamps: true },
);

userSchema.pre('save', async function () {
  if (!this.username) {
    this.username = this.email.split('@')[0];
  }
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
