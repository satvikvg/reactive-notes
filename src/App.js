import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import FirebaseService from "./services/FirebaseService";
import PropTypes from "prop-types";
import _ from "lodash";
import * as appActionTypes from "./store/app/actionTypes";
import * as appActions from "./store/app/actions";
import * as appSelector from "./store/app/reducer";
import * as snackbarSelector from "./store/snackbars/reducer";
import * as settingsSelector from "./store/data/settings/reducer";
import Lottie from "react-lottie";
import "./App.css";
import Header from "./components/core/header/Header";
import Container from "./components/core/container/Container";
import SignIn from "./components/pages/signin/SignIn";
import SignUp from "./components/pages/signup/SignUp";
import * as ReactAnimationData from "./media/lottie/react_logo.json";
import * as fingerPrintScanAnimationData from "./media/lottie/fingerPrintScan.json";
import * as fingerPrintSuccessAnimationData from "./media/lottie/fingerprintSuccess.json";
import LinearProgress from "@material-ui/core/LinearProgress";
import AppDrawer from "./containers/views/drawers/AppDrawer";
import { withStyles, Snackbar } from "@material-ui/core";
import { loadCSS } from "fg-loadcss/src/loadCSS";
import SettingsDialog from "./containers/dialogs/SettingsDialog";
import AboutDialog from "./containers/dialogs/AboutDialog";
import { themes } from "./config/themeConfig";
import { NoteTypes, NoteStates } from "./constants/NoteConstants";

const SIGN_UP_EVENT = "sign-up";
const SIGN_IN_EVENT = "sign-in";

