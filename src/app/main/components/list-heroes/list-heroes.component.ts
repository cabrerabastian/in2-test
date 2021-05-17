import { Component, OnInit, ViewChild } from '@angular/core';
import { Heroe } from '@models/heroe.model';
import { HeroeService } from '@services/heroe/heroe.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeleteHeroeComponent } from './delete-heroe/delete-heroe.component';
import { CreateEditHeroeComponent } from './create-edit-heroe/create-edit-heroe.component';

@Component({
  selector: 'app-list-heroes',
  templateUrl: './list-heroes.component.html',
  styleUrls: ['./list-heroes.component.scss']
})
export class ListHeroesComponent implements OnInit {
  heroes: Heroe[] = [];
  displayedColumns: string[] = ['id', 'superhero', 'alter_ego', 'first_appearance', 'edit', 'delete'];
  dataSource!: MatTableDataSource<Heroe>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private heroeService: HeroeService, private _matDialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAllHeroes();
  }

  getAllHeroes() {
    this.heroeService.getAll().subscribe(data => {
      if (data.success) {
        this.heroes = data.heroes;
        this.dataSource = new MatTableDataSource(this.heroes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: Heroe, filter: string) => (
          data.id.toString().indexOf(filter) != -1 ||
          data.superhero.toLowerCase().indexOf(filter) != -1 ||
          data.alter_ego.toLowerCase().indexOf(filter) != -1 ||
          data.first_appearance.toLowerCase().indexOf(filter) != -1
        );
      } else {
        console.error('error')
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  createHeroe(): void {
    
    const dialogRef = this._matDialog.open(CreateEditHeroeComponent, {
      panelClass: '',
    });
    dialogRef.afterClosed()
    .subscribe(result => {
      if (result && result.heroe) {
        
        this.heroes = [...this.heroes, {
          id: this.heroes[this.heroes.length - 1].id + 1,
          ...result.heroe
        }];
        this.dataSource = new MatTableDataSource(this.heroes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  editHeroe(heroe: Heroe): void {
    
    const dialogRef = this._matDialog.open(CreateEditHeroeComponent, {
      panelClass: '',
      data: {
        heroe
      }
    });
    dialogRef.afterClosed()
    .subscribe(result => {
      if (result && result.heroe) {
        
      const foundHeroeIndex = this.heroes.findIndex(heroe => heroe.id === result.heroe.id);
      if(foundHeroeIndex > -1) {
        this.heroes[foundHeroeIndex] = result.heroe;
      }
       /*  this.heroes = [...this.heroes, {
          id: this.heroes[this.heroes.length - 1].id + 1,
          ...result.heroe
        }]; */
        this.dataSource = new MatTableDataSource(this.heroes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  openDialog(event: Event, heroe: Heroe): void {
    // Open the dialog
    event.stopPropagation();
    const dialogRef = this._matDialog.open(DeleteHeroeComponent, {
      panelClass: '',
      data: {
        heroe
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(result)
        if (result && result.heroeId && result.type === 'delete') {
          this.heroes = this.heroes.filter((heroe: Heroe) => heroe.id !== result.heroeId );
          this.dataSource = new MatTableDataSource(this.heroes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }
}
