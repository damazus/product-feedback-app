<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { useFeedbackStore } from '@/stores/feedback'
import { mapState } from "pinia"
import BaseField from '@/components/BaseField.vue'
import BaseMultiselect from '@/components/BaseMultiselect.vue'
import { capitalize } from "@/utils";
import {StatusEnum} from "@/types";

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
      statusNames(): string[]{
         return Object.values(StatusEnum)
      }
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
         :options="statusNames"
         :has-error="Boolean(errors.length)"
         v-bind="$attrs"
         v-on="$listeners"
      />
   </BaseField>
</template>