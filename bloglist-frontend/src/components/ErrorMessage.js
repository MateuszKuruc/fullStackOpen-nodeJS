const errorMessage = ({ error }) => {
  if (error === null) {
    return null;
  }

  if (error !== null) {
    return <div className="error">{error}</div>;
  }
};

export default errorMessage;
