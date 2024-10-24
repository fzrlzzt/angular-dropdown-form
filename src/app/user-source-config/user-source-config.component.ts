import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-source-config',
  templateUrl: './user-source-config.component.html',
  styleUrl: './user-source-config.component.scss'
})
export class UserSourceConfigComponent implements OnInit {
  usersourceForm!: UntypedFormGroup;

  isMultipleAzureADAllowed: boolean = false;
  isMultipleSAMLDAllowed: boolean = false;
  isSkyDRMInstalled: boolean = false
  isEditMode: boolean = false;
  accountIdEdited: boolean = false;
  selectedType: string = 'AD';

  configTypes = [
    { name: "Active Directory/LDAP", value: 'LDAP' },
    { name: "Microsoft Azure AD", value: 'AZURE' },
    { name: "OpenID Connect", value: 'OIDC' },
    { name: "SAML 2.0", value: 'SAML2' }
  ];
  responseModes = [''];
  responseTypes = [];
  autoRedirectTypes = [
    { name: "None", value: "NONE" },
    { name: "Client", value: "CLIENT" },
    { name: "Server", value: "SERVER" }
  ];
  callbackUrlTypes = [
    { name: "Path Parameter", value: "PATH_PARAMETER" },
    { name: "Query Parameter", value: "QUERY_PARAMETER" },
    { name: "None", value: "NONE" }
  ];
  supportedScopes = [];
  supportedClientAuthenticationMethods = [];
  signingAlgorithms = [];
  authenticationContextClassReferences = [
    { name: "Internet Protocol", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:InternetProtocol" },
    { name: "Internet Protocol Password", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:InternetProtocolPassword" },
    { name: "Kerberos", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:Kerberos" },
    { name: "Mobile One Factor Unregistered", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:MobileOneFactorUnregistered" },
    { name: "Mobile Two Factor Unregistered", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:MobileTwoFactorUnregistered" },
    { name: "Mobile One Factor Contract", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:MobileOneFactorContract" },
    { name: "Mobile Two Factor Contract", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:MobileTwoFactorContract" },
    { name: "Password", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:Password" },
    { name: "Password Protected Transport", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport" },
    { name: "Previous Session", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:PreviousSession" },
    { name: "X509", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:X509" },
    { name: "PGP", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:PGP" },
    { name: "SPKI", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:SPKI" },
    { name: "XML DSig", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:XMLDSig" },
    { name: "Smartcard", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:Smartcard" },
    { name: "Smartcard PKI", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:SmartcardPKI" },
    { name: "Software PKI", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:SoftwarePKI" },
    { name: "Telephony", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:Telephony" },
    { name: "Nomad Telephony", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:NomadTelephony" },
    { name: "Personal Telephony", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:PersonalTelephony" },
    { name: "Authenticated Telephony", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:AuthenticatedTelephony" },
    { name: "Secure Remote Password", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:SecureRemotePassword" },
    { name: "TLS Client", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:TLSClient" },
    { name: "Time Sync Token", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:TimeSyncToken" },
    { name: "unspecified", value: "urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified" }
  ];
  authenticationContextComparisonTypes = [
    { name: "exact", value: "exact" },
    { name: "minimum", value: "minimum" },
    { name: "maximum", value: "maximum" },
    { name: "better", value: "better" }
  ];
  nameIdPolicyFormats = [
    { name: "SAML 1.1: unspecified", value: "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified" },
    { name: "SAML 1.1: emailAddress", value: "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress" },
    { name: "SAML 1.1: WindowsDomainQualifiedName", value: "urn:oasis:names:tc:SAML:1.1:nameid-format:WindowsDomainQualifiedName" },
    { name: "SAML 1.1: X509SubjectName", value: "urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName" },
    { name: "SAML 2.0: entity", value: "urn:oasis:names:tc:SAML:2.0:nameid-format:entity" },
    { name: "SAML 2.0: kerberos", value: "urn:oasis:names:tc:SAML:2.0:nameid-format:kerberos" },
    { name: "SAML 2.0: persistent", value: "urn:oasis:names:tc:SAML:2.0:nameid-format:persistent" },
    { name: "SAML 2.0: transient", value: "urn:oasis:names:tc:SAML:2.0:nameid-format:transient" }
  ];
  signatureAlgorithms = [
    { name: "RSA with SHA1", value: "http://www.w3.org/2000/09/xmldsig#rsa-sha1" },
    { name: "RSA with SHA224", value: "http://www.w3.org/2001/04/xmldsig-more#rsa-sha224" },
    { name: "RSA with SHA256", value: "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256" },
    { name: "RSA with SHA384", value: "http://www.w3.org/2001/04/xmldsig-more#rsa-sha384" },
    { name: "RSA with SHA512", value: "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512" }
  ];
  signatureReferenceDigestMethods = [
    { name: "SHA1", value: "http://www.w3.org/2000/09/xmldsig#sha1" },
    { name: "SHA224", value: "http://www.w3.org/2001/04/xmldsig-more#sha224" },
    { name: "SHA256", value: "http://www.w3.org/2001/04/xmlenc#sha256" },
    { name: "SHA384", value: "http://www.w3.org/2001/04/xmldsig-more#sha384" },
    { name: "SHA512", value: "http://www.w3.org/2001/04/xmlenc#sha512" }
  ];
  signatureCanonicalizationAlgorithms = [
    { name: "Canonical XML 1.0 (omit comments)", value: "http://www.w3.org/TR/2001/REC-xml-c14n-20010315" },
    { name: "Canonical XML 1.0 (with comments)", value: "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments" },
    { name: "Canonical XML 1.1 (omit comments)", value: "http://www.w3.org/2006/12/xml-c14n11" },
    { name: "Canonical XML 1.1 (with comments)", value: "http://www.w3.org/2006/12/xml-c14n11#WithComments" },
    { name: "Exclusive XML Canonicalization 1.0 (omit comments)", value: "http://www.w3.org/2001/10/xml-exc-c14n#" },
    { name: "Exclusive XML Canonicalization 1.0 (with comments)", value: "http://www.w3.org/2001/10/xml-exc-c14n#WithComments" }
  ];
  attributeNameFormats = [
    "urn:oasis:names:tc:SAML:2.0:attrname-format:basic",
    "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified",
    "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"
  ];
  requiredAttributeOptions = [
    { name: "Yes", value: true },
    { name: "No", value: false }
  ];

  constructor(
    private formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.usersourceForm = this.formBuilder.group({
      name: ['', Validators.required],
      accountId: [''],
      type: [this.selectedType, Validators.required],
      configData: this.formBuilder.group({}), // Placeholder group for configData fields
      userAttributes: this.formBuilder.group({}),
      complexUserAttributes: this.formBuilder.array([])
    });
  }

  onSubmit(): void {
    const form = this.usersourceForm.value;
    var proceed = true;

    if(form.invalid){
      form.setDirty();
      for ( var field in form) {
        for (var field in form) {
          if (field[0] == '$') continue;
          form[field].$touched = true;
        }
        proceed = false;
      }
    }
  }
}
