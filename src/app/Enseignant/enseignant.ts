import { Groupe } from "../Groupe/groupe";

export class Enseignant {
    
  id!: number;
  firstName!: string;
  lastName!: string;
  adress!:string;
  mail!: string;
  statut!:string;
  telephone!:string;
  groupes!:Groupe[];
}
