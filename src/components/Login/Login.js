import React from 'react';
import styles from './Login.css';

class Login extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    const username = this.refs.username.value.trim();
    const password = this.refs.password.value.trim();

    this.props.dispatch({ type: 'user/login', payload: { username, password } });
  }

  render () {
    const { loginErrorMsg, loginLoading } = this.props;

    return (
      <div className={styles.normal}>
        <div className={styles.box}>
          <h2 className={styles.title}>Login to GithubStars</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
            {
              loginErrorMsg ? <div className={styles.loginError}>{loginErrorMsg}</div> : null
            }
            <div className={styles.formItem}>
              <label htmlFor="username">Github Username:</label>
              <input ref="username" id="username" />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="password">Github Password:</label>
              <input ref="password" id="password" type="password" />
            </div>
            <div className={styles.formItem}>
              <label />
              {
                loginLoading ? <input type="submit" value="..." disabled />
                  : <input type="submit" value="Submit" />
              }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
