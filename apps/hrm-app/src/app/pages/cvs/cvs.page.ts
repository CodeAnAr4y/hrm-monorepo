import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { TableComponent, TableHeader, TableItem, TableType } from '@hrm-monorepo/hrm-lib';
import { CvService } from '../../services/shared/cv/cv.service';

interface CvTable extends TableItem {
  name: string;
  education: string;
  email: string;
  description: string;
  skills: string[];
}

@Component({
  selector: 'app-cvs',
  imports: [
    TableComponent
  ],
  templateUrl: './cvs.page.html',
  styleUrl: './cvs.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvsPage implements OnInit {
  private cvService = inject(CvService);

  protected readonly TableType = TableType;
  public columns: TableHeader[] = [
    { title: 'Name', sourceName: 'name', sortable: true },
    { title: 'Education', sourceName: 'education', sortable: true },
    { title: 'Employee', sourceName: 'email', sortable: true },
    { title: '', sourceName: 'actions', sortable: false, type: 'action' }
  ];

  public cvs = this.cvService.userCvs;
  public cvsTableData = computed(() => {
    const cvs = this.cvs();
    const cvsTableData: CvTable[] = cvs.map(cv => ({
      id: cv.id,
      name: cv.name,
      education: cv.education || '',
      description: cv.description,
      email: cv.user?.email || '',
      skills: cv.skills.map(skill => skill.name)
    }))

    console.log(cvsTableData);

    return cvsTableData;
  })

  ngOnInit() {
    this.cvService.getCvs().subscribe();
  }

  // public cvs = signal<Cv[]>([
  //   {
  //     id: '1',
  //     name: 'Software Engineer with 5+ years of experience',
  //     education: 'Computer Systems Design',
  //     email: 'thorn_pear@icloud.com',
  //     description: 'Highly motivated and experienced Software Engineer with 5+ years of proven success in leading and developing robust and scalable applications. Adept at leveraging React, Node.js, Three.js, and WebGL to create innovative and visually appealing user interfaces.',
  //     tags: ['React', 'WebGL', 'Python']
  //   },
  //   {
  //     id: '2',
  //     name: 'Senior Frontend Developer',
  //     education: 'MSc in Computer Science',
  //     email: 'dev.lead@company.com',
  //     description: 'Passionate about delivering high-quality solutions and contributing to the success of dynamic projects. Strong leadership and mentoring skills, effectively guiding junior developers and fostering a collaborative team environment.',
  //     tags: ['qwe']
  //   },
  //   {
  //     id: '3',
  //     name: 'UX/UI Designer',
  //     education: 'Graphic Design Institute',
  //     email: 'design.hero@creative.io',
  //     description: 'Adept at architecting complex systems, ensuring efficient performance, and adhering to best practices. Focused on creating intuitive user experiences that drive engagement and satisfaction.',
  //     tags: ['qwe', 'asd', 'zxc']
  //   }
  // ]);

  public handleAddItem() {
    console.log('Add item clicked');
  }

  public handleUpdate(id: string) {
    console.log('Update item', id);
  }

}
