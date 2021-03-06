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

  editProgram(id: any, data: {}) {
    return this.http.put<IProgram>(`${API_URL}/post/${id}`, data, { withCredentials: true });
  }

  deleteProgram(id: string) {
    return this.http.get<IProgram>(`${API_URL}/post/delete/${id}`, { withCredentials: true });
  }

  followProgram(data: {}) {
    return this.http.post<IProgram>(`${API_URL}/post/follow`, { data }, { withCredentials: true });
  }

  unfollowProgram(data: {}) {
    return this.http.post<IProgram>(`${API_URL}/post/unfollow`, { data }, { withCredentials: true });
  }

  loadUserPrograms(id: string) {
    return this.http.get<IProgram>(`${API_URL}/post/profile/${id}`, { withCredentials: true });
  }

  addCommentToProgram(id: string, data: { content: string }) {
    return this.http.post<IProgram>(`${API_URL}/post/add-comment/${id}`, data, { withCredentials: true });
  }

  deleteCommentFromProgram(id: string, postId: any) {
    return this.http.post<IProgram>(`${API_URL}/post/deleteComment/${postId}`, { id }, { withCredentials: true });
  }
}
