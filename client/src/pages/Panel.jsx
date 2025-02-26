import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {FaPlus} from 'react-icons/fa'
import { resetCv } from '../../store/cvSlice';
import { RiDeleteBin6Line } from "react-icons/ri";
import { signoutSuccess } from '../../store/userSlice';

function Panel() {
const dispatch=useDispatch()
const navigate=useNavigate()
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector(state => state.user)
const [profileMenu, setProfileMenu] = useState(false)
const [go, setgo] = useState(false)

  useEffect(() => {
    // Eğer currentUser tanımsızsa fetch çağrısını yapma
  
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
  
  const goMakeCv = () => {
    dispatch(resetCv()); // CV verisini sıfırla
    navigate('/make-cv'); // Yönlendir
  };

  const handleDelete = async (cvId) => {
    const confirmDelete = window.confirm("Bu CV'yi silmek istediğinizden emin misiniz?");
    if (!confirmDelete) return; // Kullanıcı iptal ederse hiçbir şey yapma
  
    try {
      const response = await fetch(`/server/cv/delete/${cvId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Bir hata oluştu");
      }
  
      toast.success("CV başarıyla silindi!");
  
      // Başarıyla silinen CV'yi state'ten çıkar
      setCvData((prev) => prev.filter((cv) => cv._id !== cvId));
  
    } catch (error) {
      console.error("CV silinemedi:", error.message);
      toast.error(error.message);
    }
  };

  const handleSignOut =async()=>{
    try {
     const res= await fetch('/server/user/signout', {
      method: "POST",
      credentials: "include",
    })
   if(res.ok){
    toast.success('Çıkış Yapıldı')
    dispatch(signoutSuccess())
    
    
   }

    } catch (error) {
      toast.error(error)
    }
  } 
  console.log(currentUser)
  
  return (
    <div className=' flex flex-wrap justify-center gap-5'>
<header className='w-full  sticky top-0 left-0 flex items-center justify-between bg-gray-200 h-16 p-4'>

<div className='w-10 h-10 bg-gray-400 flex space-x-1 items-center rounded-full border  z-50' 
onClick={()=>setProfileMenu(!profileMenu)}    
>
<img src={currentUser.profilePicture}
alt=""
className='w-full h-full rounded-full' />
<div>@{currentUser.username}</div>
</div>
{
  profileMenu && (
    <div className={`${profileMenu ? 'bg-white p-5  absolute  top-16 left-2 shadow-md shadow-gray-400 rounded-lg  z-50' : 'hidden z-50'}`}>
    <div>{currentUser.username}</div>
    <div>{currentUser.email}</div>
  <button 
  onClick={handleSignOut}
  className='bg-red-600 text-white p-2 rounded-lg'>
  Çıkış Yap
  </button>
  
    </div>)
  
  }

</header>

<div>
<button 
onClick={goMakeCv}
className='bg-gray-100 cursor-pointer w-[300px] h-[300px] flex items-center justify-center 
text-9xl shadow-md shadow-gray-400 rounded-2xl'>
<FaPlus  className=' text-gray-400'/>
</button>
</div>
  {cvData?.map((cv, i) => (
    <div 
      key={i}
      className="p-6 shadow-md shadow-gray-400 rounded-lg bg-white
       w-[300px] h-[300px] text-[16px] relative z-10"
    >
      {/* İçerik */}
      <div className=" bg-gray-200 rounded-2xl  space-y-3 p-2 ">
     <h2 className='text-sm text-center font-bold text-wrap'> {cv?.personalInfo?.fullName} </h2>
      <h2 className='text-sm text-center font-bold text-wrap'>{cv?.personalInfo?.jobTitle}</h2>
      <h2 className='text-sm text-center font-bold text-wrap'>{cv?.personalInfo?.email}</h2>
      <h2 className='text-sm text-center font-bold text-wrap'>{cv?.personalInfo?.phone}</h2>
      </div>

      <button 
       onClick={() => handleDelete(cv._id)}
      className='p-1 cursor-pointer rounded bg-red-500 text-white  absolute z-10 top-0 right-0'>
      <RiDeleteBin6Line />
      </button>
      
      {/* Butonlar */}
      <div 
      className=" w-full px-2  absolute z-10 left-0 bottom-3
      flex flex-col  gap-2">
      
      <button className='w-full p-2 bg-purple-600 text-white font-bold border rounded-2xl'>
      {cv?.cvTitle}
      </button>

        <div className='flex w-full gap-2'>
        <Link 
         to={`/view/${cv._id}`}
        className="text-white font-bold p-2 w-full bg-green-700 
        rounded-2xl text-center">
         Download
        </Link>

        <Link 
          to={`/update-cv/${cv._id}`}
          className="text-white font-bold p-2 w-full bg-blue-500
           rounded-2xl text-center"
        >
          Update
        </Link>
        </div>

        
      </div>
    </div>
  ))}
  
</div>

  )
}

export default Panel