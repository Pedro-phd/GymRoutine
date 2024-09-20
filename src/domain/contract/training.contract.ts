import type { ITraining, ITrainingCreate } from "@/domain/model";

export interface ITrainingService {
  get: () => Promise<ITraining[]>
  create: (props: ITrainingService.Props) => Promise<null>
}

export namespace ITrainingService {
  export interface Props {
    data: ITrainingCreate
  } 
}

