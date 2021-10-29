import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  userEmail:string;
  constructor(
    private authService:AuthService,
    private navCtrl:NavController
    ) {}

    ngOnInit(){
      this.authService.userDetails().subscribe(res => {
        console.log('res', res);
        if (res !== null) {
          this.userEmail = res.email;
        } else {
          this.navCtrl.navigateBack('');
        }
      }, err => {
        console.log('err', err);
      })
    }

  logout(){
    this.authService.logoutUser().then((res:any)=>{
      console.log(res);
      this.navCtrl.navigateBack('');
      
    }).catch(err=>{
      console.log(err);
      
    })
  }
}
