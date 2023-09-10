export interface User {
   image: string,
   name: string,
   username: string,
}

export interface Comment {
   id?: number,
   content: string,
   user: User,
   replyingTo?: string,
   replies?: Comment[]
}

export interface ProductRequest {
   id: number,
   title: string,
   category: string,
   upvotes: number,
   status: StatusEnum,
   description: string,
   comments?: Comment[]
}

export enum StatusEnum {
   Suggestion = 'suggestion',
   Planned = 'planned',
   InProgress = 'in-progress',
   Live = 'live',
}

export interface StatusByCount{
   name: string,
   count: number
}

export interface StatusItems{
   key: StatusEnum,
   color?: string,
   description: string,
   productRequests: ProductRequest[],
}


export enum Category{
   All = 'All',
   UI = 'UX',
   UX = 'UI',
   Enhancement = 'Enhancement',
   Bug = 'Bug',
   Feature = 'Feature',
}

export interface Filter {
   category: string
   status: string
}