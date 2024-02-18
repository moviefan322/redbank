export default interface UpdateEventReq {
  _id: string;
  title?: string;
  date: Date;
  startTime?: Date;
  endTime?: Date;
  urlPhoto?: string;
  link?: string;
  description?: string;
  descriptionShort?: string;
}
