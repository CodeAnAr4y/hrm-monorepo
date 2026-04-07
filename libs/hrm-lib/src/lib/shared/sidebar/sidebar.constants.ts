export interface NavLink {
  name: string;
  icon?: string;
  to?: string;
  isDivider?: boolean;
}

export const ADMIN_LINKS: NavLink[] = [
  { name: 'Employees', icon: 'group', to: '/users' },
  { name: 'Projects', icon: 'folder_copy', to: '/projects' },
  { name: 'CVs', icon: 'contact_page', to: '/cvs' },
  { name: 'divider', isDivider: true },
  { name: 'Departments', icon: 'domain', to: '/departments' },
  { name: 'Positions', icon: 'work_outline', to: '/positions' },
  { name: 'Skills', icon: 'trending_up', to: '/skills' },
  { name: 'Languages', icon: 'translate', to: '/languages' },
];

export const USER_LINKS: NavLink[] = [
  { name: 'Employees', icon: 'group', to: '/users' },
  { name: 'Skills', icon: 'trending_up', to: '/skills' },
  { name: 'Languages', icon: 'translate', to: '/languages' },
  { name: 'CVs', icon: 'contact_page', to: '/cvs' },
];
