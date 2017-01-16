import React from 'react';
import classnames from 'classnames';
import styles from './StarItem.css';
// import fa from 'font-awesome/css/font-awesome.css';
import fa from '../../assets/css/font-awesome.css';

function StarItem(props) {
  const containerClass = classnames(styles.normal, {
    [styles.selected]: props.selected,
  });

  const { id, owner, name, html_url: htmlUrl, description, forks, watchers, language } = props.data;
  const repo = `${owner.login}/${name}`;

  return (
    <div className={containerClass} onClick={() => props.dispatch({ type: 'stars/select', payload: { id, repo } })}>
      <div className={styles.avatar}>
        <img src={`${owner.avatar_url}&s=60`} role="presentation" />
      </div>
      <div className={styles.mainSection}>
        <div className={styles.name}>{owner.login}<em>/</em>{name}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.meta}>
          <em><i className={classnames(fa['fa'], fa['fa-star'])} />{watchers}</em>
          <em><i className={classnames(fa['fa'], fa['fa-code-fork'])} />{forks}</em>
          {
            language ? <em><i className={classnames(fa['fa'], fa['fa-tint'])} />{language}</em> : null
          }
          <a href={htmlUrl} target="_blank" rel="noopener noreferer">View on github</a>
        </div>
      </div>
    </div>
  );
}

export default StarItem;
