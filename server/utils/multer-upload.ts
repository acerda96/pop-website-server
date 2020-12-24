import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import crypto from "crypto";
import path from "path";

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    console.log("BEFORE FILE", file);
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        console.log("REQQWE", req);
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "items_images",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({});

export default upload;
