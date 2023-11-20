import { useSelector } from "react-redux";
import { Alert, Typography } from "@mui/material";

const Message = () => {
  const message = useSelector((state) => state.message);

  if (message === "") {
    return null;
  }

  if (message !== null) {
    return (
      <div style={{ marginBottom: "1rem" }}>
        <Alert severity="success">
          <Typography variant="body2">{message}</Typography>
        </Alert>
      </div>
    );
  }
};

export default Message;
