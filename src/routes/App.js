import React, { PureComponent } from 'react';
import { connect } from 'dva';
import marked from 'marked';
// import { Link } from 'dva/router';
// import { binActionCreators } from 'redux';
import 'normalize.css';

import Stars from '../components/Stars/Stars';
import Header from '../components/Header/Header';
import Login from '../components/Login/Login';
import Sidebar from '../components/Sidebar/Sidebar';
import Detail from '../components/Detail/Detail';

import styles from './App.css';

class App extends PureComponent {
  render() {
    const {
      user,
      stars,
      // headers,
      readme,
      dispatch,
      detail,
      filteredStars
    } = this.props;

    if (!user.login) {
      return (
        <Login
          dispatch={dispatch}
          loginErrorMsg={user.loginErrorMsg}
          loginLoading={user.loginLoading}
        />
      );
    }

    return (
      <div className={styles.normal}>
        <Header syncLoading={stars.syncLoading} syncStatus={stars.syncStatus} dispatch={dispatch} />
        <div className={styles.mainSection}>
          <Sidebar
            userInfo={user.userInfo}
            starsCount={stars.data.length}
            dispatch={dispatch}
          />
          <Stars
            filteredStars={filteredStars}
            selectedStarId={stars.selectedStarId}
            dispatch={dispatch}
          />
          <Detail
            unstarLoading={stars.unstarLoading}
            readmeLoading={readme.readmeLoding}
            repo={detail.repo}
            readme={detail.readme}
            dispatch={dispatch}
            stars={stars}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {

  // Detail
  const star = state.stars.data.filter(item => item.id === state.stars.selectedStarId)[0];
  const repo = star ? `${star.owner.login}/${star.name}` : null;
  // Fix encode. Ref: http://blog.sqrtthree.com/2015/08/29/utf8-to-b64
  const readme = repo && state.readme[repo] ? marked(decodeURIComponent(escape(atob(state.readme[repo])))) : null;

  // FilteredStars
  const keyword = state.header.keyword;
  const filteredStars = keyword ? state.stars.data.filter(item => item.name.indexOf(keyword) > -1 || (item.description && item.description.indexOf(keyword) > -1)) : state.stars.data.slice(0, 100);

  return {
  ...state,
  detail: {
    readme,
    repo,
  },
  filteredStars,
};
};

export default connect(mapStateToProps)(App);
