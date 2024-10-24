import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourceListComponent } from './components/source-list/source-list.component';
import { SourceDetailComponent } from './components/source-detail/source-detail.component';
import { SourceAttributesComponent } from './components/source-attributes/source-attributes.component';

const routes: Routes = [
  { path: '', redirectTo:'attribute', pathMatch: 'full'},
  { path: 'src', component: SourceListComponent },
  { path: 'add', component: SourceDetailComponent},
  { path: 'attribute', component: SourceAttributesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
