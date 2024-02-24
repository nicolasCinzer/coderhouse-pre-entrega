import multer, { diskStorage } from 'multer'

const storage = diskStorage({
  destination: (req, file, cb) => {
    let fieldname = file.fieldname

    if (['id', 'bank', 'address'].includes(fieldname)) fieldname = 'documents'

    const dir = `${process.cwd()}/docs/${fieldname}`

    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const { id } = req.user

    const filename = `${Date.now()}-${Math.round(Math.random() * 10000)}-oid-${id}-${file.fieldname}-${file.originalname}`

    cb(null, filename)
  }
})

export const upload = multer({ storage })
