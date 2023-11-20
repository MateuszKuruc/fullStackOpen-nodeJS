import { useSelector } from "react-redux";
import { Alert, Typography } from "@mui/material";

const ErrorMessage = () => {
  const errorMessage = useSelector((state) => state.errorMessage);
  if (errorMessage === "") {
    return null;
  }

  if (errorMessage !== "") {
    return (
      <div style={{ marginBottom: "1rem" }}>
        <Alert severity="error">
          <Typography variant="body2">{errorMessage}</Typography>
        </Alert>
      </div>
    );
  }
};

export default ErrorMessage;
