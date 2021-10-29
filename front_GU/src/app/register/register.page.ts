import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loading: boolean;

  constructor(
    private navCtrl:NavController,
    private authService: AuthService,
    private formBuilder:FormBuilder,
    private fdatabase:AngularFireDatabase,) { }

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      nom: new FormControl(''),
      prenom:new FormControl(''),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryRegister(value) {
    this.loading=true;
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        // this.fdatabase.object("utilsateur/"+res.user.uid).set({
        //   email:value.email,
        //   password:value.password
        // })
        let data={
          nom:value.nom,
          prenom:value.prenom,
          email:value.email,
          password:value.password,
        }
        console.log("les données à enregistrer", data);
        
        
          this.authService.addUser(data).then((res:any)=>{
            console.log("Enregistrer dans firebase",res);
            
          })
        
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please log in.";
        this.loading=false;
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "Probleme l'ors de la connexion";
      })
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }



}
