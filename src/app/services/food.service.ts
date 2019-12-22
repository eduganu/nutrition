import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResult } from 'src/app/models/searchResult';

const apiURL = environment.apiURL
const apiKey = environment.apiKey
@Injectable({
  providedIn: 'root'
})
export class FoodService {
  keyParameter = "api_key=" + apiKey

  constructor(private http:HttpClient) { }

  search(foodName:string):Observable<SearchResult>{

    let searchExtension = 'generalSearchInput=' + foodName

    console.log(apiURL + "search?" + this.keyParameter + "&" + searchExtension)
    return this.http.get<SearchResult>(apiURL + "search?" + this.keyParameter + "&" + searchExtension)
  }

  searchNextPage(foodName:string, pageNumber:number):Observable<SearchResult>{

    let searchExtension = 'generalSearchInput=' + foodName;
    let pageExtension = 'pageNumber=' + pageNumber;

    console.log(apiURL + "search?" + this.keyParameter + "&" + searchExtension + "&" + pageExtension)
    return this.http.get<SearchResult>(apiURL + "search?" + this.keyParameter + "&" + searchExtension + "&" + pageExtension)
  }
}
