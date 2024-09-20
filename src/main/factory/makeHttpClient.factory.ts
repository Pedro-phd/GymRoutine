import { HttpClient } from "@/infra/httpClient"
import { makeUrl } from "@/main/adapter"

export const MakeHttpClient = () => {
  return new HttpClient()
}