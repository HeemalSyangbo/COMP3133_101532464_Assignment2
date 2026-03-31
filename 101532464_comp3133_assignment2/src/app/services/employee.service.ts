import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface EmployeePayload {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  designation: string;
  salary: number;
  date_of_joining: string;
  department: string;
  employee_photo?: string;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  getAllEmployees(): Observable<Employee[]> {
    return this.http
      .post<{ data?: { getAllEmployees: Employee[] }; errors?: { message: string }[] }>(environment.graphqlUri, {
        query: `
          query {
            getAllEmployees {
              _id
              first_name
              last_name
              email
              gender
              designation
              salary
              date_of_joining
              department
              employee_photo
              created_at
              updated_at
            }
          }
        `
      }, { headers: this.getAuthHeaders() })
      .pipe(map((response) => this.unwrapArray(response, 'getAllEmployees')));
  }

  getEmployeeById(eid: string): Observable<Employee> {
    return this.http
      .post<{ data?: { searchEmployeeByEid: Employee }; errors?: { message: string }[] }>(environment.graphqlUri, {
        query: `
          query GetEmployee($eid: ID!) {
            searchEmployeeByEid(eid: $eid) {
              _id
              first_name
              last_name
              email
              gender
              designation
              salary
              date_of_joining
              department
              employee_photo
              created_at
              updated_at
            }
          }
        `,
        variables: { eid }
      }, { headers: this.getAuthHeaders() })
      .pipe(map((response) => this.unwrap(response, 'searchEmployeeByEid')));
  }

  searchEmployees(designation: string, department: string): Observable<Employee[]> {
    return this.http
      .post<
        { data?: { searchEmployeeByDesignationOrDepartment: Employee[] }; errors?: { message: string }[] }
      >(environment.graphqlUri, {
        query: `
          query SearchEmployees($designation: String, $department: String) {
            searchEmployeeByDesignationOrDepartment(designation: $designation, department: $department) {
              _id
              first_name
              last_name
              email
              gender
              designation
              salary
              date_of_joining
              department
              employee_photo
            }
          }
        `,
        variables: {
          designation: designation || null,
          department: department || null
        }
      }, { headers: this.getAuthHeaders() })
      .pipe(map((response) => this.unwrapArray(response, 'searchEmployeeByDesignationOrDepartment')));
  }

  addEmployee(payload: EmployeePayload): Observable<Employee> {
    return this.http
      .post<{ data?: { addEmployee: Employee }; errors?: { message: string }[] }>(environment.graphqlUri, {
        query: `
        mutation AddEmployee(
          $first_name: String!
          $last_name: String!
          $email: String!
          $gender: String!
          $designation: String!
          $salary: Float!
          $date_of_joining: String!
          $department: String!
          $employee_photo: String
        ) {
          addEmployee(
            first_name: $first_name
            last_name: $last_name
            email: $email
            gender: $gender
            designation: $designation
            salary: $salary
            date_of_joining: $date_of_joining
            department: $department
            employee_photo: $employee_photo
          ) {
            _id
            first_name
            last_name
            email
            employee_photo
          }
        }
      `,
        variables: payload
      }, { headers: this.getAuthHeaders() })
      .pipe(map((response) => this.unwrap(response, 'addEmployee')));
  }

  updateEmployee(eid: string, payload: EmployeePayload): Observable<Employee> {
    return this.http
      .post<{ data?: { updateEmployeeByEid: Employee }; errors?: { message: string }[] }>(environment.graphqlUri, {
        query: `
        mutation UpdateEmployee(
          $eid: ID!
          $first_name: String
          $last_name: String
          $email: String
          $gender: String
          $designation: String
          $salary: Float
          $date_of_joining: String
          $department: String
          $employee_photo: String
        ) {
          updateEmployeeByEid(
            eid: $eid
            first_name: $first_name
            last_name: $last_name
            email: $email
            gender: $gender
            designation: $designation
            salary: $salary
            date_of_joining: $date_of_joining
            department: $department
            employee_photo: $employee_photo
          ) {
            _id
            first_name
            last_name
            email
            employee_photo
          }
        }
      `,
        variables: { eid, ...payload }
      }, { headers: this.getAuthHeaders() })
      .pipe(map((response) => this.unwrap(response, 'updateEmployeeByEid')));
  }

  deleteEmployee(eid: string): Observable<Employee> {
    return this.http
      .post<{ data?: { deleteEmployeeByEid: Employee }; errors?: { message: string }[] }>(environment.graphqlUri, {
        query: `
          mutation DeleteEmployee($eid: ID!) {
            deleteEmployeeByEid(eid: $eid) {
              _id
            }
          }
        `,
        variables: { eid }
      }, { headers: this.getAuthHeaders() })
      .pipe(map((response) => this.unwrap(response, 'deleteEmployeeByEid')));
  }

  private unwrap<T>(response: { data?: Record<string, T>; errors?: { message: string }[] }, key: string): T {
    if (response.errors?.length) {
      throw new Error(response.errors[0].message);
    }
    const value = response.data?.[key];
    if (!value) throw new Error(`Missing ${key} in GraphQL response`);
    return value;
  }

  private unwrapArray<T>(
    response: { data?: Record<string, T[]>; errors?: { message: string }[] },
    key: string
  ): T[] {
    if (response.errors?.length) {
      throw new Error(response.errors[0].message);
    }
    return response.data?.[key] ?? [];
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }
}
