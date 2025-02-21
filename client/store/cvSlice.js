import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cvTitle:'',
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    about: "",
    website: "",
    linkedin: "",
    github: "",
  },
  education: [], // { school, degree, startYear, endYear }
  experience: [], // { company, position, startDate, endDate, description }
  skills: [], // ["React", "Node.js", "MongoDB"]
  projects: [], // { name, description, link }
  languages: [], // ["İngilizce", "Türkçe"]
  customFields: [],
};

export const selectCvData = (state) => ({
  cvTitle:state.cv.cvTitle,
    personalInfo: state.cv.personalInfo,
    education: state.cv.education,
    experience: state.cv.experience,
    skills: state.cv.skills,
    projects: state.cv.projects,
    languages: state.cv.languages,
    customFields:state.cv.customFields,
  });

  
const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    setCvData: (state, action) => {
      return action.payload; // Gelen veriyi direkt olarak state'e atar
    },
    resetCv: () => initialState, 
    updateCvTitle: (state, action) => {
      state.cvTitle = action.payload;
    },
    updatePersonalInfo: (state, action) => {
      const { field, value } = action.payload;
      state.personalInfo[field] = value;
    },
    addEducation: (state, action) => {
      state.education.push(action.payload);
    },
    removeEducation: (state, action) => {
      state.education.splice(action.payload, 1);
    },
    addExperience: (state, action) => {
      state.experience.push(action.payload);
    },
    removeExperience: (state, action) => {
      state.experience.splice(action.payload, 1);
    },
    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    removeSkill: (state, action) => {
      state.skills = state.skills.filter(skill => skill !== action.payload);
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    removeProject: (state, action) => {
      state.projects.splice(action.payload, 1);
    },
    addLanguage: (state, action) => {
      state.languages.push(action.payload);
    },
    removeLanguage: (state, action) => {
      state.languages = state.languages.filter(lang => lang !== action.payload);
    },
    addCustomField: (state, action) => {
      state.customFields.push(action.payload);
    },
    removeCustomField: (state, action) => {
      state.customFields = state.customFields.filter((_, i) => i !== action.payload);
    },
  },
});

export const {
  setCvData,
  resetCv,
  updatePersonalInfo,
  addEducation,
  removeEducation,
  addExperience,
  removeExperience,
  addSkill,
  removeSkill,
  addProject,
  removeProject,
  addLanguage,
  removeLanguage,
  addCustomField,
  removeCustomField,
  updateCvTitle
} = cvSlice.actions;

export default cvSlice.reducer;
