import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../Movie';
import { MovieServiceService } from '../movie-service.service';
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  id: any;
  movie : any;

  constructor(private route: ActivatedRoute,
     private router:Router,
     private movieService: MovieServiceService) { }

  ngOnInit(): void {
    this.reloadmovie(this.route.snapshot.paramMap.get('id'));
  }

reloadmovie(id: any){
  this.movieService.get(id).subscribe(
    data =>{
      this.movie = data;
      console.log(data);
    },
    error =>{
      console.log(error);
    });
  
}

  list(){
     this.router.navigate(['movies']);
  }

}
