import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credenciais } from '../models/credenciais';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService

  constructor(private http: HttpClient) { }

  authenticate(creds: Credenciais){
    return this.http.post('https://tcc-production.up.railway.app/login', creds, {
      observe: 'response',
      responseType: 'json'
    })
  }

  successfullLogin(authToken: string){
    localStorage.setItem('token', authToken);
  }

  isAuthenticated(){
    let token =localStorage.getItem('token')
    if(token != null){
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }
}
