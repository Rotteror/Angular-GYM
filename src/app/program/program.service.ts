import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProgram } from '../shared/interfaces/program';

const API_URL = environment.apiURL;
@Injectable()
export class ProgramService {




  constructor(private http: HttpClient) {

  }

  //Load all programs from DB
  loadPrograms() {
    return this.http.get<IProgram[]>(`${API_URL}/post`, { withCredentials: true });
  }

  loadCurrentProgram(id: string) {
    return this.http.get<IProgram>(`${API_URL}/post/${id}`, { withCredentials: true });
  }


  postProgram(data: { title: string; description: string; length: string; bodyFocus: string; averageDuration: string; daysPerWeek: string; owner: string }) {
    return this.http.post<IProgram>(`${API_URL}/post/create`, data, { withCredentials: true });
  };
}
