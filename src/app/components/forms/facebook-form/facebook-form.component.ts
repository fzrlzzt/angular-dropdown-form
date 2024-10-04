import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder,  UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-facebook-form',
  templateUrl: './facebook-form.component.html',
  styleUrl: './facebook-form.component.scss'
})
export class FacebookFormComponent {
  @Input() sourceForm!: UntypedFormGroup;

  facebookForm!: UntypedFormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.facebookForm = this.formBuilder.group(
      {
      enabled: [''],
      useStartTLS: [false],
      connectionTimeout: [0],
      username: [''],
      password: [''],
      ldapUrl: [''],
      ldapDomain: [''],
      baseDn: [''],
      userSearchBase: ['']
      });

      if (this.sourceForm.contains('configData')) {
        this.sourceForm.setControl('configData', this.facebookForm);
      }

      this.cd.detectChanges();
  }
}
