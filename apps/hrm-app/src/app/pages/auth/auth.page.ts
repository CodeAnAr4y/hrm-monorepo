import { Component } from '@angular/core';
import { TabsComponent } from '@hrm-monorepo/hrm-lib';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  imports: [TabsComponent, RouterOutlet],
  templateUrl: './auth.page.html',
  standalone: true,
})
export class AuthPage {
  libTabsData: { title: string, link: string }[] = [{ title: 'auth.login', link: 'login' }, {
    title: 'auth.signup',
    link: 'signup'
  }];
}
