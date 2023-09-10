<script lang="ts">
import { defineComponent } from 'vue'
import ButtonComponent, { ButtonTheme } from '@/components/ButtonComponent.vue'
import Multiselect from 'vue-multiselect'
import {ROUTE_NAMES} from "@/router";
import CategoryMultiselect from "@/components/CategoryMultiselect.vue";

export default defineComponent({
   components: {
      CategoryMultiselect,
      ButtonComponent,
      Multiselect,
   },
   data() {
      return {
         ROUTE_NAMES,
         ButtonTheme,
         value: null,
         options: ['list', 'of', 'options'],
         category: ''
      }
   },
})
</script>

<template>
   <div class="design-system-view">
      <multiselect
         ref="multiselect"
         v-model="value"
         :options="options"
         :open="true"
         :close-on-select="true"
      />

      <CategoryMultiselect
         v-model="category"

      />


      <h1>Sed egestas ante et vulputate volutpat</h1>
      <h2>Vestibulum volutpat acus a ultrices sagittis</h2>
      <h3>Pellentesque a diam sit amet mi ullamcorper vehicula</h3>
      <h4>Ut scelerisque hendrerit tellus. Integer sagittis</h4>

      <p class="body-1">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque
         aliquet nibh nec urna.
         In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra,
         tortor
         libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis.</p>
      <p class="body-2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque
         aliquet nibh nec urna.
         In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra,
         tortor
         libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis.</p>
      <p class="body-3">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque
         aliquet nibh nec urna.
         In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra,
         tortor
         libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis.</p>

      <SvgIcon
         class="button__icon"
         name="shared-icon-arrow-left"
         width="8"
         height="12"
      />
      <ButtonComponent :theme="ButtonTheme.Primary">Button 1</ButtonComponent>
      <ButtonComponent type="submit">Add Feedback</ButtonComponent>
      <ButtonComponent :to="{ name: ROUTE_NAMES.feedbackForm }">Add Feedback</ButtonComponent>

      <ButtonComponent :theme="ButtonTheme.Info">Button 2</ButtonComponent>
      <ButtonComponent :theme="ButtonTheme.Secondary">Button 3</ButtonComponent>
      <ButtonComponent :theme="ButtonTheme.Danger">Button 4</ButtonComponent>
      <ButtonComponent :theme="ButtonTheme.Link">Go Back</ButtonComponent>
      <ButtonComponent :theme="ButtonTheme.LinkFilled">Go Back</ButtonComponent>
      <ButtonComponent :theme="ButtonTheme.Tag">UX</ButtonComponent>
      <ButtonComponent
         :theme="ButtonTheme.Vote"
      >99</ButtonComponent>
   </div>
</template>

<style lang="scss">
@use '@/assets/scss/mixins';

.design-system-view{
   @include mixins.container;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   gap: 15px;
   padding: 50px 0;
}
</style>
