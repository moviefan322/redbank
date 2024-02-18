export default interface UpdateEventReq {
  _id: string;
  title?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  allDay: boolean;
  urlPhoto?: string;
  link?: string;
  description?: string;
  descriptionShort?: string;
}
