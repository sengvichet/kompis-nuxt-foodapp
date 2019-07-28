import Vue from 'vue'
import {
  API
} from "aws-amplify";
Vue.mixin({

  data() {
    return {
      users: {},
      pageloading: false
    }
  },
  methods: {

    async listUsers() {

      if (!this.$store.getters.store_users.is_set) {

        await API.get("metamat", "/users").then((users) => {

          let users_list = {}
          users_list.owners = []
          users_list.managers = []
          users_list.employees = []

          for (var x in users) {

            for (var y in users[x].Attributes) {
              if (users[x].Attributes[y].Name == 'custom:user_type') {
                switch (users[x].Attributes[y].Value) {
                  case 'owner':
                    users_list.owners.push(users[x])
                    break;
                  case 'manager':
                    users_list.managers.push(users[x])
                    break;
                  case 'employee':
                    users_list.employees.push(users[x])
                }

              }
            }
          }

          this.$store.dispatch('setUsers', {
            is_set: true,
            data: users_list
          })
        })
      }
      this.users = this.$store.getters.store_users.data

      this.pageloading = false
    },

    async reflectUsers(op, index, data, type) {

      let users = this.$store.getters.store_users.data

      switch (op) {
        case 'post':
          {
            type = type.toLowerCase()
            if (type == 'owner') {
              users.owners.push(data)
            }
            if (type == 'manager') {
              users.managers.push(data)
            }
            if (type == 'employee') {
              users.employees.push(data)
            }

            break;
          }
        case 'put':
          {
            if (type[0].toLowerCase() == 'owner') {
              await users.owners.splice(index, 1);
            }
            if (type[0].toLowerCase() == 'manager') {
              await users.managers.splice(index, 1);
            }
            if (type[0].toLowerCase() == 'employee') {
              await users.employees.splice(index, 1);
            }

            if (type[0].toLowerCase() == type[1].toLowerCase()) {

              if (type[1].toLowerCase() == 'owner') {

                await users.owners.splice(index, 0, data);

              }
              if (type[1].toLowerCase() == 'manager') {

                await users.managers.splice(index, 0, data)
              }
              if (type[1].toLowerCase() == 'employee') {

                await users.employees.splice(index, 0, data);
              }
            } else {

              if (type[1].toLowerCase() == 'owner') {
                users.owners.push(data)
              }
              if (type[1].toLowerCase() == 'manager') {
                users.managers.push(data)
              }
              if (type[1].toLowerCase() == 'employee') {
                users.employees.push(data)
              }
            }


            break;
          }
        case 'del':
          {
            type = type.toLowerCase()
            if (type == 'owner') {
              users.owners.splice(index, 1);
            }
            if (type == 'manager') {
              users.managers.splice(index, 1);
            }
            if (type == 'employee') {
              users.employees.splice(index, 1);
            }

            break;
          }
      }

      this.$store.dispatch('setUsers', {
        is_set: false,
        data: users
      })

      this.users = this.$store.getters.store_users.data

    }
  }
})