import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../Movie';
import {MovieServiceService} from './../movie-service.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies !: Observable<Movie[]>;

  constructor(private movieService: MovieServiceService, private router : Router) { }

  movie = null;
  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(){
    this.movies =this.movieService.getMovieList();
  }

  deleteMovie(id:number){
    this.movieService.delete(id).subscribe(
      response =>{
        console.log(response);
        this.reloadData();
      },
      error =>{
        console.log(error);
      });
  }

  movieDetail(id: number){
    this.router.navigate(['detail',id]);
  }
}
