import Sponsor from './Sponsor';

interface Tier {
  name: string;
  sponsors: Sponsor[];
}

export default interface Event {
  _id: string;
  title: string;
  date: string;
  endDate?: string;
  rainDate?: string;
  startTime?: string;
  endTime?: string;
  allDay: boolean;
  urlPhoto: string;
  description: string;
  descriptionShort: string;
  tiers: Tier[];
  createdAt: string;
  updatedAt: string;
  _v: number;
}
