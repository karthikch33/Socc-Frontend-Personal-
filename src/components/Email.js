


/*
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const store = multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,path.join(__dirname + "photos/images"))
        },
        filename:function(req,file,cb){
            const unqname = Date.now() + '-' + Math.round(Math.random() * 1e9)
            cb(null,file.fieldname + '-' + unqname + '-' + '.jpeg')
        }
    })

    const filter = (req,file,cb)=>{
        if(file.mimetype.startsWith('images')) cb(null,true)
        cb({
            message:Unsupported File
        })
    }



    const upload = multer({
        storage:store,
        filter:filterimage,
        limits:{fieldSize:20000}
    })

    const fileresize = (req,res,next){
        if(!req.files) next()
        await Promise.all(
            req.files.map((file)=>{
                await sharp(file.filename).resize(300,300).toFormat('jpeg').jpeg({quality:90}).toFile(`photos/images/${file.filename}`)
            })
        )
    }

    ProductA.methods.charChange = async function(req,res,next){
        const randomcode = crypto.randomBytes(256).toString('hex')
        this.refreshToken = crypto.createHash('sha256').update(randomcode).digest('hex')
    }

    const sentmail = (req,res,next)=>{
        const {token} = req.params 
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:"Karthik",
                pass:"Karthikch33"
            }
        })
        const options = {
            from:"karthikch440@gmail.com",
            to:"londonmumbai123@gmail.com",
            subject:"Sending Hi",,
            html:<></>
        }
        transporter.generate(options)
        .then(()=>{
            log("Completed Successfully")
        })
        .catch((error)=>{
            log(error)
        })
    }

    const counter = await ProductA.countDocuments()
    const delete = await ProductA.deleteMany({})

    const checkuser = (req,res,next)=>{
        const {userid} = req.body
        const findUser = await User.findOne({_id:userid}).populate()

    }


    keep on thing in mind when you are traceing the object that is inside the array then :
        const findUser = await Product.findOne({
            'Attended':{
                $elemMatch:{
                    'EventReg':"Introduction to Coding"
                }
            }
        })

*/