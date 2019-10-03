console.log('Loaded! 😀'); // eslint-disable-line no-console

const Vue = require('vue').default;
const App = require('./components/app').default;

new Vue({
    render: h => h(App)
}).$mount('#app');