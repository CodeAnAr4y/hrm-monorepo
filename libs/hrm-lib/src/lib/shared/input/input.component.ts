import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
  computed
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  type = input<'text' | 'password' | 'email'>('text');
  placeholder = input<string>('');
  label = input<string>('');
  autocomplete = input<boolean>(false);

  private _disabled = signal(false);
  value = signal<string>('');

  hide = signal(true);

  inputType = computed(() => {
    if (this.type() === 'password') {
      return this.hide() ? 'password' : 'text';
    }
    return this.type();
  });

  private onChange = (value: string) => {};
  private onTouched = () => {};

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

  toggleVisibility() {
    this.hide.set(!this.hide());
  }

  disabled() {
    return this._disabled();
  }
}
