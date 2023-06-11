import util from "util"
import multer from "multer"
import { GridFsStorage } from "multer-gridsfs-storage"

const storage = multer.memoryStorage()

// const storage = new GridFsStorage({
//     url: process.env.DB_URL,
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file:(req, file) => {
//         const match = ["image/png", "image/jpeg"];

//         if (match.indexOf(file.mimetype) === -1) {
//             const filename = `${Date.now()}-img-${file.originalname}`;
//             return filename;
//         }

//         return {
//             bucketName: "picture",
//             filename: `${Date.now()}-img-${file.originalname}`
//           };
//     }
// })

var uploadFiles = multer({ storage: storage }).single("file");
var upload = util.promisify(uploadFiles);

export default upload

// import multer from "multer";

// const storage = multer.memoryStorage()

// const upload = multer({storage: storage})