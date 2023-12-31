import PropTypes from "prop-types";
import { TextField, Button, Typography } from "@mui/material";
import { CircleLoader } from "react-spinners";

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
            label="Username"
            onChange={handleUsernameChange}
            style={{ marginBottom: 10 }}
            className="formField"
          ></TextField>
        </div>
        <div>
          <TextField
            type="password"
            label="Password"
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
          {loading ? (
            <>
              <Typography variant="bold16" style={{ marginRight: "0.5rem" }}>
                Login
              </Typography>
              <CircleLoader
                color="red"
                loading={loading}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </>
          ) : (
            <Typography variant="bold16">Login</Typography>
          )}
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
