const Message = ({ message }) => {
  if (message === null) {
    return null;
  }

  if (message !== null) {
    return <div className="message">{message}</div>;
  }
};

export default Message;
