<script lang="ts">
import {defineComponent, type PropType} from 'vue'
import {Category} from '@/types'
import BaseField from '@/components/BaseField.vue'
import BaseMultiselect from '@/components/BaseMultiselect.vue'

export default defineComponent({
   name: 'CategoryMultiselect',
   components: {
      BaseField,
      BaseMultiselect,
   },
   props: {
      label: {
         type: String,
         default: null,
      },
      description: {
         type: String,
         default: null,
      },
      errors: {
         type: Array as PropType<string[]>,
         default: () => []
      },
   },
   computed: {
      categories() {
         return Object.values(Category)
      },
   },
})

</script>

<template>
   <BaseField
      class="category-multiselect"
      :label="label"
      :description="description"
      :errors="errors"
   >
      <BaseMultiselect
         :options="categories"
         :has-error="Boolean(errors.length)"
         v-bind="$attrs"
         v-on="$listeners"
      />
   </BaseField>
</template>