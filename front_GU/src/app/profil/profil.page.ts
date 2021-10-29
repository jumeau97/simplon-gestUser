import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  listeUsers:any;
  userEmail:any;
  constructor(
    private authService:AuthService,
    private navCtrl:NavController,
    ) { }

  ngOnInit() {
    this.affUsers();
  }

  affUsers(){
    this.authService.affUsers().subscribe(res=>{
      console.log("listes des utilisateurs",res);
      this.listeUsers=res.map(e=>{
        return{
          nom:e.payload.doc.data()['nom'],
          prenom:e.payload.doc.data()['prenom'],
          email:e.payload.doc.data()['email'],
          password:e.payload.doc.data()['password'],
        }

      }),
      (err=>{
        console.log(err);
        
      })
      
    })
  }



}
