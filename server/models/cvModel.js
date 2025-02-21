import mongoose from "mongoose";

const CvSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cvTitle:{
    type:String,
    required:true
  },
  personalInfo: {
    fullName: String,
    jobTitle: String,
    email: String,
    phone: String,
    address: String,
    about: String,
    website: String,
    linkedin: String,
    github: String,
  },
  education: [
    {
      school: String,
      degree: String,
      startYear: String,
      endYear: String,
    },
  ],
  experience: [
    {
      company: String,
      position: String,
      startDate: String,
      endDate: String,
      description: String,
    },
  ],
  skills: [String], 
  projects: [
    {
      name: String,
      description: String,
      link: String,
    },
  ],
  languages: [String], 

  customFields: [
    {
      title: String, // Kullanıcının eklediği başlık
      content: String, // Kullanıcının eklediği içerik
    },
  ],
}, { timestamps: true });

const Cv = mongoose.model("Cv", CvSchema);
export default Cv;
