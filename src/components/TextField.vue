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
      type: {
         type: String,
         default: 'text',
      },
      value: {
         type: String,
         required: true,
      },
      errors: {
         type: Array as PropType<string[]>,
         default: () => []
      },
   },
   computed: {
      modelValue: {
         get() {
            return this.value
         },
         set(value: string) {
            this.$emit('input', value)
         }
      }
   }
})
</script>

<template>
   <label class="text-field" :class="[ `text-field--${type}`, {'text-field--error': errors.length} ]">
      <span v-if="label || description" class="text-field__header">
         <span v-if="label" class="text-field__label">{{ label }}</span>
         <span v-if="description" class="text-field__description">{{ description }}</span>
      </span>
      <textarea
         v-if="type === 'textarea'"
         v-model="modelValue"
         :placeholder="placeholder"
         class="text-field__textarea"
      />
      <input
         v-else
         v-model="modelValue"
         :type="type"
         :placeholder="placeholder"
         class="text-field__input"
      />
      <span class="text-field__error" v-if="errors.length">{{ errors[0] }}</span>
   </label>
</template>

<style lang="scss">
.text-field {
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
      .text-field__input,
      .text-field__textarea,{
         border: 1px solid var(--color-input-error-border);
      }
   }

   ::placeholder{
      color: var(--color-11);
   }
}
</style>