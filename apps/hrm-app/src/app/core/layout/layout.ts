import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['ru', 'en']);
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }
}
