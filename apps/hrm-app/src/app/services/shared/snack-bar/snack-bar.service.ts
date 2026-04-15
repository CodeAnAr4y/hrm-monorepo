import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private snackBar = inject(MatSnackBar);

  public openSnackBar(msg: string) {
    this.snackBar.open(msg, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
