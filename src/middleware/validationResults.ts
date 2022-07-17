import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const results = () => (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(({ msg, param, value }) => ({
        message: msg,
        path: param,
        value
    }));

    if(!errors.isEmpty()){
      return res.status(400).json({
        success: false,
        errors: errors.array()
      })
    }

    next()
}

export default results