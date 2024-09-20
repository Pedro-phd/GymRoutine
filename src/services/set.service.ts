import { ISetService } from "@/domain/contract/set.contract";
import { HttpClient } from "@/infra/httpClient";

export class SetService implements ISetService {
  httpClient = new HttpClient()
  
  async create(props: ISetService.Props):Promise<null> {
    await this.httpClient.request<null>({
      method:'POST',
      body: props.data,
      path: '/set'
    })
    return null
  }
  
}