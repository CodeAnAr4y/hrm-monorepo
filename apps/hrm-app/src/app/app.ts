import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HrmLib } from '@hrm-monorepo/hrm-lib';

@Component({
  imports: [RouterModule, HrmLib],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected title = 'hrm-app';
}
