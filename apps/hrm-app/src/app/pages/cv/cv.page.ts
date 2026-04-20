import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TabsComponent } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../services/shared/user/user.service';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { CvService } from '../../services/shared/cv/cv.service';
import { ProjectService } from '../../services/shared/project/project.service';
import { CvProjectService } from '../../services/shared/cv-project/cv-project.service';
import { CvSkillsService } from '../../services/shared/cv-skills/cv-skills.service';
import { SkillService } from '../../services/shared/skill/skill.service';
import { CV } from '../../services/shared/cv/cv.graphql';

@Component({
  selector: 'app-cv',
  imports: [
    RouterOutlet,
    TabsComponent
  ],
  templateUrl: './cv.page.html',
  styleUrl: './cv.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvPage {
  private route = inject(ActivatedRoute);
  private cvService = inject(CvService);
  private cvProjectService = inject(CvProjectService);
  private cvSkillsService = inject(CvSkillsService);
  private skillService = inject(SkillService);

  public cvId = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('cvId')),
      filter((id): id is string => !!id)
    )
  );

  public cv = toSignal(
    toObservable(this.cvId).pipe(
      switchMap(id => this.cvService.getCvById(id!))
    )
  );

  public projects = toSignal(
    toObservable(this.cvId).pipe(
      switchMap(id => this.cvProjectService.getCvProjects(id!))
    )
  );

  public cvSkills = toSignal(
    toObservable(this.cvId).pipe(
      switchMap(id => this.cvSkillsService.getCvSkills(id!))
    )
  );

  public userSkills = toSignal(
    toObservable(this.cv).pipe(
      map(cv => cv?.user?.id),
      filter((id): id is string => !!id),
      switchMap(id => this.skillService.getUserSkills(id)),
      map(profile => profile.skills)
    ),
    { initialValue: [] }
  );

  public tabs = computed(() => {
    const id = this.cvId();
    if (!id) return [];

    return [
      { title: 'Details', link: `/cvs/${id}` },
      { title: 'Skills', link: `/cvs/${id}/skills` },
      { title: 'Projects', link: `/cvs/${id}/projects` },
      { title: 'Preview', link: `/cvs/${id}/preview` }
    ];
  });
}
