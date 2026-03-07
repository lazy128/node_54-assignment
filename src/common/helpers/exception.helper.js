import { statusCodes } from "./status-code.helper.js";


export class BadRequestException extends Error {
    code=statusCodes.BAD_REQUEST;
    name="BadRequestException"
    constructor (message="BadRequestException"){
        super(message)

    }
}

//401 log out nguoi dung khong hop le
export class UnauthorizedException extends Error {
    code=statusCodes.UNAUTHORIZED;
    name="UnauthorizedException"
    constructor (message="UnauthorizedException"){
        super(message)

    }
}

//403 refresh token khi goi api refresh-token
export class ForbiddenException extends Error {
    code=statusCodes.FORBIDDEN;
    name="ForbiddenException"
    constructor (message="ForbiddenException"){
        super(message)

    }
}

//404 loi not found
export class NotFoundException extends Error {
    code=statusCodes.NOT_FOUND;
    name="NotFoundException"
    constructor (message="NotFoundException"){
        super(message)

    }
}
new BadRequestException("loi ");
