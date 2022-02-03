import { SVGAttribs } from '@/types/mapped';

export default function Clock({
  className,
  ...props
}: SVGAttribs<'className' | 'aria-hidden'>) {
  return (
    <svg
      className={`${className}`}
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path
        d='M17.0336 2.03787C16.6909 2.01257 16.3474 1.99989 16.0037 1.99987V0.00012207C16.3967 0.000313701 16.7896 0.0149885 17.1816 0.0441166L17.0336 2.03787ZM21.0411 2.93775C20.4001 2.69039 19.7417 2.49055 19.0713 2.33983L19.5093 0.388074C20.2752 0.560052 21.0291 0.788024 21.761 1.07199L21.0411 2.93775ZM23.7808 4.35758C23.4948 4.1669 23.202 3.9868 22.9029 3.81764L23.8887 2.07786C24.5725 2.46528 25.2268 2.90241 25.8465 3.3857L24.6166 4.9635C24.3455 4.75199 24.0667 4.55054 23.7808 4.35958V4.35758ZM27.4483 7.93713C27.0527 7.37515 26.6163 6.84311 26.1425 6.34533L27.5903 4.9655C28.1302 5.53543 28.6301 6.14535 29.0841 6.78527L27.4483 7.93713ZM28.9361 10.6408C28.8048 10.3237 28.6621 10.0116 28.5082 9.70491L30.2939 8.80502C30.6471 9.5071 30.9479 10.2343 31.1938 10.9807L29.2941 11.6067C29.1866 11.2804 29.0672 10.9583 28.9361 10.6408ZM29.996 15.6542C29.9798 14.9669 29.913 14.2818 29.796 13.6044L31.7658 13.2645C31.8997 14.0364 31.9777 14.8203 31.9977 15.6042L29.998 15.6542H29.996ZM29.734 18.7298C29.8 18.3898 29.854 18.0519 29.896 17.7099L31.8817 17.9559C31.7857 18.7361 31.632 19.5081 31.4218 20.2656L29.494 19.7317C29.586 19.4017 29.666 19.0677 29.734 18.7298ZM27.8302 23.4872C28.1982 22.9073 28.5222 22.2993 28.8021 21.6714L30.6299 22.4813C30.3099 23.2012 29.94 23.8931 29.52 24.5571L27.8302 23.4872ZM25.9025 25.8969C26.1465 25.6529 26.3804 25.4009 26.6024 25.141L28.1182 26.4468C27.8615 26.7444 27.594 27.0326 27.3163 27.3107L25.9025 25.8969Z'
        fill='white'
      />
      <path
        d='M16.0041 1.99987C13.7022 2.00004 11.4358 2.56789 9.40571 3.65314C7.37563 4.73839 5.64451 6.30754 4.36569 8.22159C3.08688 10.1356 2.29983 12.3355 2.07425 14.6264C1.84868 16.9173 2.19155 19.2284 3.07249 21.3552C3.95344 23.4819 5.34526 25.3585 7.12469 26.8189C8.90411 28.2792 11.0162 29.2782 13.2739 29.7273C15.5316 30.1765 17.8653 30.0619 20.0681 29.3938C22.271 28.7256 24.2751 27.5245 25.9029 25.8969L27.3167 27.3107C25.4564 29.172 23.1657 30.5458 20.6476 31.3102C18.1295 32.0746 15.4617 32.2062 12.8806 31.6931C10.2996 31.1801 7.88485 30.0383 5.85049 28.369C3.81613 26.6997 2.22492 24.5544 1.21784 22.1231C0.210766 19.6919 -0.181079 17.0497 0.0770241 14.4309C0.335127 11.812 1.23521 9.29716 2.69752 7.10927C4.15984 4.92138 6.13923 3.12795 8.46032 1.88789C10.7814 0.647831 13.3725 -0.000575307 16.0041 0.000122633V1.99987Z'
        fill='white'
      />
      <path
        d='M15.0038 5.99939C15.269 5.99939 15.5233 6.10473 15.7109 6.29225C15.8984 6.47976 16.0037 6.73408 16.0037 6.99926V17.418L22.4989 21.1295C22.7225 21.2644 22.8844 21.4813 22.9501 21.734C23.0158 21.9867 22.9801 22.255 22.8506 22.4817C22.721 22.7084 22.508 22.8754 22.2569 22.9471C22.0058 23.0188 21.7367 22.9894 21.507 22.8653L14.5079 18.8658C14.3549 18.7784 14.2277 18.6521 14.1392 18.4996C14.0507 18.3472 14.004 18.1741 14.004 17.9979V6.99926C14.004 6.73408 14.1093 6.47976 14.2968 6.29225C14.4843 6.10473 14.7387 5.99939 15.0038 5.99939Z'
        fill='white'
      />
    </svg>
  );
}
