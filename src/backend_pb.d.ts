import * as jspb from 'google-protobuf'



export class DataRequest extends jspb.Message {
  getName(): string;
  setName(value: string): DataRequest;

  getInputsList(): Array<string>;
  setInputsList(value: Array<string>): DataRequest;
  clearInputsList(): DataRequest;
  addInputs(value: string, index?: number): DataRequest;

  getResults(): string;
  setResults(value: string): DataRequest;

  getRequestorId(): string;
  setRequestorId(value: string): DataRequest;

  getSubmittedTimestampUs(): number;
  setSubmittedTimestampUs(value: number): DataRequest;

  getCommentList(): Array<string>;
  setCommentList(value: Array<string>): DataRequest;
  clearCommentList(): DataRequest;
  addComment(value: string, index?: number): DataRequest;

  getStatus(): DataRequest.Status;
  setStatus(value: DataRequest.Status): DataRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DataRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DataRequest): DataRequest.AsObject;
  static serializeBinaryToWriter(message: DataRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DataRequest;
  static deserializeBinaryFromReader(message: DataRequest, reader: jspb.BinaryReader): DataRequest;
}

export namespace DataRequest {
  export type AsObject = {
    name: string,
    inputsList: Array<string>,
    results: string,
    requestorId: string,
    submittedTimestampUs: number,
    commentList: Array<string>,
    status: DataRequest.Status,
  }

  export enum Status { 
    PENDING = 0,
    APPROVED = 1,
    REJECTED = 2,
  }
}

export class ListRequestsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRequestsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRequestsRequest): ListRequestsRequest.AsObject;
  static serializeBinaryToWriter(message: ListRequestsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRequestsRequest;
  static deserializeBinaryFromReader(message: ListRequestsRequest, reader: jspb.BinaryReader): ListRequestsRequest;
}

export namespace ListRequestsRequest {
  export type AsObject = {
  }
}

export class ListRequestsResponse extends jspb.Message {
  getIdList(): Array<string>;
  setIdList(value: Array<string>): ListRequestsResponse;
  clearIdList(): ListRequestsResponse;
  addId(value: string, index?: number): ListRequestsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRequestsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListRequestsResponse): ListRequestsResponse.AsObject;
  static serializeBinaryToWriter(message: ListRequestsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRequestsResponse;
  static deserializeBinaryFromReader(message: ListRequestsResponse, reader: jspb.BinaryReader): ListRequestsResponse;
}

export namespace ListRequestsResponse {
  export type AsObject = {
    idList: Array<string>,
  }
}

export class GetRequestRequest extends jspb.Message {
  getId(): string;
  setId(value: string): GetRequestRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRequestRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRequestRequest): GetRequestRequest.AsObject;
  static serializeBinaryToWriter(message: GetRequestRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRequestRequest;
  static deserializeBinaryFromReader(message: GetRequestRequest, reader: jspb.BinaryReader): GetRequestRequest;
}

export namespace GetRequestRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetRequestResponse extends jspb.Message {
  getRequest(): DataRequest | undefined;
  setRequest(value?: DataRequest): GetRequestResponse;
  hasRequest(): boolean;
  clearRequest(): GetRequestResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRequestResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRequestResponse): GetRequestResponse.AsObject;
  static serializeBinaryToWriter(message: GetRequestResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRequestResponse;
  static deserializeBinaryFromReader(message: GetRequestResponse, reader: jspb.BinaryReader): GetRequestResponse;
}

export namespace GetRequestResponse {
  export type AsObject = {
    request?: DataRequest.AsObject,
  }
}

export class DeleteRequestRequest extends jspb.Message {
  getId(): string;
  setId(value: string): DeleteRequestRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRequestRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRequestRequest): DeleteRequestRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteRequestRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRequestRequest;
  static deserializeBinaryFromReader(message: DeleteRequestRequest, reader: jspb.BinaryReader): DeleteRequestRequest;
}

export namespace DeleteRequestRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeleteRequestResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRequestResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRequestResponse): DeleteRequestResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteRequestResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRequestResponse;
  static deserializeBinaryFromReader(message: DeleteRequestResponse, reader: jspb.BinaryReader): DeleteRequestResponse;
}

export namespace DeleteRequestResponse {
  export type AsObject = {
  }
}

export class GetUserInfoRequest extends jspb.Message {
  getId(): string;
  setId(value: string): GetUserInfoRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserInfoRequest): GetUserInfoRequest.AsObject;
  static serializeBinaryToWriter(message: GetUserInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserInfoRequest;
  static deserializeBinaryFromReader(message: GetUserInfoRequest, reader: jspb.BinaryReader): GetUserInfoRequest;
}

export namespace GetUserInfoRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetUserInfoResponse extends jspb.Message {
  getName(): string;
  setName(value: string): GetUserInfoResponse;

  getProfilePic(): Uint8Array | string;
  getProfilePic_asU8(): Uint8Array;
  getProfilePic_asB64(): string;
  setProfilePic(value: Uint8Array | string): GetUserInfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserInfoResponse): GetUserInfoResponse.AsObject;
  static serializeBinaryToWriter(message: GetUserInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserInfoResponse;
  static deserializeBinaryFromReader(message: GetUserInfoResponse, reader: jspb.BinaryReader): GetUserInfoResponse;
}

export namespace GetUserInfoResponse {
  export type AsObject = {
    name: string,
    profilePic: Uint8Array | string,
  }
}

export class UpdateRequestRequest extends jspb.Message {
  getId(): string;
  setId(value: string): UpdateRequestRequest;

  getOriginalRequest(): DataRequest | undefined;
  setOriginalRequest(value?: DataRequest): UpdateRequestRequest;
  hasOriginalRequest(): boolean;
  clearOriginalRequest(): UpdateRequestRequest;

  getNewRequest(): DataRequest | undefined;
  setNewRequest(value?: DataRequest): UpdateRequestRequest;
  hasNewRequest(): boolean;
  clearNewRequest(): UpdateRequestRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateRequestRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateRequestRequest): UpdateRequestRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateRequestRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateRequestRequest;
  static deserializeBinaryFromReader(message: UpdateRequestRequest, reader: jspb.BinaryReader): UpdateRequestRequest;
}

export namespace UpdateRequestRequest {
  export type AsObject = {
    id: string,
    originalRequest?: DataRequest.AsObject,
    newRequest?: DataRequest.AsObject,
  }
}

export class UpdateRequestResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateRequestResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateRequestResponse): UpdateRequestResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateRequestResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateRequestResponse;
  static deserializeBinaryFromReader(message: UpdateRequestResponse, reader: jspb.BinaryReader): UpdateRequestResponse;
}

export namespace UpdateRequestResponse {
  export type AsObject = {
  }
}

