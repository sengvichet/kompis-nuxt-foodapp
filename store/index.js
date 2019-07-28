import Vuex from 'vuex'

require('whatwg-fetch')

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: {},
      user_lang: {},
      store_locations: {},
      store_devices: {},
      store_shops: {},
      store_categories: {},
      store_videos: {},
      store_delivery_points: {},
      store_products: {},
      store_users: {}
    },
    mutations: {
      setUser(state, user) {
        state.user = user
      },
      setUserPermissions(state, permissions) {
        state.user.permissions = permissions
      },
      setUserLang(state, user_lang) {
        state.user_lang = user_lang
      },
      setLocations(state, store_locations) {
        state.store_locations = store_locations
      },
      setDevices(state, store_devices) {
        state.store_devices = store_devices
      },
      setShops(state, store_shops) {
        state.store_shops = store_shops
      },
      setCategories(state, store_categories) {
        state.store_categories = store_categories
      },
      setVideos(state, store_videos) {
        state.store_videos = store_videos
      },
      setDeliveryPoints(state, store_delivery_points) {
        state.store_delivery_points = store_delivery_points
      },
      setProducts(state, store_products) {
        state.store_products = store_products
      },
      setUsers(state, store_users) {
        state.store_users = store_users
      }
    },
    actions: {
      setUser(vuexContext, user) {
        vuexContext.commit('setUser', user)
      },
      setUserPermissions(vuexContext, permissions) {
        vuexContext.commit('setUserPermissions', permissions)
      },
      setUserLang(vuexContext, user_lang) {
        vuexContext.commit('setUserLang', user_lang)
      },
      setLocations(vuexContext, store_locations) {
        vuexContext.commit('setLocations', store_locations)
      },
      setDevices(vuexContext, store_devices) {
        vuexContext.commit('setDevices', store_devices)
      },
      setShops(vuexContext, store_shops) {
        vuexContext.commit('setShops', store_shops)
      },
      setCategories(vuexContext, store_categories) {
        vuexContext.commit('setCategories', store_categories)
      },
      setVideos(vuexContext, store_videos) {
        vuexContext.commit('setVideos', store_videos)
      },
      setDeliveryPoints(vuexContext, store_delivery_points) {
        vuexContext.commit('setDeliveryPoints', store_delivery_points)
      },
      setProducts(vuexContext, store_products) {
        vuexContext.commit('setProducts', store_products)
      },
      setUsers(vuexContext, store_users) {
        vuexContext.commit('setUsers', store_users)
      },
      lockBody() {
        let scrollPos = document.documentElement.scrollTop;
        let body
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        window.scrollTo(0, scrollPos);
        console.log(scrollPos);
      },
      freeBody() {
        document.body.style.overflow = "scroll";
        document.body.style.position = "static";
      }
    },
    getters: {
      user(state) {
        return state.user
      },
      user_lang(state) {
        return state.user_lang
      },
      store_locations(state) {
        return state.store_locations
      },
      store_devices(state) {
        return state.store_devices
      },
      store_shops(state) {
        return state.store_shops
      },
      store_categories(state) {
        return state.store_categories
      },
      store_videos(state) {
        return state.store_videos
      },
      store_delivery_points(state) {
        return state.store_delivery_points
      },
      store_products(state) {
        return state.store_products
      },
      store_users(state) {
        return state.store_users
      }
    }
  })
}

export default createStore
