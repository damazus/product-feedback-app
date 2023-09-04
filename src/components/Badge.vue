<script lang="ts">
import {defineComponent, triggerRef} from 'vue'

export default defineComponent({
   props:{
      value: {
         type: Number,
         require: true
      }
   }
})
</script>