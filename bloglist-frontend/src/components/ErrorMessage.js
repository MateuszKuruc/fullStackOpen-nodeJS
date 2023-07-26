const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null;
  }

  if (message !== null) {
    return <div className="error">{message}</div>;
  }
};

export default ErrorMessage;
