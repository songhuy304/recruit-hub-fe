import { apiClient } from "@/lib/axios";
import { IPaginatedResponse, IResponse } from "@/types/api.type";
import {
  ICreateJobEntity,
  IJob,
  IJobDetail,
  IJobQueryParams,
  IJobSummary,
  IJobSummaryQueryParams,
} from "../types";

const PATH = {
  LIST: "/jobs",
  CREATE: "/jobs",
  UPDATE: (jobId: number) => `/jobs/${jobId}`,
  SUMMARY: "/jobs/summary",
  DETAIL: (jobId: number) => `/jobs/${jobId}`,
  PINNED: (jobId: number) => `/jobs/${jobId}/pinned`,
  DELETE: (jobId: number) => `/jobs/${jobId}`,
};

export const jobService = {
  getJobs: (params: IJobQueryParams): Promise<IPaginatedResponse<IJob>> =>
    apiClient.get(PATH.LIST, { params }),

  getJobSummary: (params?: IJobSummaryQueryParams): Promise<IResponse<IJobSummary>> =>
    apiClient.get(PATH.SUMMARY, { params }),
  createJob: (payload: ICreateJobEntity): Promise<IResponse<void>> =>
    apiClient.post(PATH.CREATE, payload),
  updateJob: (payload: ICreateJobEntity, jobId: number): Promise<IResponse<void>> =>
    apiClient.put(PATH.UPDATE(jobId), payload),
  getJobDetail: (jobId: number): Promise<IResponse<IJobDetail>> =>
    apiClient.get(PATH.DETAIL(jobId)),
  togglePinned: (jobId: number, pinned: boolean): Promise<IResponse<void>> =>
    apiClient.patch(PATH.PINNED(jobId), { pinned }),
  deleteJob: (jobId: number): Promise<IResponse<void>> =>
    apiClient.delete(PATH.DELETE(jobId)),
};
