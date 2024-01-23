import { HttpAdapterImpl } from '../types/http'

export class VanillaHttpAdapter implements HttpAdapterImpl {
  async get(url: string, params?: Record<string, any>) {
    try {
      const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
      const response = await fetch(url + queryString);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }
}