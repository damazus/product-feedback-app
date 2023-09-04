<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { toKebabCase } from '@/utils'
import type {Location} from "vue-router";

export enum ButtonTheme {
   Primary = 'Primary',
   Info = 'Info',
   Secondary = 'Secondary',
   Danger = 'Danger',
   Link = 'Link',
   LinkFilled = 'LinkFilled',
   LinkUnderline = 'LinkUnderline',
   Tag = 'Tag',
   Vote = 'Vote',
}

export default defineComponent({
   props: {
      theme: {
         type: String as PropType<ButtonTheme>,
         default: ButtonTheme.Primary
      },
      icon: {
         type: String,
         default: undefined
      },
      showIcon:{
         type: Boolean,
         default: true
      },
      active:{
         type: Boolean,
         default: false
      },
      marginXNegative: {
         type: Boolean,
         default: false
      },
      marginYNegative: {
         type: Boolean,
         default: false
      },
      to: {
         type: Object as PropType<Location>,
         default: () => undefined
      }
   },
   computed: {
      themeClass() {
         return toKebabCase(this.theme).toLowerCase()
      },
      finalIcon(): string {
         if(!this.icon){
            if(this.theme === ButtonTheme.Vote){
               return 'shared-icon-arrow-up'
            }

            if(this.theme === ButtonTheme.Link || this.theme === ButtonTheme.LinkFilled){
               return 'shared-icon-arrow-left'
            }
         }

         return this.icon
      },
      tag(): string {
         return this.to ? 'router-link' : 'button'
      }
   }
})
</script>

<template>
   <component
      :is="tag"
      type="button"
      class="button-component"
      :class="[
         `button-component--${ themeClass }`,
         {
            'button-component--margin-x-negative': marginXNegative,
            'button-component--margin-y-negative': marginYNegative,
            'button-component--active': active,
         }
      ]"
      :to="to"
      v-bind="$attrs"
      v-on="$listeners"
   >
      <SvgIcon
         v-if="showIcon && finalIcon"
         class="button-component__icon"
         :name="finalIcon"
      />
      <span class="button-component__content">
         <slot></slot>
      </span>
   </component>
</template>

<style lang="scss">
.button-component{
   --color: inherit;
   --background-color: inherit;
   --border-color: inherit;
   --hover-foreground-color: inherit;
   --hover-background-color: inherit;

   display: inline-flex;
   justify-content: center;
   align-items: center;
   gap: 8px;
   font-weight: 700;
   font-size: 14px;
   line-height: 23px;
   padding: 10.5px 24px;

   color: var(--color);
   background: var(--background-color);
   border: none;
   border-radius: 10px;
   cursor: pointer;
   text-decoration: none;

   &__content{
      &::first-letter{
         text-transform: capitalize;
      }
   }

   &:hover{
      --color: var(--hover-foreground-color);
      --background-color: var(--hover-background-color);
   }

   &--margin-x-negative{
      margin-left: -24px;
   }

   &--margin-y-negative{
      margin-bottom: -13px;
   }

   &--primary{
      --color: var(--color-interactive-primary-foreground);
      --background-color: var(--color-interactive-primary-background);
      --hover-foreground-color: var(--color-white);
      --hover-background-color: var(--color-interactive-primary-hover-background);
   }

   &--info{
      --color: var(--color-interactive-info-foreground);
      --background-color: var(--color-interactive-info-background);
      --hover-foreground-color: var(--color-white);
      --hover-background-color: var(--color-interactive-info-hover-background);
   }

   &--secondary{
      --color: var(--color-interactive-secondary-foreground);
      --background-color: var(--color-interactive-secondary-background);
      --hover-foreground-color: var(--color-white);
      --hover-background-color: var(--color-interactive-secondary-hover-background);
   }

   &--danger{
      --color: var(--color-interactive-danger-foreground);
      --background-color: var(--color-interactive-danger-background);
      --hover-foreground-color: var(--color-white);
      --hover-background-color: var(--color-interactive-danger-hover-background);
   }

   &--link{
      --color: var(--color-interactive-link-foreground);
      --background-color: var(--color-interactive-link-background);
      --hover-background-color: var(--color-interactive-link-background);

      &:hover{
         text-decoration: underline;
      }
   }

   &--link-filled{
      --color: var(--color-interactive-link-filled-foreground);
      --background-color: var(--color-interactive-link-filled-background);
      --hover-background-color: var(--color-interactive-link-filled-background);

      &:hover{
         text-decoration: underline;
      }
   }

   &--link-underline{
      padding: 0;
      text-decoration: underline;
      --color: var(--color-2);

      &:hover {
         color: #8397F8;
      }
   }

   &--tag,
   &--vote{
      --background-color: var(--color-interactive-translucent-background);
      --hover-background-color: var(--color-interactive-translucent-hover-background);
   }

   &--tag{
      --color: var(--color-interactive-translucent-tag-foreground);
      --hover-foreground-color: var(--color-interactive-translucent-tag-foreground);

      font-size: 13px;
      font-weight: 600;
      padding: 5px 12px;
   }

   &--vote{
      --color: var(--color-interactive-translucent-vote-foreground);
      --hover-foreground-color: var(--color-interactive-translucent-vote-foreground);

      flex-direction: column;
      font-size: 13px;
      font-weight: 700;
      padding: 8px 12px;
      gap: 2px;

      .button-component__icon{
         color: var(--color-2);
      }
   }

   &--active{
      --color: var(--color-interactive-translucent-active-foreground);
      --background-color: var(--color-interactive-translucent-active-background);

      &:hover{
         --color: var(--color-interactive-translucent-active-foreground);
         --background-color: #2242dc;
      }
   }
}
</style>