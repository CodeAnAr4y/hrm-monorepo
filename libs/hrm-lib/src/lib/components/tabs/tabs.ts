import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/types/tabs';

@Component({
  selector: 'lib-tabs',
  imports: [MatTabsModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs {}
