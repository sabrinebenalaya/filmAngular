import { Movie } from '../Movie';
import { MovieServiceService } from '../movie-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  registerForm!: FormGroup;
  descriptionRegex!: RegExp;
  urlRegex!: RegExp;
  submitted =false;
  movie = {
      name:'',
      gender:'',
      description:'',
      url:''
    };


  constructor(private movieService: MovieServiceService,
    private router:Router, private formBuilder :FormBuilder) { }

  ngOnInit(): void {

    this.urlRegex =/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.descriptionRegex =/[-a-zA-Z0-9]*[.!?,:;]*/;
    
    this.registerForm = this.formBuilder.group({
     "name" :['',[Validators.required,Validators.minLength(2)]],
      "gender" :['',Validators.required],
     "description":['',[Validators.required, Validators.minLength(10)]],
     "url":['',[Validators.required, Validators.pattern(this.urlRegex),Validators.pattern(this.descriptionRegex)]]
    });
    console.log(this.registerForm.controls);
  }
 

  get form()
  {
      return this.registerForm.controls;
  }
   
  onSumbit(){             

if (this.registerForm.invalid){ 
  this.router.navigate(['movies']);
  return;
}
else{
this.movieService.add(this.registerForm.value)
.subscribe(
  response =>{;
    this.submitted = true;
 }, 
  error => {
    console.log(error);
  });
}
 }    
  
}
