// const errorHandler = (err, req, res, next) => {

//     const statusCode = res.statusCode ? res.statusCode : 500
//     res.status(statusCode)

//     res.json({
//         message: err.message,
//         stack: process.env.NODE_ENV === "development" ? err.stack : null
//     })
// };

const handleError = (err, req, res) => {
	if (err) {
		return res.status(400).json({
			error: getErrorMessage(err)
		});
	}
};
const getErrorMessage= (errMsg) => {
	console.error(errMsg);
}

export default  {
	handleError: handleError,
	getErrorMessage:getErrorMessage
};
