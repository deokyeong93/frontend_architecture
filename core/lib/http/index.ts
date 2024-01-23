import { AxiosAdapter } from "./adapter/axios";
import { HttpAdapterImpl } from "./types/http";

// 클라이언트
export class HttpClient {
  private adapter: HttpAdapterImpl;

  constructor(adapter: HttpAdapterImpl) {
    this.adapter = adapter;
  }

  get(url: string, params?: Record<string, any>): Promise<any> {
    return this.adapter.get(url, params);
  }
}

const adapter = new AxiosAdapter()

export const http = new HttpClient(adapter)
