import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ButtonSize, ButtonTextColor, ButtonVariant } from './models/button-variant.constants';


@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.size-full]': 'width() === ButtonSize.FULL',
  }
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>(ButtonVariant.CONTAINED);
  readonly disabled = input<boolean>(false);
  readonly width = input<ButtonSize>(ButtonSize.CONTENT);
  readonly textColor = input<ButtonTextColor>(ButtonTextColor.PRIMARY);

  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonTextColor = ButtonTextColor;
}
