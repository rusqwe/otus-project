import { createRouter, createWebHistory } from 'vue-router'
import Products from '../views/Products.vue'
import Product from '../views/Product.vue'
import Basket from '../views/Basket.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      name: 'products',
      alias: '/',
      meta: {
        layout: "main",
        requiresAuth: true
      },
      component: Products
    },
    {
      path: '/products/:id',
      name: 'product',
      meta: {
        layout: "main",
        requiresAuth: true
      },
      component: Product
    },
    {
      path: '/basket',
      name: 'basket',
      meta: {
        layout: "main",
        requiresAuth: true
      },
      component: Basket
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: "empty",
        requiresAuth: false
      },
      component: Login
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach(
  (to, from, next) => {
    if (to?.meta?.requiresAuth && !sessionStorage.session) {
      const query = to.fullPath.match(/^\/$/) ? {} : { redirect: to.fullPath }
      next({
        path: '/login',
        query: query
      })
      return

    } else if (to.name === 'login' && sessionStorage.session) {
      next({
        path: '/'
      })
      return
    }
    next()
  }
)
export default router
