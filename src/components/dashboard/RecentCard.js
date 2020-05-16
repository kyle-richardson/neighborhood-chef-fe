import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

//style imports
import { cardStyles } from "../../styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
// import { Icon } from "@iconify/react";
// import smHeart from "@iconify/icons-heroicons/sm-heart";

import { timeAgo } from "../../utilities/functions";

import StatusButton from "../events/view-events/StatusButton";
import modernRoom from "../../assets/modernRoom.png";

import { rsvpButtons } from "../../data/buttons";

import axios from "axios";

import { USER_BY_ID } from "../../graphql/users/user-queries";
import { print } from "graphql";

const RecentCard = (props) => {
  const me = useSelector((state) => state.myUser);
  const classes = cardStyles();
  const [expanded, setExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(props.currentStatus);
  const [creatorName, setCreatorName] = useState("");
  const [initials, setInitials] = useState("");
  // const [liked, setLiked] = useState(false);
  const d = new Date(parseInt(props.date));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const shownTime = timeAgo(props.createDateTime);
  const time = d
    .toLocaleTimeString("en-US", {
      hours: "numeric",
      minutes: "2-digit",
    })
    .replace(/:\d+ /, " ");
  const day = d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  const dayNum = day.split(" ")[1];
  const month = day.split(" ")[0];

  // const toggleLike = () => {
  //   setLiked(!liked);
  // };

  useEffect(() => {
    //get creator name when event loads.  This is a rough and inefficient way to do this, especially if there ends up being protected queries
    props.user_id &&
      axios({
        url: process.env.REACT_APP_URL,
        method: "post",
        data: {
          query: print(USER_BY_ID),
          variables: { id: props.user_id },
        },
      })
        .then((res) => {
          const data = res.data.data.getUserById;
          setCreatorName(`${data.firstName} ${data.lastName}`);
          setInitials(
            `${data.firstName.slice(0, 1)}${data.lastName.slice(0, 1)}`
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    // eslint-disable-next-line
  }, []);
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.photo ? props.photo : initials}
          </Avatar>
        }
        //this button does not function currently. will add funtionality later
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={
          <Typography variant="h6">
            {creatorName}
            <span style={{ opacity: ".6" }}> created an event</span>
          </Typography>
        }
        subheader={<Typography variant="caption"> {shownTime}</Typography>}
      />
      <CardMedia
        className={classes.media}
        image={modernRoom}
        title="New Event"
      />
      <div className="date-box">
        <Typography variant="h5">{dayNum}</Typography>
        <Typography variant="h5" color="secondary">
          {month}
        </Typography>
      </div>
      <Typography variant="body1" align="center">
        {`@ ${time}`}
      </Typography>
      <CardContent>
        <Typography variant="h4" align="center">
          {props.title}
        </Typography>
        <Typography variant="body1" align="center">
          <span
            style={
              currentStatus === "Not Going"
                ? { color: "rgba(232, 64, 64, .75)" }
                : currentStatus === "Maybe"
                ? { color: "rgba(255, 169, 40, .75)" }
                : currentStatus === "Going"
                ? { color: "rgba(33, 186, 66, .75)" }
                : { color: "rgba(0,0,0, .3)" }
            }
          >
            {currentStatus || "undecided"}
          </span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites" onClick={() => toggleLike()}>
          <span>
            {liked ? (
              <Icon icon={smHeart} color="red" />
            ) : (
              <Icon icon={smHeart} />
            )}
          </span>
          <Typography variant="caption" color="textSecondary"></Typography>
        </IconButton>

        <IconButton aria-label="share">
          <span>
            <ChatBubbleIcon />
          </span>
          <Typography variant="caption" color="textSecondary"></Typography>
        </IconButton> */}
        {/* <Typography variant="caption" color="textSecondary">
          RSVP
        </Typography> */}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <div>
            <ExpandMoreIcon />
          </div>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="v6">Are you attending this event?</Typography>
          <div style={{ display: "flex", marginTop: "10px" }}>
            {rsvpButtons.map((ele) => (
              <StatusButton
                {...ele}
                key={ele.name}
                eventStatus={currentStatus}
                eventId={props.id}
                userId={me.id}
                setStatus={setCurrentStatus}
              />
            ))}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecentCard;