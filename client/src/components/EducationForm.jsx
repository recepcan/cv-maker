import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEducation, updateEducation } from '../redux/cvSlice';

const EducationForm = () => {
  const dispatch = useDispatch();

  // Eğitim formu state'i
  const [education, setEducation] = useState({
    school: '',
    degree: '',
    startYear: '',
    endYear: '',
  });

  // Form verisini güncelleme fonksiyonu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducation({ ...education, [name]: value });
  };

  // Eğitim ekleme veya güncelleme işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    if (education.school && education.degree) {
      dispatch(addEducation(education));  // Eğitimi Redux'a ekle
      // Veya eğitim zaten varsa update işlemi yap
      // dispatch(updateEducation(education));
      setEducation({ school: '', degree: '', startYear: '', endYear: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="school" className="block text-sm font-medium text-gray-700">
          Okul Adı
        </label>
        <input
          id="school"
          name="school"
          type="text"
          value={education.school}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
          Derece
        </label>
        <input
          id="degree"
          name="degree"
          type="text"
          value={education.degree}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="startYear" className="block text-sm font-medium text-gray-700">
            Başlangıç Yılı
          </label>
          <input
            id="startYear"
            name="startYear"
            type="number"
            value={education.startYear}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="endYear" className="block text-sm font-medium text-gray-700">
            Bitiş Yılı
          </label>
          <input
            id="endYear"
            name="endYear"
            type="number"
            value={education.endYear}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-md"
      >
        Eğitim Ekle
      </button>
    </form>
  );
};

export default EducationForm;
