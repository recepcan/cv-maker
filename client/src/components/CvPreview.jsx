import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSkill, selectCvData } from "../../store/cvSlice";
import { Link } from "react-router-dom";




const CvPreview = () => {
  const { personalInfo, education, experience, skills, projects, customFields, languages } = useSelector(
    (state) => state.cv
  );

  const dispatch = useDispatch();

  return (
    <div
      className="p-6    w-full    text-sm    ">
      <div
        className=" w-full">
        {/* Kişisel Bilgiler */}
        <div className=" py-4 space-y-2">
          <div className="flex justify-center items-center font-bold space-x-1 tracking-wide w-full">
            <h1 >{personalInfo.fullName || "Ad Soyad"},</h1>
            <p >{personalInfo.jobTitle || "Meslek Unvanı"}</p>
          </div>

          <div className="flex justify-center items-center w-full  space-x-1">

            <p>{personalInfo.address || "Adres"},</p>
            <p>{personalInfo.email || "E-posta"},</p>
            <p>{personalInfo.phone || "Telefon"}</p>

          </div>
          <hr />

          <div className="flex items-center space-x-8">
            <h2 className=" font-bold w-1/5  ">Profile</h2>
            <div
              dangerouslySetInnerHTML={{ __html: personalInfo.about || "Hakkımda" }}
              className=" w-4/5">
            </div>
          </div>

          <hr />

          <div className="flex items-center space-x-8">
            <h2 className=" font-bold w-1/5 ">Links</h2>
            <div className=" space-x-2 w-4/5 ">
              {personalInfo.website &&
                <div
                >
                Website : <span
                    className="text-blue-500  w-4/5 underline">
                    {personalInfo.website}
                  </span>
                </div>}

              {personalInfo.linkedin &&
                <div
                >
                linkedin : <span
                    className="text-blue-500  w-4/5 underline">
                    {personalInfo.linkedin}
                  </span>
                </div>}

              {personalInfo.github &&
                <div
                >
                Github : <span
                    className="text-blue-500  w-4/5 underline">
                    {personalInfo.github}
                  </span>
                </div>}        
           </div>
          </div>
        </div>
        <hr />

        {/* Eğitim */}
        <div className="py-4  flex  items-center space-x-8 ">

          <h2 className=" font-bold  w-1/5">Eğitim</h2>
          <div className="w-4/5">
            {education?.length > 0 ? (
              education.map((edu, index) => (
                <div key={index} className="w-full  ">
                  <div className="font-semibold">{edu.school} - {edu.degree}</div>
                  <div className=" text-gray-500">{edu.startYear} - {edu.endYear}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Eğitim bilgisi eklenmedi.</p>
            )}
          </div>
        </div>
        <hr />

        {/* Deneyim */}

        <div className="py-4 flex items-center space-x-8">
          <h2 className=" font-bold w-1/5 ">Deneyim</h2>
          <div className="flex flex-col space-y-2 w-4/5 ">
            {experience?.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index} className="w-full ">
                  <p className="font-semibold">{exp.company} - {exp.position} - ({exp.startDate} - {exp.endDate})</p>

                  <p className="pl-2">   {exp.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Deneyim bilgisi eklenmedi.</p>
            )}
          </div>
        </div>

        <hr />

        {/* Yetenekler */}
        <div className="py-4 flex items-center space-x-8">
          <h2 className=" font-bold w-1/5">Yetenekler</h2>
          {skills?.length > 0 ? (
            <div className="flex flex-wrap gap-2 w-4/5">
              {skills.map((skill, index) => (
                <span key={index}
                  className="px-3 py-1 bg-blue-200 hover:bg-red-500 hover:text-red-800 
             transition-all duration-300 cursor-pointer text-blue-800 rounded-full "
                  onClick={() => dispatch(removeSkill(skill))}>
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Henüz yetenek eklenmedi.</p>
          )}
        </div>

        <hr />

        {/* Projeler */}
        <div className="py-4 flex items-center space-x-8">
          <h2 className=" font-bold w-1/5">Projeler</h2>
          <div className="w-4/5  flex flex-col space-y-2">
          {projects?.length > 0 ? (
            projects.map((project, index) => (
              <div key={index} className="w-full ">
                <p className="font-semibold">{project.name}</p>
                <p className=" text-gray-500">{project.description}</p>
                {project.link && <div>
                  Projeyi Gör : <span className="text-blue-500"> {project.link}</span>
                </div>}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Henüz proje eklenmedi.</p>
          )}
          </div>
        </div>

        <hr />

        {/* Diller */}
        <div className="py-4 flex items-center space-x-8">
          <h2 className=" font-bold w-1/5">Diller</h2>
          {languages?.length > 0 ? (
            <div className="flex flex-wrap gap-2 w-4/5">
              {languages.map((lang, index) => (
                <span key={index} className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full ">
                  {lang}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Henüz dil bilgisi eklenmedi.</p>
          )}</div>

        <hr />
        {/* Custom */}
        <div className="py-4 flex items-center space-x-8">
          <h2 className=" font-bold w-1/5">{customFields[0]?.title}</h2>
          {customFields?.length > 0 ? (
            <div className="flex flex-wrap gap-2 w-4/5">
              {customFields.map((item, index) => (
                <div key={index} className="w-4/5">
                  <p className="font-semibold">{item.name}</p>
                  <p className=" text-gray-500">{item.description}</p>
                  {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">Projeyi Gör</a>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Henüz customFields bilgisi eklenmedi.</p>
          )}</div>
      </div>

    </div>
  );
};

export default CvPreview;
