import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Template2() {
  const { personalInfo, education, experience, skills, projects, customFields,languages } = useSelector(
    (state) => state.cv
  );
  return (
    <div className="p-6    w-full    text-sm    ">
    <div>{personalInfo.fullName}</div>
    <div>{personalInfo.jobTitle}</div>
    <div>{personalInfo.address}</div>
    <div>{personalInfo.email}</div>
    <div>{personalInfo.phone}</div>
    <div>{personalInfo.fullName}</div>
    <div>{personalInfo.fullName}</div>

    <div 
       dangerouslySetInnerHTML={{ __html: personalInfo.about || "Hakkımda" }}  
       className=" w-4/5">
     </div>

     <div className="text-blue-500 space-x-2 w-4/5 underline">
         {personalInfo.website && <Link to={`${personalInfo.website}`} target="_blank" rel="noopener noreferrer">Website</Link>}
         {personalInfo.linkedin && <Link to={`${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn</Link>}
         {personalInfo.github && <Link to={`${personalInfo.github}`} target="_blank" rel="noopener noreferrer">GitHub</Link>}
         </div>


         {education?.length > 0 ? (
        education.map((edu, index) => (
          <div key={index} className="w-4/5">
            <p className="font-semibold">{edu.school} - {edu.degree}</p>
            <p className=" text-gray-500">{edu.startYear} - {edu.endYear}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Eğitim bilgisi eklenmedi.</p>
      )}
    </div>
  )
}

export default Template2