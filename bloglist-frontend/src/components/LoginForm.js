import PropTypes from "prop-types";
import { TextField, Button, Typography } from "@mui/material";

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  loading,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="blogForm">
        {loading && (
          <div className="loadingLogin">
            <Typography color="red" variant="body3">
              First login may take 1-2 minutes before server is running. Please
              wait and reload page if needed - it will work!
            </Typography>
          </div>
        )}
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
          disabled={loading ? true : false}
          style={{ marginBottom: "0.5rem", width: "250px" }}
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
