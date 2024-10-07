import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-source-detail',
  templateUrl: './source-detail.component.html',
  styleUrls: ['./source-detail.component.scss']
})
export class SourceDetailComponent implements OnInit {
  types: Type[] = [
    { value: 'facebook', viewValue: 'Facebook' },
    { value: 'github', viewValue: 'Github' },
    { value: 'google', viewValue: 'Google' }
  ];

  selectedType = this.types[0].value; // Default type selection
  usersourceForm!: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Initialize the form with default values and config structure
    this.initializeForm();

    // Set up dynamic form controls based on selected type
    this.updateConfigDataForm(this.selectedType);

    // Listen for type changes to dynamically update the configData form group
    this.usersourceForm.get('type')?.valueChanges.subscribe(type => {
      this.selectedType = type;
      this.updateConfigDataForm(type);
    });

    this.usersourceForm.get('name')?.valueChanges.subscribe(name => {
      this.usersourceForm.patchValue({ accountId: name }, { emitEvent: false });
    });
  }

  initializeForm(): void {
    this.usersourceForm = this.formBuilder.group({
      name: ['', Validators.required],
      accountId: [''],
      type: [this.selectedType, Validators.required],
      configData: this.formBuilder.group({}) // Placeholder group for configData fields
    });
  }

  updateConfigDataForm(type: string): void {
    // Remove existing configData group if present
    this.usersourceForm.removeControl('configData');

    // Listen for type changes to dynamically notify child components to update the form
    this.usersourceForm.get('type')?.valueChanges.subscribe(type => {
      this.selectedType = type;
      // Clear existing configData in the main form before letting the child reinitialize it.
      (this.usersourceForm.get('configData') as UntypedFormGroup).reset();
    });

    // Re-add the configData group to the main form
    this.usersourceForm.addControl('configData', this.formBuilder.group({}));

    // Trigger change detection manually to update UI (if needed)
    this.cd.detectChanges();
  }

  onSubmit(): void {
    if (this.usersourceForm.valid) {
      console.log('Form Data:', this.usersourceForm.value);
    } else {
      console.log('Form is invalid');
      this.usersourceForm.markAllAsTouched();
    }
  }

  selectType(event: Event): void {
    this.selectedType = (event.target as HTMLSelectElement).value;
    this.usersourceForm.patchValue({ type: this.selectedType });
    this.updateConfigDataForm(this.selectedType);
  }
}
