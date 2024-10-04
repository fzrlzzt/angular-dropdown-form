import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-google-form',
  templateUrl: './google-form.component.html',
  styleUrl: './google-form.component.scss'
})
export class GoogleFormComponent {
  @Input() sourceForm!: UntypedFormGroup;

  googleForm!: UntypedFormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.googleForm = this.formBuilder.group(
      {
      username: [''],
      password: [''],
      });

      if (this.sourceForm.contains('configData')) {
        this.sourceForm.setControl('configData', this.googleForm);
      }

    this.cd.detectChanges();
  }
}