const styles = theme => ({
  root: {
    display: "flex",
    height: "-webkit-fill-available"
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    // Automatically bind all functions with "this" context.
    autoBind(this);

    // This state maintains all data related to App, SignIn and SignUp.
    this.state = {
      // Holds User credentials entered during SignIn/SignUp.
      creds: {
        name: undefined,
        email: undefined,
        password: undefined,
        rePassword: undefined
      },
      // Holds info about current event happening after submit button is pressed event SignIn/SignUp.
      event: undefined,

      // Defines error condition of application.
      error: {
        isShown: false,
        message: null
      },

      // Holds App loading screen animation properties.
      loadAnimation: {
        isStopped: false,
        isPaused: false
      },

      // Holds SignIn screen logo animation related options.
      signInAnimationOptions: {
        loop: true,
        autoplay: true,
        animationData: fingerPrintScanAnimationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      },

      // Holds control properties of SignIn screen logo animation.
      signInAnimationProps: {
        isPaused: false,
        isStopped: false
      },

      // Holds data about LinearProgress component state.
      linearProgress: {
        isVisible: false
      },

      // Holds Sign in form input states.
      signInFormInputs: {
        disabled: false
      },

      // Holds Sign up form input states.
      signUpFormInputs: {
        disabled: false
      }
    };

    this.themes = themes;
    this.theme = props.theme;
  }

  /**
   * Will be called before mounting this component.
   * We will handle all authentication state change linteners here.
   */
  componentWillMount() {
    FirebaseService.auth().onAuthStateChanged(this.handleOnAuthStateChanged);
  }

  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.5.0/css/all.css",
      document.querySelector("#insertion-point-jss")
    );
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.theme.themeSelected !== nextProps.theme.themeSelected ||
      this.props.theme.mode !== nextProps.theme.mode
    ) {
      const palette = this.getThemePalette(nextProps.theme);
      this.props.setTheme(palette);
    }
  }

  render() {
    if (!this.state.loadAnimation.isStopped) return this.renderLoading();

    if (
      this.state.event === SIGN_IN_EVENT &&
      !this.state.signInAnimationProps.isStopped
    ) {
      return this.renderLoginPage();
    }

    switch (this.props.pages.render) {
      case appActionTypes.NAVIGATE_SIGN_IN:
        return this.renderLoginPage();

      case appActionTypes.NAVIGATE_SIGN_UP:
        return this.renderRegisterPage();

      case appActionTypes.NAVIGATE_HOME:
        return this.renderHomePage();

      default:
        return this.renderLoading();
    }
  }

  /**
   * This method triggers navigation to home page after user is logged in.
   * @param {firebase.user} user currently authenticated firebase user.
   */
  handleLogin(user) {
    this.props.dispatch(appActions.navigateHome(user));
  }

  /**
   * This method triggers navigation to Sign up page.
   */
  handleRegisterClick() {
    this.props.dispatch(appActions.navigateRegister());
  }

  /**
   * This method triggers navigation to Sign in page.
   */
  handleSignInClick() {
    this.animateSignIn(false);
    this.props.dispatch(appActions.navigateSignIn());
  }

  /**
   * This handles collection of user credentials from Form in SignIn/SignUp page.
   * @param {any} event Change event trigerred after change in Input data.
   */
  handleChange(event) {
    let creds;
    switch (event.target.id) {
      case "name":
        creds = { ...this.state.creds };
        creds.name = event.target.value;
        this.setState({ creds });
        break;

      case "email":
        creds = { ...this.state.creds };
        creds.email = event.target.value;
        this.setState({ creds });
        break;

      case "password":
        creds = { ...this.state.creds };
        creds.password = event.target.value;
        this.setState({ creds });
        break;

      case "re-password":
        creds = { ...this.state.creds };
        creds.rePassword = event.target.value;
        this.setState({ creds });
        break;

      default:
        break;
    }
  }

  /**
   * Set error condition and messsage to state.
   * @param {boolean} error true if error is present.
   * @param {String} message Message defining the error.
   */
  setError(showError, message) {
    const error = { ...this.state.error };
    error.isShown = showError;
    error.message = message;
    this.setState({ error });
  }

  /**
   * Handles change in any animation properties for Sign in animation.
   * @param {any} signInAnimationProps Animation properties such as isPaused, isStopped etc.
   */
  handleSignAnimStateChange(signInAnimationProps) {
    this.setState({ signInAnimationProps });
  }

  /**
   * This handles form submission for SignIn/SignUp page.
   * @param {any} event Form submit event.
   */
  handleSubmit(event) {
    const { creds } = this.state;
    event.preventDefault();

    this.setState({ event: event.target.id });
    this.setError(false, null);

    if (event.target.id === SIGN_UP_EVENT) {
      this.createAccount(creds);
    } else {
      this.signIn(creds);
    }
  }

  /**
   * This function handles new user Sign Up into firebase.
   * @param {any} creds Sign up form data.
   */
  createAccount(creds) {
    // Disable form inputs.
    this.signUpFormInputs(true);

    // Show linear progress.
    this.setLinearProgress(true);

    FirebaseService.auth()
      .createUserWithEmailAndPassword(creds.email, creds.password)
      .catch(this.handleSignInOrSignUpErrors);
  }

  /**
   * Handles enabling or disabling input fields of Sign Up form.
   * @param {boolean} disabled Defines if input fields are enabled & editable
   */
  signUpFormInputs(disabled) {
    const signUpFormInputs = { ...this.state.signUpFormInputs };
    signUpFormInputs.disabled = disabled;
    this.setState({ signUpFormInputs });
  }

  /**
   * Generate personalised default notes data based on creds passes as parameter.
   * @param {any} creds Credentials entered during Sign in or Sign up.
   */
  getDefaultNotesData(creds) {
    const defaultNotes = [
      {
        id: this.notesDb.push().key,
        title: "Hi " + creds.name,
        content:
          "Here are few notes to help you understand how to use Re-Active notes.\nPlease read through other notes.",
        type: NoteTypes.TEXT,
        starred: false,
        state: NoteStates.DEFAULT
      },
      {
        id: this.notesDb.push().key,
        title: "Hover Me.!!",
        content: "Hover any note to see action buttons.",
        type: NoteTypes.TEXT,
        starred: false,
        state: NoteStates.DEFAULT
      },
      {
        id: this.notesDb.push().key,
        title: "Edit",
        content: "Edit notes by clicking on 'Edit' action button.",
        type: NoteTypes.TEXT,
        starred: false,
        state: NoteStates.DEFAULT
      },
      {
        id: this.notesDb.push().key,
        title: "Starred",
        content:
          "You can set notes as Starred/Favourite by clicking on 'Star' icon.",
        type: NoteTypes.TEXT,
        starred: false,
        state: NoteStates.DEFAULT
      },
      {
        id: this.notesDb.push().key,
        title: "Archive",
        content: "You can set notes as Archived by clicking on 'Archive' icon.",
        type: NoteTypes.TEXT,
        starred: false,
        state: NoteStates.DEFAULT
      },
      {
        id: this.notesDb.push().key,
        title: "Trash",
        content:
          "You can trash notes by clicking 'Trash' action button with 'bin' icon.",
        type: NoteTypes.TEXT,
        starred: false,
        state: NoteStates.DEFAULT
      }
    ];

    return _.keyBy(defaultNotes, note => {
      return note.id;
    });
  }

  /**
   * This function takes care of authenticating users into firebase.
   * @param {any} creds Sign In creds entered in Sign in Form.
   */
  signIn(creds) {
    // Disable all form inputs.
    this.signInFormInputs(true);

    // Show linearProgress.
    this.setLinearProgress(true);

    // Start Sign in animation again.
    this.animateSignIn(true);

    // Sign in user using creds provided in the form.
    FirebaseService.auth()
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then(value => {
        // Check if sign in is successfull
        if (value.user) {
          this.animateSignInSuccess();
        }

        // Enable form inputs back
        this.signInFormInputs(false);

        // Hide linearProgress.
        this.setLinearProgress(false);
      })
      .catch(this.handleSignInOrSignUpErrors);
  }

  handleSignInOrSignUpErrors(error) {
    // Hide linearProgress.
    this.setLinearProgress(false);

    // Enable form inputs back
    this.signInFormInputs(false);
    this.signUpFormInputs(false);

    // Handle Errors here.
    this.setError(true, error.message);

    console.log(error);
  }

  /**
   * Handles enabling or disabling input fields of Sign In form.
   * @param {boolean} disabled Defines if input fields are enabled & editable
   */
  signInFormInputs(disabled) {
    const signInFormInputs = { ...this.state.signInFormInputs };
    signInFormInputs.disabled = disabled;
    this.setState({ signInFormInputs });
  }

  /**
   * Firebase auth state change event listener.
   * @param {firebase.User} user Currently logged in User instance.
   */
  handleOnAuthStateChanged(user) {
    if (user) {
      // Log saying user is logged in.
      console.log("User: " + user.email + " is logged in");

      // Iniatialize notes DB instance.
      this.notesDb = FirebaseService.database().ref("notes/" + user.uid);

      if (this.state.event === SIGN_UP_EVENT) {
        let promises = [];
        promises.push(
          user.updateProfile({ displayName: this.state.creds.name })
        );
        promises.push(
          this.notesDb.update(this.getDefaultNotesData(this.state.creds))
        );

        Promise.all(promises)
          .then(() => {
            // Enable form inputs back
            this.signUpFormInputs(false);

            // Hide linearProgress.
            this.setLinearProgress(false);

            this.handleLogin(user);
          })
          .catch(error => {
            // Enable form inputs back
            this.signUpFormInputs(false);

            // Hide linearProgress.
            this.setLinearProgress(false);

            console.error(error);
          });
      } else {
        this.handleLogin(user);
      }
    } else {
      console.log("User not logged in redirecting to sign in page.");
      this.handleSignInClick();
    }
  }

  /**
   * Responsible for rendering Sign in page when requested.
   */
  renderLoginPage() {
    // Pause sign in animation after desired time gap mentioned below.
    setTimeout(() => {
      if (
        this.state.signInAnimationOptions.animationData ===
        fingerPrintScanAnimationData
      ) {
        this.animateSignIn(true);
      }
    }, 6000);

    return (
      <Fragment>
        {this.renderLinearProgress()}
        <SignIn
          // Event Listeners.
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          onRegister={this.handleRegisterClick}
          // Form control properties.
          formProps={this.state.signInFormInputs}
          error={this.state.error}
          // Animation control properties.
          signInAnimationOptions={this.state.signInAnimationOptions}
          signInAnimationProps={this.state.signInAnimationProps}
          SignInAnimationEventListeners={
            !this.state.signInAnimationProps.isStopped
              ? [
                  {
                    eventName: "complete",
                    callback: () =>
                      this.handleSignAnimStateChange({
                        isPaused: false,
                        isStopped: true
                      })
                  }
                ]
              : []
          }
        />
      </Fragment>
    );
  }

  /**
   * Responsible for rendering Sign up page when requested.
   */
  renderRegisterPage() {
    return (
      <Fragment>
        {this.renderLinearProgress()}
        <SignUp
          // Event Listeners.
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          onSignIn={this.handleSignInClick}
          // Form control properties.
          formProps={this.state.signUpFormInputs}
          error={this.state.error}
        />
      </Fragment>
    );
  }

  /**
   * Responsible for rendering Home page when requested.
   */
  renderHomePage() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header />
        <AppDrawer />
        <Container />
        <SettingsDialog changeTheme={this.props.setTheme} />
        <AboutDialog />
        {this.renderSnackbar()}
      </div>
    );
  }

  renderSnackbar() {
    const { config } = this.props.snackbar;

    return (
      <Snackbar
        anchorOrigin={config.anchorOrigin}
        open={config.open}
        autoHideDuration={config.autoHideDuration}
        onClose={config.onClose}
        ContentProps={config.ContentProps}
        message={config.message}
        action={config.action}
      />
    );
  }

  /**
   * Responsible for rendering Application load screen when requested.
   */
  renderLoading() {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: ReactAnimationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    return (
      <div className="App-loading">
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
          isStopped={this.state.loadAnimation.isStopped}
          isPaused={this.state.loadAnimation.isPaused}
          eventListeners={
            !this.state.loadAnimation.isStopped
              ? [
                  {
                    eventName: "complete",
                    callback: () => {
                      this.setState({ loadAnimation: { isStopped: true } });
                    }
                  }
                ]
              : []
          }
        />
      </div>
    );
  }

  /**
   * Renders LinearProgress
   */
  renderLinearProgress() {
    const { isVisible } = this.state.linearProgress;
    return isVisible ? <LinearProgress /> : null;
  }

  /**
   * Handles setting LinearProgress as visible or Hidden.
   * @param {boolean} isVisible Defines LinearProgess visibility.
   */
  setLinearProgress(isVisible) {
    const { linearProgress } = { ...this.state };
    linearProgress.isVisible = isVisible;

    this.setState({ linearProgress });
  }

  /**
   * Controls Sign in animation
   */
  animateSignIn(pause) {
    // Prepare sign in icon data
    const signInAnimationOptions = { ...this.state.signInAnimationOptions };
    signInAnimationOptions.animationData = fingerPrintScanAnimationData;

    // Set sign in animation properties.
    const signInAnimationProps = { ...this.state.signInAnimationProps };
    signInAnimationProps.isPaused = pause;
    signInAnimationProps.isStopped = false;
    this.setState({ signInAnimationOptions, signInAnimationProps });
  }

  animateSignInSuccess() {
    // Set signIn animation to finger print success animation
    const signInAnimationOptions = {
      ...this.state.signInAnimationOptions
    };
    signInAnimationOptions.loop = false;
    signInAnimationOptions.animationData =
      this.state.event === SIGN_IN_EVENT
        ? fingerPrintSuccessAnimationData
        : fingerPrintScanAnimationData;

    // Change paused state to false and stopped to false so start animation.
    const signInAnimationProps = { ...this.state.signInAnimationProps };
    signInAnimationProps.isPaused = false;
    signInAnimationProps.isStopped = false;
    this.setState({ signInAnimationOptions, signInAnimationProps });
  }

  /**
   * Generated theme palette to set to MuiThemeConfigurator.
   * @param {any} theme theme configuration from settings.
   */
  getThemePalette(theme) {
    let themeToApply = {};
    themeToApply.themeSelected = this.theme.themeSelected;
    themeToApply.mode = this.theme.mode;

    if (theme.themeSelected !== undefined) {
      themeToApply.themeSelected = theme.themeSelected;
      this.theme.themeSelected = themeToApply.themeSelected;
    }

    if (theme.mode !== undefined) {
      themeToApply.mode = theme.mode;
      this.theme.mode = themeToApply.mode;
    }

    let themePalette = this.themes[themeToApply.themeSelected].palette;
    themePalette.type = theme.mode;

    return { palette: themePalette };
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    pages: {
      render: appSelector.getPageToRender(state)
    },
    snackbar: {
      config: snackbarSelector.getConfiguration(state)
    },
    theme: {
      themeSelected: settingsSelector.getThemeSelected(state),
      mode: settingsSelector.getThemeMode(state)
    }
  };
}

export default connect(mapStateToProps)(withStyles(styles)(App));
