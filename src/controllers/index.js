import MenuController from "./Menu.controller.js"
import UserController from "./User.controller.js"
import AuthController from "./Auth.controller.js"
import ProfileController from "./Profile.controller.js"
import ArticleController from "./Article.controller.js"
import LabController from "./Lab.controller.js"
import ProdiController from "./Prodi.controller.js"

const Controller = {
    Menu: MenuController,
    User: UserController,
    Auth: AuthController,
    Profile: ProfileController,
    Article: ArticleController,
    Lab: LabController,
    Prodi: ProdiController
}

export default Controller