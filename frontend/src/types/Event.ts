export default interface Event {
  _id: string;
  title: string;
  date: Date;
  startTime?: Date;
  endTime?: Date;
  allDay: boolean;
  urlPhoto: string;
  link: string;
  description: string;
  descriptionShort: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
}
