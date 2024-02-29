export default interface News {
  _id: string;
  title: string;
  urlPhoto: string;
  link: string;
  linkText?: string;
  description: string;
  descriptionShort: string;
  videoLink?: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
}
