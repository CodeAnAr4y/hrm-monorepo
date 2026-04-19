import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
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
import { CvProject } from '../../../../core/models/core.model';

@Component({
  selector: 'app-update-cv-project-dialog',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
    InputComponent,
    MatDialogContent,
    TextAreaComponent,
    MatDialogActions,
    ButtonComponent,
    MultiSelectComponent
  ],
  templateUrl: './update-cv-project-dialog.component.html',
  styleUrl: './update-cv-project-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateCvProjectDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<UpdateCvProjectDialogComponent>);
  private skillService = inject(SkillService);
  public data = inject<CvProject>(MAT_DIALOG_DATA);

  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonTextColor = ButtonTextColor;

  private allSkills$ = this.skillService.getAllSkills().pipe(
    map(skills => skills.map(skill => ({
      label: skill.name,
      value: skill.name
    } as SelectOption)))
  );

  public envOptions = toSignal(this.allSkills$, {
    initialValue: [] as SelectOption[]
  });

  public projectForm = new FormGroup({
    project: new FormControl({ value: '', disabled: true }),
    domain: new FormControl({ value: '', disabled: true }),
    description: new FormControl({ value: '', disabled: true }),
    environment: new FormControl<string[]>({ value: [], disabled: true }),

    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null>(null),
    responsibilities: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    if (this.data) {
      this.projectForm.patchValue({
        project: this.data.name,
        domain: this.data.domain,
        startDate: this.data.start_date ? new Date(this.data.start_date) : null,
        endDate: this.data.end_date ? new Date(this.data.end_date) : null,
        description: this.data.description,
        environment: this.data.environment,
        responsibilities: this.data.responsibilities?.join(', ') || ''
      });
    }
  }

  confirm() {
    if (this.projectForm.valid) {
      this.dialogRef.close(this.projectForm.getRawValue());
    }
  }

  close() {
    this.dialogRef.close();
  }
}
