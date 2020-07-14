import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-publish-progress-bar',
  templateUrl: './publish-progress-bar.component.html',
  styleUrls: ['./publish-progress-bar.component.css']
})
export class PublishProgressBarComponent implements OnInit {
  @Input() progressBarType: string;
  @Input() progress: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
