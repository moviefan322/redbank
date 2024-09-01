import Sponsor from './Sponsor';

interface EventSponsor {
  tier: string;
  items: Sponsor[];
}

export default interface Event {
  _id: string;
  title: string;
  date: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  allDay: boolean;
  urlPhoto: string;
  description: string;
  descriptionShort: string;
  tiers: string[];
  sponsors: EventSponsor[];
  createdAt: string;
  updatedAt: string;
  _v: number;
}
