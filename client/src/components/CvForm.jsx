import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePersonalInfo,
  addEducation,
  addExperience,
  addSkill,
  addProject,
  addLanguage,
  removeSkill,
  addCustomField,
  removeCustomField,
  updateCvTitle,
  removeExperience,
  removeEducation,
  removeProject,
  removeLanguage
} from "../../store/cvSlice";
import { Editor } from "primereact/editor";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

const CvForm = () => {
  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
      </span>
    );
  };

  const header = renderHeader();

  const dispatch = useDispatch();
  const { personalInfo,cvTitle, education, experience, skills, projects, customFields, languages } = useSelector(
    (state) => state.cv
  );


  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    dispatch(updatePersonalInfo({ field: name, value }));
  };
  const [text, setText] = useState(personalInfo.about || "");

  const handleEditorChange = (e) => {
    const newValue = e.htmlValue;
    setText(newValue);
    dispatch(updatePersonalInfo({ field: "about", value: newValue }));
  };
  const [edu, setEdu] = useState({ school: "", degree: "", startYear: "", endYear: "" });
  const [exp, setExp] = useState({ company: "", position: "", startDate: "", endDate: "", description: "" });
  const [skill, setSkill] = useState("");
  const [project, setProject] = useState({ name: "", description: "", link: "" });
  const [custom, setCustom] = useState({ title: "", name: "", description: "", link: "" });
  const [language, setLanguage] = useState("");

  return (
    <div className="flex flex-col  space-y-3  shadow-md bg-white">
      <div className="sticky z-50 top-0 flex  items-center w-full shadow-md bg-white p-4">
        <Link
          className="p-2 rounded border"
          to={'/panel'}>Panel</Link>
      </div>
      <div className="px-12  space-y-3">

       {/* CV Başlığı */}
       <div className="space-y-3 py-2">
       <h2 className="text-xl font-bold">CV Başlığı</h2>
       <input
         type="text"
         name="cvTitle"
         placeholder="CV Başlığı"
         value={cvTitle}
         onChange={(e) => dispatch(updateCvTitle(e.target.value))}
         className="w-full p-3 rounded bg-[#eff2f9]"
       />
     </div>
     
     <hr />

        <div className=" space-y-3  py-2 ">
          <h2 className="text-xl font-bold ">Kişisel Bilgiler</h2>
          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            {["fullName", "jobTitle", "email", "phone", "address", "website", "linkedin", "github"].map(
              (field, i) => (
                <div className="space-y-2 " key={i}>
                  <h1 className="text-[#5b6272] text-sm ">  {field}</h1>
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    value={personalInfo[field]}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-3   rounded bg-[#eff2f9] "
                  />
                </div>
              )
            )}
          </div>

        </div>
        <hr />

        {/* profession*/}

        <div className=" space-y-3  py-2">
          <h2 className="text-xl font-bold ">Professional Summary</h2>
          <Editor
            headerTemplate={header}
            value={personalInfo.about}
            onTextChange={handleEditorChange}
            style={{ height: '320px', backgroundColor: '#eff2f9' }}
          />
        </div>

        <hr />

        {/* Eğitim Ekleme */}
        <div className="space-y-3  py-2">
          <h2 className="text-xl font-bold ">Eğitim</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-x-10 gap-y-5">
              {["school", "degree", "startYear", "endYear"].map((field, i) => (
                <div className="space-y-2 " key={i}>
                  <h1 className="text-[#5b6272] text-sm ">  {field}</h1>
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field}
                    value={edu[field]}
                    onChange={(e) => setEdu({ ...edu, [field]: e.target.value })}
                    className="w-full p-3   rounded bg-[#eff2f9] "
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                dispatch(addEducation(edu));
                setEdu({ school: "", degree: "", startYear: "", endYear: "" });
              }}
              className="w-full px-4 py-2 bg-blue-500  text-white rounded"
            >
              Ekle
            </button>
            <div>
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="bg-gray-300 p-2 rounded mt-1 w-full uppercase flex justify-between">
                  {edu.school} - {edu.degree} - ({edu.startYear}-{edu.endYear})
                  <span 
                  onClick={() => dispatch(removeEducation(edu._id))}
                  className="p-1 cursor-pointer rounded bg-red-500 text-white ">
                  <RiDeleteBin6Line/>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr />

        {/* Deneyim Ekleme */}
        <div className="space-y-3  py-2">
          <h2 className="text-xl font-bold ">Deneyim</h2>
          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            {["company", "position", "startDate", "endDate", "description"].map((field, i) => (
              <div className="space-y-2 " key={i}>
                <h1 className="text-[#5b6272] text-sm ">  {field}</h1>
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field}
                  value={exp[field]}
                  onChange={(e) => setExp({ ...exp, [field]: e.target.value })}
                  className="w-full p-3   rounded bg-[#eff2f9] "
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              dispatch(addExperience(exp));
              setExp({ company: "", position: "", startDate: "", endDate: "", description: "" });
            }}
            className="w-full px-4 py-2 bg-blue-500  text-white rounded"
          >
            Ekle
          </button>

          {experience.length > 0 ? (
            <div className="flex flex-wrap gap-2 ">
              {experience.map((experience, index) => (
                <span key={index}
                  className="bg-gray-300 p-2 rounded mt-1 w-full uppercase flex justify-between"
                 >
                  {experience.position}-{experience.company}-({experience.startDate}-{experience.endDate})
                  <span 
                  onClick={() => dispatch(removeExperience(experience._id))}
                  className="p-1 cursor-pointer rounded bg-red-500 text-white ">
                  <RiDeleteBin6Line/>
                  </span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Henüz yetenek eklenmedi.</p>
          )}
        </div>

        <hr />

        {/* Yetenek Ekleme */}
        <div className="space-y-3  py-2">
          <h2 className="text-xl font-bold ">Yetenekler</h2>
          <div className="flex flex-col gap-x-10 gap-y-5">

            <input
              type="text"
              name="skill"
              placeholder="Yetenek"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full p-3   rounded bg-[#eff2f9] "
            />
            <button
              onClick={() => {
                if (skill) {
                  dispatch(addSkill(skill));
                  setSkill("");
                }
              }}
              className="w-full px-4 py-2 bg-blue-500  text-white rounded"
            >
              Ekle
            </button>


            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2 ">
                {skills.map((skill, index) => (
                  <span key={index}
                    className="bg-gray-300 p-2 rounded mt-1 w-full uppercase flex justify-between "
                    >
                    {skill}
                    <span 
                    onClick={() => dispatch(removeSkill(skill))}
                  className="p-1 cursor-pointer rounded bg-red-500 text-white ">
                  <RiDeleteBin6Line/>
                  </span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Henüz yetenek eklenmedi.</p>
            )}

          </div>
        </div>

        <hr />

        {/* Proje Ekleme */}
        <div className="space-y-3  py-2">
          <h2 className="text-xl font-bold ">Projeler</h2>
          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            {["name", "description", "link"].map((field, i) => (
              <div className="space-y-2 " key={i}>
                <h1 className="text-[#5b6272] text-sm ">  {field}</h1>
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field}
                  value={project[field]}
                  onChange={(e) => setProject({ ...project, [field]: e.target.value })}
                  className="w-full p-3   rounded bg-[#eff2f9] "
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              dispatch(addProject(project));
              setProject({ name: "", description: "", link: "" });
            }}
            className="w-full px-4 py-2 bg-blue-500  text-white rounded"
          >
            Ekle
          </button>

          {projects.length > 0 ? (
            <div className="flex flex-wrap gap-2 ">
              {projects.map((project, index) => (
                <span key={index}
                  className="bg-gray-300 p-2 rounded mt-1 w-full uppercase flex justify-between"
                 >
                  {project.name}-{project.description}
                  <span 
                  onClick={() => dispatch(removeProject(project._id))}
                  className="p-1 cursor-pointer rounded bg-red-500 text-white ">
                  <RiDeleteBin6Line/>
                  </span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Henüz yetenek eklenmedi.</p>
          )}
        </div>

        <hr />

        {/* Dil Ekleme */}
        <div className="space-y-3  py-2">
          <h2 className="text-xl font-bold">Diller</h2>

          <input
            type="text"
            name="language"
            placeholder="Dil"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3   rounded bg-[#eff2f9] "
          />
          <button
            onClick={() => {
              if (language) {
                dispatch(addLanguage(language));
                setLanguage("");
              }
            }}
            className="w-full px-4 py-2 bg-blue-500  text-white rounded"
          >
            Ekle
          </button>
          {languages.length > 0 ? (
            <div className="flex flex-wrap gap-2 ">
              {languages.map((lang, index) => (
                <span key={index}
                  className="bg-gray-300 p-2 rounded mt-1 w-full uppercase flex justify-between "
                 >
                  {lang}
                  <span 
                onClick={() => dispatch(removeLanguage(lang))}
                className="p-1 cursor-pointer rounded bg-red-500 text-white ">
                <RiDeleteBin6Line/>
                </span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Henüz dil eklenmedi.</p>
          )}
        </div>

        <hr />
        {/* Custom Ekleme */}
        <div className="space-y-3  py-2">
          <h2 className="text-xl font-bold ">Custom</h2>
          <div className="flex flex-col space-y-3">
            <div className="grid grid-cols-2 gap-x-10 gap-y-5">
              {["title", "name", "description", "link"].map((field, i) => (
                <div className="space-y-2 " key={i}>
                  <h1 className="text-[#5b6272] text-sm ">  {field}</h1>
                  <textarea
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field}
                    value={custom[field]}
                    onChange={(e) => setCustom({ ...custom, [field]: e.target.value })}
                    className="w-full p-3   rounded bg-[#eff2f9] "
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                dispatch(addCustomField(custom));
                setCustom({ title: "", name: "", description: "", link: "" });
              }}
              className="w-full px-4 py-2 bg-blue-500  text-white rounded"
            >
              Ekle
            </button>

            {customFields.length > 0 ? (
              <div className="flex flex-wrap gap-2 ">
                {customFields.map((cf, index) => (
                  <span key={index}
                    className="bg-gray-300 p-2 rounded mt-1 w-full uppercase flex justify-between"
                   >
                    {cf.title}-{cf.name}-{cf.description}
                    <span 
                    onClick={() => dispatch(removeCustomField(cf._id))}
                    className="p-1 cursor-pointer rounded bg-red-500 text-white ">
                    <RiDeleteBin6Line/>
                    </span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Henüz yetenek eklenmedi.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvForm;
