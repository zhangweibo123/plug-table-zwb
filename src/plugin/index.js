import wbtable from './wbtable.vue';
let table = {};
table.install = function(Vue) {
  Vue.prototype.$msg = 'Hello I am test.js';
  Vue.prototype.$myMethod = function(arr) {
    if (arr.length < 0) {
      return false;
    } else {
      arr = arr.join('连接你我');
      return arr;
    }
  };
  Vue.component(wbtable.name, wbtable); // testPanel.name 组件的name属性
};
export default table;
