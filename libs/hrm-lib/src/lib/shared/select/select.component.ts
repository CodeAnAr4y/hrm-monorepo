import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { SelectOption } from './select.constants';

@Component({
  selector: 'lib-select',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  label = input<string>('');
  placeholder = input<string>('');
  options = input<SelectOption[]>([]);

  value = signal<any>(null);
  disabled = signal(false);

  private onChange = (value: any) => {};
  public onTouched = () => {};

  writeValue(val: any): void {
    this.value.set(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  handleSelectionChange(val: any) {
    this.value.set(val);
    this.onChange(val);
  }
}
