import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('@components/list-heroes/list-heroes.module').then(m => m.ListHeroesModule)
  },
  {
    path: '**',
    redirectTo: 'list'
  }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
