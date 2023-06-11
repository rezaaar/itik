import util from "util"
import multer from "multer"

const storage = multer.memoryStorage()

var uploadFiles = multer({ storage: storage }).single("file");
var upload = util.promisify(uploadFiles);

export default upload