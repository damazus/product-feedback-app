<script lang="ts">
import {defineComponent, type PropType} from 'vue'

export default defineComponent({
   props: {
      label: {
         type: String,
         default: null,
      },
      description: {
         type: String,
         default: null,
      },
      placeholder: {
         type: String,
         default: null,
      },
      errors: {
         type: Array as PropType<string[]>,
         default: () => []
      },
   },
})
</script>

<template>
   <div class="base-field" :class="[ {'base-field--error': errors.length} ]">
      <span v-if="label || description" class="base-field__header">
         <span v-if="label" class="base-field__label">{{ label }}</span>
         <span v-if="description" class="base-field__description">{{ description }}</span>
      </span>
      <slot></slot>
      <span class="base-field__error" v-if="errors.length">{{ errors[0] }}</span>
   </div>
</template>

<style lang="scss">
.base-field {
   display: inline-flex;
   flex-direction: column;

   &__header{
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
   }

   &__label,
   &__description{
      font-size: 14px;
   }

   &__label{
      font-weight: 700;
   }

   &__description{
      color: var(--color-text-muted-foreground);
   }

   &__input,
   &__textarea{
      font-size: 15px;
      padding: 14.5px 24px;
      color: var(--color-input-foreground);
      background: var(--color-input-background);
      border: 1px solid var(--color-input-background);
      border-radius: 5px;
   }

   &__textarea{
      min-height: 96px;
   }

   &__error{
      font-size: 14px;
      color: var(--color-input-error-foreground);
      border-color: var(--color-input-error-border);
      margin-top: 4px;

      &:first-letter{
         text-transform: uppercase;
      }
   }

   &:active{
      border-color: var(--color-input-active-border);
   }

   &--error{
      .base-field__input,
      .base-field__textarea,{
         border: 1px solid var(--color-input-error-border);
      }
   }

   ::placeholder{
      color: var(--color-11);
   }
}
</style>