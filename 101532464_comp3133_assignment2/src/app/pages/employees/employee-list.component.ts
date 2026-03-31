import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  private readonly cdr = inject(ChangeDetectorRef);

  employees: Employee[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.errorMessage = '';
    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => {
        this.loading = false;
        this.employees = employees;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.message ?? 'Failed to load employees';
        this.cdr.detectChanges();
      }
    });

    setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.errorMessage = 'Request timeout: cannot reach backend at http://localhost:4000/graphql';
        this.cdr.detectChanges();
      }
    }, 8000);
  }

  deleteEmployee(id: string): void {
    if (!confirm('Delete this employee?')) return;

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.loadEmployees(),
      error: (err) => {
        this.errorMessage = err?.message ?? 'Delete failed';
      }
    });
  }
}
