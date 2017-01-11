import { Observable } from 'rxjs/Observable';

export interface DataService<T> {
  getAll(): Observable<Array<T>>;
  get?(id: string): Observable<T>;
  save?(T): Observable<T>;
  delete?(T): Observable<T>;
}
