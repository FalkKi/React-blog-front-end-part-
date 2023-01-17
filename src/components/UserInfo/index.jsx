import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, fullName, date }) => {
  const readableDate = (new Date(Date.parse(date)).toLocaleString('en-GB')).replace(',', '');

  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{readableDate}</span>
      </div>
    </div>
  );
};
