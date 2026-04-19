import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { TableComponent, TableHeader, TableItem, TableType } from '@hrm-monorepo/hrm-lib';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services/shared/project/project.service';
import { UserService } from '../../services/shared/user/user.service';
import { SnackBarService } from '../../services/shared/snack-bar/snack-bar.service';

interface ProjectTable extends TableItem {
  name: string;
  domain: string;
  startDate: string;
  endDate: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './projects.page.html',
  styleUrl: './projects.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPage implements OnInit {
  private projectService = inject(ProjectService);
  private userService = inject(UserService);
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

  public projects = this.projectService.projects;

  public projectsTableData = computed(() => {
    return this.projects().map(p => ({
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
    this.projectService.getProjects().subscribe();
  }

  public openCreateProjectDialog() {
    console.log('Open Create Project');
  }

  public openUpdateProjectDialog() {
    console.log('Open Update Project');
  }

  public openDeleteProjectDialog(id: string) {
    console.log('Delete project', id);
  }
}
