import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Icon,
  SwipeableDrawer
} from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import * as appActions from "../../../store/app/actions";
import * as appSelector from "../../../store/app/reducer";
import { menuItems } from "../../../config/menuConfig";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  icon: {
    fontSize: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 2,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.54)"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class AppDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  render() {
    const { classes, theme, mainDrawer } = this.props;

    return (
      <Fragment>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              classes.sectionDesktop,
              !mainDrawer.open && classes.drawerPaperClose
            )
          }}
          open={mainDrawer.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerToggle}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>{this.getMenuItems()}</List>
        </Drawer>

        <SwipeableDrawer
          open={mainDrawer.open}
          onClose={this.handleDrawerToggle}
          onOpen={this.handleDrawerToggle}
          className={classes.sectionMobile}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleDrawerToggle}
            onKeyDown={this.handleDrawerToggle}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerToggle}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            {this.getMenuItems()}
          </div>
        </SwipeableDrawer>
      </Fragment>
    );
  }

  handleDrawerToggle() {
    this.props.mainDrawer.open
      ? this.props.dispatch(appActions.closeMainDrawer())
      : this.props.dispatch(appActions.openMainDrawer());
  }

  getMenuItems() {
    const items = [];
    const { classes } = this.props;

    menuItems.forEach(item => {
      switch (item.type) {
        case "MenuItem":
          items.push(
            <ListItem button key={item.name}>
              <Icon className={classNames(classes.icon, item.icon)} />
              <ListItemText primary={item.name} />
            </ListItem>
          );
          break;

        case "Divider":
          items.push(<Divider />);
          break;

        default:
          break;
      }
    });

    return items;
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    mainDrawer: {
      open: appSelector.isMainDrawerOpen(state)
    }
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(AppDrawer)
);
