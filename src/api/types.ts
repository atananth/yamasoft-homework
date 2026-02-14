export interface Trip {
    id: number, // integer
    name: string,
    image: string,
    description: string,
    long_description: string,
    rating: number
}

export type Trips = Trip[]