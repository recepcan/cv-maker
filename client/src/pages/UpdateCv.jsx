import React, { useEffect, useState } from 'react'
import Home from './MakeCv'
import CvForm from '../components/CvForm'
import CvPreview from '../components/CvPreview'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setActiveTab } from '../../store/userSlice'
import Template2 from '../components/Template2'
import { setCvData } from '../../store/cvSlice'
function UpdateCv() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
const {activeTab}=useSelector(state=>state.user) 

  const cvId = useParams()
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
          toast.error('CV verisi alınırken hata oluştu!');
          
        }

        const data = await response.json();
        setCvData(data); // CV verisini state'e ata
        dispatch(setCvData(data));
        setLoading(false); // Yükleme bitti
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
    };

    fetchCvData(); // Veriyi çek
  }, [cvId]);

  const { 
    cvTitle,
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
     { 
      cvTitle,
      personalInfo,
      education,
      experience,
      skills,
      projects,
      customFields,
      languages
    };

  const handleUpdate =async()=>{
  
    try {
      const response = await fetch(`/server/cv/update/${cvId.cvId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cvData),
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("CV güncellenirken hata oluştu!");
      }
  
      const result = await response.json();
     toast.success("CV başarıyla güncellendi:", result);
    //  navigate(`/view/${cvId.cvId}`)
      return result; // Güncellenmiş CV'yi döndür
    } catch (error) {
      toast.error("Güncelleme hatası:", error);
      return null;
    }
  
}

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>loading</div>;
  }

  

  return (
    <div className="flex flex-col lg:flex-row relative w-full ">
      <div className="lg:w-1/2 w-full">
        <CvForm  />
      </div>
      <div className=" lg:sticky lg:w-1/2 w-full min-h-screen lg:h-screen space-y-5  border-red-400 p-3
    flex flex-col items-center 
     top-0 right-0 bg-gray-800">

        <div className="max-w-[600px] w-full h-10 flex justify-end ">
          <button
            onClick={handleUpdate}
            className=" py-2 px-4 bg-blue-500 cursor-pointer text-white rounded font-bold"
          >
            Update CV
          </button>
        </div>
        <div className='max-w-[500px] bg-white w-full overflow-auto'>
    
       { activeTab==="Template1" &&  <CvPreview  />}
       { activeTab==="Template2" &&  <Template2  />}
  
        </div>

        <div className='flex space-x-3  border-white w-full p-3'>
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

export default UpdateCv