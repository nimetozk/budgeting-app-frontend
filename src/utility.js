export const errorToString = (error) => {
  let message = "";

  if (error.response && error.response.data) {
    message = error.response.data;
    return message;
  }

  if (error instanceof Error && error.message) {
    message += error.message;
  }

  if (error instanceof Error && error.stack) {
    message += ` | stack: ${error.stack}`;
  }

  if (message === "") return error;
  return message;
};
