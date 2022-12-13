const jwt = require("jsonwebtoken")

const tokenMiddleware = (req,res,next) =>{
    try{
        const {authorization} = req.headers
        //console.log(authorization)
        const token  = authorization.split(" ")[1]
        // console.log(token)
        if(token){
            const {_id} = jwt.verify(token,process.env.SECRET)
            // console.log(_id,1)
            next()
        }
    }catch(error){
        res.status(400).json({error:error.message})
    }

}


module.exports = tokenMiddleware