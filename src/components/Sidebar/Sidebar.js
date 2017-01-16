import React from 'react';
import classnames from 'classnames';

// import fa from 'font-awesome/css/font-awesome.css';
import fa from '../../assets/css/font-awesome.css';
import styles from './Sidebar.css';

function Sidebar({ starsCount, userInfo }) {
  return (
    <div className={styles.normal}>
      <div className={styles.photo}>
        <img src={`${userInfo.avatar_url}&s=160`} />
      </div>
      <div className={styles.menu}>
        <ul>
          <li className={styles.menuActive}>
            <i className={classnames(fa['fa'], fa['fa-star'])} /> My Stars
            <b>{starsCount}</b>
          </li>
          <li><i className={classnames(fa['fa'], fa['fa-rss'])} /> Feeds [WIP]</li>
          <li><i className={classnames(fa['fa'], fa['fa-thumbs-up'])} /> Trends [WIP]</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
