import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { TableComponent, TableHeader, TableItem, TableType } from '@hrm-monorepo/hrm-lib';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../../services/shared/user/user.service';
import { SnackBarService } from '../../../../services/shared/snack-bar/snack-bar.service';
import {
  AddCvProjectDialogComponent
} from '../../../../shared/components/cv/add-cv-project-dialog/add-cv-project-dialog.component';
import { CvProjectService } from '../../../../services/shared/cv-project/cv-project.service';
import { CvService } from '../../../../services/shared/cv/cv.service';
import { AddCvProjectInput } from '../../../../core/models/core.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {
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

  public projectsTableData = computed(() => {
    return this.cvProjects().map(p => ({
      id: p.id,
      name: p.name,
      domain: p.domain || '',
      startDate: p.start_date || '',
      endDate: p.end_date || 'Till now',
      description: p.description || '',
      tags: p.environment || []
    }));
  });

  ngOnInit() {
    this.updateTable();
  }

  public updateTable() {
    const svId =  this.selectedCv().id;
    console.log(this.selectedCv());
    console.log(svId);
    this.cvProjectService.getCvProjects(svId).subscribe();
  }

  public openCreateProjectDialog() {
    const dialogRef = this.dialog.open(AddCvProjectDialogComponent, {
      width: '60vw',
      panelClass: 'custom-dialog-container',
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
          responsibilities: result.responsibilities ? [result.responsibilities] : []
        };

        this.cvProjectService.addCvProject(input).subscribe({
          next: () => this.snackBarService.openSnackBar('Project added successfully'),
          error: () => this.snackBarService.openSnackBar('Failed to add project')
        });
      }
    });
  }


  public openUpdateProjectDialog() {
    console.log('Open Update Project');
  }

  public openDeleteProjectDialog(id: string) {
    console.log('Delete project', id);
  }
}
