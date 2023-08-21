import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const ErrorMessage = () => {
  const errorMessage = useSelector((state) => state.errorMessage);
  if (errorMessage === "") {
    return null;
  }

  if (errorMessage !== "") {
    return (
      <div>
        <Alert severity="error">{errorMessage}</Alert>
      </div>
    );
  }
};

export default ErrorMessage;
