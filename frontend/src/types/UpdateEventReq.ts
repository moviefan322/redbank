import Tier from './Tier';

export default interface UpdateEventReq {
  _id: string;
  title?: string;
  date: string;
  endDate?: string;
  rainDate?: string;
  startTime?: string;
  endTime?: string;
  allDay: boolean;
  urlPhoto?: string;
  urlPDF?: string;
  description?: string;
  descriptionShort?: string;
  tiers?: Tier[];
  pdfButtonText?: string;
}
