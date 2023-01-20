import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDb4Q05Uu036F7kV2n6lGNwfv04mY7qNc`;

    console.log(email, password);

    return this.http
      .post<AuthResponseData>(url, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';

          if (!errorRes.error || !errorRes.error.error)
            return throwError(errorMessage);

          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already!';
              break;
          }

          return throwError(errorMessage);
        })
      );
  }
}
