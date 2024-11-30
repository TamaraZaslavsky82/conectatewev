const {
  createNewCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
} = require("../controllers/CompanyController");

// Obtener todas las compañías
const getCompaniesHandler = async (req, res) => {
  try {
    const companies = await getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Crear nueva compañía
const postCompanyHandler = async (req, res) => {
  try {
    const data = req.body;
    const images = req.files?.map((file) => file.path); // Archivos subidos con Multer

    const newCompany = await createNewCompany(data, images);
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar compañía
const putCompanyHandler = async (req, res) => {
  try {
    const { companyId } = req.params;
    const data = req.body;
    const images = req.files?.map((file) => file.path);

    const updatedCompany = await updateCompany(companyId, data, images);
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar compañía
const deleteCompanyHandler = async (req, res) => {
  try {
    const { companyId } = req.params;

    const deletedCompany = await deleteCompany(companyId);
    res.status(200).json(deletedCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCompaniesHandler,
  postCompanyHandler,
  putCompanyHandler,
  deleteCompanyHandler,
};
