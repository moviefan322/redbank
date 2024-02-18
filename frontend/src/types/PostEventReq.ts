export default interface PostEventReq {
  title: string;
  date: Date;
  startTime?: Date;
  endTime?: Date;
  allDay: boolean;
  urlPhoto: string;
  link: string;
  description: string;
  descriptionShort: string;
}
