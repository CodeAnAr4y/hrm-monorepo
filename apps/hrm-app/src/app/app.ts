import { Component } from '@angular/core';
import { Layout } from './core/layout/layout';

@Component({
  imports: [Layout],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected title = 'hrm-app';
}
