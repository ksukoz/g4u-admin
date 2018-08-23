import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  }
});

const Messages = props => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        onClose={props.onClose}
        open={props.open}
        autoHideDuration={6000}
        message={props.message}
      >
        <SnackbarContent
          className={props.classes}
          aria-describedby="client-snackbar"
          message={<span id="client-snackbar" />}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              // className={classes.close}
              onClick={props.onClose}
            >
              <CloseIcon
              // className={classes.icon}
              />
            </IconButton>
          ]}
        />
      </Snackbar>
    </div>
  );
};

export default Messages;
