import Sponsor from './Sponsor';

interface Sponsors {
  tier: string;
  items: Sponsor[];
}

export default interface UpdateEventReq {
  _id: string;
  title?: string;
  date: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  allDay: boolean;
  urlPhoto?: string;
  description?: string;
  descriptionShort?: string;
  tiers?: string[];
  sponsors?: Sponsors[];
}
