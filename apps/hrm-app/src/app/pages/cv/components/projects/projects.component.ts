import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TableComponent, TableHeader, TableType } from '@hrm-monorepo/hrm-lib';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../services/shared/snack-bar/snack-bar.service';
import {
  AddCvProjectDialogComponent
} from '../../../../shared/components/cv/add-cv-project-dialog/add-cv-project-dialog.component';
import { CvProjectService } from '../../../../services/shared/cv-project/cv-project.service';
import { CvService } from '../../../../services/shared/cv/cv.service';
import { AddCvProjectInput, RemoveCvProjectInput, UpdateCvProjectInput } from '../../../../core/models/core.model';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs/operators';
import {
  UpdateCvProjectDialogComponent
} from '../../../../shared/components/cv/update-cv-project-dialog/update-cv-project-dialog.component';
import {
  DeleteCvProjectDialogComponent
} from '../../../../shared/components/cv/delete-cv-project-dialog/delete-cv-project-dialog.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  private cvProjectService = inject(CvProjectService);
  private cvService = inject(CvService);
  private dialog = inject(MatDialog);
  private snackBarService = inject(SnackBarService);

  protected readonly TableType = TableType;

  public columns: TableHeader[] = [
    { title: 'Name', sourceName: 'name', sortable: true },
    { title: 'Domain', sourceName: 'domain', sortable: true },
    { title: 'Start Date', sourceName: 'startDate', sortable: true },
    { title: 'End Date', sourceName: 'endDate', sortable: true },
    { title: '', sourceName: 'actions', sortable: false, type: 'action' }
  ];

  public selectedCv = this.cvService.selectedCv;
  public cvProjects = this.cvProjectService.cvProjects;

  private readonly cvProjectsLoader = toObservable(this.selectedCv).pipe(
    filter(cv => !!cv?.id),
    switchMap(cv => this.cvProjectService.getCvProjects(cv.id)),
    takeUntilDestroyed()
  ).subscribe();

  public projectsTableData = computed(() => {
    return this.cvProjects().map(p => ({
      id: p.id,
      name: p.name,
      domain: p.domain || '',
      startDate: p.start_date || '',
      endDate: p.end_date || 'Till now',
      description: p.description || '',
      tags: p.responsibilities || []
    }));
  });

  public openCreateProjectDialog() {
    const dialogRef = this.dialog.open(AddCvProjectDialogComponent, {
      width: '60vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const input: AddCvProjectInput = {
          cvId: this.selectedCv().id,
          projectId: result.project,
          start_date: result.startDate instanceof Date
            ? result.startDate.toISOString()
            : result.startDate,
          end_date: result.endDate instanceof Date
            ? result.endDate.toISOString()
            : result.endDate,
          roles: [],
          responsibilities: result.responsibilities ? result.responsibilities.split(', ') : []
        };

        this.cvProjectService.addCvProject(input).subscribe({
          next: () => this.snackBarService.openSnackBar('Project added successfully'),
          error: () => this.snackBarService.openSnackBar('Failed to add project')
        });
      }
    });
  }


  public openUpdateProjectDialog(id: string) {
    const projectToUpdate = this.cvProjects().find(p => p.id === id);

    const dialogRef = this.dialog.open(UpdateCvProjectDialogComponent, {
      width: '60vw',
      data: projectToUpdate
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const input: UpdateCvProjectInput = {
          cvId: this.selectedCv().id,
          projectId: projectToUpdate!.project.id,
          start_date: result.startDate instanceof Date ? result.startDate.toISOString() : result.startDate,
          end_date: result.endDate instanceof Date ? result.endDate.toISOString() : result.endDate,
          roles: [],
          responsibilities: result.responsibilities ? result.responsibilities.split(', ') : []
        };

        this.cvProjectService.updateCvProject(input).subscribe({
          next: () => this.snackBarService.openSnackBar('Project updated successfully'),
          error: () => this.snackBarService.openSnackBar('Failed to update project')
        });
      }
    });
  }

  public openDeleteProjectDialog(id: string) {
    const project = this.cvProjects().find(p => p.id === id);

    const dialogRef = this.dialog.open(DeleteCvProjectDialogComponent, {
      width: '40vw',
      data: { id: id, name: project?.name }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        const input: RemoveCvProjectInput = {
          cvId: this.selectedCv().id,
          projectId: project!.project.id
        };

        this.cvProjectService.removeCvProject(input).subscribe({
          next: () => this.snackBarService.openSnackBar('Project deleted successfully'),
          error: () => this.snackBarService.openSnackBar('Failed to delete project')
        });
      }
    });
  }
}
