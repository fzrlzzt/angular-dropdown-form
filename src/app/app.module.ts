import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SourceListComponent } from './components/source-list/source-list.component';
import { SourceDetailComponent } from './components/source-detail/source-detail.component';
import { GoogleFormComponent } from './components/forms/google-form/google-form.component';
import { FacebookFormComponent } from './components/forms/facebook-form/facebook-form.component';
import { GithubFormComponent } from './components/forms/github-form/github-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SourceListComponent,
    SourceDetailComponent,
    GoogleFormComponent,
    FacebookFormComponent,
    GithubFormComponent
  ],
  imports: [
    MatTableModule,
    FormsModule,
    BrowserAnimationsModule, // Required for animations
    MatSelectModule,
    MatCheckboxModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
