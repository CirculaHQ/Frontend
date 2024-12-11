import React from 'react';
import { Icon } from '../ui';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  className?: string;
}

const PatternBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
    <svg
       className="w-[336px] min-h-full" viewBox="0 0 336 297"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M113.833 104.135C112.459 97.934 116.371 91.7929 122.572 90.4182L192.865 74.8346C199.066 73.4599 205.207 77.3722 206.582 83.5729L222.165 153.866C223.54 160.067 219.628 166.208 213.427 167.583L143.134 183.166C136.933 184.541 130.792 180.629 129.417 174.428L113.833 104.135Z"
        stroke="#E9EAEB"
      />
      <path
        d="M85.2085 85.8979C83.8338 79.6971 87.7461 73.5561 93.9468 72.1814L211.102 46.2086C217.303 44.834 223.444 48.7463 224.819 54.947L250.792 172.103C252.166 178.303 248.254 184.444 242.053 185.819L124.898 211.792C118.697 213.166 112.556 209.254 111.181 203.053L85.2085 85.8979Z"
        stroke="#E9EAEB"
      />
      <path
        d="M56.5835 67.6606C55.2088 61.4598 59.1211 55.3188 65.3218 53.9441L229.34 17.5822C235.54 16.2076 241.681 20.1199 243.056 26.3206L279.418 190.338C280.793 196.539 276.88 202.68 270.68 204.055L106.662 240.417C100.461 241.791 94.32 237.879 92.9453 231.678L56.5835 67.6606Z"
        stroke="#E9EAEB"
      />
      <path
        d="M27.9594 49.4237C26.5848 43.223 30.4971 37.0819 36.6978 35.7073L247.578 -11.0437C253.778 -12.4183 259.92 -8.50605 261.294 -2.30533L308.045 208.575C309.42 214.775 305.508 220.916 299.307 222.291L88.4269 269.042C82.2261 270.417 76.0851 266.504 74.7104 260.304L27.9594 49.4237Z"
        stroke="#E9EAEB"
      />
      <path
        d="M-0.665552 31.1864C-2.04022 24.9857 1.87207 18.8446 8.0728 17.47L265.815 -39.6701C272.016 -41.0447 278.157 -37.1325 279.531 -30.9317L336.671 226.81C338.046 233.011 334.134 239.152 327.933 240.527L70.191 297.667C63.9902 299.042 57.8492 295.129 56.4745 288.929L-0.665552 31.1864Z"
        stroke="#E9EAEB"
      />
      <path
        d="M-29.2906 12.9496C-30.6652 6.74889 -26.7529 0.607825 -20.5522 -0.766842L284.052 -68.296C290.253 -69.6707 296.394 -65.7584 297.769 -59.5577L365.298 245.047C366.672 251.247 362.76 257.388 356.559 258.763L51.9551 326.292C45.7543 327.667 39.6133 323.755 38.2386 317.554L-29.2906 12.9496Z"
        stroke="#E9EAEB"
      />
    </svg>
  </div>
);

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, className = '' }) => {
  return (
    <div
      className={`relative w-full min-h-[400px] rounded-lg bg-white border border-[#D5D7DA] ${className}`}
    >
      {/* <PatternBackground /> */}
      <div className="relative flex flex-col items-center justify-center min-h-[400px] p-8">
        {icon && (
          <div className="flex items-center justify-center w-[52px] h-[52px] mb-6 border-[3px] bg-gradient-to-b from-[#181D274D] to-[#181D2714]  rounded-xl">
            <Icon name={icon} className="w-5 h-5 text-[#181D27CC]" />
          </div>
        )}
        <h3 className="text-xl text-center font-bold text-primary">{title}</h3>
        <p className="text-center text-sm font-normal text-tertiary">{description}</p>
      </div>
    </div>
  );
};

export { EmptyState };