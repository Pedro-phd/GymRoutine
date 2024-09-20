import { format } from "date-fns"

export const dateFormater = (date: string | Date) => {
  let finalDate = date
  if(typeof date === 'string') {
    finalDate = new Date(date)
  }

  return format(finalDate, 'dd/MM/yyyy')
}