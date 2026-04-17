import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ButtonComponent, ButtonSize, ButtonTextColor, ButtonVariant } from '@hrm-monorepo/hrm-lib';
import { MatIcon } from '@angular/material/icon';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { LanguageService } from '../../../../services/shared/language/language.service';
import { UserService } from '../../../../services/shared/user/user.service';
import {
  AddProfileLanguageInput,
  DeleteProfileLanguageInput,
  LanguageProficiency,
  Proficiency,
  UpdateProfileLanguageInput
} from '../../../../core/models/core.model';
import { MatDialog } from '@angular/material/dialog';
import {
  UpdateLanguageDialogComponent
} from '../../../../shared/components/update-language-dialog/update-language-dialog.component';
import {
  AddLanguageDialogComponent
} from '../../../../shared/components/add-language-dialog/add-language-dialog.component';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-languages',
  imports: [ButtonComponent, MatIcon],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguagesComponent {
  private langService = inject(LanguageService);
  private userService = inject(UserService);
  private dialog = inject(MatDialog);

  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonTextColor = ButtonTextColor;

  public deleteMode: boolean = false;
  public selectedLanguagesToDelete: string[] = [];

  public selectedUser = this.userService.selectedUser;
  public authenticatedUser = this.userService.authenticatedUser;
  public accountOwner = computed(() => this.selectedUser().id === this.authenticatedUser().id);
  public isAdmin = this.userService.isAdmin;

  public allLanguages = toSignal(this.langService.getAllLanguages(), { initialValue: [] });

  public profileLanguages = toSignal(
    toObservable(this.selectedUser).pipe(
      switchMap(user => {
        if (!user?.id) return of([]);
        return this.langService.getProfileLanguages(user.id).pipe(map(lf => [...lf]));
      })
    ),
    { initialValue: [] }
  );

  public toggleDeleteMode() {
    this.selectedLanguagesToDelete = [];
    this.deleteMode = !this.deleteMode;
  }

  public toggleSelectedLanguage(languageName: string) {
    if (this.selectedLanguagesToDelete.includes(languageName)) {
      this.selectedLanguagesToDelete = this.selectedLanguagesToDelete.filter(name => name !== languageName);
    } else {
      this.selectedLanguagesToDelete.push(languageName);
    }
  }

  public openUpdateLanguageDialog(lang: LanguageProficiency) {
    const dialogRef = this.dialog.open(UpdateLanguageDialogComponent, {
      width: '40vw',
      panelClass: 'custom-dialog-container',
      data: this.allLanguages().filter(l => l.name === lang.name)[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const language: UpdateProfileLanguageInput = {
          ...result,
          userId: this.selectedUser().id
        };
        this.langService.updateProfileLanguage(language).subscribe(() => {
          this.userService.selectedUser.update(user => ({ ...user }));
        });
      }
    });
  }

  public openAddLanguageDialog() {
    const dialogRef = this.dialog.open(AddLanguageDialogComponent, {
      width: '40vw',
      panelClass: 'custom-dialog-container',
      data: this.allLanguages()
        .filter(lang => !this.profileLanguages()
          .some((pLang) => pLang.name === lang.name))
    });

    dialogRef.afterClosed().subscribe((result: LanguageProficiency) => {
      if (result) {
        const language: AddProfileLanguageInput = {
          userId: this.selectedUser().id,
          name: result.name,
          proficiency: result.proficiency

        };
        this.langService.addProfileLanguage(language).subscribe(() => {
          this.userService.selectedUser.update(user => ({ ...user }));
        });
      }
    });
  }

  public deleteLanguages() {
    const userId = this.selectedUser().id;
    const languageInput: DeleteProfileLanguageInput = {
      userId,
      name: [...this.selectedLanguagesToDelete]
    };

    this.langService.deleteProfileLanguage(languageInput).subscribe(() => {
      this.deleteMode = false;
      this.selectedLanguagesToDelete = [];
      this.userService.selectedUser.update(user => ({ ...user }));
    });
  }

  public coloredProficiency(lang: Proficiency) {
    switch (lang) {
      case Proficiency.A1:
        return 'var(--proficiency-A, #29b6f6)';
      case Proficiency.A2:
        return 'var(--proficiency-A, #29b6f6)';
      case Proficiency.B1:
        return 'var(--proficiency-B, #66bb6a)';
      case Proficiency.B2:
        return 'var(--proficiency-B, #66bb6a)';
      case Proficiency.C1:
        return 'var(--proficiency-C, #ffb800)';
      case Proficiency.C2:
        return 'var(--proficiency-C, #ffb800)';
      case Proficiency.Native:
        return 'var(--proficiency-native, #C63031FF)';
    }
  }
}
