import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ButtonComponent, ButtonSize, ButtonVariant, InputComponent, TextAreaComponent } from '@hrm-monorepo/hrm-lib';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CvService } from '../../../../services/shared/cv/cv.service';
import { UpdateCvInput } from '../../../../core/models/core.model';
import { SnackBarService } from '../../../../services/shared/snack-bar/snack-bar.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    TextAreaComponent,
    TranslatePipe
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent {
  private cvService = inject(CvService);
  private snackBarService = inject(SnackBarService);
  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonSize = ButtonSize;

  private selectedCv = this.cvService.selectedCv;

  private initialValue: any;

  public cvForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    education: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null, [Validators.required])
  });

  constructor() {
    effect(() => {
      const cv = this.selectedCv();
      this.cvForm.patchValue({
        name: cv.name,
        education: cv.education,
        description: cv.description
      });
      this.initialValue = this.cvForm.getRawValue();
    });
  }

  public isUnchanged() {
    return JSON.stringify(this.initialValue) === JSON.stringify(this.cvForm.getRawValue());
  }

  public updateCvData() {
    const cvData: UpdateCvInput = {
      cvId: this.selectedCv().id,
      name: this.cvForm.value.name!,
      education: this.cvForm.value.education!,
      description: this.cvForm.value.description!
    };

    this.cvService.updateCv(cvData).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('CV successfully updated!');
        this.cvService.getCvs().subscribe()
      },
      error: err => {
        this.snackBarService.openSnackBar('Error occured: ' + err.message);
      }
    });
  }

}
