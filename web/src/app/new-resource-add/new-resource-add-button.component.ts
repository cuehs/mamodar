import {Component, OnInit} from '@angular/core';
import {NewResourceAddDialogComponent} from './new-resource-add-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {filter} from 'rxjs/operators';
import {StateService} from '../services/state.service';



import {Resource} from '../models/resource';

@Component({
  selector: 'app-new-resource-add-button',
  templateUrl: './new-resource-add-button.component.html',
  styleUrls: ['./new-resource-add-button.component.css']
})
export class NewResourceAddButtonComponent implements OnInit {

  constructor(public matDialog: MatDialog, private stateService: StateService) {
  }

  newResource: Resource;

  ngOnInit() {
  }

  openAddNew(): void {
    this.newResource = new Resource();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    dialogConfig.data = this.newResource;
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(NewResourceAddDialogComponent, dialogConfig);
    modalDialog.afterClosed().pipe(filter(_ => !!_)).subscribe(
      resource => this.stateService.addNewResource(resource));
  }
}