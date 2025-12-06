import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NoteService } from '../services/note.service';
import { Note } from '../models/note.model';
import { IconPlusComponent } from '../../../shared/components/icon-plus.component';
import { IconXComponent } from '../../../shared/components/icon-x.component';
import { IconLampComponent } from '../../../shared/components/icon-lamp.component';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '../../../shared/pipe/truncate.pipe';
import { ShortDatePipe } from '../../../shared/pipe/date.pipe';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, RouterModule, IconPlusComponent, IconXComponent, IconLampComponent, TruncatePipe, ShortDatePipe],
  template: `
    <div class="mx-auto p-4 min-h-screen relative">
      <h2 class="text-2xl font-semibold mb-4 text-neutral-100">Notes</h2>

      <!-- Empty state -->
      <div *ngIf="notes().length === 0" 
          class="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <app-icon-lamp [size]="48" color="white"></app-icon-lamp>
        <p class="mt-4 text-lg text-center text-neutral-100">Belum ada catatan, tambahkan catatan Anda</p>
      </div>

      <!-- Notes list -->
      <div *ngIf="notes().length > 0" class="columns-2 sm:columns-3 gap-4">
        <div *ngFor="let note of notes()" class="break-inside-avoid bg-neutral-900 border border-neutral-500 text-neutral-100 hover:bg-neutral-800 p-4 mb-4 shadow rounded-2xl relative cursor-pointer" [routerLink]="['/editor', note.id]">
          <!-- delete button -->
          <button 
            class="absolute top-2 right-2 p-1 rounded-full cursor-pointer"
            (click)="deleteNote(note.id); $event.stopPropagation()">
            <app-icon-x [size]="16" color="gray"></app-icon-x>
          </button>

          <h3 class="text-lg font-bold text-neutral-100">{{ note.title }}</h3>
          <p class="mt-1">{{ note.body | truncate:120  }}</p>
          <small class="text-gray-500">{{ note.createdAt | shortDate }}</small>
        </div>
      </div>

      <!-- add note button -->
      <button class="p-3 rounded-xl hover:bg-gray-200  bg-neutral-300 absolute bottom-5 right-5" [routerLink]="'/editor'">
        <app-icon-plus [size]="32" color="black"></app-icon-plus>
      </button>
    </div>
  `
})
export class NoteListComponent implements OnInit {
  notes = signal<Note[]>([]);

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    this.noteService.finAll().subscribe({
      next: data => this.notes.set(data),
      error: err => console.error(err)
    });
  }

  deleteNote(id: string) {
    this.noteService.deleteOne(id).subscribe({
      next: () => this.loadNotes(),
      error: err => console.error(err)
    });
  }
}
