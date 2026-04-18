import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ButtonComponent, ButtonSize, ButtonVariant, SelectComponent } from '@hrm-monorepo/hrm-lib';
import { AddProfileSkillInput, Mastery, Skill } from '../../../../core/models/core.model';

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
  templateUrl: './add-skill-dialog.component.html',
  styleUrls: ['./add-skill-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSkillDialogComponent {
  private dialogRef = inject(MatDialogRef<AddSkillDialogComponent>);
  public data: Skill[] = inject(MAT_DIALOG_DATA);

  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonSize = ButtonSize;

  public skillForm = new FormGroup({
    skillId: new FormControl<string | null>(null, Validators.required),
    mastery: new FormControl<Mastery>(Mastery.Novice, Validators.required)
  });

  public masteryOptions = Object.values(Mastery).map(m => ({
    label: m,
    value: m
  }));

  public extractSkillOptions() {
    return this.data.map(skill => ({ label: skill.name, value: skill.id }));
  }

  returnSkill(): Omit<AddProfileSkillInput, 'userId'> {
    const skill: Skill = this.data.filter(s => s.id === this.skillForm.value.skillId)[0];
    return {
      name: skill.name,
      categoryId: skill.category?.id,
      mastery: this.skillForm.value.mastery!
    }
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
