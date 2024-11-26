export default interface PostEventReq {
  title: string;
  date: string;
  endDate?: string;
  rainDate?: string;
  startTime?: string;
  endTime?: string;
  allDay: boolean;
  urlPhoto: string;
  urlPDF?: string;
  pdfButtonText?: string;
  description: string;
  descriptionShort: string;
}
