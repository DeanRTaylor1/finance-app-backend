"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom-error");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(errors) {
        super('Invalid request paramaters');
        this.errors = errors;
        this.statusCode = 400;
        //only required when extending a class that is built in to TS
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map((error) => {
            return { message: error.msg, field: error.param };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
