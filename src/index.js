import dva from 'dva';
import pick from 'lodash.pick';
import './index.html';
import './index.css';

const data = window.localStorage.getItem('github');
const initialState = data ? JSON.parse(data) : {};

// 1. Initialize
const app = dva({
  initialState,
  onStateChange() {
    window.localStorage.setItem('github', JSON.stringify(pick(app._store.getState(), ['stars', 'user', 'readme'])))
  },
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/user'));
app.model(require("./models/feeds"));
app.model(require('./models/header'));
app.model(require('./models/stars'));
app.model(require('./models/readme'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
