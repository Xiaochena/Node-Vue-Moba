import Vue from 'vue'
import Router from 'vue-router'

// --------------------------
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 解决多次点击 <router-link ></router-link>会报错的bug


// 组件
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'

import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/categories/create',  name: 'category-edit',  component: CategoryEdit  },
        { path: '/categories/edit/:id'  ,component: CategoryEdit ,  props:true, },
        // props:true：路由组件传参：使用 props 将组件和路由解耦：
        // 在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。
        { path: '/categories/list',  name: 'category-list',  component: CategoryList  },

        { path: '/items/create',  name: 'items-edit',  component: ItemEdit  },
        { path: '/items/edit/:id', component: ItemEdit ,  props:true, },
        { path: '/items/list',  name: 'items-list',  component: ItemList  },
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/CategoryEdit.vue')
    // }
  ]
})