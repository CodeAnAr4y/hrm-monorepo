import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SelectOption } from '../select/select.constants';

@Component({
  selector: 'lib-multi-select',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ]
})
export class MultiSelectComponent implements ControlValueAccessor {
  label = input<string>('');
  placeholder = input<string>('');
  options = input<SelectOption[]>([]);

  value = signal<any[]>([]);
  disabled = signal(false);

  private onChange = (value: any) => {};
  public onTouched = () => {};

  writeValue(val: any): void {
    this.value.set(Array.isArray(val) ? val : []);
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

  handleSelectionChange(val: any[]) {
    this.value.set(val);
    this.onChange(val);
  }

  remove(val: any): void {
    if (this.disabled()) {
      return;
    }

    const newValue = this.value().filter(v => v !== val);
    this.value.set(newValue);
    this.onChange(newValue);
  }

  getLabel(value: any): string {
    const option = this.options().find(opt => opt.value === value);
    return option ? option.label : value;
  }
}
