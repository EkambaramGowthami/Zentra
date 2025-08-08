import jwt from "jsonwebtoken";
const SECRETE = (process.env.SECRETE || "defaultsecrete") as string;



export const authmeddleware = async (req,res,next) => {
    const authHeader=req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Token missing or invalid" });
        return;
      }
      const token = authHeader.split(" ")[1];
      try{
        const decode = jwt.verify(token,SECRETE);
        (req as any).user = decode;
        next();
      }
      catch(error){
        res.status(403).json({ message: "Token is invalid or expired" });
      }

}
