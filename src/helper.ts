import { DataRequest } from "./backend_pb";

export function objectToRequest(value?: DataRequest.AsObject): DataRequest {

  const data = new DataRequest();
  if(value) {
    data.setStatus(value.status);
    data.setName(value.name);
    data.setInputsList(value.inputsList);
    data.setCommentList(value.commentList);
    data.setRequestorId(value.requestorId);
    data.setResults(value.results);
    data.setSubmittedTimestampUs(value.submittedTimestampUs);
  } 
  return data;
}