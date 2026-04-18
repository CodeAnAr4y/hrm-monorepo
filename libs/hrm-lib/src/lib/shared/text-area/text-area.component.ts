import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'lib-text-area',
  imports: [
    MatLabel,
    MatFormField,
    MatInput
  ],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ],
})
export class TextAreaComponent implements ControlValueAccessor {
  placeholder = input<string>('');
  label = input<string>('');
  rows = input<number>(4);

  private _disabled = signal(false);
  value = signal<string>('');

  private onChange = (value: string) => {
  };
  private onTouched = () => {
  };

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

  handleInput(value: string) {
    this.value.set(value);
    this.onChange(value);
  }

  handleBlur() {
    this.onTouched();
  }

  disabled() {
    return this._disabled();
  }
}
