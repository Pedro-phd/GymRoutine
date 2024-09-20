import type { ISet } from "@/domain/model"

export interface IExercise {
  id: number
  name: string
  sets: ISet[]
}

export interface IExerciseCreate {
  name: string
  trainingId: number
}