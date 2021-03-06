import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Login/auth.service';
import { User } from 'src/app/User/user';
import { Role } from '../role';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {
  roleFormgroup!:FormGroup;
  submitted:boolean=false;
  userId!: number;
  roleName!:string;
  id!: number;
  role:Role=new Role();
  users: User[] = [];
  user!:User;
constructor(private authService:AuthService, 
  private route:ActivatedRoute, private router:Router,private fb:FormBuilder) { }

ngOnInit(): void {
  
this.getRoles();
  this.id=this.route.snapshot.params['id'];
  this.authService.getRoleById(this.id).subscribe(data => {

    this.roleFormgroup=this.fb.group({
     
      rName:[data.roleName,Validators.required]
     
    });
    this.role=data;
  },error =>console.log(error)
  );

}

private getRoles(){
  this.authService.getUserList().subscribe(data => {
    this.users=data;
    console.log('users=>'+JSON.stringify(this.users));
  });
}
goToRoleList(){
  this.router.navigate(['/roles']);
}
onSubmit(){
  this.submitted=true;
  if(this.roleFormgroup.invalid) return;
  this.authService.updateRole(this.id,this.role).subscribe(data =>{
    alert("Modification effectuée avec succés !");
  this.goToRoleList();
  },error =>console.log(error)
  
  );
}

}
