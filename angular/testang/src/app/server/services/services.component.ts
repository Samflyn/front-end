import { Component, OnInit, Input } from '@angular/core';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  // heirarical injection
  // when the service is also initialized in child
  // new instance is created independent of the parent instance
  accountsList: { name: string; age: number }[];

  constructor(private accountsService: AccountsService) {
    accountsService.toShare.subscribe((data: string) => {
      console.log(data);
    });
  }

  callService(): void {
    this.accountsService.clickToShare();
  }

  ngOnInit(): void {
    this.accountsList = this.accountsService.accountsList;
  }
}
