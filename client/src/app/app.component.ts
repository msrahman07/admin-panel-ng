import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { AlertMessageService } from './shared/alert-message.service';
import { AlertMessage } from './shared/alert-message.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  sideBarStatus: boolean = false;
  alertMessage: AlertMessage | null = null;

  constructor(private alerMessageService : AlertMessageService) {}
    @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  
    ngOnInit(): void {
    this.alerMessageService.alertMessage$.subscribe((alertMessage) => {
      if(alertMessage) {
        this.alertMessage = alertMessage;
        setTimeout(() => this.selfClosingAlert.close(), 2000);
      }
    })
  }
}
