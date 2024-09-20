import type { Method } from "axios"

export interface IHttpClient {
  request: <T>(data: IHttpClient.Props) => Promise<IHttpClient.Result<T>>
}

export namespace IHttpClient {
  export interface Props {
    path: string
    body?: unknown
    headers?: any
    method: Method
  }
  export type Result<response> = {
    statusCode: number
    body?: response
    error?: string
  }
}