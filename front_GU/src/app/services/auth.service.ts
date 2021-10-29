import { Injectable } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
collectionName="utilisateur";
  constructor(
    private afAuth:AngularFireAuth,
    private firestore:AngularFirestore
  ) { }

  registerUser(value){
    console.log("les données", value);
    
    return new Promise<any>((resolve, reject)=>{
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res=>resolve(res),
        err=> reject(err)
      )
    })
  }

  loginUser(value){
    return new Promise<any>((resolve, reject) =>{
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
      .then(
       res => resolve(res),
        err => reject(err)
      )
    })
  }

  logoutUser(){
    return new Promise((resolve, reject)=>{
      if(this.afAuth.currentUser){
        this.afAuth.signOut()
        .then(()=>{
          console.log("logout");
          res=>resolve(res);
        }).catch((error)=>{
          reject();
        })
      }
    })
  }

  userDetails(){
    return this.afAuth.user
  }

  addUser(data){
    return this.firestore.collection(this.collectionName).add(data);
  }

  affUsers(){
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }
}
