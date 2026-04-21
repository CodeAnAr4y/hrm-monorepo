import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lib-avatar',
  standalone: true,
  imports: [
    MatIcon,
    TranslateModule
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  src = input<string | null | undefined>(null);
  name = input<string>('');
  email = input<string>('');
  metadata = input<string>('');

  size = input<number>(120);
  isEditable = input<boolean>(false);

  imageChanged = output<File>();

  protected isHovered = signal(false);

  get initial(): string {
    return this.name() ? this.name().charAt(0).toUpperCase() :
      (this.email() ? this.email().charAt(0).toUpperCase() : '?');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imageChanged.emit(input.files[0]);
    }
  }
}
