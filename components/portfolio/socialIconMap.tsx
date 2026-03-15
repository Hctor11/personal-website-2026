import type { ComponentType, SVGProps } from "react";
import { Dribbble, Github, Linkedin } from "lucide-react";

type SocialIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

type SocialIconComponent = ComponentType<SocialIconProps>;

function BehanceIcon({
  size = 18,
  className,
  ...props
}: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M4.75 7.25H10.15C11.93 7.25 13.2 8.31 13.2 9.86C13.2 10.97 12.57 11.73 11.69 12.05C12.95 12.3 13.9 13.25 13.9 14.66C13.9 16.6 12.41 17.75 10.22 17.75H4.75V7.25Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.2 9.5H9.65C10.38 9.5 10.82 9.88 10.82 10.49C10.82 11.1 10.38 11.5 9.65 11.5H7.2V9.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.2 13.5H9.92C10.82 13.5 11.35 13.95 11.35 14.66C11.35 15.39 10.82 15.83 9.92 15.83H7.2V13.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.4 14.14C15.4 11.89 16.81 10.44 18.95 10.44C20.93 10.44 22.23 11.83 22.23 13.92V14.57H17.75C17.84 15.57 18.5 16.17 19.47 16.17C20.12 16.17 20.62 15.92 20.95 15.46"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.65 7.74H21.18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const socialIconMap = {
  linkedin: Linkedin,
  dribbble: Dribbble,
  behance: BehanceIcon,
  github: Github,
} satisfies Record<string, SocialIconComponent>;

export type SocialIconKey = keyof typeof socialIconMap;

export function hasMappedSocialIcon(icon: string): icon is SocialIconKey {
  return icon in socialIconMap;
}
