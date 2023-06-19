import { SVGProps } from 'react';

function Plus({ width, height, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18.3642 10.2216C18.7547 10.6121 18.7547 11.2453 18.3642 11.6358L12.7073 17.2927C12.3168 17.6832 11.6836 17.6832 11.2931 17.2927C11.2855 17.285 11.278 17.2773 11.2707 17.2695L5.63638 11.6352C5.24585 11.2447 5.24585 10.6115 5.63638 10.221C6.0269 9.83048 6.66007 9.83048 7.05059 10.221L12.0006 15.171L16.95 10.2216C17.3405 9.83108 17.9737 9.83108 18.3642 10.2216Z'
        fill='#5D5D62'
      />
    </svg>
  );
}
export default Plus;