import React from 'react';
import classnames from 'classnames';

// import fa from 'font-awesome/css/font-awesome.css';
import fa from '../../assets/css/font-awesome.css';

import styles from './Header.css';

class Header extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      query: '',
    };
  }

  handleInputChange(e) {
    this.setState({
      query: e.target.value,
    }, () => {
      this.props.dispatch({ type: 'header/search', payload: this.state.query });
    });
  }

  render () {
    const { syncLoading, syncStatus } = this.props;

    return (
      <div className={styles.normal}>
        <div className={styles.brand}>
          <h1>GithubStars</h1>
          <div>
            {
              syncLoading
                ? <i className={classnames(fa['fa'], fa['fa-refresh', styles.spin])} />
                : <i className={classnames(fa['fa'], fa['fa-refresh'])} onClick={() => this.props.dispatch({ type: 'stars/syncUpdate' })} />
            }
          </div>
        </div>
        <div className={styles.search}>
          <input value={this.state.query} onChange={this.handleInputChange.bind(this)} placeholder="Search by keyword" />
          <i className={classnames(fa['fa'], fa['fa-search'])} />
        </div>
        <div className={styles.syncLoading}>
          {syncLoading ? `${syncStatus}` : null}
        </div>
      </div>
    );
  }
}

export default Header;
