import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formation } from '../formation';
import { FormationService } from '../formation.service';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.css']
})
export class FormationListComponent implements OnInit {

  nom!:string;
  page:number=1;
  totalRecords!:number;
  formations: Formation[] = [];
  constructor(private formationService:FormationService,
    private router:Router) { }

  ngOnInit(): void {
   this.getFormations();
  }
private getFormations(){
  this.formationService.getFormationList().subscribe(data => {
    this.formations=data;
    this.totalRecords=this.formations.length;
  });
}
handlePageChange(event: number) {
  this.page = event;
}

updateFormation(id:number){
  this.router.navigate(['update-formation',id]);

}

deleteFormation(id:number){
  this.formationService.deleteFormation(id).subscribe(data => {
    console.log(data);
    this.getFormations();
  });
}

formationDetails(id:number){
  this.router.navigate(['formation-details',id]);
}
searchTitle(){
  if(this.nom!=""){
    this.formations=this.formations.filter(res=>{
      return res.nomFormation.toLowerCase().match(this.nom.toLowerCase());
    });
  }else if(this.nom==""){
    this.ngOnInit();
  }

}
createFormation(){
    this.router.navigate(['/create-formation']);
  }

}
