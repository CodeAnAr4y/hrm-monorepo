import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { TableComponent, TableHeader, TableItem, TableType } from '@hrm-monorepo/hrm-lib';
import { CvService } from '../../services/shared/cv/cv.service';
import { CreateCvInput, CreateUserInput } from '../../core/models/core.model';
import { MatDialog } from '@angular/material/dialog';
import { AddCvDialogComponent } from '../../shared/components/cv/add-cv-dialog/add-cv-dialog.component';
import { UserService } from '../../services/shared/user/user.service';
import { SnackBarService } from '../../services/shared/snack-bar/snack-bar.service';
import {
  DeleteUserDialogComponent
} from '../../shared/components/user/delete-user-dialog/delete-user-dialog.component';
import { DeleteCvDialogComponent } from '../../shared/components/cv/delete-cv-dialog/delete-cv-dialog.component';

interface CvTable extends TableItem {
  name: string;
  education: string;
  email: string;
  description: string;
  skills: string[];
}

@Component({
  selector: 'app-cvs',
  imports: [
    TableComponent
  ],
  templateUrl: './cvs.page.html',
  styleUrl: './cvs.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvsPage {
  private cvService = inject(CvService);
  private dialog = inject(MatDialog);
  private userService = inject(UserService);
  public snackBarService = inject(SnackBarService);

  private authenticatedUser = this.userService.authenticatedUser;

  protected readonly TableType = TableType;
  public columns: TableHeader[] = [
    { title: 'Name', sourceName: 'name', sortable: true },
    { title: 'Education', sourceName: 'education', sortable: true },
    { title: 'Employee', sourceName: 'email', sortable: true },
    { title: '', sourceName: 'actions', sortable: false, type: 'action' }
  ];

  public cvs = this.cvService.userCvs;
  public cvsTableData = computed(() => {
    const cvs = this.cvs();
    const cvsTableData: CvTable[] = cvs.map(cv => ({
      id: cv.id,
      name: cv.name,
      education: cv.education || '',
      description: cv.description,
      email: cv.user?.email || '',
      skills: cv.skills ? cv.skills.map(skill => skill.name) : []
    }));

    return cvsTableData;
  });

  public openCreateCvDialog() {
    const dialogRef = this.dialog.open(AddCvDialogComponent, {
      width: '40vw',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const createCvData: CreateCvInput = {
          ...result,
          userId: this.authenticatedUser().id
        };
        this.cvService.createCv(createCvData).subscribe({
          next: () => {
            this.updateTable();
          },
          error: error => this.snackBarService.openSnackBar('Error occurred ' + error.message)
        });
      }
    });
  }

  public openDeleteCvDialog(id: string) {
    const cv = this.cvService.userCvs().filter(cv => cv.id === id)[0];

    const dialogRef = this.dialog.open(DeleteCvDialogComponent, {
      width: '40vw',
      panelClass: 'custom-dialog-container',
      data: cv
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cvService.deleteCv({ cvId: cv.id })
          .subscribe({
            next: () => {
              this.snackBarService.openSnackBar(`CV "${cv.name}" deleted!`);
              this.updateTable();
            },
            error: error => this.snackBarService.openSnackBar('Error occured ' + error.message)
          });
      }
    });
  }

  public updateTable() {
    this.cvService.getCvs().subscribe();
  }
}
