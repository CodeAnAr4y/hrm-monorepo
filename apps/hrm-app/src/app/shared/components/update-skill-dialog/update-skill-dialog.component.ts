import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ButtonComponent, ButtonSize, ButtonVariant, SelectComponent } from '@hrm-monorepo/hrm-lib';
import { AddProfileSkillInput, Mastery, Skill, SkillMastery } from '../../../core/models/core.model';
import { data } from 'autoprefixer';

@Component({
  selector: 'app-add-skill-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatIcon,
    ButtonComponent,
    SelectComponent
  ],
  templateUrl: './update-skill-dialog.component.html',
  styleUrls: ['./update-skill-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateSkillDialogComponent {
  private dialogRef = inject(MatDialogRef<UpdateSkillDialogComponent>);
  public data: Skill = inject(MAT_DIALOG_DATA);

  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonSize = ButtonSize;

  public skillForm = new FormGroup({
    skillId: new FormControl<string>({ value: this.data.id, disabled: true }, Validators.required),
    mastery: new FormControl<Mastery>(Mastery.Novice, Validators.required)
  });

  public masteryOptions = Object.values(Mastery).map(m => ({
    label: m,
    value: m
  }));

  returnSkill(): Omit<AddProfileSkillInput, 'userId'> {
    const formValue = this.skillForm.getRawValue();
    return {
      name: this.data.name,
      categoryId: this.data.category?.id,
      mastery: formValue.mastery!
    };
  }

  close() {
    this.dialogRef.close();
  }

  confirm() {
    if (this.skillForm.valid) {
      this.dialogRef.close(this.returnSkill());
    }
  }
}
