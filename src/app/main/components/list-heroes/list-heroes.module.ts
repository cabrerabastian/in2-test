import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListHeroesComponent } from './list-heroes.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DeleteHeroeComponent } from './delete-heroe/delete-heroe.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CreateEditHeroeComponent } from './create-edit-heroe/create-edit-heroe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../directives/directives.module';

const routes: Routes = [
  {
    path: '',
    component: ListHeroesComponent
  },
];


@NgModule({
  declarations: [
    ListHeroesComponent,
    DeleteHeroeComponent,
    CreateEditHeroeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class ListHeroesModule { }
