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
  songs = [];
  userId = '';
  logInUrl = "https://accounts.spotify.com/authorize?client_id=af93ffba55fe40c39a8dc77f025c17c9&response_type=code&redirect_uri=https://spoofy-top-artist.stackblitz.io" + 
    "&scope=user-top-read user-read-private user-read-email playlist-modify-public playlist-modify-private";
  showDataForAllTime = false;
  generatingPlaylist = false;
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

  retrieveData() {
    this.artistService.retrieveArtists().subscribe(
      result => {
        this.artists = result.items;
      },
      error => {
        console.error(error);
        console.log('error retrieving artist data')
      }
    );
    this.artistService.retrieveSongs().subscribe(
      result => {
        this.songs = result.items;
      },
      error => {
        console.error(error);
        console.log('error retrieving track data')
      }
    );
    this.artistService.getUserData().subscribe(
      result => {
        this.userId = result.id;
      },
      error => {
        console.error(error);
        console.log('error retrieving user data')
      }
    );
  }

  toggleView() {
    if (this.showDataForAllTime) {
      this.artistService.timeRange = 'medium_term';
    } else 
      this.artistService.timeRange = 'long_term';
    this.showDataForAllTime = !this.showDataForAllTime;
    this.retrieveData();
  }

  generatePlaylist() {
    this.generatingPlaylist = true;
    this.artistService.createPlaylist(this.userId).subscribe(
      result => {
        let playlistId = result.id;
        console.log('playlist created successfully!');
        let songIds = [];
        for (let song of this.songs) {
          songIds.push(song.uri);
        }
        this.artistService.generatePlaylist(playlistId, songIds).subscribe(
          result => {
            console.log('added songs successfully!');
            this.generatingPlaylist = false;
          },
          error => {
            console.error(error);
            console.log('error adding songs to playlist')
            this.generatingPlaylist = false;
            } 
          );
      },
      error => {
        console.error(error);
        console.log('error creating playlist');
        this.generatingPlaylist = false
      }
    );
  }

}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
