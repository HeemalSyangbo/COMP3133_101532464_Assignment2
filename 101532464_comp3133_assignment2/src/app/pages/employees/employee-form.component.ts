import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly employeeService = inject(EmployeeService);

  mode: 'add' | 'edit' = 'add';
  employeeId = '';
  loading = false;
  errorMessage = '';
  selectedPhotoBase64 = '';

  form = this.fb.nonNullable.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    salary: [1000, [Validators.required, Validators.min(1000)]],
    date_of_joining: ['', [Validators.required]],
    department: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') ?? '';
    this.mode = this.employeeId ? 'edit' : 'add';

    if (this.mode === 'edit') {
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (employee) => {
          this.form.patchValue({
            ...employee,
            date_of_joining: employee.date_of_joining?.slice(0, 10)
          });
        },
        error: (err) => (this.errorMessage = err?.message ?? 'Failed to load employee')
      });
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      this.selectedPhotoBase64 = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedPhotoBase64 = typeof reader.result === 'string' ? reader.result : '';
    };
    reader.readAsDataURL(file);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.mode === 'add' && !this.selectedPhotoBase64) {
      this.errorMessage = 'Employee photo is required when creating a new employee.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const payload = {
      ...this.form.getRawValue(),
      salary: Number(this.form.getRawValue().salary),
      employee_photo: this.selectedPhotoBase64 || undefined
    };

    const request$ =
      this.mode === 'add'
        ? this.employeeService.addEmployee(payload)
        : this.employeeService.updateEmployee(this.employeeId, payload);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/employees');
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.message ?? 'Save failed';
      }
    });
  }
}
