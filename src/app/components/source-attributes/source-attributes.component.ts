import { ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-source-attributes',
  templateUrl: './source-attributes.component.html',
  styleUrl: './source-attributes.component.scss'
})
export class SourceAttributesComponent implements OnInit{
  userAttributeCol: string[] = ['no', 'value', 'key', 'action']
  dataSource!: MatTableDataSource<any>;

  usersourceForm!: UntypedFormGroup;
  attributeForm!: UntypedFormGroup;
  attributes!: UntypedFormArray;
 
  constructor(
    private formBuilder:UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.usersourceForm = this.formBuilder.group({
      name: ['', Validators.required],
      accountId: [''],
      // type: [this.selectedType, Validators.required],
      configData: this.formBuilder.group({}), // Placeholder group for configData fields
      userAttribute: this.formBuilder.group({}),
    });
    this.attributeForm = this.formBuilder.group({
      attributes: this.formBuilder.array([]) ,
    });

    this.attributes = this.attributeForm.get("attributes") as UntypedFormArray;
    this.dataSource = new MatTableDataSource(this.attributes.controls.map(control => control.value));

    // this.handleAddAttributes();
    // Simulate loading existing form data (for edit case)
    this.loadFormData({
      name: 'Sample User',
      accountId: '12345',
      userAttribute: {
        attr1: 'value1',
        attr2: 'value2',
        attr3: 'value3'
      }
    });
    
  }
 
  newAttribute(key: string = '', value: string = ''): UntypedFormGroup {
    return this.formBuilder.group({
      key: [key, Validators.required],
      value: [value, Validators.required],
    })
  }
 
  handleAddAttributes(key: string = '', value: string = ''): void {
    this.attributes.push(this.newAttribute(key, value));
    this.dataSource.data = this.attributes.controls.map(control => control.value);
  
    this.mapAttributesToUserAttribute();
  }
 
  handleRemoveAttribute(i:number) {
    this.attributes.removeAt(i);
    this.dataSource.data = this.attributes.controls.map(control => control.value);
  
    this.mapAttributesToUserAttribute();
  }

  mapAttributesToUserAttribute(): void {
    const userAttributeGroup = this.usersourceForm.get('userAttribute') as UntypedFormGroup;

    // Clear existing controls in the userAttribute form group
    Object.keys(userAttributeGroup.controls).forEach(key => {
      userAttributeGroup.removeControl(key);
    });

    this.attributes.controls.forEach(control => {
      const key = control.get('key')?.value;
      const value = control.get('value')?.value;

      // if (key && value) {
      if (key ) {
        userAttributeGroup.addControl(key, this.formBuilder.control(value, Validators.required));
      }
    });
  }

  loadFormData(data: any): void {
    // Load static fields
    this.usersourceForm.patchValue({
      name: data.name,
      accountId: data.accountId,
      
    });

    // Map userAttribute data to the attributes form array
    const userAttributeData = data.userAttribute;
    Object.keys(userAttributeData).forEach(key => {
      const value = userAttributeData[key];
      this.handleAddAttributes(key, value);  // Add each key-value pair as a new row in the attributes form
    });

    // Ensure the MatTableDataSource is updated with the new data
    this.dataSource.data = this.attributes.controls.map(control => control.value);
  }
 
  onSubmit() {
    console.log(this.attributeForm.value);
  }
 
}
 
 
export class country {
  id: string;
  name: string;
 
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
 