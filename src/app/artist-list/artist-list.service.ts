import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../base.service";

@Injectable({
  providedIn: 'root'
})
export class ArtistListService {
  constructor(
    protected http: HttpClient,
    protected baseService: BaseService
  ) {}

  clientId = 'af93ffba55fe40c39a8dc77f025c17c9';

  public logIn(): any {

    const path = 'https://accounts.spotify.com/authorize';
    const params = {};
    params['clientId'] = this.clientId;
    params['responseType'] = 'code';
      // const params = this.userContext.getURLParams();
    // params['Timezone'] = encodeURIComponent(TimeZoneUtil.getTimeZone());
     return this.baseService
      .getData(this.baseService.getUrl(path), params);
  }
}