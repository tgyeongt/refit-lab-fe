"use client";

import { useMutation } from "@tanstack/react-query";
import {
  issueDevTicket,
  type IssueDevTicketRequest,
  type IssueDevTicketResponseData,
} from "../../(api)/issue-dev-ticket";

export const useIssueDevTicket = () => {
  return useMutation<IssueDevTicketResponseData, unknown, IssueDevTicketRequest>({
    mutationFn: (body: IssueDevTicketRequest) => issueDevTicket(body),
  });
};


