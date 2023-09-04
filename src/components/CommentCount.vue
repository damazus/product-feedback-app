<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
   name: 'CommentCount',
   props: {
      count: {
         type: Number,
         required: true
      }
   }
})
</script>

<template>
   <div class="comment-count" :class="{'comment-count--empty': !Boolean(count)}">
      <SvgIcon class="comment-count__icon" name="shared-icon-comments"/>
      <span class="comment-count__number">{{ count }}</span>
   </div>
</template>

<style lang="scss">
.comment-count{
   display: flex;
   align-items: center;
   gap: 8px;
   font-weight: 700;

   &__icon{
      font-size: 22px;
   }

   &__number{
      color: var(--color-7);

      .comment-count--empty &{
         opacity: 0.5;
      }
   }
}
</style>