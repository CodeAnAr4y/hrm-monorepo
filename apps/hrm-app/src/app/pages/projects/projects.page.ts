import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { TableComponent, TableHeader, TableItem, TableType } from '@hrm-monorepo/hrm-lib';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../services/shared/snack-bar/snack-bar.service';
import { CreateProjectInput, UpdateProjectInput } from '../../core/models/core.model';
import { ProjectService } from '../../services/shared/project/project.service';
import {
  AddProjectDialogComponent
} from '../../shared/components/project/add-project-dialog/add-project-dialog.component';
import {
  DeleteProjectDialogComponent
} from '../../shared/components/project/delete-project-dialog/delete-project-dialog.component';
import {
  UpdateProjectDialogComponent
} from '../../shared/components/project/update-project-dialog/update-project-dialog.component';

interface ProjectsTable extends TableItem {
  name: string;
  domain: string;
  startDate: string;
  endDate: string;
  description: string;
  environment: string[];
}

@Component({
  selector: 'app-projects',
  imports: [
    TableComponent
  ],
  templateUrl: './projects.page.html',
  styleUrl: './projects.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage implements OnInit {
  private projectService = inject(ProjectService);
  private dialog = inject(MatDialog);
  public snackBarService = inject(SnackBarService);

  protected readonly TableType = TableType;
  public columns: TableHeader[] = [
    { title: 'Name', sourceName: 'name', sortable: true },
    { title: 'Domain', sourceName: 'domain', sortable: true },
    { title: 'Start Date', sourceName: 'startDate', sortable: true },
    { title: 'Start Date', sourceName: 'endDate', sortable: true },
    { title: '', sourceName: 'actions', sortable: false, type: 'action' }
  ];

  public projects = this.projectService.projects;
  public projectsTableData = computed(() => {
    const projects = this.projects();
    const projectsTableData: ProjectsTable[] = projects.map(project => ({
      id: project.id,
      name: project.name,
      domain: project.domain,
      startDate: project.start_date,
      endDate: project.end_date ?? 'Till Now',
      description: project.description,
      environment: project.environment ?? []
    }));

    return projectsTableData;
  });

  ngOnInit() {
    this.projectService.getProjects().subscribe()
  }

  public openCreateProjectDialog() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '60vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const createProjectData: CreateProjectInput = {
          name: result.project,
          domain: result.domain,
          start_date: result.startDate.toISOString().split('T')[0],
          end_date: result.endDate ? result.endDate.toISOString().split('T')[0] : null,
          description: result.description,
          environment: result.environment,
        };
        this.projectService.createProject(createProjectData).subscribe({
          next: () => {
            this.snackBarService.openSnackBar('Project successfully created');
            this.updateTable();
          },
          error: error => this.snackBarService.openSnackBar('Error occurred ' + error.message)
        });
      }
    });
  }

  public openUpdateProjectDialog(id: string): void {
    const project = this.projectService.projects().filter(project => project.id === id)[0];

    const dialogRef = this.dialog.open(UpdateProjectDialogComponent, {
      width: '60vw',
      data: project
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updateProjectData: UpdateProjectInput = {
          projectId: id,
          name: result.project,
          domain: result.domain,
          start_date: result.startDate.toISOString().split('T')[0],
          end_date: result.endDate ? result.endDate.toISOString().split('T')[0] : null,
          description: result.description,
          environment: result.environment,
        };
        this.projectService.updateProject(updateProjectData).subscribe({
          next: () => {
            this.snackBarService.openSnackBar('Project successfully updated');
            this.updateTable();
          },
          error: error => this.snackBarService.openSnackBar('Error occurred ' + error.message)
        });
      }
    });
  }

  public openDeleteProjectDialog(id: string) {
    const project = this.projectService.projects().filter(project => project.id === id)[0];

    const dialogRef = this.dialog.open(DeleteProjectDialogComponent, {
      width: '40vw',
      data: project
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject({ projectId: project.id })
          .subscribe({
            next: () => {
              this.snackBarService.openSnackBar(`Project "${project.name}" deleted!`);
              this.updateTable();
            },
            error: error => this.snackBarService.openSnackBar('Error occured ' + error.message)
          });
      }
    });
  }

  public updateTable() {
    this.projectService.getProjects().subscribe();
  }
}
