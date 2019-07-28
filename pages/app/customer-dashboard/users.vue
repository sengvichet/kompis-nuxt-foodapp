<template>

  <div>

  <b-tabs class="nav-center">


    <b-tab :title="$t('app.users.employees')">
      <b-container>

        <User v-for="(employee,index) in employees"
              :user_id="employee.Username"
              accessType="customer"
              :created_at="employee.UserCreateDate"
              :status="employee.UserStatus"
              :attributes="employee.Attributes"
              @listUsers="listUsers"

         />

    </b-container>

    </b-tab>

  </b-tabs>

  <NewUser
    @listUsers="listUsers"
    accessType="customer"
  />

</div>

</template>


<script>

import { API } from "aws-amplify";

import User from '~/components/Users/User.vue'
import NewUser from '~/components/Users/NewUser.vue'

export default {

  components: {
    User,
    NewUser
  },
  data() {
    return {
      employees:[]
    }
  },

    async created() {

      try {
        await this.listUsers();
      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(e.message, 'success')
      }

    },

  methods : {

    listUsers() {


        this.employees = []

        API.get("metamat", "/users").then((users) => {
          if(process.env.stage === 'dev'){
            console.log(users);
          }
          for (var x in users) {
            if(process.env.stage === 'dev'){
              console.log(users[x]);
            }
            for (var y in users[x].Attributes){
              if(process.env.stage === 'dev'){
                console.log(users[x].Attributes[y]);
              }
              if (users[x].Attributes[y].Name == 'custom:user_type'){

                switch (users[x].Attributes[y].Value) {
                  // case 'owner':
                  // this.owners.push(users[x])
                  // break;
                  // case 'manager':
                  // this.managers.push(users[x])
                  // break;
                  case 'employee':
                  this.employees.push(users[x])
                }
              }
            }
          }
        })
    },

  }

}

</script>
