export default interface BoardMember {
  _id: string;
  name: string;
  department?: string;
  position?: string;
  officerOrDirector: string;
  executiveCommitteeMember: boolean;
  createdAt: string;
  updatedAt: string;
  _v: number;
}
