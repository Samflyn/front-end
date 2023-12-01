import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { catchError, exhaustMap, map, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

interface User {
  name: string;
  pass: boolean;
  id?: string;
}

@Component({
  selector: 'app-httpss',
  templateUrl: './httpss.component.html',
  styleUrls: ['./httpss.component.css'],
})
export class HttpssComponent implements OnInit, OnDestroy {
  userList: User[] = [];
  error = '';
  errorSub = new Subject<string>();

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.onFetchUsers();
    this.errorSub.subscribe((errorMessage) => {
      this.error = errorMessage;
    });
  }

  onSubmit(form: NgForm): void {
    this.onCreateUser({ name: form.value.name, pass: form.value.pass });
  }

  onCreateUser(userData: User): void {
    // .json is required for firebase
    // angular converts data  to json
    // angular http are managed by observables
    // if http request is not subscribed no request will be sent
    // http will automatically extract the response data
    this.http
      .post('https://testang-sam.firebaseio.com/users.json', userData, {
        headers: new HttpHeaders({ 'My-Header': 'hello' }),
        params: new HttpParams().set('print', 'pretty'),
        // observe: 'body', // default - response data body is parsed and converted to object
        observe: 'response',
        // observe:'events', // use HttpEventType to check the type of event
        // responseType: 'json',
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.onFetchUsers();
        },
        // error handling using observable
        (error) => {
          this.error = error.error.error || 'network error';
          console.error(error);
        }
      );
  }

  onFetchUsers(): void {
    // take is used to take only the number of values and then unsubscribes
    // exhaustMap waits for the first observable to complete and gives the data
    // exhaustMap replaces the outer observable with the inner
    // this.authService.user
    //   .pipe(
    //     take(1),
    //     exhaustMap((user) => {
    //       return this.http.get<{ [key: string]: User }>(
    //         'https://testang-sam.firebaseio.com/users.json',
    //         { params: new HttpParams().set('auth', user.getToken) }
    //       );
    //     }),
    //     map((response) => {
    //       const usersArray: User[] = [];
    //       for (const key in response) {
    //         if (response.hasOwnProperty(key)) {
    //           usersArray.push({ id: key, ...response[key] });
    //         }
    //       }
    //       return usersArray;
    //     })
    //     // error handling with rxjs
    //     // catchError((error) => {
    //     //   this.errorSub.next(error.error.error);
    //     //   return throwError(error);
    //     // })
    //   )
    this.http
      .get<{ [key: string]: User }>(
        'https://testang-sam.firebaseio.com/users.json'
      )
      .pipe(
        map((response) => {
          const usersArray: User[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              usersArray.push({ id: key, ...response[key] });
            }
          }
          return usersArray;
        })
      )
      .subscribe(
        (response) => {
          this.userList = response;
        },
        // error handling using subject
        (error) => {
          this.errorSub.next(error.error.error);
        }
      );
  }

  onDeleteUser(id: string): void {
    console.log(id);
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
