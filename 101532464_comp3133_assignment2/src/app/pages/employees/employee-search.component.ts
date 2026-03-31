import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-search',
  imports: [ReactiveFormsModule, NgFor, NgIf, RouterLink],
  templateUrl: './employee-search.component.html'
})
export class EmployeeSearchComponent {
  private readonly fb = inject(FormBuilder);
  private readonly employeeService = inject(EmployeeService);

  form = this.fb.nonNullable.group({
    designation: [''],
    department: ['']
  });

  results: Employee[] = [];
  errorMessage = '';

  search(): void {
    const { designation, department } = this.form.getRawValue();
    this.employeeService.searchEmployees(designation, department).subscribe({
      next: (items) => {
        this.errorMessage = '';
        this.results = items;
      },
      error: (err) => {
        this.results = [];
        this.errorMessage = err?.message ?? 'Search failed';
      }
    });
  }
}
