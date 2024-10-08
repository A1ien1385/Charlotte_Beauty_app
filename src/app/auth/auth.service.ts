import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs";
import { throwError } from "rxjs";

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn: 'root'})

export class AuthService {

constructor(private http: HttpClient) {

}

signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXsEMqNejp0Fi_bNuD_gwUiJ7BoEONgBs', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    ).pipe(catchError(errorRes => {
        let errorMessage = 'An uknown error occurred'
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';  
          }
          return throwError(errorMessage);
    }))}

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXsEMqNejp0Fi_bNuD_gwUiJ7BoEONgBs',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        );

        
    }
}