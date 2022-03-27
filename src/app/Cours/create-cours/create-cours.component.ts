import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enseignant } from 'src/app/Enseignant/enseignant';
import { EnseignantService } from 'src/app/Enseignant/enseignant.service';
import { Cours } from '../cours';
import { CoursService } from '../cours.service';
import { TypeCours } from '../type-cours';
import { TypeCoursService } from '../type-cours.service';

@Component({
  selector: 'app-create-cours',
  templateUrl: './create-cours.component.html',
  styleUrls: ['./create-cours.component.css']
})
export class CreateCoursComponent implements OnInit {
  enseignantId!: number;
  typecourId!: number;
  enseignants: Enseignant[] = [];
  typecours: TypeCours[] = [];
  typecour!:TypeCours;
  cours:Cours=new Cours();
  
  enseignant!: Enseignant;

  constructor(private coursService:CoursService,
              private enseignantService:EnseignantService,
              private typeCoursService:TypeCoursService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void { 
    
    this.getEnseignants();
    this.getTypeCours();
  
  }
  private getEnseignants(){
    this.enseignantService.getEnseignantList().subscribe(data => {
      console.log(data);
      this.enseignants=data;
      console.log('enseignants=>'+JSON.stringify(this.enseignants));
    
    }); 
   
  }

  private getTypeCours(){
    this.typeCoursService.getTypeCoursList().subscribe(data => {
      console.log(data);
      this.typecours=data;
      console.log('typeCours=>'+JSON.stringify(this.typecours));
    
    }); 
   
  }
  saveCours(){

    this.coursService.createCours(this.cours).subscribe(data => {
      console.log(data);
      this.goToCoursList();
    },
    error =>console.log(error))
  }
  goToCoursList(){
    this.router.navigate(['/cours']);
  }
  onSubmit(){
    console.log(this.cours);
  
    this.saveCours();
    
  }

  onCancel(){
    this.router.navigate(['/cours']);
    
  }

}
