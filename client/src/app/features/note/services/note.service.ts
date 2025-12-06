import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private endpoint = '/notes';

  constructor(private http: HttpClient) {}

  finAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.endpoint);
  }

  findOne(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.endpoint}/${id}`);
  }

  createOne(note: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(this.endpoint, note);
  }

  updateOne(id: string, note: Partial<Note>): Observable<Note> {
    return this.http.put<Note>(`${this.endpoint}/${id}`, note);
  }

  deleteOne(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
