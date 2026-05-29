import { model, Schema } from 'mongoose';

const resumeSchema = new Schema(
  {
    owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  personalInfo: {
    fullname: { type: String, required: true },
    job: String,
    email: { type: String, required: true },
    phone: String,
    location: String,
    summary: String,
  },
  experience: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String,
    isCurrent: { type: Boolean, default: false }
  }],

  education: [{
    institution: String,
    degree: String,
    graduationYear: Number
  }],

  skills: [String],
  languages:[String],
  }
);
export const Resume= model("Resume",resumeSchema);
