export interface PortfolioProfile {
  name: string;
  description: string;
}

export interface SocialLinkItem {
  platform: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

export interface PortfolioCoordinates {
  lat: number;
  lng: number;
}

export interface PortfolioLocation {
  label: string;
  city: string;
  country: string;
  coordinates: PortfolioCoordinates;
  zoom: number;
}

export interface StackToolItem {
  name: string;
  icon: string;
  href?: string;
  ariaLabel: string;
}

export interface StackToolsSection {
  title: string;
  frontend?: StackToolItem[];
  developer?: StackToolItem[];
  backend?: StackToolItem[];
  designer?: StackToolItem[];
}

export interface DesignGalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  href?: string;
  featured: boolean;
  width: number;
  height: number;
}

export interface DesignGallerySection {
  title: string;
  subtitle: string;
  items: DesignGalleryItem[];
}

export interface ExperienceEntry {
  startDate: string;
  endDate: string;
  role: string;
  company: string;
  description?: string;
}

export interface ProjectItem {
  title: string;
  year: string;
  category: string;
  icon: string;
  href: string;
  imageAlt: string;
}

export interface FeaturedStudyCase extends ProjectItem {
  label: string;
  description?: string;
}

export interface PortfolioSectionLabels {
  experienceTitle: string;
  featuredProjectsTitle: string;
  secondaryProjectsTitle: string;
  openProjectLabel: string;
}

export interface PortfolioData {
  profile: PortfolioProfile;
  socialLinks: SocialLinkItem[];
  sections: PortfolioSectionLabels;
  experience: ExperienceEntry[];
  location: PortfolioLocation;
  stackTools: StackToolsSection;
  featuredStudyCase: FeaturedStudyCase;
  featuredProjects: ProjectItem[];
  secondaryProjects: ProjectItem[];
  designGallery: DesignGallerySection;
}
