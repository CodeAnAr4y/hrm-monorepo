import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  ButtonComponent,
  ButtonSize,
  ButtonTextColor,
  ButtonVariant,
  SkillIndicatorComponent
} from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../../../services/shared/user/user.service';
import { SkillService } from '../../../../services/shared/skill/skill.service';
import { AddSkillDialogComponent } from '../../../../shared/components/add-skill-dialog/add-skill-dialog.component';
import {
  AddProfileSkillInput,
  DeleteProfileSkillInput,
  SkillMastery,
  UpdateProfileSkillInput
} from '../../../../core/models/core.model';
import {
  UpdateSkillDialogComponent
} from '../../../../shared/components/update-skill-dialog/update-skill-dialog.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ButtonComponent, MatIcon, SkillIndicatorComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {
  private userService = inject(UserService);
  private skillService = inject(SkillService);
  private dialog = inject(MatDialog);

  deleteMode: boolean = false;
  selectedSkillsToDelete: string[] = [];

  public selectedUser = this.userService.selectedUser;
  public authenticatedUser = this.userService.authenticatedUser;
  public accountOwner = computed(() => this.selectedUser().id === this.authenticatedUser().id);
  public isAdmin = this.userService.isAdmin;

  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonTextColor = ButtonTextColor;

  public allAvailableSkills = toSignal(this.skillService.getAllSkills(), { initialValue: [] });
  public skillCategories = toSignal(this.skillService.getSkillCategories(), { initialValue: [] });

  public userSkills = toSignal(
    toObservable(this.selectedUser).pipe(
      switchMap(user => {
        if (!user?.id) return of([]);
        return this.skillService.getUserSkills(user.id).pipe(map(profile => profile.skills));
      })
    ),
    { initialValue: [] }
  );

  public groupedSkills = computed(() => {
    const categories = this.skillCategories();
    const skills = this.userSkills();

    if (!skills.length) return [];

    return categories.map(cat => ({
      ...cat, skills: skills.filter(skill => skill.categoryId === cat.id)
    })).filter(cat => cat.skills.length > 0);
  });

  public toggleDeleteMode() {
    this.selectedSkillsToDelete = [];
    this.deleteMode = !this.deleteMode;
  }

  public toggleSelectedSkill(skillName: string) {
    if (this.selectedSkillsToDelete.includes(skillName)) {
      this.selectedSkillsToDelete = this.selectedSkillsToDelete.filter(name => name !== skillName);
    } else {
      this.selectedSkillsToDelete.push(skillName);
    }
  }

  public openAddSkillDialog() {
    const dialogRef = this.dialog.open(AddSkillDialogComponent, {
      width: '40vw',
      panelClass: 'custom-dialog-container',
      data: this.allAvailableSkills()
        .filter(skill => !this.userSkills()
          .some((uSkill) => uSkill.name === skill.name))
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const skill: AddProfileSkillInput = {
          ...result,
          userId: this.selectedUser().id
        };
        this.saveSkill(skill);
      }
    });
  }

  public openUpdateSkillDialog(skill: SkillMastery) {
    const dialogRef = this.dialog.open(UpdateSkillDialogComponent, {
      width: '40vw',
      panelClass: 'custom-dialog-container',
      data: this.allAvailableSkills().filter(s => s.name === skill.name)[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const skill: UpdateProfileSkillInput = {
          ...result,
          userId: this.selectedUser().id
        };
        this.skillService.updateProfileSkill(skill).subscribe(() => {
          this.userService.selectedUser.update(user => ({ ...user }));
        });
      }
    });
  }

  private saveSkill(skill: AddProfileSkillInput) {
    this.skillService.addUserSkill(skill).subscribe(() => {
      this.userService.selectedUser.update(user => ({ ...user }));
    });
  }

  public deleteSkills() {
    const userId = this.selectedUser().id;
    const skillInput: DeleteProfileSkillInput = {
      userId,
      name: [...this.selectedSkillsToDelete]
    };

    this.skillService.deleteProfileSkill(skillInput).subscribe(() => {
      this.deleteMode = false;
      this.selectedSkillsToDelete = [];
      this.userService.selectedUser.update(user => ({ ...user }));
    });
  }
}
