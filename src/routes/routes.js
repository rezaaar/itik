import express from "express";
import Controller from "../controllers/index.js";
import verifyCreateUser from "../middleware/verifyCreateUser.js";
import authJWT from "../middleware/authJwt.js";
import upload from "../utils/upload.js";

 
const router = express.Router()

//Menu Route
router.get('/menu', Controller.Menu.getAll)
router.post('/menu', Controller.Menu.post)
router.put('/menu/:id', Controller.Menu.update)
router.get('/menu/menu-:title', Controller.Menu.getMenuDetail)
router.get('/menu/:id', Controller.Menu.getOne)
router.delete('/menu/:id', Controller.Menu.delete)

//User Route
router.get('/user', Controller.User.getAll)
router.get('/user/role', Controller.User.getRole)
router.put('/user/:id', Controller.User.update)
router.get('/user/:id', Controller.User.getOne)
router.delete('/user/:id', Controller.User.delete)

//LabRoute
router.get('/lab', Controller.Lab.getAll)
router.post('/lab', Controller.Lab.post)
router.put('/lab/:id', Controller.Lab.update)
router.get('/lab/:id', Controller.Lab.getOne)

//research-group route
router.get("/research-group",Controller.ResearchGroup.getAll);
router.get("/research-group/:id", Controller.ResearchGroup.getOne)
router.post("/research-group",Controller.ResearchGroup.post);
router.put("/research-group/:id",Controller.ResearchGroup.update);

//research route
router.get('/research', Controller.Research.getAll)
router.get('/research/rg-:rgid', Controller.Research.getByRG)
router.get('/research/:id', Controller.Research.getOne)
router.put('/research/:id', Controller.Research.update)
router.post('/research', Controller.Research.post)

//dosen route
router.get("/dosen", Controller.Dosen.getAll)

//prestasi route
router.get("/prestasi", Controller.Prestasi.getAll)
router.get("/prestasi/statistic", Controller.Prestasi.getStatistic)
router.get("/prestasi/:id", Controller.Prestasi.getOne)
router.post("/prestasi", Controller.Prestasi.post)
router.put("/prestasi/:id", Controller.Prestasi.update)
router.delete("/prestasi/:id", Controller.Prestasi.delete)

//Prodi Route
router.get('/prodi', Controller.Prodi.getAll)
router.get('/prodi/list', Controller.Prodi.getList)
router.get('/prodi/:id', Controller.Prodi.getOne)
router.post('/prodi', Controller.Prodi.post)
router.put('/prodi/:id', Controller.Prodi.update)


//Article Route
router.get('/article', Controller.Article.getAll)
router.get('/article/limit/:count', Controller.Article.getSomeArticle)
router.post('/article', Controller.Article.post)
router.put('/article/:id', Controller.Article.update)
router.get('/article/:id', Controller.Article.getOne)

//scrape
router.get('/scrape-article', Controller.ScrapingArticle.scrapingArticle)
// router.get('/article-scrape', Controller.ScrapingArticle.getPaginateArticle)

//kurikulum
router.get('/kurikulum', Controller.Kurikulum.getAll)
router.get('/kurikulum/detail', Controller.Kurikulum.getDetail)
router.get('/kurikulum/detail-prodi', Controller.Kurikulum.getProdiKurikulum)
router.get('/kurikulum/detail-semester', Controller.Kurikulum.getEachSemester)
// router.get('/kurikulum/:', Controller.Kurikulum.getProdiKurikulum)

//AUTH Route
router.post('/auth/createUser', verifyCreateUser.checkDuplicateUsernameOrEmail, Controller.Auth.signup)
router.post('/auth/signin', Controller.Auth.signin)

//test Authorization route
router.get('/test/all', Controller.User.allAccess)
router.get('/test/admin', [authJWT.verifyToken], authJWT.isAdmin, Controller.User.adminAccess)
router.get('/test/mahasiswa', [authJWT.verifyToken, authJWT.isMahasiswa], Controller.User.mahasiswaAccess)
router.get('/test/dosen', [authJWT.verifyToken, authJWT.isDosen], Controller.User.dosenAccess)

router.put('/profile/:id', upload, Controller.Profile.updateProfile)
router.get('/profile/:id', Controller.Profile.getProfile)

export default router