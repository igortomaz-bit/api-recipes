export interface Exception {
  code: string;
  message: string;
  httpStatusCode?: number;
}