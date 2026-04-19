import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonComponent,
  ButtonTextColor,
  ButtonVariant,
  InputComponent,
  MultiSelectComponent,
  SelectComponent,
  SelectOption,
  TextAreaComponent
} from '@hrm-monorepo/hrm-lib';
import { MatIcon } from '@angular/material/icon';
import { map } from 'rxjs/operators';
import { ProjectService } from '../../../../services/shared/project/project.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SkillService } from '../../../../services/shared/skill/skill.service';

@Component({
  selector: 'app-add-cv-project-dialog',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
    InputComponent,
    MatDialogContent,
    SelectComponent,
    TextAreaComponent,
    MatDialogActions,
    ButtonComponent,
    MultiSelectComponent
  ],
  templateUrl: './add-cv-project-dialog.component.html',
  styleUrl: './add-cv-project-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCvProjectDialogComponent {
  private dialogRef = inject(MatDialogRef<AddCvProjectDialogComponent>);
  private projectService = inject(ProjectService);
  private skillService = inject(SkillService);

  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonTextColor = ButtonTextColor;

  private projects = this.projectService.projects;

  public projectOptions = computed(() =>
    this.projects().map(p => ({ label: p.name, value: p.id }))
  );

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
    project: new FormControl<string | null>(null, [Validators.required]),
    domain: new FormControl({ value: '', disabled: true }),
    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null>(null),
    description: new FormControl({ value: '', disabled: true }),
    environment: new FormControl<string[]>({ value: [], disabled: true }),
    responsibilities: new FormControl('')
  });

  constructor() {
    this.projectForm.get('project')?.valueChanges.subscribe(projectId => {
      if (projectId) {
        this.fillProjectData(projectId);
      }
    });
  }

  private fillProjectData(projectId: string) {
    const selectedProject = this.projects().find(p => p.id === projectId);

    if (selectedProject) {
      this.projectForm.patchValue({
        domain: selectedProject.domain,
        startDate: selectedProject.start_date ? new Date(selectedProject.start_date) : null,
        endDate: selectedProject.end_date ? new Date(selectedProject.end_date) : null,
        description: selectedProject.description,
        environment: selectedProject.environment
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
