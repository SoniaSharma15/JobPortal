import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { deleteCompany, getCompany, getCompanyByid, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router=express.Router();
router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyByid);
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany);
router.route("/delete/:id").delete(isAuthenticated,deleteCompany);

export default router;