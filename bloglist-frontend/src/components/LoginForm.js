import PropTypes from "prop-types";
import { TextField, Button, Typography } from "@mui/material";

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        // style={{ display: "flex", flexDirection: "column" }}
        className="blogForm"
      >
        <div>
          <TextField
            label="username"
            onChange={handleUsernameChange}
            style={{ marginBottom: 10 }}
            className="formField"
          ></TextField>
        </div>
        <div>
          <TextField
            type="password"
            label="password"
            onChange={handlePasswordChange}
            style={{ marginBottom: 5 }}
            className="formField"
          ></TextField>
        </div>
        <Button
          id="login-button"
          type="submit"
          variant="contained"
          style={{ marginBottom: "0.5rem" }}
        >
          <Typography variant="bold16">Login</Typography>
        </Button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
};

export default LoginForm;
