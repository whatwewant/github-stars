import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
// import fa from 'font-awesome/css/font-awesome.css';
import fa from '../../assets/css/font-awesome.css';
import gm from '../../assets/css/github-markdown.css';

import styles from './Detail.css';

class Detail extends PureComponent {

  componentWillMount() {
    const { repo } = this.props;
    if (repo) {
      this.props.dispatch({ type: 'readme/fetch' });
    }
  }

  componentDidUpdate() {
    // Force reflow for electron
    const el = findDOMNode(this);
    el.style.display = 'none';
    el.offsetHeight; // eslint-disable-line
    el.style.display = '';
  }

  handleUnstar() {
    this.props.dispatch({ type: 'stars/unstar', payload: this.props.repo });
  }

  handleInputClick(e) {
    e.target.select();
  }

  render () {
    const { readmeLoading, unstarLoading, repo, readme } = this.props;
    if (!repo) {
      return <div />;
    }

    return (
      <div className={styles.normal}>
        <div className={styles.topbar}>
          <div className={styles.actions}>
            {
              unstarLoading
                ? <button disabled><i className={classnames(fa.fa, fa['fa-spinner'])} /></button>
                : <button onClick={this.handleUnstar.bind(this)}>
                    <i className={classnames(fa['fa'], fa['fa-star-o'])} /> Unstar
                  </button>
            }
          </div>
          <div className={styles.clone}>
            Clone: <input value={`git@github.com:${repo}.git`} readOnly onClick={this.handleInputClick} />
          </div>
        </div>
        <div className={styles.readme}>
          {
            readmeLoading ? <div className={styles.readmeLoading}>Loading</div> : null
          }
          {
            readme ? <div className={gm['markdown-body']} dangerouslySetInnerHTML={{ __html: readme }} /> : null
          }
        </div>
      </div>
    );
  }
}

export default Detail;
