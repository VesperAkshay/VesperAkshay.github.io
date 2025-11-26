export type CursorVariant = 'default' | 'text' | 'button' | 'image';

export interface CursorContextType {
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
}

export interface ProjectLinks {
  demo: string;
  github: string;
  docs: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  logs: string[];
  techStack: string[];
  links: ProjectLinks;
}