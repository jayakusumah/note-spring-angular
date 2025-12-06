import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { IconBackComponent } from '../../../../shared/components/icon-back.component';

@Component({
  selector: 'app-note-editor-page',
  templateUrl: './editor.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IconBackComponent, RouterModule]
})
export class EditorComponent implements OnInit {
  note?: Note;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: [''],
      body: ['']
    });
  }

  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) {
      this.noteService.findOne(noteId).subscribe({
        next: n => {
          this.note = n;
          this.form.patchValue({
            title: n.title,
            body: n.body
          });
        },
        error: err => console.error(err)
      });
    }
  }

  submit() {
    const noteData = this.form.value;

    const handleError = (err: any) => {
      console.error(err);

      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        if (control?.errors?.['serverError']) {
          const { serverError, ...rest } = control.errors;
          control.setErrors(Object.keys(rest).length ? rest : null);
        }
      });

      if (err.error?.errors) {
        const errors = err.error.errors;
        Object.keys(errors).forEach(field => {
          const control = this.form.get(field);
          if (control) {
            control.setErrors({ ...control.errors, serverError: errors[field] });
          }
        });
      }
    };

    if (this.note?.id) {
      this.noteService.updateOne(this.note.id, noteData).subscribe({
        next: updated => this.handleSaved(updated),
        error: handleError
      });
    } else {
      this.noteService.createOne(noteData).subscribe({
        next: created => this.handleSaved(created),
        error: handleError
      });
    }
  }

  handleSaved(note: Note) {
    this.router.navigate(['/']);
  }

  getFormErrors(field: string): string[] {
    const control = this.form.get(field);
    if (!control || !control.errors) return [];
    const errors: string[] = [];

    if (control.errors?.['serverError']) {
      errors.push(control.errors['serverError']);
    }

    return errors;
  }
}
