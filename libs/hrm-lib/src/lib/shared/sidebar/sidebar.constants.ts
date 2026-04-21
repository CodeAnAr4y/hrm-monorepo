export interface NavLink {
  name: string;
  icon?: string;
  to?: string;
  isDivider?: boolean;
}

export const ADMIN_LINKS: NavLink[] = [
  { name: 'sidebar.tabs.employees', icon: 'group', to: '/users' },
  { name: 'sidebar.tabs.projects', icon: 'folder_copy', to: '/projects' },
  { name: 'sidebar.tabs.cvs', icon: 'contact_page', to: '/cvs' },
  { name: 'divider', isDivider: true },
  { name: 'sidebar.tabs.departments', icon: 'domain', to: '/departments' },
  { name: 'sidebar.tabs.positions', icon: 'work_outline', to: '/positions' },
  { name: 'sidebar.tabs.skills', icon: 'trending_up', to: '/skills' },
  { name: 'sidebar.tabs.languages', icon: 'translate', to: '/languages' },
];

export const USER_LINKS: NavLink[] = [
  { name: 'sidebar.tabs.employees', icon: 'group', to: '/users' },
  { name: 'sidebar.tabs.skills', icon: 'trending_up', to: '/skills' },
  { name: 'sidebar.tabs.languages', icon: 'translate', to: '/languages' },
  { name: 'sidebar.tabs.cvs', icon: 'contact_page', to: '/cvs' },
];
