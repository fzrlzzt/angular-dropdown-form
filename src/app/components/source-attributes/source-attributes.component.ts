import { Attribute, ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-source-attributes',
  templateUrl: './source-attributes.component.html',
  styleUrl: './source-attributes.component.scss'
})
export class SourceAttributesComponent implements OnInit{
  userAttributeCol: string[] = ['no', 'value', 'key', 'action']
  complexUserAttributeCol: string[] = ['required', 'friendlyName', 'nameFormat', 'mappedAs', 'action']

  attributeData!: MatTableDataSource<any>;
  complexData!: MatTableDataSource<any>;

  usersourceForm!: UntypedFormGroup;
  attributeForm!: UntypedFormGroup;

  internalAttributeList : string[] = ['firstName', 'lastName', 'username', 'email']
  externalAttributeList : string[] = ['givenName', 'jobTitle', 'mail', 'surname', 'userPrincippalName']

  constructor(
    private formBuilder:UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.usersourceForm = this.formBuilder.group({
      name: ['', Validators.required],
      accountId: [''],
      // type: [this.selectedType, Validators.required],
      configData: this.formBuilder.group({}), 
      userAttributes: this.formBuilder.group({}),
      complexUserAttributes: this.formBuilder.array([])
    });
    this.attributeForm = this.formBuilder.group({
      attributes: this.formBuilder.array([]) ,
    });

    
    this.attributeData = new MatTableDataSource(this.attributes.controls.map(control => control.value));
    this.complexData = new MatTableDataSource(this.complexUserAttributes.controls.map(control => control.value));

    // this.handleAddAttributes();
    // Simulate loading existing form data (for edit case)
    this.loadFormData({
      name: 'Sample User',
      accountId: '12345',
      userAttribute: {
        attr1: 'value1',
        attr2: 'value2',
        attr3: 'value3'
      },
      complexUserAttributes:[
        {
          required: true,
          name: "Samad",
          friendlyName: "Asang",
          nameForrmat: "something",
          mappedAs: "username"
        },
        {
          required: false,
          friendlyName: "Friendly Name 1",
          nameFormat: "Name Format 1",
          mappedAs: "Mapped As 1"
        },
        {
          required: true,
          friendlyName: "Friendly Name 2",
          nameFormat: "Name Format 2",
          mappedAs: "Mapped As 2"
        },
      ]
    });
    
  }

  get attributes(){
    return this.attributeForm.get("attributes") as UntypedFormArray;
  }

  get complexUserAttributes(){
   return this.usersourceForm.get("complexUserAttributes") as UntypedFormArray;
  }
 
  newAttribute(key: string = '', value: string = ''): UntypedFormGroup {
    return this.formBuilder.group({
      key: [key, Validators.required],
      value: [value, Validators.required],
    })
  }

  newComplexAttribute(required:boolean = false, name: string = '', friendlyName: string = '', nameFormat: string = '', mappedAs: string = ''): UntypedFormGroup {
    return this.formBuilder.group({
      required: [required, Validators.required],
      name: [name, Validators.required],
      friendlyName: [friendlyName, Validators.required],
      nameFormat: [nameFormat, Validators.required],
      mappedAs: [mappedAs, Validators.required],
    })
  }
 
  handleAddAttributes(key: string = '', value: string = ''): void {
    this.attributes.push(this.newAttribute(key, value));
    this.attributeData.data = this.attributes.controls.map(control => control.value);
  
    this.mapAttributesToUserAttribute();
  }

  handleAddComplexAttributes(required:boolean = false, name: string = '', friendlyName: string = '', nameFormat: string = '', mappedAs: string = ''): void{
    this.complexUserAttributes.push(this.newComplexAttribute(required, name, friendlyName, nameFormat, mappedAs));
    this.complexData.data = this.complexUserAttributes.controls.map(control => control.value);
  }
 
  handleRemoveAttribute(i:number) {
    this.attributes.removeAt(i);
    this.attributeData.data = this.attributes.controls.map(control => control.value);
  
    this.mapAttributesToUserAttribute();
  }

  handleRemoveComplexAttribute(i:number) {
    this.complexUserAttributes.removeAt(i);
    this.complexData.data = this.complexUserAttributes.controls.map(control => control.value);
  }

  mapAttributesToUserAttribute(): void {
    const userAttributeGroup = this.usersourceForm.get('userAttributes') as UntypedFormGroup;

    // Clear existing controls in the userAttribute form group
    Object.keys(userAttributeGroup.controls).forEach(key => {
      userAttributeGroup.removeControl(key);
    });

    this.attributes.controls.forEach(control => {
      const key = control.get('key')?.value;
      const value = control.get('value')?.value;

      if (key) {
        userAttributeGroup.addControl(key, this.formBuilder.control(value, Validators.required));
      }
    });
  }

  loadFormData(data: any): void {

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

    const complexUserAttributesData = data.complexUserAttributes;
    complexUserAttributesData.forEach((attribute: { required: boolean; friendlyName: string; nameFormat: string; mappedAs: string; }) => {
      const complexAttrib = this.formBuilder.group({
        required: [attribute.required, Validators.required],
        friendlyName: [attribute.friendlyName, Validators.required],
        nameFormat: [attribute.nameFormat],
        mappedAs: [attribute.mappedAs, Validators.required]
      });
      this.complexUserAttributes.push(complexAttrib)
    });

    this.attributeData.data = this.attributes.controls.map(control => control.value);
    this.complexData.data = this.complexUserAttributes.controls.map(control => control.value);
  }

  filteredValues(index: number): Observable<string[]> {
    const control = this.attributes.at(index).get('value');
    return control!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string,this.externalAttributeList) : this.externalAttributeList.slice();
      }),
    );
  }

  filteredKeys(index: number): Observable<string[]> {
    const control = this.attributes.at(index).get('key');

    return control!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.internalAttributeList))
    );
  }

  private _filter(value: string, list: string[]): string[] {
    // console.log('Filtering:', value);
    // console.log('List:', list);
    const filterValue = value.toLowerCase();
    // const usedKeys = this.attributes.controls
    //   .map(control => control.get('key')?.value)
    //   .filter(key => key); // Remove any undefined or null values

      const filteredList = list
      // .filter(option => !usedKeys.includes(option))
      .filter(option => option.toLowerCase().includes(filterValue));

    // console.log('Filtered List:', list);  // Debug line
  return filteredList;
}
 
  onSubmit() {
    console.log(this.attributeForm.value);
  }
 
}
 
