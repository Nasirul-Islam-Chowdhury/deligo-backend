import multer from "multer"
import path from "path"
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary';
import config from "../config";
import { ICloudinaryResponse, IFile } from "../interfaces/file";


          
cloudinary.config({ 
  cloud_name: config.cloud_name, 
  api_key: config.api_key, 
  api_secret: config.api_secret 
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const uploadToCloudinary = async (file: IFile):Promise<ICloudinaryResponse | undefined> => {
    return new Promise((resolve, reject) => {
        // Check if file exists before attempting upload
        if (!fs.existsSync(file.path)) {
            reject(new Error(`File not found: ${file.path}`))
            return
        }

        cloudinary.uploader.upload(file.path,
            (error: Error, result:ICloudinaryResponse) => {
                // Only delete the file if it exists
                try {
                    if (fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path)
                    }
                } catch (deleteError) {
                    console.log('Warning: Could not delete temporary file:', file.path)
                }
                
                if (error) {
                    reject(error)
                }
                else {
                    resolve(result)
                }
            })
    })
};

export const fileUploader = {
    upload,
    uploadToCloudinary
}