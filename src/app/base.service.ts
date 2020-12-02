import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root"
})
export class BaseService {
  constructor(protected http: HttpClient) {}

  public getUrl(path): string {
    return path;
  }

  public getData(path: string, params?: any): any {
    return this.http
      .get(path, { params })
      .pipe(map((data: any) => (!!data.data ? data.data : data)));
  }

  public putData(path: string, data: any, params?: any): any {
    return this.http
      .put(path, JSON.stringify(data), { params })
      .pipe(map((arg: any) => (!!arg.data ? arg.data : arg)));
  }

  public postData(path: string, data: any, params?: any): any {
    return this.http
      .post(path, JSON.stringify(data), { params })
      .pipe(map((arg: any) => (!!arg.data ? arg.data : arg)));
  }

  public deleteData(path: string): any {
    return this.http
      .delete(path)
      .pipe(map((data: any) => (!!data.data ? data.data : data)));
  }
}
