import {defineStore} from 'pinia'
import type {ProductRequest, User, Filter, StatusItems, StatusByCount} from "@/types";
import {Category, StatusEnum} from "@/types";
import Vue from "vue";
import {id} from "@/utils";

export interface FeedbackState {
   currentUser: User | null,
   productRequests: ProductRequest[]
   filters: Filter
}

export const useFeedbackStore = defineStore({
   id: 'feedback',
   state: (): FeedbackState => ({
      currentUser: null,
      productRequests: [],
      filters: {
         category: Category.All,
         status: ''
      }
   }),
   getters: {
      categories: (state) => {
         return [...new Set(state.productRequests.map(item => item.category))]
      },
      status: (state) => {
         let items: StatusByCount[]  = []

         const statusObject = state.productRequests
            .map((item) => item.status)
            .reduce<{ [key: string]: number }>((acc, value) => {
               acc[value] = (acc[value] || 0) + 1
               return acc
            }, {})
         items = Object.keys(statusObject).map((key) => ({name: key, count: statusObject[key]}))

         return items
      },
      statusItems(): {[key: string]: StatusItems}{
         const items = {
            [StatusEnum.Planned]: {
               key: StatusEnum.Planned,
               color: '',
               description: 'Ideas prioritized for research',
               productRequests: this.productRequests.filter((item: ProductRequest) => item.status.toLowerCase() === StatusEnum.Planned.toLowerCase())
            },
            [StatusEnum.InProgress]: {
               key: StatusEnum.InProgress,
               color: '',
               description: 'Currently being developed',
               productRequests: this.productRequests.filter((item: ProductRequest) => item.status.toLowerCase() === StatusEnum.InProgress.toLowerCase())
            },
            [StatusEnum.Live]: {
               key: StatusEnum.Live,
               color: '',
               description: 'Released features',
               productRequests: this.productRequests.filter((item: ProductRequest) => item.status.toLowerCase() === StatusEnum.Live.toLowerCase())
            }
         }

         return items
      },
      productRequestsFiltered(): ProductRequest[]{
         if(this.filters.category !== Category.All){
            return this.productRequests.filter((item: ProductRequest) => {
               return item.category.toLowerCase() === this.filters.category.toLowerCase()
            })
         }

         return this.productRequests
      },
      productRequest(){
         return (id: number) => this.productRequests.find((item: ProductRequest) => item.id === id)
      }
   },
   actions: {
      setFilters(category: string){
         this.filters.category = category
      },
      add(productRequest: ProductRequest){
         productRequest.comments = []
         this.productRequests.unshift(productRequest)
      },
      edit(productRequest: ProductRequest){
         const index = this.productRequests.findIndex((item: ProductRequest) => item.id === productRequest.id)

         if(index !== -1){
            let productRequestFound = this.productRequests[index]
            productRequestFound = {
               ...productRequestFound,
               ...productRequest
            }

            Vue.set(this.productRequests, index, productRequestFound)
         }
      },
      upVote(productRequest: ProductRequest){
         const index = this.productRequests.findIndex((item) => item.id === productRequest.id)

         if(index !== -1){
            const itemFound = this.productRequests[index]
            itemFound.upvotes += 1
            this.productRequests.splice(index, 1, itemFound)
         }
      },
      delete(id: number){
         const index = this.productRequests.findIndex((item: ProductRequest) => item.id === id)

         this.productRequests.splice(index, 1)
      },
      addComment(productRequestId: number, content: string){
         const index = this.productRequests.findIndex((item) => item.id === productRequestId)

         if(index !== -1 && this.currentUser){
            const itemFound = this.productRequests[index]

            if (!itemFound.comments){
               itemFound.comments = []
            }

            itemFound.comments.unshift({
               id: id(),
               content,
               user: this.currentUser
            })

            this.productRequests.splice(index, 1, itemFound)
         }
      }
   }
})
