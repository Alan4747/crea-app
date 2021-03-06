import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  headerName:string = "";
  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.signOut().subscribe();
  }

}
