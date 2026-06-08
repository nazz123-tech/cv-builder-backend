import { model, Schema, Types} from 'mongoose';

const resumeSchema = new Schema(
  {
    owner: { type: Types.ObjectId, ref: 'User', required: true },
    personalInfo: {
      fullname: { type: String, required: true },
      job: String,
      email: { type: String, required: true },
      phone: String,
      location: String,
      summary: String,
    },

    experience: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
        isCurrent: { type: Boolean, default: false },
      },
    ],

    education: [
      {
        institution: String,
        degree: String,
        graduationYear: Number,
      },
    ],

    skills: [String],

    languages: [
      {
        name: { type: String, required: true },
        level: {
          type: String,
          enum: ['Basic', 'Intermediate', 'Upper-Intermediate', 'Advanced'],
          required: true,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

export const Resume = model("Resume", resumeSchema);
