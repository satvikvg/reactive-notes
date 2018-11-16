import React, { Component } from "react";
import autoBind from "react-autobind";
import PropTypes from "prop-types";
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
import { themes } from "../../config/themeConfig";

class ThemeChooserDialog extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      themeSelected: props.themeSelected
    };

    this.themesList = [];

    for (var key in themes) {
      const theme = { name: themes[key].name, id: key };
      this.themesList.push(theme);
    }
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
            {this.themesList.map(theme => {
              return (
                <FormControlLabel
                  value={theme.id}
                  key={theme.id}
                  control={<Radio />}
                  label={theme.name}
                />
              );
            })}
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

  handleChange(event, theme) {
    this.props.changeTheme(theme);
  }

  handleCancel() {
    this.props.onClose();
  }

  handleOk() {
    this.props.onSelected();
  }
}

ThemeChooserDialog.propTypes = {
  onClose: PropTypes.func,
  themeSelected: PropTypes.string
};

export default ThemeChooserDialog;
