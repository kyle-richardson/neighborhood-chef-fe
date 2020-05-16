import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import RecentCard from "./RecentCard";
import { print } from "graphql";
import { GET_INVITED_EVENTS } from "../../graphql/users/user-queries";
import { getEventsSuccess } from "../../utilities/actions";

const RecentEvents = () => {
  const me = useSelector((state) => state.myUser);
  const eventList = useSelector((state) => state.eventList);
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      url: process.env.REACT_APP_URL,
      method: "post",
      data: {
        query: print(GET_INVITED_EVENTS),
        variables: { id: me.id },
      },
    })
      .then((res) => {
        dispatch(
          getEventsSuccess(
            res.data.data.getInvitedEvents.sort(
              (a, b) => b.createDateTime - a.createDateTime
            )
          )
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h2
        //with minimal elements on dashboard, moving this to center for better styling. to be moved back once feed and other components are added back
        style={
          { textAlign: "center" } // {{ marginLeft: "12px", marginBottom: "5px" }}
        }
      >
        Newest Events
      </h2>
      <div style={{ overflow: "scroll", height: "80vh" }}>
        <div className="recent-events-container">
          {!!eventList &&
            eventList.map((ele) => (
              <RecentCard
                {...ele}
                key={ele.id}
                currentStatus={
                  ele.users.filter((u) => `${u.id}` === `${me.id}`)[0].status
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecentEvents;