import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TabsComponent } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../services/shared/user/user.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs/operators';
import { CvService } from '../../services/shared/cv/cv.service';

@Component({
  selector: 'app-cv',
  imports: [
    RouterOutlet,
    TabsComponent
  ],
  templateUrl: './cv.page.html',
  styleUrl: './cv.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvPage {
  private route = inject(ActivatedRoute);
  private cvService = inject(CvService);

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

  public tabs = computed(() => {
    const id = this.cvId();
    if (!id) return [];

    return [
      { title: 'Details', link: `/cvs/${id}` },
      { title: 'Skills', link: `/cvs/${id}/skills` },
      { title: 'Projects', link: `/cvs/${id}/projects` },
      { title: 'Preview', link: `/cvs/${id}/preview` },
    ];
  });
}
