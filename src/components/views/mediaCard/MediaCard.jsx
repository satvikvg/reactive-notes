import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { IconButton, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const styles = {
  card: {
    width: "fill-available",
    margin: 8,
    float: "left"
  },
  cardContent: {
    width: "fill-available"
  },
  media: {
    height: 140
  }
};

function MediaCard(props) {
  const { classes, note } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          {note.title}
        </Typography>
        <Typography component="p">{note.content}</Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Edit">
          <IconButton className={classes.button} aria-label="Edit">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton className={classes.button} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
