import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import {
  ButtonComponent,
  ButtonSize,
  ButtonTextColor,
  ButtonVariant,
  SkillIndicatorComponent
} from '@hrm-monorepo/hrm-lib';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../../../services/shared/user/user.service';
import { SkillService } from '../../../../services/shared/skill/skill.service';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  AddSkillDialogComponent
} from '../../../../shared/components/user/add-skill-dialog/add-skill-dialog.component';
import {
  AddCvSkillInput,
  DeleteCvSkillInput,
  SkillMastery,
  UpdateCvSkillInput
} from '../../../../core/models/core.model';
import {
  UpdateSkillDialogComponent
} from '../../../../shared/components/user/update-skill-dialog/update-skill-dialog.component';
import { CvSkillsService } from '../../../../services/shared/cv-skills/cv-skills.service';
import { CvService } from '../../../../services/shared/cv/cv.service';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cv-skills',
  imports: [
    ButtonComponent,
    MatIcon,
    SkillIndicatorComponent
  ],
  templateUrl: './cv-skills.component.html',
  styleUrl: './cv-skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvSkillsComponent {
  private readonly userService = inject(UserService);
  private readonly cvService = inject(CvService);
  private readonly cvSkillsService = inject(CvSkillsService);
  private readonly skillService = inject(SkillService);
  private readonly dialog = inject(MatDialog);

  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonTextColor = ButtonTextColor;

  public deleteMode = signal(false);
  public selectedSkillsToDelete = signal<string[]>([]);

  constructor() {
    effect(() => {
      const cvId = this.selectedCv()?.id;
      if (cvId) {
        this.cvSkillsService.getCvSkills(cvId).subscribe();
      }
    });
  }

  public readonly selectedUser = this.userService.selectedUser;
  public readonly selectedCv = this.cvService.selectedCv;
  public readonly authenticatedUser = this.userService.authenticatedUser;
  public readonly isAdmin = this.userService.isAdmin;
  public readonly cvSkills = this.cvSkillsService.cvSkills;

  public readonly allAvailableSkills = toSignal(this.skillService.getAllSkills(), { initialValue: [] });
  private readonly skillCategories = toSignal(this.skillService.getSkillCategories(), { initialValue: [] });

  private readonly cvSkillsLoader = toObservable(this.selectedCv).pipe(
    filter(cv => !!cv?.id),
    switchMap(cv => this.cvSkillsService.getCvSkills(cv.id)),
    takeUntilDestroyed()
  ).subscribe();

  public readonly accountOwner = computed(() => this.selectedUser().id === this.authenticatedUser().id);

  public readonly groupedSkills = computed(() => {
    const categories = this.skillCategories();
    const skills = this.cvSkills();

    if (!skills.length) return [];

    return categories
      .map(cat => ({
        ...cat,
        skills: skills.filter(skill => skill.categoryId === cat.id)
      }))
      .filter(cat => cat.skills.length > 0);
  });

  public toggleDeleteMode(): void {
    this.selectedSkillsToDelete.set([]);
    this.deleteMode.update(v => !v);
  }

  public toggleSelectedSkill(skillName: string): void {
    this.selectedSkillsToDelete.update(current =>
      current.includes(skillName)
        ? current.filter(name => name !== skillName)
        : [...current, skillName]
    );
  }

  public openAddSkillDialog(): void {
    const available = this.allAvailableSkills()
      .filter(skill => !this.cvSkills().some(cvSkill => cvSkill.name === skill.name));

    const dialogRef = this.dialog.open(AddSkillDialogComponent, {
      width: '40vw',
      panelClass: 'custom-dialog-container',
      data: available
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const input: AddCvSkillInput = { ...result, cvId: this.selectedCv().id };
        this.cvSkillsService.addCvSkill(input).subscribe();
      }
    });
  }

  public openUpdateSkillDialog(skill: SkillMastery): void {
    const skillData = this.allAvailableSkills().find(s => s.name === skill.name);

    const dialogRef = this.dialog.open(UpdateSkillDialogComponent, {
      width: '40vw',
      panelClass: 'custom-dialog-container',
      data: skillData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const input: UpdateCvSkillInput = { ...result, cvId: this.selectedCv().id };
        this.cvSkillsService.updateCvSkill(input).subscribe();
      }
    });
  }

  public deleteSkills(): void {
    const skillInput: DeleteCvSkillInput = {
      cvId: this.selectedCv().id,
      name: this.selectedSkillsToDelete()
    };

    this.cvSkillsService.deleteCvSkill(skillInput).subscribe(() => {
      this.toggleDeleteMode();
    });
  }
}
