import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { map, switchMap, startWith, Subject } from 'rxjs';

import {
  ButtonComponent,
  ButtonSize,
  ButtonTextColor,
  ButtonVariant,
  SkillIndicatorComponent
} from '@hrm-monorepo/hrm-lib';

import { UserService } from '../../../../services/shared/user/user.service';
import { SkillService } from '../../../../services/shared/skill/skill.service';
import { AddSkillDialogComponent } from '../../../../shared/components/user/add-skill-dialog/add-skill-dialog.component';
import { UpdateSkillDialogComponent } from '../../../../shared/components/user/update-skill-dialog/update-skill-dialog.component';
import {
  AddProfileSkillInput,
  DeleteProfileSkillInput,
  SkillMastery,
  UpdateProfileSkillInput
} from '../../../../core/models/core.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ButtonComponent, MatIcon, SkillIndicatorComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {
  private readonly userService = inject(UserService);
  private readonly skillService = inject(SkillService);
  private readonly dialog = inject(MatDialog);

  // Constants
  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonTextColor = ButtonTextColor;

  // State
  public readonly deleteMode = signal(false);
  public readonly selectedSkillsToDelete = signal<string[]>([]);
  private readonly refreshTrigger$ = new Subject<void>(); // Триггер для обновления данных

  // Global Data
  public readonly selectedUser = this.userService.selectedUser;
  public readonly authenticatedUser = this.userService.authenticatedUser;
  public readonly isAdmin = this.userService.isAdmin;
  public readonly allAvailableSkills = toSignal(this.skillService.getAllSkills(), { initialValue: [] });
  private readonly skillCategories = toSignal(this.skillService.getSkillCategories(), { initialValue: [] });

  // Computed Logic
  public readonly accountOwner = computed(() => this.selectedUser()?.id === this.authenticatedUser()?.id);

  public readonly userSkills = toSignal(
    toObservable(this.selectedUser).pipe(
      switchMap(user => this.refreshTrigger$.pipe(
        startWith(null),
        map(() => user)
      )),
      switchMap(user => {
        if (!user?.id) return [[]];
        return this.skillService.getUserSkills(user.id).pipe(map(profile => profile.skills));
      })
    ),
    { initialValue: [] }
  );

  public readonly groupedSkills = computed(() => {
    const categories = this.skillCategories();
    const skills = this.userSkills();
    if (!skills.length) return [];

    return categories
      .map(cat => ({ ...cat, skills: skills.filter(s => s.categoryId === cat.id) }))
      .filter(cat => cat.skills.length > 0);
  });

  // Actions
  public toggleDeleteMode(): void {
    this.selectedSkillsToDelete.set([]);
    this.deleteMode.update(v => !v);
  }

  public toggleSelectedSkill(skillName: string): void {
    this.selectedSkillsToDelete.update(current =>
      current.includes(skillName)
        ? current.filter(n => n !== skillName)
        : [...current, skillName]
    );
  }

  public openAddSkillDialog(): void {
    const available = this.allAvailableSkills().filter(s =>
      !this.userSkills().some(u => u.name === s.name)
    );

    const dialogRef = this.dialog.open(AddSkillDialogComponent, {
      width: '40vw',
      data: available
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const input: AddProfileSkillInput = { ...result, userId: this.selectedUser().id };
        this.skillService.addUserSkill(input).subscribe(() => this.refreshTrigger$.next());
      }
    });
  }

  public openUpdateSkillDialog(skill: SkillMastery): void {
    const skillData = this.allAvailableSkills().find(s => s.name === skill.name);

    const dialogRef = this.dialog.open(UpdateSkillDialogComponent, {
      width: '40vw',
      data: skillData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const input: UpdateProfileSkillInput = { ...result, userId: this.selectedUser().id };
        this.skillService.updateProfileSkill(input).subscribe(() => this.refreshTrigger$.next());
      }
    });
  }

  public deleteSkills(): void {
    const input: DeleteProfileSkillInput = {
      userId: this.selectedUser().id,
      name: this.selectedSkillsToDelete()
    };

    this.skillService.deleteProfileSkill(input).subscribe(() => {
      this.toggleDeleteMode();
      this.refreshTrigger$.next();
    });
  }
}
