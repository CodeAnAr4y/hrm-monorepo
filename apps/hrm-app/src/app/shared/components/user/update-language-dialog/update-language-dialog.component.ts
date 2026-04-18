import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import {
  AddProfileSkillInput,
  LanguageProficiency,
  Mastery,
  Proficiency,
  UpdateProfileLanguageInput
} from '../../../../core/models/core.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, ButtonSize, ButtonVariant, SelectComponent } from '@hrm-monorepo/hrm-lib';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-update-language-dialog',
  imports: [
    ButtonComponent,
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatIcon,
    ReactiveFormsModule,
    SelectComponent
  ],
  templateUrl: './update-language-dialog.component.html',
  styleUrl: './update-language-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateLanguageDialogComponent {
  private dialogRef = inject(MatDialogRef<UpdateLanguageDialogComponent>);
  public data: LanguageProficiency = inject(MAT_DIALOG_DATA);

  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonSize = ButtonSize;

  public languageForm = new FormGroup({
    langName: new FormControl<string>({ value: this.data.name, disabled: true }, Validators.required),
    proficiency: new FormControl<Proficiency>(Proficiency.A1, Validators.required)
  });

  public proficiencyOptions = Object.values(Proficiency).map(m => ({
    label: m,
    value: m
  }));

  returnSkill(): Omit<UpdateProfileLanguageInput, 'userId'> {
    const formValue = this.languageForm.getRawValue();
    return {
      name: this.data.name,
      proficiency: formValue.proficiency!,
    };
  }

  close() {
    this.dialogRef.close();
  }

  confirm() {
    if (this.languageForm.valid) {
      this.dialogRef.close(this.returnSkill());
    }
  }
}
