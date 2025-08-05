import { APIRequestContext, APIResponse } from '@playwright/test';

export interface HttpClient {
  get(endpoint: string, params?: Record<string, any>): Promise<APIResponse>;
  post(endpoint: string, data?: any): Promise<APIResponse>;
  put(endpoint: string, data?: any): Promise<APIResponse>;
  delete(endpoint: string): Promise<APIResponse>;
}

export class BaseApiClient implements HttpClient {
  protected request: APIRequestContext;
  protected baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string = 'https://petstore.swagger.io/v2') {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async get(endpoint: string, params?: Record<string, any>): Promise<APIResponse> {
    const url = this.buildUrl(endpoint, params);
    return await this.request.get(url);
  }

  async post(endpoint: string, data?: any): Promise<APIResponse> {
    const url = this.buildUrl(endpoint);
    return await this.request.post(url, {
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  async put(endpoint: string, data?: any): Promise<APIResponse> {
    const url = this.buildUrl(endpoint);
    return await this.request.put(url, {
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  async delete(endpoint: string): Promise<APIResponse> {
    const url = this.buildUrl(endpoint);
    return await this.request.delete(url);
  }

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    let url = `${this.baseUrl}${endpoint}`;
    
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
      
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    
    return url;
  }
}