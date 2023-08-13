import { useSelector } from "react-redux";

const Message = () => {
  const message = useSelector(state => state.message)

  if (message === null) {
    return null;
  }

  if (message !== null) {
    return <div className="message">{message}</div>;
  }
};

export default Message;
