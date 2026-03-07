import { responseError } from "./response.helper.js";



export const appError = (err,req,res,next) => {
    console.log ("middleware special got bug",err);


    console.log({
        cause:err?.cause,
        message:err?.message,
        name:err?.name,
        stack:err?.stack,
        code:err?.code,

    }  );
    const response =responseError(err?.message,err?.code,err?.stack);
    res.status(response.statusCode).json(response);
};