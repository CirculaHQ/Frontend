import React from 'react';

type TextBadge = {
  text: string;
};
const TextBadge = ({ text }: TextBadge) => {
  return (
    <div className='border border-[#E9EAEB] rounded-[4px] px-[2px] leading-3'>
      <span className='text-quaternary font-medium text-xs'>{text}</span>
    </div>
  );
};

export { TextBadge };
