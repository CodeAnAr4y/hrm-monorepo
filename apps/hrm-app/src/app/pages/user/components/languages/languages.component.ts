import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-languages',
  imports: [],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagesComponent {}
