import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseService } from "../base.service";

@Injectable({
  providedIn: "root"
})
export class ArtistListService {
  constructor(protected http: HttpClient, protected baseService: BaseService) {}

  clientId = "af93ffba55fe40c39a8dc77f025c17c9";
  clientSecret = "be819f4ac18c4676bf2dfd4ff0cc29d7";
  accessToken = "";
  refreshToken = "";
  grantType = "authorization_code";
  redirectUri = "https://spoofy-top-artist.stackblitz.io";
  tokenType = "";

  public getTokens(code: string): any {
    const path = "https://accounts.spotify.com/api/token?" +
      "grant_type=" + this.grantType + "&code=" + code + "&redirect_uri=" + this.redirectUri + "&scope=user-top-read user-read-private user-read-email";
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/x-www-form-urlencoded');
    header = header.append('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
    return this.http.post(path, null, {headers: header});
  }

  public retrieveArtists(): any {
    const path = "https://api.spotify.com/v1/me/top/artists?limit=50";
    let header = new HttpHeaders();
    header = header.append('Authorization', this.tokenType + ' ' + this.accessToken);
    return this.http.get(path, {headers: header});
  }
}
