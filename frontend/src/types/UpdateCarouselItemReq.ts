export default interface UpdateCarouselItemReq {
  _id: string;
  title?: string;
  linkText?: string;
  urlPhoto?: string;
  link?: string;
  sequenceNo?: number | null;
}
