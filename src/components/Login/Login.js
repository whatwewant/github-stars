import React from 'react';
import styles from './Login.css';

class Login extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    const username = this.inputUsername.value.trim();
    const password = this.inputPassword.value.trim();

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
              <input
                id="username"
                ref={(input) => this.inputUsername = input}
              />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="password">Github Password:</label>
              <input
                id="password"
                type="password"
                ref={(input) => this.inputPassword = input}
              />
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
