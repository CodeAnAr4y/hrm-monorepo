import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'lib-tabs',
  standalone: true,
  imports: [RouterModule, UpperCasePipe],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class TabsComponent {
  tabs = input<{ title: string; link: string }[]>([]);
}

