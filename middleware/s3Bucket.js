import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

aws.config.update({
    secretAccessKey: process.env.secretAccessKey,
    accessKeyId: process.env.accessKeyId,
    region: process.env.s3Region
});

const s3 = new aws.S3();
let maxSize = 5 * 1024 * 1024;
let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'blogbuckte',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        ACL: "public-read",
        metadata: function (req, file, cb) {
            cb(null, {
                fieldName: file.fieldname
            });
        },

        key: function (req, file, cb) {

            cb(null, "Uploads/" + new Date().getTime() + '/' + file.originalname)

        }
    },),
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {

        if (file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/heic"
        ) {
            cb(null, true)
        } else {

            cb(new Error("Only jpg, jpeg and png files are allowed to upload."));

        }
    },

});
let userMediaUpload = function (req, res, next) {
    upload.fields([{
        name: 'media',
        maxCount: 1
    }
    ])(req, res, function (err, some) {
        if (err) {

            return res.status(500).json({ status: false, message: err.message });

        }
        next();
    });
}

const s3Function = {
    userMediaUpload
}
export default s3Function
