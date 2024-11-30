const cloudinary = require("../../config/cloudinary");
const Company = require("../models/Company");

// Crear una nueva compañía con imágenes
const createNewCompany = async (data, images) => {
  try {
    let uploadedImages = [];
    if (images) {
      const uploadPromises = images.map((image) =>
        cloudinary.uploader.upload(image, { folder: "companies" })
      );
      const results = await Promise.all(uploadPromises);
      uploadedImages = results.map((result) => result.secure_url);
    }

    const newCompany = new Company({ ...data, image: uploadedImages });
    const savedCompany = await newCompany.save();
    return savedCompany;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Obtener todas las compañías
const getAllCompanies = async () => {
  try {
    const companies = await Company.find().populate("category");
    return companies;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Actualizar compañía con nuevas imágenes
const updateCompany = async (companyId, data, images) => {
  try {
    let updatedFields = { ...data };

    if (images) {
      const uploadPromises = images.map((image) =>
        cloudinary.uploader.upload(image, { folder: "companies" })
      );
      const results = await Promise.all(uploadPromises);
      updatedFields.image = results.map((result) => result.secure_url);
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      updatedFields,
      { new: true }
    );

    if (!updatedCompany) {
      throw new Error("Company not found");
    }

    return updatedCompany;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Eliminar compañía
const deleteCompany = async (companyId) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(companyId);
    if (!deletedCompany) throw new Error("Company not found");

    return deletedCompany;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createNewCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
};
