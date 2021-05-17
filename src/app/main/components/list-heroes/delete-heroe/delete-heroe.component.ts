import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '@models/heroe.model';
import { HeroeService } from '@services/heroe/heroe.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-delete-heroe',
  templateUrl: './delete-heroe.component.html',
  styleUrls: ['./delete-heroe.component.scss']
})
export class DeleteHeroeComponent implements OnInit {
  loading: boolean = false;
  heroe!: Heroe;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DeleteHeroeComponent>,
    private heroeService: HeroeService,
    private snackbarService: SnackbarService

  ) { }

  ngOnInit(): void {
    this.heroe = this.data.heroe;
  }
  deleteHeroe(heroe: Heroe): void {
    this.loading = true;
    this.heroeService.deleteHeroe(heroe.id).subscribe(data => {
      this.loading = false;
      if (data.success) {

        this.snackbarService.openSnackBar({ message: data.message });
        this.close({ heroeId: heroe.id, type: 'delete' });
      }
    })
  }
  close(data: any = null): void {
    this.matDialogRef.close(data);
  }

}
