export const makeUrl = (path: string) => {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
  let finalPath = path
  if(!baseUrl.endsWith('/')) {
    baseUrl = `${baseUrl}/`
  }
  if(path.startsWith('/')) {
    finalPath = path.replace('/', '') // delete first '/'  
    }
  return `${baseUrl}${finalPath}`
}