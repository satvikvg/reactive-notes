import React, { Component } from "react";
import autoBind from "react-autobind";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogActions,
  Button
} from "@material-ui/core";

class ThemeChooserDialog extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      themeSelected: props.themeSelected
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.themeSelected !== this.props.themeSelected) {
      this.setState({ themeSelected: nextProps.themeSelected });
    }
  }

  render() {
    const { themeSelected, ...other } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="theme-chooser-dialog-title"
        {...other}
      >
        <DialogTitle id="theme-chooser-dialog-title">Choose Theme</DialogTitle>
        <DialogContent>
          <RadioGroup
            ref={ref => {
              this.radioGroupRef = ref;
            }}
            aria-label="Theme"
            name="theme"
            value={this.state.themeSelected}
            onChange={this.handleChange}
          >
            {options.map(option => (
              <FormControlLabel
                value={option}
                key={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  handleEntering() {
    this.radioGroupRef.focus();
  }

  handleChange(event, themeSelected) {
    this.setState({ themeSelected });
  }

  handleCancel() {
    this.props.onClose(this.props.themeSelected);
  }

  handleOk() {
    this.props.onClose(this.props.themeSelected);
  }
}

ThemeChooserDialog.propTypes = {
  onClose: PropTypes.func,
  themeSelected: PropTypes.string
};

export default ThemeChooserDialog;
