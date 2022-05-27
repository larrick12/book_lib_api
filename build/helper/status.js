'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = exports.errorMessage = exports.successMessage = void 0;
const status = {
    success: 200,
    created: 201,
    noContent: 204,
    bad: 400,
    unauthorized: 401,
    notFound: 404,
    conflict: 409,
    error: 500
};
exports.status = status;
const successMessage = {
    status: "success"
};
exports.successMessage = successMessage;
const errorMessage = {
    status: "Error",
    message: ''
};
exports.errorMessage = errorMessage;
//# sourceMappingURL=status.js.map