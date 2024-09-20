import type { ISet } from "@/domain/model"

export interface IExercise {
  name: string
  sets: ISet[]
}