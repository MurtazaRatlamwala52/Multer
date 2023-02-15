const express = require('express')
const ejs =  require('ejs')
const multer = require('multer')
const path = require('path')
var msg = 'naj hfesifh  ' 

const app = express()
app.use(express.json())

app.set('view engine', 'ejs')

app.use(express.static('./public'))

const storage = multer.diskStorage({
    destination: './public',
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({
    storage: storage,
    limits: {fileSize: 100000000000},
    fileFilter : (req, file, cb)=>{
        const filetypes = /jpg|png|jpeg|gif/
        const extname = filetypes.test(path.extname(file.originalname));
        const mimetype = filetypes.test(file.mimetype)
        if(extname && mimetype) {
             cb(null, true)
        }else{
            cb('Error only Images required')
        }
    }
}).single('myImage');

app.get('/', (req,res) => { res.render('index') 
})

app.post('/upload', (req,res)=>{
    upload(req, res, (err)=>{
        if(err){
            console.log(err)
            res.render('index',{
                msg: err
            })
        }else{
            if(req.file == undefined ){
                res.render('index', {
                    msg: 'No File Selected' 
                })
            }else{
                console.log(req.file)
            res.render('index', {
                msg: 'File uploaded',
                file: `/${req.file.filename}`
            })
            }
        }
        })
    })

app.listen(5253, ()=> console.log('Server Running on post 5253'))  