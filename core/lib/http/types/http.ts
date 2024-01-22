export interface HttpAdapterImpl {
  get(url: string, params?: Record<string, any>): Promise<any>;
}