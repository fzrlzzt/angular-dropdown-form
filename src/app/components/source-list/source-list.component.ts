import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrl: './source-list.component.scss'
})
export class SourceListComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;

  authContexts: string[] = [
    'Internet Protocol',
    'Internet Protocol Password',
    'Kerberos',
    'Mobile One Factor Unregistered',
    'Mobile Two Factor Unregistered',
    'Mobile One Factor Contract',
    'Mobile Two Factor Contract',
    'Password',
    'Password Protected Transport',
    'Previous Session',
    'X509',
    'PGP',
    'SPKI',
    'XML DSig',
    'Smartcard',
    'Smartcard PKI',
    'Software PKI',
    'Telephony',
    'Nomad Telephony',
    'Personal Telephony',
    'Authenticated Telephony',
    'Secure Remote Password',
    'TLS Client',
    'Time Sync Token',
    'unspecified'
  ];
}
