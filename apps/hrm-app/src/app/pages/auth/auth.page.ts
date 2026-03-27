import { Component } from '@angular/core';
import { TabsComponent } from '@hrm-monorepo/hrm-lib';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  imports: [TabsComponent, RouterOutlet],
  templateUrl: './auth.page.html',
  standalone: true,
  host: {}
})
export class AuthPage {
  libTabsData: { title: string, link: string }[] = [{ title: 'log in', link: 'login' }, {
    title: 'sign up',
    link: 'signup'
  }];
}
