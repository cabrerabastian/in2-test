import { Injectable } from '@angular/core';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar({ message = "", messageButton = undefined, duration = 5000, type = "" }) {
    this._snackBar.open(message, messageButton, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: type === 'success' ? ['alert-success'] : type === 'error' ? ['alert-error'] : type === 'warning' ? ['alert-warning'] : type === 'info' ? ['alert-info'] : []
    });
  }
}
