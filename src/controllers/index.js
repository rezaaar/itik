import MenuController from "./Menu.controller.js"
import UserController from "./User.controller.js"
import AuthController from "./Auth.controller.js"
import ProfileController from "./Profile.controller.js"
import ArticleController from "./Article.controller.js"
import ResearchGroupController from "./ResearchGroup.controller.js"
import ProdiController from "./Prodi.controller.js"
import LabController from "./Lab.controller.js"
import DosenController from "./Dosen.controller.js"
import PrestasiController from "./Prestasi.controller.js"
import ResearchController from "./research.controller.js"
import KurikulumController from "./Kurikulum.controller.js"
import ImageController from "./Image.controller.js"

import ScrapingArticleController from "./ScrapingArticle.controller.js"


const Controller = {
    Menu: MenuController,
    User: UserController,
    Auth: AuthController,
    Profile: ProfileController,
    Article: ArticleController,
    ResearchGroup: ResearchGroupController,
    Prodi: ProdiController,
    Lab: LabController,
    Dosen: DosenController,
    Prestasi: PrestasiController,
    Research: ResearchController,
    ScrapingArticle: ScrapingArticleController,
    Kurikulum: KurikulumController,
    Image: ImageController
}

export default Controller