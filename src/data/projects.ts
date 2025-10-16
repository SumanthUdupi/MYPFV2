export interface Project {
  title: string;
  description: string;
  image: string;
  className: string;
}

export const projects: Project[] = [
  {
    title: 'Project 1',
    description: 'A brief description of Project 1.',
    image: 'https://picsum.photos/seed/project1/800/600',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    title: 'Project 2',
    description: 'A brief description of Project 2.',
    image: 'https://picsum.photos/seed/project2/400/300',
    className: '',
  },
  {
    title: 'Project 3',
    description: 'A brief description of Project 3.',
    image: 'https://picsum.photos/seed/project3/400/300',
    className: '',
  },
  {
    title: 'Project 4',
    description: 'A brief description of Project 4.',
    image: 'https://picsum.photos/seed/project4/400/300',
    className: '',
  },
  {
    title: 'Project 5',
    description: 'A brief description of Project 5.',
    image: 'https://picsum.photos/seed/project5/400/300',
    className: '',
  },
  {
    title: 'Project 6',
    description: 'A brief description of Project 6.',
    image: 'https://picsum.photos/seed/project6/800/400',
    className: 'md:col-span-2',
  },
];