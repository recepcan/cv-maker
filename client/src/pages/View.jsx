import React, { useEffect, useRef, useState } from 'react'
import { removeSkill, selectCvData } from '../../store/cvSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CvPreview from '../components/CvPreview';
import Template2 from '../components/Template2';

function View() {
   
      const dispatch = useDispatch();
      const cvPreviewRef = useRef(null);

      const cvId = useParams()
      const [cvData, setCvData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const { currentUser } = useSelector(state => state.user)
      useEffect(() => {
        // Veriyi backend'den al
        const fetchCvData = async () => {
          try {
            const response = await fetch(`/server/cv/${cvId.cvId}`, {
              method: 'GET',
              credentials: 'include', // Token'ı cookie'den alarak göndermek
            });
    
            if (!response.ok) {
              throw new Error('CV verisi alınırken hata oluştu!');
            }
    
            const data = await response.json();
            setCvData(data); // CV verisini state'e ata
            setLoading(false); // Yükleme bitti
          } catch (error) {
            console.log(error)
            setLoading(false);
          }
        };
    
        fetchCvData(); // Veriyi çek
      }, [cvId]);


    // PDF oluşturma fonksiyonu
const handleDownload=()=>{
    window.print()
}


const handleSubmit = async (e) => {
  
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
    alert("CV başarıyla kaydedildi!");
  } catch (error) {
    console.error("Hata:", error);
  
  }
};
    
const {activeTab}=useSelector(state=>state.user) 

  return (
   <div className='flex flex-col items-center justify-center bg-white w-full p-2'>
   <div id='no-print' className='flex w-full lg:w-[794px] justify-center'>
   <button 
   
   className='px-5 py-3 bg-blue-500  text-white cursor-pointer font-extrabold rounded-3xl '
   onClick={handleDownload}>
   Download
   </button>
   
   </div>
  <div className='w-full lg:w-[794px] '>
  
  { activeTab==="Template1" &&  <CvPreview cvData={cvData} />}
  { activeTab==="Template2" &&  <Template2 cvData={cvData} />}

  </div>
   </div>
  )
}

export default View