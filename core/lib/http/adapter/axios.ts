import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpAdapterImpl } from "../types/http";

export class AxiosAdapter implements HttpAdapterImpl {
  async get(url: string, params?: Record<string, any>) {
    try {
      const config: AxiosRequestConfig = { params };
      const response: AxiosResponse = await axios.get(url, config);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
