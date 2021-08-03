import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from '../shared/interfaces/user';

const API_URL = environment.apiURL;
@Injectable()
export class UserService {


  currentUser: IUser | undefined;

  constructor(private http: HttpClient) { }
  // use IUser later

  register(data: { username: string; email: string; password: string }) {
    return this.http.post<IUser>(`${API_URL}/users/register`, data, { withCredentials: true }).pipe(
      tap((user) => this.currentUser = user)
    );
  };

  login(data: { email: string; password: string }) {
    return this.http.post<IUser>(`${API_URL}/users/login`, data, { withCredentials: true }).pipe(
      tap((user) => this.currentUser = user)
    );
  }

}

