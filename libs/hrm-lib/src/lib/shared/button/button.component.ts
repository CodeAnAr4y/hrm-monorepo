import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { ButtonSize, ButtonTextColor, ButtonVariant } from './models/button-variant.constants';


@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [MatButtonModule, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.size-full]': 'width() === ButtonSize.FULL',
    '[class.size-content]': 'width() === ButtonSize.CONTENT',
  }
})
export class ButtonComponent {
  public variant = input<ButtonVariant>(ButtonVariant.CONTAINED);
  public disabled = input<boolean>(false);
  public width = input<ButtonSize>(ButtonSize.CONTENT);
  public textColor = input<ButtonTextColor>(ButtonTextColor.PRIMARY);
  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonTextColor = ButtonTextColor;
}
