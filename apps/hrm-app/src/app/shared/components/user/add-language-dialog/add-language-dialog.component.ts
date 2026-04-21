import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import {
  AddProfileSkillInput,
  Language,
  LanguageProficiency,
  Mastery,
  Proficiency,
  Skill
} from '../../../../core/models/core.model';
import { ButtonComponent, ButtonSize, ButtonVariant, SelectComponent, SelectOption } from '@hrm-monorepo/hrm-lib';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-add-language-dialog',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatIcon,
    ReactiveFormsModule,
    SelectComponent,
    TranslateModule
  ],
  templateUrl: './add-language-dialog.component.html',
  styleUrl: './add-language-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddLanguageDialogComponent {
  private dialogRef = inject(MatDialogRef<AddLanguageDialogComponent>);
  public data: Language[] = inject(MAT_DIALOG_DATA);

  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonSize = ButtonSize;

  public languageForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    proficiency: new FormControl<Proficiency>(Proficiency.A1, Validators.required)
  });

  public proficiencyOptions: SelectOption[] = Object.values(Proficiency).map(m => ({ label: m, value: m }));
  public langOptions: SelectOption[] = this.data.map(lang => ({ label: lang.name, value: lang.name }));

  close() {
    this.dialogRef.close();
  }

  confirm() {
    if (this.languageForm.valid) {
      this.dialogRef.close(this.languageForm.value as LanguageProficiency);
    }
  }
}
