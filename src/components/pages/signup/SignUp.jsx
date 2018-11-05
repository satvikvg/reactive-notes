import React from "react";
import PropTypes from "prop-types";
import {
  CssBaseline,
  Paper,
  Avatar,
  Typography,
  FormControl,
  InputLabel,
  Input,
  withStyles
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import LockIcon from "@material-ui/icons/LockOutlined";
import * as Colors from "@material-ui/core/colors";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  signInText: {
    textAlign: "center",
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  errorText: {
    margin: theme.spacing.unit,
    color: Colors.red["800"]
  }
});

function SignUp(props) {
  const { classes, error } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography variant="headline">Sign up</Typography>
          <form
            id="sign-up"
            className={classes.form}
            onSubmit={props.handleSubmit}
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Full name</InputLabel>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                disabled={props.formProps.disabled}
                autoFocus
                onChange={props.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                disabled={props.formProps.disabled}
                onChange={props.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                disabled={props.formProps.disabled}
                onChange={props.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="re-password">Repeat Password</InputLabel>
              <Input
                name="re-password"
                type="password"
                id="re-password"
                disabled={props.formProps.disabled}
                onChange={props.handleChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
              disabled={props.formProps.disabled}
              onClick={props.register}
              className={classes.submit}
            >
              Register
            </Button>

            <Typography
              component="caption"
              className={classes.errorText}
              gutterBottom
            >
              {error.message}
            </Typography>

            <Typography component="p" className={classes.signInText}>
              Already have an account?{" "}
              <a href="#SignIn" onClick={props.onSignIn}>
                Sign in
              </a>
            </Typography>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
