import authJWT from "./authJwt.js";
import verifyCreateUser from "./verifyCreateUser.js";

const middleware = {
    authJWT,
    verifyCreateUser
}

export default middleware
