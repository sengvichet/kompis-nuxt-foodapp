<template>

<div class="list-bar__edit">

    <a href="#" class="edit" @click.prevent="showEditCategoryModal">
      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
    </a>
    <ModalBody v-if="showModal" z_index="1" :footerType="footer" :title="modal_title" :footerText="$t('app.general.save')" @clickedSave="editCategorySubmit" @close="closePopup">

      <template slot="subheading">
      </template>

      <template slot="modal-content">
        <div class="list-bar-container">
        <input
              type="text"
              class="list-bar input-text"
              v-model="category_name"
              :placeholder="$t('app.categories.name')"
              name="category_name"
              v-validate="'required'"
              :data-vv-as="$t('app.categories.name')"
              data-vv-delay="500"
              :class="{'input': true, 'list-bar--warning': errors.has('category_name') }"
              >
        </input>
        <span v-show="errors.has('category_name')" class="list-bar--warning-span">{{ errors.first('category_name') }}</span>
      </div>

        <DeleteButton v-if="category_status!='hidden'" @was_clicked="deleteCategorySubmit()"
              :prompt="$t('app.general.are_you_sure_cant_undo')"/>

      </template>
    </ModalBody>

</div>
</template>


<script>

import {
  API
} from "aws-amplify";

import Icon from 'vue-awesome'
import ModalBody from '~/components/modals/ModalBody.vue'
import DeleteButton from '~/components/General/DeleteButton.vue'


export default {

  components: {
    Icon,
    ModalBody,
    DeleteButton
  },

  props: {
    index: {
      type: Number,
      required: true
    },
    category_id: {
      type: String,
      required: true
    },
    category_name: {
      type: String,
      required: true
    },
    category_status: {
      type: String,
      required: false
    },
    category_shop_id_prop: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      showModal: false,
      footer: 'none',
      catName: this.category_name,
      modal_title: this.$t('app.general.edit').replace('%s',this.category_name)

    }
  },
  computed: {
    compoundProperty(){
      return [this.category_name].join()
    }
  },
  watch: {
    compoundProperty: function() {
      if(this.category_name) {
      this.$validator.validate().then(valid => {
       if (!valid) {
         this.footer = 'none'
       }
       else {
         this.footer = 'save'
       }
     });
     }
     else {
       this.footer = 'none'
     }
    }
  },
  methods : {
    async deleteCategorySubmit(event) {


        try {

          await this.deleteCategory()
          this.reflectCategories('del',this.index,null)
          // this.$refs.editCategoryModal.hide()
          this.showModal = false;
          this.mixpanelTrack('Delete Categoty: Categories Page');
          this.$notify.success(this.$t('app.categories.category_deleted').replace('%s',this.category_name), 'success')
        }
        catch (e) {
          bugsnagClient.notify(e)
          this.$notify.error(this.$t('app.categories.delete_error'), 'success')

        }
    },
    async editCategorySubmit(event) {

        // event.preventDefault();

      if (
          !this.category_name
        )
      {
        return
      }

      try {

        this.isLoading = true;

         await this.updateCategory({
          objectName: this.category_name
        });

        this.mixpanelTrack('Edit Categoty: Categories Page');

        this.reflectCategories('put',this.index,{
          objectId: this.category_id,
          objectName: this.category_name,
          objectShopId:this.category_shop_id_prop
       })

        this.$notify.success(this.$t('app.categories.category_updated').replace('%s',this.category_name), 'success')

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.categories.update_error'), 'success')

      }

      this.$refs.editCategoryModal.hide()
      this.isLoading = false

    },
    updateCategory(point) {

      return API.put("metamat", "/categories/"+this.category_id, {
        body: point
      });
    },

    deleteCategory() {
      return API.del("metamat", "/categories/" + this.category_id);
    },
    showEditCategoryModal(){

      this.mixpanelTrack('Click: Categories Page - Edit Categoty Modal');
      // this.$refs.editCategoryModal.show()
      this.$store.dispatch('lockBody');
      this.showModal = true;
    },
    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    }
  }
}

</script>
