import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="username"
            onChange={handleUsernameChange}
            style={{ marginBottom: 10 }}
          ></TextField>
        </div>
        <div>
          <TextField
            label="password"
            onChange={handlePasswordChange}
          ></TextField>
        </div>
        <Button id="login-button" type="submit" variant="contained">
          login
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
