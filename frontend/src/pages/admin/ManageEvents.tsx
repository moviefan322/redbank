import React from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { getAllEvents } from "@/features/events/eventActions";

const ManageEvents = () => {
  const { events, loading, error } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <div>
      <h1>Event Management Desk</h1>
      {events.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>{event.date}</p>
        </div>
      ))}
    </div>
  );
};

export default ManageEvents;
