import React from 'react';
import style from './LoadingSpiner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={style.ldsContainer}>
      <div className={style.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
