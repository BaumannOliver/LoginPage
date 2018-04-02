import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  public message: any;

  constructor(private readonly alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage()
        .subscribe( message => { this.message = message; });
  }

}
