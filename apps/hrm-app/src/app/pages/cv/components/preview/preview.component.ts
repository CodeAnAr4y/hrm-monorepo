import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { CvProjectService } from '../../../../services/shared/cv-project/cv-project.service';
import { UserService } from '../../../../services/shared/user/user.service';
import {
  ButtonComponent,
  ButtonSize,
  ButtonTextColor,
  ButtonVariant,
  TableComponent,
  TableHeader
} from '@hrm-monorepo/hrm-lib';
import { CvService } from '../../../../services/shared/cv/cv.service';
import { CvSkillsService } from '../../../../services/shared/cv-skills/cv-skills.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SkillService } from '../../../../services/shared/skill/skill.service';
import { DatePipe } from '@angular/common';
import { SnackBarService } from '../../../../services/shared/snack-bar/snack-bar.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-preview',
  imports: [
    ButtonComponent,
    DatePipe,
    TableComponent,
    TranslatePipe
  ],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent {
  @ViewChild('cvContent') cvContent!: ElementRef<HTMLElement>;
  private userService = inject(UserService);
  private cvService = inject(CvService);
  private cvProjectService = inject(CvProjectService);
  private cvSkillsService = inject(CvSkillsService);
  private skillService = inject(SkillService);
  private snackBarService = inject(SnackBarService);


  selectedUser = this.userService.selectedUser;
  selectedCv = this.cvService.selectedCv;
  cvProjects = this.cvProjectService.cvProjects;
  cvSkills = this.cvSkillsService.cvSkills;
  userSkills = this.skillService.userSkills;

  public columns: TableHeader[] = [
    { title: 'CATEGORY', sourceName: 'category', sortable: true },
    { title: 'SKILLS', sourceName: 'skills', sortable: true }
  ];


  private readonly skillCategories = toSignal(this.skillService.getSkillCategories(), { initialValue: [] });
  public readonly groupedCvSkills = computed(() => {
    const categories = this.skillCategories();
    const skills = this.cvSkills();

    if (!skills.length) return [];

    return categories
      .map(cat => ({
        ...cat,
        skills: skills
          .filter(skill => skill.categoryId === cat.id)
          .map(skill => skill.name)
      }))
      .filter(cat => cat.skills.length > 0);
  });

  public readonly groupedUserSkills = computed(() => {
    const categories = this.skillCategories();
    const skills = this.userSkills();
    if (!skills.length) return [];
    return categories
      .map(cat => ({
        ...cat,
        skills: skills
          .filter(skill => skill.categoryId === cat.id)
          .map(skill => skill.name)
      }))
      .filter(cat => cat.skills.length > 0);
  });

  public skillsTable = computed(() => {
    return this.groupedUserSkills().map(skill => ({
      category: skill.name,
      skills: skill.skills.join(', ')
    }));
  });


  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonTextColor = ButtonTextColor;


  public exportPdf() {
    this.snackBarService.openSnackBar('File successfully exported');
    const htmlString = this.prepareHtmlForExport();

    this.cvProjectService.exportPdf({
      html: htmlString,
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
    }).subscribe({
      next: (result) => {
        if (result) {
          window.open(result, '_blank');
        }
      },
      error: (err) => console.error('Export failed', err)
    });
  }

  private prepareHtmlForExport(): string {
    const element = this.cvContent.nativeElement;

    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(style => style.outerHTML)
      .join('');

    return `
      <html lang="en">
        <head>
          ${styles}
          <style>

          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `;
  }
}
