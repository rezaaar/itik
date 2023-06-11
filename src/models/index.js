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
    Research: ResearchModel
}

export default Models