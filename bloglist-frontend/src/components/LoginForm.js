import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  // username,
  // password,
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="username"
            onChange={handleUsernameChange}
          ></TextField>
          {/* <input
            value={username}
            id="username"
            placeholder="enter username"
            onChange={handleUsernameChange}
          /> */}
        </div>
        <div>
          <TextField
            label="password"
            onChange={handlePasswordChange}
          ></TextField>

          {/* password
          <input
            type="password"
            id="password"
            placeholder="enter password"
            value={password}
            onChange={handlePasswordChange}
          /> */}
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
  // username: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired,
};

export default LoginForm;
