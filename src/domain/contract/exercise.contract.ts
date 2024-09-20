import type { IExerciseCreate } from "@/domain/model";

export interface IExerciseService {
  create: (props: IExerciseService.Props) => Promise<null>
}

export namespace IExerciseService {
  export interface Props {
    data: IExerciseCreate
  } 
}

