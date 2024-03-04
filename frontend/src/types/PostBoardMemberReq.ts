export default interface PostBoardMemberReq {
  name: string;
  department?: string;
  position?: string;
  officerOrDirector: string;
  executiveCommitteeMember: boolean;
}
