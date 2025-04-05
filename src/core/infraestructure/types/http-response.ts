export interface HttpResponse<T> {
  status: number;
  data?: T;
  error?: string;
}
