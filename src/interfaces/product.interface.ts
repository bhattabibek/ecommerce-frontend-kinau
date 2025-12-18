import type { baseInitialStateI } from "./baseInitialState.interface"

export interface productI  {
            "isWeeklyDeals": boolean,
            "isBestSeller": boolean,
            "_id": string,
            "name": string,
            "description": string,
            "category": {
                "_id": "68b2ed2a58ca9fa3ee8aae06",
                "name": "Vivos",
                "slug": "vivos",
                "id": "68b2ed2a58ca9fa3ee8aae06"
            },
            "basePrice": number,
            "variants": [],
            "mainImages": [
                "https://res.cloudinary.com/di3v3rvnq/image/upload/v1756556684/products/main/ypjowfx1cujfhdzbmod0.png"
            ],
            "tags": [],
            "isActive": true,
            "isFeatured": false,
            "createdAt": Date,
            "updatedAt": Date,
            "slug": string,
            "totalStock": number,
            "priceRange": {
                "min": number,
                "max": number,
            },
            "id": string
        }

export interface SizeI extends baseInitialStateI{
    _id: string;
    name: string;
    code: string;
    description: string;
}

export interface ColorI extends baseInitialStateI {
    _id: string;
    name: string;
    hexCode: string;
    description: string;
}