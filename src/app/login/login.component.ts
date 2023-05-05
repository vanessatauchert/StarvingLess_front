import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Credenciais } from '../models/credenciais';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // email: string = '';
  // password: string = '';

  creds: Credenciais = {
    email: '',
    password: ''
  }

  // email = new FormControl(null, Validators.email);
  // password = new FormControl(null, Validators.minLength(8));

  constructor(
    private toasts: ToastrService,
    private service: AuthService,
    private router: Router,
    private http: HttpClient) {}

  ngOnInit(): void {

  }

  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => {
      const authToken = (resposta.body as any).token;
      if (authToken) {
        // this.toasts.info(authToken);
        this.service.successfullLogin(authToken);
        this.router.navigate([''])
      } else {
        this.toasts.error('Header de autorização não encontrado na resposta.', 'Login');
      } 
    }, erro => {
      this.toasts.error('Usuário ou senha inválidos.', 'Login');
    });
  }
  // login() {
  //   const body = { email: this.email, password: this.password };
  //   this.http.post('https://tcc-production.up.railway.app/login', body).subscribe(
  //     response => {
  //       // fazer algo com a resposta do servidor, como salvar um token de autenticação
  //     },
  //     error => {
  //       // lidar com erros de login, como exibir uma mensagem de erro
  //     }
  //   );
  // }
}
