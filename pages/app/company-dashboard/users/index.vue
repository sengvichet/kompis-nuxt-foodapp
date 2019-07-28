<template>

  <div>
  <div>
<tabs
:tabs="tabs"
:currentTab="currentTab"
:wrapper-class="'default-tabs'"
:tab-class="'default-tabs__item'"
:tab-active-class="'default-tabs__item_active'"
:line-class="'default-tabs__active-line'"
@onClick="handleClick"
/>

<div v-if="isLoading" class="app-ui-overlay__centered-column">
  <LoadingAnimation/>
</div>

<div v-if="!isLoading" class="content">
<div v-if="currentTab == 'owners' && !isLoading">
  <User v-if="!isLoading"
        v-for="(owner,index) in users.owners"
        :index="index"
        :user_id="owner.Username"
        :created_at="owner.UserCreateDate"
        :status="owner.UserStatus"
        :attributes="owner.Attributes"
        :locations_prop="assets"
   />
</div>
<div v-if="currentTab == 'managers' && !isLoading">
  <User v-if="!isLoading"
        v-for="(manager,index) in users.managers"
        :index="index"
        :user_id="manager.Username"
        :created_at="manager.UserCreateDate"
        :status="manager.UserStatus"
        :attributes="manager.Attributes"
        :locations_prop="assets"
   />
</div>
<div v-if="currentTab == 'employees' && !isLoading">
  <User v-if="!isLoading"
        v-for="(employee,index) in users.employees"
        :index="index"
        :user_id="employee.Username"
        :created_at="employee.UserCreateDate"
        :status="employee.UserStatus"
        :attributes="employee.Attributes"
        :locations_prop="assets"
        accessType="company"
   />

</div>
</div>
</div>


  <NewUser
    :locations_prop="assets"
    accessType="company"/>

</div>

</template>

<script>

import User from '~/components/Users/User.vue'
import NewUser from '~/components/Users/NewUser.vue'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'
import Tabs from 'vue-tabs-with-active-line';

export default {

  components: {
    User,
    NewUser,
    LoadingAnimation,
    Tabs
  },
  data() {
    return {
      tabs:[{
        title: this.$t('app.users.owners'),
        value: 'owners',
      }, {
        title: this.$t('app.users.managers'),
        value: 'managers',
      },
      {
        title: this.$t('app.users.employees'),
        value: 'employees',
      }
      ],
      currentTab: 'owners',
      isLoading: false
    }
  },

  computed:{
  checkUsers() { return this.$store.getters.store_users.data },
  },

watch: {
  checkUsers(newValue) {
    this.users = {}
    this.$nextTick(() => {
			this.users = this.$store.getters.store_users.data
		});
  }
},
  async created() {
    try {
      this.mixpanelTrack('Page View: Users Page');
      this.isLoading = true
      await this.listUsers();
      await this.listAssets()
      this.isLoading = false;
    } catch (e) {
      bugsnagClient.notify(e)
      this.$notify.error(e.message, 'success')
    }

  },
  methods : {
    async handleClick(newTab) {

      this.mixpanelTrack('Tab Click: Users Page - ' + newTab);

      this.isLoading = true
      await this.listUsers();
      this.$nextTick(() => {
			this.currentTab = newTab;
		  });
      this.isLoading = false;
    },
  }
}
</script>
