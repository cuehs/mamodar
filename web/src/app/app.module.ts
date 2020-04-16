import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HomeComponent} from './home/home.component';

import {ProjectListComponent} from './project-list/project-list.component';

import {ResourceListComponent} from './resource-list/resource-list.component';


import {NewResourceAddButtonComponent} from './new-resource-add/new-resource-add-button.component';
import {NewResourceAddDialogComponent} from './new-resource-add/new-resource-add-dialog.component';
import {NewResourceListComponent} from './new-resource-list/new-resource-list.component';
import {NewResourceAttachButtonComponent} from './new-resource-attach-button/new-resource-attach-button.component';

import {ResourceDeleteButtonComponent} from './shared/resource-delete-button/resource-delete-button.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';


import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ProjectTabComponent } from './home/project-tab/project-tab.component';
import { SearchTabComponent } from './home/search-tab/search-tab.component';
import {MatChipsModule} from '@angular/material/chips';
import { RouterHeaderComponent } from './router-header/router-header.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectListComponent,
    ResourceListComponent,
    NewResourceAddButtonComponent,
    NewResourceAddDialogComponent,
    NewResourceListComponent,
    NewResourceAttachButtonComponent,
    ResourceDeleteButtonComponent,
    ProjectTabComponent,
    SearchTabComponent,
    RouterHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatPaginatorModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
