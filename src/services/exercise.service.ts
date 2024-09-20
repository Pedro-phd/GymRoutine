import { IExerciseService } from "@/domain/contract/exercise.contract";
import { HttpClient } from "@/infra/httpClient";

export class ExerciseService implements IExerciseService{
  httpClient = new HttpClient()
  
  async create(props: IExerciseService.Props):Promise<null> {
    await this.httpClient.request<null>({
      method:'POST',
      body: props.data,
      path: '/exercise'
    })
    return null
  }
  
}