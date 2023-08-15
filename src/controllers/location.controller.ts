import prisma from "../services/prisma";
import { Request, Response } from "express";
import { CustomRequest } from "./user.controller";
import axios from 'axios';
import {getDistance} from 'geolib';

export const locationController = {
    async getLocation (req: Request, res: Response) {
        try {
            // const email = (req as CustomRequest).email
            const { zipCode } = req.query;

            // Use a geocoding service to convert the zip code into coordinates
            const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&format=json&limit=10`
            );

            // console.log()
            const data = response.data;

            // Replace with the actual latitude and longitude of the provided zip code
            const zipCodeLat = 34.0147504943816;
            const zipCodeLon = -84.25858505141764;

            // const distance = getDistance(
            //     { lat: parseFloat(888998+""), lon: parseFloat(998989+"") }, // user
            //     { lat: parseFloat(zipCodeLat + ""), lon: parseFloat(zipCodeLon + "") } // kitchen
            // );
            
            //Get all kitchen from prisma
            // const kitchens = await prisma.kitchen.findMany();Creat
            // Fillter location in 1 mile radius
            const radiusInMeters = 1609.34; // 1 mile in meters
            const locations = data.filter((location:any) => {
                const distance = getDistance(
                    { lat: parseFloat(location.lat), lon: parseFloat(location.lon) }, // user input zipCode
                    { lat: parseFloat(zipCodeLat + ""), lon: parseFloat(zipCodeLon + "") } // kitchen zipCode
                );

                return distance <= radiusInMeters;
            });

            res.json({ locations })
        
        } catch (error) {
            console.error('Error fetching locations:', error);
            res.status(500).json({ error: 'An error occurred while fetching locations' });
        }

        // Usage
        // const zipCode = '12345';
        // const coordinates = await geocodeZipcode(zipCode);
        // console.log(coordinates);
    }
}