import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthPayload, User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';

  signup(username: string, email: string, password: string): Observable<User> {
    return this.http
      .post<{ data?: { signup: AuthPayload }; errors?: { message: string }[] }>(environment.graphqlUri, {
        query: `
          mutation Signup($username: String!, $email: String!, $password: String!) {
            signup(username: $username, email: $email, password: $password) {
              token
              user {
                _id
                username
                email
              }
            }
          }
        `,
        variables: { username, email, password }
      })
      .pipe(
        map((response) => this.unwrap(response, 'signup')),
        map((payload) => {
          this.setSession(payload);
          return payload.user;
        })
      );
  }

  login(identity: string, password: string): Observable<User> {
    return this.http
      .post<{ data?: { login: AuthPayload }; errors?: { message: string }[] }>(environment.graphqlUri, {
        query: `
          query Login($username: String, $email: String, $password: String) {
            login(username: $username, email: $email, password: $password) {
              token
              user {
                _id
                username
                email
              }
            }
          }
        `,
        variables: {
          username: identity,
          email: identity,
          password
        }
      })
      .pipe(
        map((response) => this.unwrap(response, 'login')),
        map((payload) => {
          this.setSession(payload);
          return payload.user;
        })
      );
  }

  isLoggedIn(): boolean {
    return Boolean(localStorage.getItem(this.tokenKey));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setSession(payload: AuthPayload): void {
    localStorage.setItem(this.tokenKey, payload.token);
    localStorage.setItem(this.userKey, JSON.stringify(payload.user));
  }

  private unwrap<T>(response: { data?: Record<string, T>; errors?: { message: string }[] }, key: string): T {
    if (response.errors?.length) {
      throw new Error(response.errors[0].message);
    }
    const value = response.data?.[key];
    if (!value) {
      throw new Error(`Missing ${key} in GraphQL response`);
    }
    return value;
  }
}
