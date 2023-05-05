import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  constructor(
    private router: Router,
    private authService: AuthService,
    private toasts: ToastrService
    ){}

  ngOnInit(): void{
    this.router.navigate(['home'])
  }

  logout() {
    this.router.navigate(['login'])
    this.authService.logout();
    this.toasts.info('Lougout realizado com sucesso!', 'Logout', {timeOut: 7000})
  }
}
