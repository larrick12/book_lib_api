'use strict'


const status = {
    success: 200,
    created: 201,
    noContent: 204,
    bad: 400,
    unauthorized: 401,
    notFound: 404,
    conflict: 409,
    error: 500
}

const successMessage = {
    status: "success"
};

const errorMessage = {
    status: "Error",
    message: ''
}

export {
    successMessage,
    errorMessage,
    status
}