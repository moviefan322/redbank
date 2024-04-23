export default interface PostEventReq {
  title: string;
  date: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  allDay: boolean;
  urlPhoto: string;
  description: string;
  descriptionShort: string;
}
