import { Observable } from 'rxjs/Observable';

export interface DataService<T> {
  getAll(params?: any): Observable<Array<T>>;
  get?(id: string): Observable<T>;
  save?(T): Observable<T>;
  delete?(T): Observable<T>;
}
