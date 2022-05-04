import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './Movie';
const baseUrl = 'http://localhost:8080/film/';
@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  
  constructor(private http: HttpClient) { }

 

  updateURL(url: String, id: number) : Observable<any>{
   return this.http.put(`${baseUrl}/${id}`,{responseType:'text'});
  }

// ajouter un film
  add(data: any){
    return this.http.post(baseUrl+"add",{name:data['name'],gender:data['gender'],description:data['description'],url:data['url']});
  }
  
  //page liste des films
  getMovieList(): Observable<any> {
    console.log(baseUrl+"films");
    return this.http.get(`${baseUrl}films`); 
  }
      //bouton delete
      delete(id: any) {
        return this.http.delete(`${baseUrl}delete/${id}`)
      }
      //bouton detail
      get(id: any){return this.http.get(`${baseUrl}movie/${id}`)}

}
