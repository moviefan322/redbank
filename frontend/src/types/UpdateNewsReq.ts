export default interface UpdateNewsReq {
  _id: string;
  title: string;
  urlPhoto: string;
  link?: string;
  linkText?: string;
  description: string;
  descriptionShort: string;
  videoLink?: string;
}
