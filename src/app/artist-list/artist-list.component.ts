import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ArtistListService } from "./artist-list.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "artist-list",
  templateUrl: "./artist-list.component.html",
  styleUrls: ["./artist-list.component.css"]
})
export class ArtistListComponent implements OnInit {
  code = '';
  artists = [];
  constructor(public artistService: ArtistListService, private activatedRoute: ActivatedRoute) {
  this.activatedRoute.queryParams.subscribe(params => {
    if (!!params['code'] && !this.artistService.accessToken && !this.artistService.refreshToken) {
        this.code = params['code'];
        console.log(this.code); 
        this.artistService.getTokens(this.code).subscribe(
          result => {
            if (!!result) {
              this.artistService.accessToken = result.access_token;
              this.artistService.tokenType = result.token_type;
              console.log('retrieved access & refresh tokens');
            }
          },
          error => {
            console.error('error retrieving access token');
        });
        
    }
  });
}

  ngOnInit() {
    
  }

  retrieveArtists() {
    this.artistService.retrieveArtists().subscribe(
      result => {
        this.artists = result.items;
      },
      error => {

      }
    )
  }

}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
