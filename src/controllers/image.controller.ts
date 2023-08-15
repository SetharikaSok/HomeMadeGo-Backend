import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config();

// Set your AWS region
AWS.config.update({ 
    region: 'us-east-2', 
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
 });

// Create an S3 instance
const s3 = new AWS.S3();

// Configuration for the S3 bucket
const BUCKET_NAME = 'homemadego';

export const imageController = {
    async upload(file: Express.Multer.File) { 

        // Define parameters for the S3 upload
        const params = {
            Bucket: BUCKET_NAME,
            Key: file.originalname,
            Body: file.buffer,
            ACL: 'public-read'
        };
        
        // // Upload the file to S3
        const aws_response = await s3.upload(params).promise();

        return aws_response.Location;
    }
}