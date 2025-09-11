import jwt from 'jsonwebtoken';

// Doctor Authentication Middleware

const authDoctor = async (req,res,next) => {
    try {
        const {dtoken} = req.headers;
        
        if(!dtoken){
            return res.json({
                suucess: false,
                message: "Not Authorized Login Again"
            });  
        }

        const token_decode = jwt.verify(dtoken,process.env.JWT_SECRET);
        req.body.docId = token_decode.id
        next();

    } catch (error) {
        console.log(error);
        return res.json({
            suucess: false,
            message: error.message,
        });
    }
}

export default authDoctor;