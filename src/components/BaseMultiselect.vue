<script lang="ts">
import {defineComponent} from 'vue'
import Multiselect from "vue-multiselect";

export default defineComponent({
   name: 'BaseMultiselect',
   components: {Multiselect},
   props: {
      hasError: {
         type: Boolean,
         default: false
      }
   },
})
</script>

<template>
   <Multiselect
      class="base-multiselect"
      :class="{'base-multiselect--error': hasError}"
      :searchable="false"
      :show-labels="false"
      :close-on-select="true"
      v-bind="$attrs"
      v-on="$listeners"
   />
</template>

<style lang="scss">
.base-multiselect {
   --height: 48px;
   --gap: 24px;
   --input-color: var(--color-input-foreground);
   --input-background: var(--color-input-background);

   .multiselect__tags {
      display: flex;
      align-items: center;
      min-height: var(--height);
      font-size: 15px;
      padding: 0 var(--height) 0 0;
      color: var(--input-color);
      background: var(--input-background);
      border-color: var(--input-background);
      border-radius: 5px;
   }

   &--error{
      .multiselect__tags{
         border-color: var(--color-input-error-border);
      }
   }

   .multiselect__placeholder {
      font-size: 15px;
      color: var(--color-11);
      margin: 0;
      padding-top: 0;
      padding-left: var(--gap);
   }

   .multiselect__element:not(:first-child) {
      border-top: 1px solid rgba(58, 67, 116, 0.15);
   }

   .multiselect__spinner,
   .multiselect__select {
      width: var(--height);
      height: calc(var(--height) - 2px);
      top: 0;
      right: 1px;
      bottom: 0;
      padding: 0;
      margin-top: 1px;
      border-radius: 5px;
      background: transparent;
   }

   .multiselect__input,
   .multiselect__single {
      display: flex;
      align-items: center;
      min-height: var(--height);
      border-radius: 5px;
      margin: 0;
      font-size: 15px;
      padding: 0 var(--gap);
      color: var(--color);
      background: var(--input-background);

      ::placeholder {
         color: var(--color-11);
      }
   }

   .multiselect__element {
      font-size: 16px;
      color: var(--color-8);
   }

   .multiselect__option {
      font-weight: 400;
      line-height: 23px;
      padding: 12px var(--gap);
      background: transparent;


      &.multiselect__option--selected{
         display: flex;
         align-items: center;
         justify-content: space-between;

         &:after{
            content: '';
            position: static;
            width: 13px;
            height: 11px;
            padding: 0;
            background-image: url("/assets/shared/icon-check.svg");
            background-repeat: no-repeat;
            background-color: transparent;
         }
      }

      &.multiselect__option--highlight {
         color: var(--color-1);
      }

      &.multiselect__option--selected.multiselect__option--highlight{
         background: transparent;
      }
   }

   .multiselect__content-wrapper {
      border-radius: 10px;
      background: var(--color-white);
      box-shadow: 0 10px 40px -7px rgba(55, 63, 104, 0.35);
   }
}
</style>