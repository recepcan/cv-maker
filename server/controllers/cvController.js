import CV from "../models/cvModel.js";

// ✅ Yeni CV oluştur (Kimlik doğrulama gerekli)
export const createCV = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Kimlik doğrulama başarısız!" });
    }

    const { personalInfo, education, experience, skills, projects, languages } = req.body;

    const newCV = new CV({
      userId: req.user.id, // Kullanıcının ID'sini kaydediyoruz
      personalInfo,
      education,
      experience,
      skills,
      projects,
      languages,
    });

    const savedCV = await newCV.save(); // CV'yi veritabanına kaydet

    // 📌 Kaydedilen CV'nin _id değerini de içeren yanıt döndür
    res.status(201).json({ success: true, cvId: savedCV._id, cv: savedCV });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası!", error });
  }
};


// ✅ Kullanıcının tüm CV'lerini getir
export const getUserCVs = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cvs = await CV.find({ userId });
    res.status(200).json(cvs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası!" });
  }
};

// ✅ Belirli bir CV'yi getir

export const getCVById = async (req, res, next) => {
  try {
    const cvId = req.params.id; // Assuming you are sending the CV ID as a route parameter

    const cv = await CV.findById(cvId); // Find the CV by its ID
    if (!cv) {
      return res.status(404).json({ message: "CV bulunamadı!" });
    }

    res.status(200).json(cv); // Send the found CV as the response
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }
};





// ✅ CV güncelle
export const updateCV = async (req, res) => {
  try {
    const cvId = req.params.id;
    const updatedCV = await CV.findByIdAndUpdate(cvId, req.body, { new: true });
    if (!updatedCV) return res.status(404).json({ message: "CV bulunamadı!" });
    res.status(200).json(updatedCV);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası!" });
  }
};

// ✅ CV sil
export const deleteCV = async (req, res) => {
  try {
    const cvId = req.params.id;
    const deletedCV = await CV.findByIdAndDelete(cvId);
    if (!deletedCV) return res.status(404).json({ message: "CV bulunamadı!" });
    res.status(200).json({ message: "CV başarıyla silindi!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası!" });
  }
};
