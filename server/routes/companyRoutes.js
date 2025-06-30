import express from "express"
import { changeJobApplicationStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js"

// import upload from multer
import upload from "../config/multer.js"
import { protectCompany } from "../middleware/authMiddleware.js"

const router = express.Router()

// Register a company :
router.post('/register',upload.single('image') ,registerCompany)

// company login :
router.post('/login',loginCompany)

// get company data :
router.get('/company', protectCompany,getCompanyData)


// post a job :
router.post('/post-job',protectCompany, postJob)

// get applicants data of company :
router.post('/applicants',protectCompany, getCompanyJobApplicants)

// get company job list :
router.get('/list-jobs',protectCompany, getCompanyPostedJobs)

// change application status :
router.post('/change-status',protectCompany, changeJobApplicationStatus)

// change application visibility :
router.post('/change-visiblity',protectCompany, changeVisiblity)

export default router