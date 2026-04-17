import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TableComponent, TableHeader, TableItem } from '@hrm-monorepo/hrm-lib';

interface Employee extends TableItem {
  name: string;
  education: string;
  email: string;
  description: string;
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
export class CvsPage {
  columns: TableHeader[] = [
    { title: 'Name', sourceName: 'name', sortable: true },
    { title: 'Education', sourceName: 'education', sortable: true },
    { title: 'Employee', sourceName: 'email', sortable: true }
  ];

  employees = signal<Employee[]>([
    {
      id: '1',
      name: 'Software Engineer with 5+ years of experience',
      education: 'Computer Systems Design',
      email: 'thorn_pear@icloud.com',
      description: 'Highly motivated and experienced Software Engineer with 5+ years of proven success in leading and developing robust and scalable applications. Adept at leveraging React, Node.js, Three.js, and WebGL to create innovative and visually appealing user interfaces.'
    },
    {
      id: '2',
      name: 'Senior Frontend Developer',
      education: 'MSc in Computer Science',
      email: 'dev.lead@company.com',
      description: 'Passionate about delivering high-quality solutions and contributing to the success of dynamic projects. Strong leadership and mentoring skills, effectively guiding junior developers and fostering a collaborative team environment.'
    },
    {
      id: '3',
      name: 'UX/UI Designer',
      education: 'Graphic Design Institute',
      email: 'design.hero@creative.io',
      description: 'Adept at architecting complex systems, ensuring efficient performance, and adhering to best practices. Focused on creating intuitive user experiences that drive engagement and satisfaction.'
    }
  ]);

  handleAddItem() {
    console.log('Add item clicked');
  }

  handleUpdate(id: string) {
    console.log('Update item', id);
  }
}
