import React, { PureComponent } from 'react';
import { connect } from 'dva';
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
      // detail,
      // filteredStars
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
            filteredStars={stars.data}
            selectedStarId={stars.selectedStarId}
            dispatch={dispatch}
          />
          <Detail
            unstarLoading={stars.unstarLoading}
            readmeLoading={readme.readmeLoding}
            dispatch={dispatch}
            stars={stars}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(App);
