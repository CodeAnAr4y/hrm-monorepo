import { Component, input } from '@angular/core';
import { MatTabLink } from '@angular/material/types/tabs';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lib-tab',
  imports: [RouterLink, RouterLinkActive, MatTabLink],
  templateUrl: './tab.html',
  styleUrl: './tab.css',
})
export class Tab {
  public source = input<string>('#');
}
