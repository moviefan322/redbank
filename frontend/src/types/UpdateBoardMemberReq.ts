export default interface UpdateBoardMemberReq {
  _id: string;
  name?: string;
  department?: string;
  position?: string;
  officerOrDirector?: string;
  executiveCommitteeMember?: boolean;
}
