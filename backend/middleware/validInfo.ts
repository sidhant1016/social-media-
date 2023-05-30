import { NextFunction,Request,Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
    const { email, name, password } = req.body;

    function validEmail(userEmail:any) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    } 

    if(req.path === "/register") {

        if(! [email, name, password].every(Boolean)) {
            return res.status(401).json('One or more fields are missing');
        } else if(!validEmail(email)) {
            return res.status(401).json('Email invalid');
        }
    } else if(req.path === "/login") {

        if(![email, password].every(Boolean)) {
            return res.status(401).json('Missing info');
        } else if(!validEmail(email)) {
            return res.status(401).json('Email invalid');
        }
    }

    next();
}
