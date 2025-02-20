import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Panel() {


  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector(state => state.user)
  useEffect(() => {
    if (!currentUser || !currentUser._id) return; // Eğer currentUser tanımsızsa fetch çağrısını yapma
  
    const fetchCvData = async () => {
      try {
        const response = await fetch(`/server/cv/get/${currentUser._id}`, {
          method: "GET",
          credentials: "include",
        });
  
        if (!response.ok) {
          toast.error("CV verisi alınırken hata oluştu!");
          return;
        }
  
        const data = await response.json();
        setCvData(data);
      } catch (error) {
        toast.error("CV verisi alınamadı!");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCvData();
  }, [currentUser]); // currentUser değiştiğinde tekrar çalıştır
  

  return (
    <div className='p-5 flex flex-wrap justify-center gap-5'>

  {cvData?.map((cv, i) => (
    <div 
      key={i}
      className="p-6 shadow-md shadow-gray-400 rounded-3xl bg-white
       w-[350px] h-[400px] text-[16px] relative"
    >
      {/* İçerik */}
      <div className=" bg-gray-200 rounded-2xl  space-y-3 p-2">
     <h2 className='text-lg text-center font-bold '> {cv?.personalInfo?.fullName}</h2>
      <h2 className='text-lg text-center font-bold '>{cv?.personalInfo?.jobTitle}</h2>
      <h2 className='text-lg text-center font-bold '>{cv?.personalInfo?.email}</h2>
      <h2 className='text-lg text-center font-bold '>{cv?.personalInfo?.phone}</h2>
      </div>

      {/* Butonlar */}
      <div 
      className=" w-full px-2  absolute left-0 bottom-3
      flex flex-col gap-2">
        <button 
        className="text-white font-bold p-2 w-full bg-purple-700 
        rounded-2xl">
          {cv?.personalInfo?.fullName}
        </button>

        <Link 
          to={`/update-cv/${cv._id}`}
          className="text-white font-bold p-2 w-full bg-sky-700
           rounded-2xl text-center"
        >
          Update
        </Link>
      </div>
    </div>
  ))}
  
</div>

  )
}

export default Panel