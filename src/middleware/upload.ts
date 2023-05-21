import multer from "multer"
import { format } from "date-fns"

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public")
  },
  filename(req, file, cb) {
    const date = format(new Date(), "ddLLyyyy-HHmmss_SSS")
    cb(null, `${date} - ${file.originalname}`)
  },
})

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export default multer({ storage, fileFilter })
