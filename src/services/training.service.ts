import { ITrainingService } from "@/domain/contract/training.contract";
import { ITraining } from "@/domain/model";
import { HttpClient } from "@/infra/httpClient";

export class TrainingService implements ITrainingService{
  httpClient = new HttpClient()
  
  async get(): Promise<ITraining[]>{
    const res = await this.httpClient.request<ITraining[]>({ 
      path: '/training',
      method: 'GET'
    })
    if(res.body) {
      const finalBody = res.body.map(b => {
        if(typeof b.day === 'string') {
          b.day = new Date(b.day)
        }
        return b
      }) 
      
      return finalBody
    }
    return []
  };
  async create(props: ITrainingService.Props):Promise<null> {
    await this.httpClient.request<null>({
      method:'POST',
      body: props.data,
      path: '/training'
    })
    return null
  }
  
}