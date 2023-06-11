import jwt from "jsonwebtoken";
import Models from "../models/index.js";

const authJWT = {
    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers["x-access-token"];

            if (!token) return res.status(403).json({ message: "No token provided" });

            jwt.verify(token, process.env.JWT_SECRET, (decoded) => {
                req.userId = decoded.id;
                next();
              });
              
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    },

    isAdmin: async (req, res, next) => {
        const user = await Models.User.findById(req.userId);
        const roles = await Models.Role.find({ _id: { $in: user.role } });

            if (roles.name === "admin") {
                next();
                return;
            }

        return res.status(403).json({ message: "Require Admin Role!" });
    },

    isMahasiswa: async (req, res, next) => {
        const user = await Models.User.findById(req.userId);
        const roles = await Models.Role.find({ _id: { $in: user.role } });

            if (roles.name === "mahasiswa") {
                next();
                return;
            }

        return res.status(403).json({ message: "Require Mahasiswa Role!" });
    },

    isDosen: async (req, res, next) => {
        const user = await Models.User.findById(req.userId);
        const roles = await Models.Role.find({ _id: { $in: user.role } });

            if (roles.name === "dosen") {
                next();
                return;
            }

        return res.status(403).json({ message: "Require Dosen Role!" });
    }
}

export default authJWT