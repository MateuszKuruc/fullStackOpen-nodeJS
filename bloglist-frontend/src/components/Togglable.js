import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

import { Button, Typography } from "@mui/material";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} variant="contained">
          <Typography variant="bold16" style={{ width: "250px" }}>
            {props.buttonLabel}
          </Typography>
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          onClick={toggleVisibility}
          variant="outlined"
          style={{ width: "250px" }}
          color="primary"
        >
          <Typography variant="bold16">cancel</Typography>
        </Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
