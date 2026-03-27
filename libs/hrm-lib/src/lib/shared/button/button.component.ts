import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { ButtonVariant } from './models/button-variant.model';


@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [MatButtonModule, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public variant = input<ButtonVariant>(ButtonVariant.CONTAINED);
  public disabled = input<boolean>(false);
  protected readonly ButtonVariant = ButtonVariant;
}
