import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-github-form',
  templateUrl: './github-form.component.html',
  styleUrl: './github-form.component.scss'
})
export class GithubFormComponent {
  @Input() sourceForm!: UntypedFormGroup;

  form!: UntypedFormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
      username: [''],
      repoUrl: [''],
      age: ['']
      });

    if (this.sourceForm.contains('configData')) {
      this.sourceForm.setControl('configData', this.form);
    }

    this.cd.detectChanges();
  }


}
