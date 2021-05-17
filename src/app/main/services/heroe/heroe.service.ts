import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment as ENV } from '../../../../environments/environment';
import { HandleService } from '@services/handle/handle.service';
import { Heroe } from '@models/heroe.model';
import { injectMocks, Scenarios } from 'data-mocks';
import heroes from '@data/heroes.data';

const scenarios: Scenarios = {
  default: [
    {
      url: /heroes/,
      method: 'GET',
      response: {
        success: true,
        heroes
      },
      responseCode: 200,

    },
    {
      url: /heroesFail/,
      method: 'GET',
      response: {
        success: false,
        message: 'Problemas con obtener los heroes'
      },
      responseCode: 500,

    },
    {
      url: /heroes/,
      method: 'DELETE',
      response: {
        success: true,
        heroes,
        message: 'Heroe Eliminado Correctamente'
      },
      responseCode: 200,

    },
    {
      url: /heroes/,
      method: 'POST',
      response: {
        success: true,
        message: 'Heroe Creado Correctamente'
      },
      responseCode: 200,

    },

    {
      url: /heroes/,
      method: 'PUT',
      response: {
        success: true,
        message: 'Heroe Editado Correctamente'
      },
      responseCode: 200,

    },
  ]
};

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

injectMocks(scenarios, 'default', { allowXHRPassthrough: true, allowFetchPassthrough: true });
@Injectable({
  providedIn: 'root'
})
export class HeroeService {
  apiUrl: string = ENV.API_URL;
  constructor(public http: HttpClient, public handleService: HandleService) {

  }
  public getAll(): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/`)
      .pipe(
        map((res) => {
          res.heroes = res.heroes.map((heroe: any) => {
            return new Heroe().deserialize(heroe);
          })
          return res;
        }),
        catchError(this.handleService.handleError<any>('Error get all heroes'))
      );
  }

  public deleteHeroe(heroeId: number): Observable<any> {

    return this.http.delete<any>(`heroes`)
      .pipe(
        map((res) => {
          res.heroes = res.heroes.map((heroe: any) => {
            return new Heroe().deserialize(heroe);
          })
          return res;
        }),
        catchError(this.handleService.handleError<any>('Error delete heroes'))
      );
  }

  public createHeroe(data: any): Observable<any> {

    return this.http.post<any>(`heroes`, JSON.stringify(data))
      .pipe(
        map((res) => {
          return res;
        }),
        catchError(this.handleService.handleError<any>('Error create heroes'))
      );
  }

  public editHeroe(data: any): Observable<any> {

    return this.http.post<any>(`heroes`, JSON.stringify(data))
      .pipe(
        map((res) => {
          return res;
        }),
        catchError(this.handleService.handleError<any>('Error update heroes'))
      );
  }
}
