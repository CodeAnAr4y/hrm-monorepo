import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonComponent,
  ButtonTextColor,
  ButtonVariant,
  InputComponent,
  MultiSelectComponent,
  SelectOption,
  TextAreaComponent
} from '@hrm-monorepo/hrm-lib';
import { MatIcon } from '@angular/material/icon';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { SkillService } from '../../../../services/shared/skill/skill.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-project-dialog',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
    InputComponent,
    MatDialogContent,
    TextAreaComponent,
    MatDialogActions,
    ButtonComponent,
    MultiSelectComponent,
    TranslateModule
  ],
  templateUrl: './add-project-dialog.component.html',
  styleUrl: './add-project-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProjectDialogComponent {
  private dialogRef = inject(MatDialogRef<AddProjectDialogComponent>);
  private skillService = inject(SkillService);

  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonTextColor = ButtonTextColor;

  private allEnvironment$ = this.skillService.getAllSkills().pipe(
    map(skills => skills.map(skill => ({
      label: skill.name,
      value: skill.name
    } as SelectOption)))
  );

  public envOptions = toSignal(this.allEnvironment$, {
    initialValue: [] as SelectOption[]
  });

  public projectForm = new FormGroup({
    project: new FormControl<string | null>(null, [Validators.required]),
    domain: new FormControl(''),
    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null>(null),
    description: new FormControl(''),
    environment: new FormControl<string[]>([]),
  });

  confirm() {
    if (this.projectForm.valid) {
      this.dialogRef.close(this.projectForm.getRawValue());
    }
  }

  close() {
    this.dialogRef.close();
  }
}
