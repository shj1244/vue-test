import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

// 하위 디렉토리도 가져오려면 true 옵션
const requireModule = require.context('.', true, /\.vue$/, 'lazy');
const modules = {};

requireModule.keys().forEach(filename => {
    const moduleName =  upperFirst(camelCase(filename.replace(/(\.\/|\.vue)/g, '')));
    modules[moduleName] = () => requireModule(filename);
});

//console.log("modules==>",modules);

export default modules;