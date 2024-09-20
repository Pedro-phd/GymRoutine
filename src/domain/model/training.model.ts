import type { IExercise } from "@/domain/model"

export interface ITraining {
  id: number
  name: string
  day: Date
  description?: string
  exercises: IExercise[]
}

export interface ITrainingCreate extends Pick<ITraining, 'name' | 'day' | 'description'> {}