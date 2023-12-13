/* eslint-disable consistent-return */
// const ClientError = require("../exceptions/ClientError");
const AuthorizationError = require("../exceptions/AuthorizationError");
const BadRequestError = require("../exceptions/badRequestError");
const {
	badRequestError,
	serverError,
	authorizationError,
	notFoundRequestError,
} = require("../exceptions/handler/responseHandler");
const NotFoundError = require("../exceptions/notFoundError");
const userModels = require("../models/Auth");

exports.checkRole = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const result = await userModels.getRole(username, password);

		req.body = result

		next()
	} catch (error) {

		console.log(error)
		if (error instanceof AuthorizationError) {
			return authorizationError(error.message, res);
		}

		if (error instanceof NotFoundError) {
			return notFoundRequestError(error.message, res);
		}
		return serverError("maaf terjadi kesalahan pada server kami", res);
	}
};




