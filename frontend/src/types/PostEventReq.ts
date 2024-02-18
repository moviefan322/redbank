export default interface PostEventReq {
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  allDay: boolean;
  urlPhoto: string;
  link: string;
  description: string;
  descriptionShort: string;
}
