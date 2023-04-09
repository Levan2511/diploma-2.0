import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'lk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthorizationService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}
