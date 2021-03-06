import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/categories'))
app.model(require('./models/bills'));
app.model(require('./models/accounts'))
app.model(require('./models/members'))

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
