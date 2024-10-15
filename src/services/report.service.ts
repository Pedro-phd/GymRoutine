import { IReportService } from "@/domain/contract/report.contract";
import { HttpClient } from "@/infra/httpClient";

export class ReportService implements IReportService{
  httpClient = new HttpClient()
  
  async get():Promise<Blob> {
    const res = await this.httpClient.request<Blob>({
      method:'GET',
      path: '/report',
      headers: {
        'Content-Type': 'application/pdf',
      },
      responseType: 'blob'
    })
    
    if(!res.error && res.body) {
      return res.body
    }
    return new Blob()
  }
  
}