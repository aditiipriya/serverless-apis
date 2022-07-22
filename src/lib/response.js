const responseData = ({ statusCode, message, data }) => {
	return {
		statusCode: statusCode,
		headers: {
			"Access-Control-Allow-Origin": process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
			"Access-Control-Allow-Credentials": true,
		},
		body: JSON.stringify({ message: message, data: data  }),
	};
};

module.exports.responseHandler = responseData;
