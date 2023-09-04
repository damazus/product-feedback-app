<script lang="ts">
import {defineComponent} from 'vue'
import ButtonComponent, { ButtonTheme } from '@/components/ButtonComponent.vue'

export default defineComponent({
   components: {
      ButtonComponent
   },
   data(){
      return{
         ButtonTheme
      }
   },
   methods: {
      onClick(){
         window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      }
   }
})
</script>

<template>
   <ButtonComponent
      class="product-view__button-back"
      :theme="ButtonTheme.Link"
      v-bind="$attrs"
      @click="onClick"
   >
      <slot>Go Back</slot>
   </ButtonComponent>
</template>