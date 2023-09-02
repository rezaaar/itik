// import Models from "../models/index.js";
// import multer from "multer";


// const Image = Models.Image

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null,'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// const upload = multer({storage: storage})

// const ImageController = {
//     upload: async(req,res) => {
//         try {
//             upload.single('image')            
//         } catch (error) {

//         }
//     },

//     getAll: async(req,res) => {
//         try {
//             const data = await Image.find()
//             res.status(200).json(data.render('imagepage', {items: data}))
//         } catch (error) {
//             res.status(400).json({message: error})
//         }
//     }
// }

// export default ImageController

import fs from 'fs'
import mv from 'mv'
import { google } from 'googleapis';
import Models from "../models/index.js";
import path from 'path';
import { fileURLToPath } from 'url';

// dotenv.config()

const Image = Models.Image

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const PartialDriveFile = {
    id: '',
    name: '',
};

const SearchResultResponse = {
    kind: 'drive#fileList',
    nextPageToken: '',
    incompleteSearch: false,
    files: [PartialDriveFile],
};

class GoogleDriveService {
    constructor(clientId, clientSecret, redirectUri, refreshToken) {
        this.driveClient = this.createDriveClient(clientId, clientSecret, redirectUri, refreshToken);
    }

    createDriveClient(clientId, clientSecret, redirectUri, refreshToken) {
        const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

        client.setCredentials({ refresh_token: refreshToken });

        return google.drive({
            version: 'v3',
            auth: client,
        });
    }

    createFolder(folderName) {
        return this.driveClient.files.create({
            resource: {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
            },
            fields: 'id, name',
        });
    }

    searchFolder(folderName) {
        return new Promise((resolve, reject) => {
            this.driveClient.files.list(
                {
                    q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
                    fields: 'files(id, name)',
                },
                (err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res.data.files ? res.data.files[0] : null);
                },
            );
        });
    }

    saveFile(fileName, filePath, fileMimeType, folderId) {
        return this.driveClient.files.create({
            requestBody: {
                name: fileName,
                mimeType: fileMimeType,
                parents: folderId ? [folderId] : [],
            },
            media: {
                mimeType: fileMimeType,
                body: fs.createReadStream(filePath),
            },
        });
    }
}

const driveClientId = '540632161994-2fhcdvfp2gjrnkpjt4ja4kkv75dn3b72.apps.googleusercontent.com';
const driveClientSecret = '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';
const driveRedirectUri = 'https://developers.google.com/oauthplayground';
const driveRefreshToken = '1//04K-WaV6cJs26CgYIARAAGAQSNgF-L9IrZTvjaCZICgQzBY8Uw1B3MDK0Lqk2Pv292UexEhRkFAs91ma_rHIezK1hZfaD-KjrsQ';


const googleDriveService = new GoogleDriveService(driveClientId, driveClientSecret, driveRedirectUri, driveRefreshToken);
const folderName = 'Itik'

const ImageController = {
    uploadDrive: async (req, res) => {
        const image = await req.files.file

        if (!image) return res.status(400).json({message: "no files"})

        
        const fileName = image.name
        const finalPath = path.resolve(__dirname, "../../public/" + fileName)

        image.mv(__dirname + '/../../public/' + fileName);

        try {
            const folder = await googleDriveService.searchFolder(folderName).catch((error) => {
                console.error(error);
                return null;
              });

            if(!folder) {
                folder = googleDriveService.createFolder(folderName)
            }
            const file = await googleDriveService.saveFile(fileName, finalPath, image.mimeType, folder.id)

            const data = new Image({
                name: fileName,
                image_id: file.data.id,
                mimeType: file.data.mimeType
            })

            const newData = await data.save()

            fs.unlinkSync(finalPath)

            res.status(200).json({message: "success", "data": newData})
        } catch (error) {
            res.status(400).json({message:error})
        }
    },

    uploadBase64 : async (req, res) => {
        const image = await req.files.file

        if (!image) return res.status(400).json({message: "no files"})

        const data = new Image({
            name: image.name,
            img: {
                data: Buffer.from(image.data, "base64").toString(),
                contentType: image.mimetype
            }
        })

        try {
            // const newData = await data.save()
            const file = Buffer.from(image.data, "base64").toString()

            const fileBase64 = Buffer.from(file, "utf-8").toString("base64")
            res.status(200).json({"base64": fileBase64, "string": file})
        } catch (error) {
            res.status(400).json({message:error})
        }
    },

    getImageBase64: async (req,res) => {
        try {
            const data = await Image.find()
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({message: error})
        }
    },

    getAll: async (req, res) => {
        try {
            const data = await Image.find()
            res.status(200).json(data.render('imagepage', { items: data }))
        } catch (error) {
            res.status(400).json({ message: error })
        }
    }
}

export default ImageController
