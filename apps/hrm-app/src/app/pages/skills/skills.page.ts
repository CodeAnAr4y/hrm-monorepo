import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { TableComponent, TableHeader, TableType } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../services/shared/user/user.service';
import { AdminService } from '../../services/shared/admin/admin.service';
import { SnackBarService } from '../../services/shared/snack-bar/snack-bar.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserInput, UpdateUserInput } from '../../core/models/core.model';
import { AddUserDialogComponent } from '../../shared/components/user/add-user-dialog/add-user-dialog.component';
import {
  UpdateUserDialogComponent
} from '../../shared/components/user/update-user-dialog/update-user-dialog.component';
import {
  DeleteUserDialogComponent
} from '../../shared/components/user/delete-user-dialog/delete-user-dialog.component';
import { SkillService } from '../../services/shared/skill/skill.service';
import { COLUMNS } from './skills.page.constants';


@Component({
  selector: 'app-skills',
  imports: [
    TableComponent
  ],
  templateUrl: './skills.page.html',
  styleUrl: './skills.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsPage implements OnInit {
  public userService = inject(UserService);
  private adminService = inject(AdminService);
  private skillService = inject(SkillService);
  private snackBarService = inject(SnackBarService);
  private router = inject(Router);

  public isAdmin = this.userService.isAdmin;
  private dialog = inject(MatDialog);

  public columns: TableHeader[] = COLUMNS;

  public skills = this.skillService.allSkills;

  public skillsTable = computed(() => {
    return this.skills().map((skill) => {
      return {
        name: skill.name,
        type: skill.category_parent_name,
        category: skill.category_name,
      };
    });
  });
  public isLoading = signal<boolean>(true);

  ngOnInit() {
    this.skillService.getAllSkills().subscribe()
  }

  public openCreateSkillDialog() {
    this.snackBarService.openSnackBar('Work in progress...')
  }

  public openUpdateSkillDialog(id: string) {
    this.snackBarService.openSnackBar('Work in progress...')
  }

  public openDeleteSkillDialog(id: string) {
    this.snackBarService.openSnackBar('Work in progress...')
  }

  protected readonly TableType = TableType;
}
