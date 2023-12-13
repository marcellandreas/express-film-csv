/* eslint-disable default-param-last */
/* eslint-disable no-empty */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const AuthenticationError = require("../AuthenticationError");
const AuthorizationError = require("../AuthorizationError");
const BadRequestError = require("../badRequestError");
const ClientError = require("../ClientError");
const NotFoundError = require("../notFoundError");
const ServerError = require("../serverError");

const badRequestError = (msg, res) => {
	try {
		throw new BadRequestError(msg);
	} catch (error) {
		if (error instanceof ClientError) {
			return res.status(error.statusCode).send({
				status: "fail",
				message: error.message,
			});
		}
	}
};

const notFoundRequestError = (msg, res) => {
	try {
		throw new NotFoundError(msg);
	} catch (error) {
		if (error instanceof ClientError) {
			return res.status(error.statusCode).send({
				status: "fail",
				message: error.message,
			});
		}
	}
};

const serverError = (msg, res) => {
	try {
		throw new ServerError(msg);
	} catch (error) {
		if (error instanceof ClientError) {
			return res.status(error.statusCode).send({
				status: "fail",
				message: error.message,
			});
		}
	}
};

const authenticationError = (msg, res) => {
	try {
		throw new AuthenticationError(msg);
	} catch (error) {
		if (error instanceof ClientError) {
			return res.status(error.statusCode).send({
				status: "fail",
				message: error.message,
			});
		}
	}
};

const authorizationError = (msg, res) => {
	try {
		throw new AuthorizationError(msg);
	} catch (error) {
		if (error instanceof ClientError) {
			return res.status(error.statusCode).send({
				status: "fail",
				message: error.message,
			});
		}
	}
};

module.exports = {
	badRequestError,
	notFoundRequestError,
	serverError,
	authenticationError,
	authorizationError,
};
