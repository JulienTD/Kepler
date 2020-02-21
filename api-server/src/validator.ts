import { Request, Response, NextFunction} from 'express';

const valideToken = process.env.TOKEN || "qwerty";

export const validator = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token === valideToken)
        next();
    else
        res.status(401).json({
            code: "01",
            text: "Invalid Token"
        });
}