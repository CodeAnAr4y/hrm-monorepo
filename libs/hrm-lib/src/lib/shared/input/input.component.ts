import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
  computed
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'lib-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
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
  // Добавили 'date'
  type = input<'text' | 'password' | 'email' | 'date'>('text');
  placeholder = input<string>('');
  label = input<string>('');
  autocomplete = input<boolean>(false);

  private _disabled = signal(false);
  value = signal<any>(''); // Изменили на any для поддержки Date объектов

  hide = signal(true);

  inputType = computed(() => {
    if (this.type() === 'password') {
      return this.hide() ? 'password' : 'text';
    }
    return this.type() === 'date' ? 'text' : this.type();
  });

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

  handleInput(value: any) {
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
