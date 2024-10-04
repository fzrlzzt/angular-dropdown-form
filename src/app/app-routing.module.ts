import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourceListComponent } from './components/source-list/source-list.component';
import { SourceDetailComponent } from './components/source-detail/source-detail.component';

const routes: Routes = [
  { path: '', redirectTo:'add', pathMatch: 'full'},
  { path: 'src', component: SourceListComponent },
  { path: 'add', component: SourceDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
