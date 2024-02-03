export type Rating = {
    rate: number;
    count: number;
}

/* export type Product = {
    category: string
    description: string
    id: number
    image: string
    price: number
    rating: Rating
    title: string
}  */

export type Product = {
    id: string
    imageUrl: string,
    price: number,
    title: string,
    description: string,
    createdAt: string
} 