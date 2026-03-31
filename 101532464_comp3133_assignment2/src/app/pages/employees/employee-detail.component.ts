import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  imports: [RouterLink, NgIf],
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly employeeService = inject(EmployeeService);
  private readonly cdr = inject(ChangeDetectorRef);

  employee?: Employee;
  errorMessage = '';
  loading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      this.errorMessage = 'Invalid employee id.';
      return;
    }

    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employee = employee;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.message ?? 'Failed to load employee';
        this.cdr.detectChanges();
      }
    });

    setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.errorMessage = 'Request timeout while loading employee details.';
        this.cdr.detectChanges();
      }
    }, 8000);
  }
}
