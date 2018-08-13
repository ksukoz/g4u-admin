import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import picture from "./img/picture.svg";

const styles = theme => ({
  file: {
    width: "max-content",
    padding: ".5rem 2rem",
    border: "1px solid #43A047",
    borderRadius: 10,
    display: "block",
    marginBottom: "1rem"
  },
  icon: {
    height: 20
  },
  hide: {
    display: "none"
  }
});

const InputFile = ({ type, classes, name, onChange }) => {
  let icon;
  let accept;
  if (type === "image") {
    icon = <img src={picture} className={classes.icon} />;
    accept = "image/jpeg,image/png";
  }

  return (
    <div>
      <label htmlFor={type} className={classes.file}>
        {icon}
      </label>
      <input
        type="file"
        accept={accept}
        name={name}
        id={type}
        className={classes.hide}
        onChange={onChange}
      />
    </div>
  );
};

InputFile.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object
};

export default withStyles(styles)(InputFile);
