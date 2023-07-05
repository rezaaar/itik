import MenuModel from "./Menu.model.js"
import UserModel from "./User.model.js"
import RoleModel from "./Role.model.js"
import ArticleModel from "./Article.model.js"
import ContentModel from "./Content.model.js"
import DosenModel from "./Dosen.model.js"
import KurikulumModel from "./Kurikulum.model.js"
import LabModel from "./Lab.model.js"
import ProdiModel from "./Prodi.model.js"
import ResearchModel from "./Research.model.js"
import ResearchGroupModel from "./ResearchGroup.model.js"
import PrestasiModel from "./Prestasi.model.js"
import ArticleScrapeModel from "./ArticleScrape.js"
import ImageModel from "./Image.model.js"



const Models = {
    Menu: MenuModel,
    User: UserModel,
    Role: RoleModel,
    Article: ArticleModel,
    Content: ContentModel,
    Dosen: DosenModel,
    Kurikulum: KurikulumModel,
    Lab: LabModel,
    Prodi: ProdiModel,
    Research: ResearchModel,
    ResearchGroup: ResearchGroupModel,
    Prestasi: PrestasiModel,
    ArticleScrape: ArticleScrapeModel,
    Image: ImageModel
}

export default Models