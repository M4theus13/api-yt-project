import { verify } from "jsonwebtoken"

const autentication = (req:any, res:any, next:any) => {
    try {
        const decode = verify(req.headers.authorization, 'segredo' )
        req.user = decode
        next()
    } catch(error) {
        return res.status(401).json({message: 'Não autorizado'})
    }
}

export { autentication }