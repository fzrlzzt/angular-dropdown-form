import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-google-form',
  templateUrl: './google-form.component.html',
  styleUrl: './google-form.component.scss'
})
export class GoogleFormComponent {
  @Input() sourceForm!: UntypedFormGroup;

  googleForm!: UntypedFormGroup;

  scopes: string[] = [];
  responseModes: string[] = [];
  responseTypes: string[] = [];
  preferredAlgorithms: string[] = [];
  clientAuthMethods: string[] = [];

  provider = 'https://rouzic.nextlabs.com:444/cas/oidc';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ){}

  ngOnInit(): void {
    this.googleForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        scope: [''],
        responseMode: [''],
        responseType: [''],
        preferredAlgorithm: [''],
        clientAuthMethod: this.formBuilder.array([])
      });

      if (this.sourceForm.contains('configData')) {
        this.sourceForm.setControl('configData', this.googleForm);
      }
  }

  connectToOpenID(): void {
    // Replace with your OpenID provider's configuration endpoint
    this.http.get(this.provider + '/.well-known/openid-configuration').subscribe((config: any) => {
      this.scopes = config.scopes_supported || [];
      this.responseModes = config.response_modes_supported || [];
      this.responseTypes = config.response_types_supported || [];
      this.preferredAlgorithms = config.id_token_signing_alg_values_supported || [];
      this.clientAuthMethods = config.token_endpoint_auth_methods_supported || [];

    this.googleForm.patchValue({
      scope: this.scopes[0] || null,
      responseMode: this.responseModes[0] || null,
      responseType: this.responseTypes[0] || null,
      preferredAlgorithm: this.preferredAlgorithms[0] || null,
    });

    const clientAuthFormArray = this.googleForm.get('clientAuthMethod') as FormArray;
      clientAuthFormArray.clear(); // Clear existing controls

      this.clientAuthMethods.forEach(() => clientAuthFormArray.push(this.formBuilder.control(false)));
    });
  }
}
