import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop'; // Добавили toObservable
import { SkillIndicatorComponent } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../../../services/shared/user/user.service';
import { SkillService } from '../../../../services/shared/skill/skill.service';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SkillIndicatorComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {
  private userService = inject(UserService);
  private skillService = inject(SkillService);

  public selectedUser = this.userService.selectedUser;

  public skillCategories = toSignal(
    this.skillService.getSkillCategories(),
    { initialValue: [] }
  );

  public groupedSkills = computed(() => {
    const categories = this.skillCategories();
    const skills = this.userSkills();

    if (!categories.length || !skills.length) return [];

    return categories.map(cat => ({
      ...cat,
      skills: skills.filter(skill => skill.categoryId === cat.id)
    })).filter(cat => cat.skills.length > 0);
  });

  public userSkills = toSignal(
    toObservable(this.userService.selectedUser).pipe(
      switchMap(user => {
        if (!user?.id) return of([]);
        return this.skillService.getUserSkills(user.id).pipe(
          map(profile => profile.skills)
        );
      })
    ),
    { initialValue: [] }
  );
}
