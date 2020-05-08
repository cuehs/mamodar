import {Component, Input, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';
import {Resource} from '../../models/resource';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {filter, take, tap} from 'rxjs/operators';
import {ResourceManipulateDialogComponent} from '../resource-manipulate-dialog/resource-manipulate-dialog.component';


@Component({
  selector: 'app-resource-edit-button',
  templateUrl: './resource-edit-button.component.html',
  styleUrls: ['./resource-edit-button.component.css']
})
export class ResourceEditButtonComponent implements OnInit {
  constructor(private stateService: StateService, public matDialog: MatDialog) { }

  @Input() parent: Resource;

  ngOnInit(): void {
  }

  makeResourceEditable($event: MouseEvent): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = this.parent;
    const modalDialog = this.matDialog.open(ResourceManipulateDialogComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(resource => {
      if (resource) {
        this.stateService.updateResource(resource).pipe(take(1)).subscribe(_ => this.stateService.getResources());
      }
    });
  }
}