interface IResponse {
  statusCode: number;
  message: string | string[];
  timestamp: Date;
  requestURL: string;
}

export interface ISuccessResponse<T> extends IResponse {
  data: T;
}

export interface IExceptionResponse extends IResponse {}
