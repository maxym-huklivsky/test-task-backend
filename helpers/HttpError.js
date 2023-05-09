const errorsMessages = {
  400: 'Bad Request',
  401: 'No Authorized',
  404: 'Not Found',
  409: 'Conflict',
};

function HttpError(status, message = errorsMessages[status]) {
  const error = new Error(message);
  console.log(message);
  error.status = status;
  return error;
}

module.exports = HttpError;
