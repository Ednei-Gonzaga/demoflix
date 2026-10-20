import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from '../model/auth.model';
import { DataFormLogin } from '../../../../app/features/goblal/login/models/forms.page.login.model';
import { serverBackend } from '../../../../environments/addess.url.api';

@Injectable({
  providedIn: 'root',
})
export class LoginService { 
  private http = inject(HttpClient);

  sendLogin(login: DataFormLogin): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(serverBackend + "/usuario/login",login ,{headers: {'Content-Type':'application/json'}});
  }
  
}
