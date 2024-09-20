import type{ IHttpClient } from "@/domain/contract/httpClient.contract";
import { makeUrl } from "@/main/adapter";
import axios, { AxiosError, type AxiosResponse } from "axios";

export class HttpClient implements IHttpClient {
  async request<T>(data: IHttpClient.Props): Promise<IHttpClient.Result<T>> {
    let response: AxiosResponse
    try {
      response = await axios.request({
        url: makeUrl(data.path),
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    }
    catch(err) {
      if(err instanceof AxiosError) {
        return {
          statusCode: err.status ?? 500,
          error: err.message
        }
      }
      return {
        statusCode: 500,
        error: 'Internal error'
      }
    }

    return {
      statusCode: response.status,
      body: response.data
    }
  }
}