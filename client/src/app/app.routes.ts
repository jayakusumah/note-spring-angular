import { Route } from '@angular/router';
import { NoteListComponent } from './features/note/components/note-list.component';
import { EditorComponent } from './features/note/pages/editor/editor.component';


export const routes: Route[] = [
  { path: '', component: NoteListComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'editor/:id', component: EditorComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];
