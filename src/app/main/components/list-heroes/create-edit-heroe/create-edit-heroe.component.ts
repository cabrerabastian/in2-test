import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroeService } from '@services/heroe/heroe.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '@models/heroe.model';
import Utils from 'src/app/main/utils/utils';

@Component({
  selector: 'app-create-edit-heroe',
  templateUrl: './create-edit-heroe.component.html',
  styleUrls: ['./create-edit-heroe.component.scss']
})
export class CreateEditHeroeComponent implements OnInit {
  heroeForm!: FormGroup;
  loading: boolean = false;
  heroe!: Heroe;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private heroeService: HeroeService,
    private snackbarService: SnackbarService,
    public matDialogRef: MatDialogRef<CreateEditHeroeComponent>,
  ) {
    this.heroeForm = this._formBuilder.group({
      superhero: ['', [Validators.required]],
      alter_ego: ['', [Validators.required]],
      first_appearance: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    if (this.data && this.data.heroe) {
      this.heroe = this.data.heroe;
      Utils.setForm(this.heroeForm, this.data.heroe)
    }
  }
  createHeroe(): void {

    this.heroeService.createHeroe(this.heroeForm.value).subscribe(data => {
      this.loading = false;
      if (data.success) {

        this.snackbarService.openSnackBar({ message: data.message });
        this.close({ heroe: this.heroeForm.value, type: 'create' });
      }
    })
  }

  editHeroe():void {
    this.heroeService.editHeroe(this.heroeForm.value).subscribe(data => {
      this.loading = false;
      if (data.success) {

        this.snackbarService.openSnackBar({ message: data.message });
        this.close({ heroe: {...this.heroeForm.value, id: this.heroe.id}, type: 'edit' });
      }
    })
  }

  close(data: any = null): void {
    this.matDialogRef.close(data);
  }

}
