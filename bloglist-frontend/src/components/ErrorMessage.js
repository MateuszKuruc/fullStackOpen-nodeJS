import { useSelector } from "react-redux";

const ErrorMessage = () => {
  const errorMessage = useSelector((state) => state.errorMessage);
  if (errorMessage === "") {
    return null;
  }

  if (errorMessage !== "") {
    return <div className="error">{errorMessage}</div>;
  }
};

export default ErrorMessage;
