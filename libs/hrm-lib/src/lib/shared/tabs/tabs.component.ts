import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass, UpperCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'lib-tabs',
  standalone: true,
  imports: [RouterModule, UpperCasePipe, NgClass, TranslatePipe],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class TabsComponent {
  tabs = input<{ title: string; link: string }[]>([]);
  align = input<"left" | "center">("center");
  contentAlign = input<"center" | "left">("left");
}

