export interface IJoinRequest {
  id: number;
  teamId: number;
}

export interface IApproveJoinRequestPayload extends IJoinRequest {}
export interface IRejectJoinRequestPayload extends IJoinRequest {}
