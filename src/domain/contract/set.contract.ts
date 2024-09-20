import type { ISetCreate } from "@/domain/model";

export interface ISetService {
  create: (props: ISetService.Props) => Promise<null>
}

export namespace ISetService {
  export interface Props {
    data: ISetCreate
  } 
}

