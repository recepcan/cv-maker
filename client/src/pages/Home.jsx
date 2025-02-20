import React, { useState } from 'react'
import CvForm from '../components/CvForm'
import CvPreview from '../components/CvPreview'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Template2 from '../components/Template2';
import { setActiveTab } from '../../store/userSlice';
import { toast } from 'react-toastify';

function Home() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const { 
    personalInfo,
    education,
    experience,
    skills,
    projects,
    customFields,
    languages } = useSelector(
      (state) => state.cv
    );
  const cvData = 
   { personalInfo,
    education,
    experience,
    skills,
    projects,
    customFields,
    languages
  };

  const handleDownload = async () => {
    try {
      const response = await fetch("/server/cv/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cvData),
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("CV gönderilirken hata oluştu!");
      }
  
      const result = await response.json();
      console.log("Başarılı:", result);
  
      if (result.cvId) {
        navigate(`/view/${result.cvId}`);
      }
  
      toast.success("CV başarıyla kaydedildi!");
    } catch (error) {
      toast.error("Hata:", error);
    }
  };
  

const {activeTab}=useSelector(state=>state.user) 
console.log(activeTab)
  return (
    <div className="flex flex-col lg:flex-row relative w-full ">
      <div className="lg:w-1/2 w-full">
        <CvForm />
      </div>
      <div className=" lg:sticky  lg:w-1/2 w-full min-h-screen 
      lg:h-screen space-y-5  border-red-400 p-3
    flex flex-col items-center justify-between
     top-0 right-0 bg-gray-800">

        <div className="max-w-[600px] w-full h-10 flex justify-end ">
          <button
            onClick={handleDownload}
            className=" py-2 px-4 bg-green-600 cursor-pointer text-white rounded font-bold"
          >
            Save CV
          </button>
        </div>
        <div className='max-w-[500px] bg-white  min-h-[630px] w-full   overflow-auto  scrollbar-hide'>
    
       { activeTab==="Template1" &&  <CvPreview  />}
       { activeTab==="Template2" &&  <Template2  />}
  
        </div>

        <div className='flex  space-x-3 border border-white w-full p-3'>
        <button  
        className='border border-white w-full p-3 bg-sky-600 rounded-2xl '
        onClick={()=>dispatch(setActiveTab('Template1'))}>tab1</button>
        <button   
        className='border border-white w-full p-3 bg-sky-600 rounded-2xl'
        onClick={()=>dispatch(setActiveTab('Template2'))}>tab2</button>
        <button   
        className='border border-white w-full p-3 bg-sky-600 rounded-2xl'
        onClick={()=>dispatch(setActiveTab('Template3'))}>tab3</button>
        </div>
      </div>
    </div>
  )
}

export default Home