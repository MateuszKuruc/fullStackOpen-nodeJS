import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Message = () => {
  const message = useSelector((state) => state.message);

  if (message === "") {
    return null;
  }

  if (message !== null) {
    return (
      <div>
        <Alert severity="success">{message}</Alert>
      </div>
    );
  }
};

export default Message;
