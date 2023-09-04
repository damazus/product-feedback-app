<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
   name: 'SvgIcon',
   props: {
      prefix: {
         type: String,
         default: 'icon',
      },
      color: {
         type: String,
         default: '#333',
      },
      name: {
         type: String,
         required: true,
      },
   },
   computed: {
      symbolId(): string {
         return `#${this.prefix}-${this.name}`
      }
   }
})
</script>

<template>
   <svg class="svg-icon" aria-hidden="true" >
      <use class="svg-icon__use" :href="symbolId"/>
   </svg>
</template>

<style lang="scss">
.svg-icon {
   display: inline-block;
   width: 1em;
   height: 1em;
   vertical-align: middle;
   fill: currentColor;
   //stroke: currentColor;
}
</style>