import { ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-source-detail',
  templateUrl: './source-detail.component.html',
  styleUrl: './source-detail.component.scss'
})
export class SourceDetailComponent {
  types: Type[] = [
    { value: 'facebook', viewValue: 'facebook'},
    { value: 'github', viewValue: 'github'},
    { value: 'google', viewValue: 'google'}
  ];
  selectedType = this.types[0].value; // Bind this to the dropdown
  usersourceForm!: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.usersourceForm = this.formBuilder.group({
    name: [''],
    accountId: [''],
    type: [this.selectedType],
    });
  }

  ngOnInit(): void {
    this.onTypeChange();
  }

  onTypeChange(): void {
    this.usersourceForm.get('type')?.valueChanges.subscribe(type => {
      this.selectedType = type;
      this.resetConfigDataForm();
      this.cd.detectChanges();
    });
  }

  onSubmit() {
    console.log(this.usersourceForm.value);
    // Handle form submission logic
  }

  resetConfigDataForm(): void {
    // Remove the existing 'configData' form group if it exists
    if (this.usersourceForm.contains('configData')) {
      this.usersourceForm.removeControl('configData');
    }
    this.usersourceForm.addControl('configData', this.formBuilder.group({}));
  }

  selectType(event: Event) {
    this.selectedType = (event.target as HTMLSelectElement).value;
  }
}
