/**
* @Author: eason
* @Date:   2016-12-15T13:43:08+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-01-12T12:05:55+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/



import dva from 'dva';
import pick from 'lodash.pick';
// import './index.html';
// import './index.css';

const data = localStorage.getItem('github');
const initialState = data ? JSON.parse(data) : {};

// 1. Initialize
const app = dva({
  initialState,
  onStateChange() {
    localStorage.setItem('github', JSON.stringify(pick(app._store.getState(), ['stars', 'user']))).
  },
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/header'));
app.model(require('./models/user'));
app.model(require('./models/stars'));
app.model(require('./models/readme'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
