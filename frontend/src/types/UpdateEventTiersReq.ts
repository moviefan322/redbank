import Tier from './Tier';

export default interface UpdateEventTiersReq {
  _id: string;
  tiers: Tier[];
}