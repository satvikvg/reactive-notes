import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Lottie from "react-lottie";
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
  signUpText: {
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

function SignIn(props) {
  const {
    classes,
    signInAnimationOptions,
    signInAnimationProps,
    SignInAnimationEventListeners,
    error
  } = props;

  const renderLockAnimation = () => {
    return (
      <Lottie
        options={signInAnimationOptions}
        height={100}
        width={100}
        isStopped={signInAnimationProps.isStopped}
        isPaused={signInAnimationProps.isPaused}
        eventListeners={SignInAnimationEventListeners}
      />
    );
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {renderLockAnimation()}
          <Typography variant="headline">Sign in</Typography>
          <form
            id="sign-in"
            className={classes.form}
            onSubmit={props.handleSubmit}
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                disabled={props.formProps.disabled}
                autoFocus
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
            <Button
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
              disabled={props.formProps.disabled}
              onClick={props.onLogIn}
              className={classes.submit}
            >
              Sign in
            </Button>

            <Typography
              component="caption"
              className={classes.errorText}
              gutterBottom
            >
              {error.message}
            </Typography>

            <Typography component="p" className={classes.signUpText}>
              Don't have an account?
              {false}
              <a href="#SignUp" onClick={props.onRegister}>
                Sign up
              </a>
            </Typography>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
