import type{ IHttpClient } from "@/domain/contract/httpClient.contract";
import { makeUrl } from "@/main/adapter";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { createClient } from "./clientsideSupabase";
import sign from 'jwt-encode'

export class HttpClient implements IHttpClient {

  async getAuth() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const secret = process.env.NEXT_PUBLIC_JWT_KEY ?? "" // best practice ?
    const data = {
      sub: user?.id,
    };
    const jwt = sign(data, secret);
    return jwt
  }

  async request<T>(data: IHttpClient.Props): Promise<IHttpClient.Result<T>> {
    let response: AxiosResponse
    try {
      response = await axios.request({
        url: makeUrl(data.path),
        method: data.method,
        data: data.body,
        headers: {
          ...data.headers,
          Authorization: `Bearer ${await this.getAuth()}`
        },
        responseType: data.responseType
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