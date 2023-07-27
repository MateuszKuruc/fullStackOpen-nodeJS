import ErrorMessage from "./ErrorMessage";
import Message from "./Message";

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  message,
  error
}) => {
  return (
    <div>
      <h2>Login</h2>
      <Message message={message} />
      <ErrorMessage error={error} />

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
