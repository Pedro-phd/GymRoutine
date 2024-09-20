export interface ISet {
  id: number
  type: string
  weight: string
  reps: number
  description?: string | null
}
export interface ISetCreate extends Pick<ISet, 'type' | 'weight' | 'reps' | 'description'> {
  exerciseId: number
}