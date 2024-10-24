import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { ComplexUserAttributeModel } from '../../model/usersource';

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
  usersourceForm!: UntypedFormGroup;

  userAttrCol: string[] = ['Name', 'Map To', 'Actions'];
  complexUserAttrCol: string[] = ['required', 'name', 'friendlyName', 'nameFormat', 'mapTo', 'actions'];

  requireList: string[] = ['No','Yes'];
  externalAttributeList: string[] = ['givenName', 'jobTitle', 'mail', 'surname', 'userPrincipalName'];
  internalAttributeList: string[] = ['groups', 'firstname', 'country', 'department', 'email', 'lastname', 'username'];
  filteredExternalAttributes!: Observable<string[]>;
  filteredInternalAttributes!: Observable<string[]>;

  types: Type[] = [
    { value: 'facebook', viewValue: 'Facebook' },
    { value: 'github', viewValue: 'Github' },
    { value: 'google', viewValue: 'Google' }
  ];

  selectedType = this.types[0].value; // Default type selection

  constructor(
    private formBuilder: UntypedFormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.updateConfigDataForm(this.selectedType);
    this.usersourceForm.get('type')?.valueChanges.subscribe(type => {
      this.selectedType = type;
      this.updateConfigDataForm(type);
    });
    this.usersourceForm.get('name')?.valueChanges.subscribe(name => {
      this.usersourceForm.patchValue({ accountId: name }, { emitEvent: false });
    });

    this.handleAddComplexUserAttribute();

    // this.filteredExternalAttributes = this.externalAttributeControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '', this.externalAttributeList))
    // );

    // this.filteredInternalAttributes = this.internalAttributeControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '', this.internalAttributeList))
    // );

  }

  initializeForm(): void {
    this.usersourceForm = this.formBuilder.group({
      name: ['', Validators.required],
      accountId: [''],
      type: [this.selectedType, Validators.required],
      configData: this.formBuilder.group({}), // Placeholder group for configData fields
      userAttributes: this.formBuilder.group({}),
      complexUserAttributes: this.formBuilder.array([])
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
    const formValue = this.usersourceForm.value;
    const attributesArray = formValue.attributes;

    if (formValue.valid) {
      console.log('Form Data:', this.usersourceForm.value);

      const userAttrib = attributesArray.reduce((acc: any, attribute: any) => {
        acc[attribute.key] = attribute.value;
        return acc;
      }, {});

      const payload = { userAttrib };
      console.log(payload);

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



  addUserAttribute(): void {
    const attributeGroup = this.formBuilder.group({
      key: ['', Validators.required],  // key is required for validation
      value: ['', Validators.required] // value is required for validation
    });
    this.userAttributes.push(attributeGroup);
  }

  removeAttribute(index: number): void {
    this.userAttributes.removeAt(index);
  }

  canAddData(): boolean {
    return this.userAttributes.controls.every(group => group.get('key')?.valid);
  }

  userAttributeKeys() {
    return Object.keys(this.userAttributes.controls);
  }

  get userAttributes(): UntypedFormArray{
    return this.usersourceForm.get('userAttributes') as UntypedFormArray;
  }

  private _filter(value: string, list: string[]): string[] {
    const filterValue = value.toLowerCase();

    const usedKeys = Object.keys(this.userAttributes.controls);

    return list
    .filter(option =>!usedKeys.includes(option))
    .filter(option => option.toLowerCase().includes(filterValue));
  }

  // COMPLEX USER ATTRIBUTE

  get complexUserAttributes(): UntypedFormArray{
    return this.usersourceForm.get('complexUserAttributes') as UntypedFormArray;
  }



  getComplexUserAttributeGroup(){
    return new MatTableDataSource(this.complexUserAttributes.controls);
  }

  handleAddComplexUserAttribute(): void {
    const attributeForm = this.formBuilder.group({
      required: [false, Validators.required],
      name: ['', Validators.required],
      friendlyName: ['', Validators.required],
      nameFormat: ['', Validators.required],
      mappedAs: ['', Validators.required]
    });

    // Add the new form group to the FormArray
    this.complexUserAttributes.push(attributeForm);

  }


  handleRemoveComplexAttribute(index: number): void {
    this.complexUserAttributes.removeAt(index);
  }

}
