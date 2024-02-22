import fs from "fs"
import path from 'path';
import axios from 'axios';

// Function to download and store an image locally
export async function downloadImage(imageUrl:string | undefined, fileName:string) {

    if(imageUrl != undefined){

        try {
          // Make a GET request to download the image
          const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      
          // Ensure the public directory exists
          const publicDir = path.join(process.cwd(), 'public/profile');
          if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
          }
      
          // Write the image data to a file in the public directory
          const imagePath = path.join(publicDir, fileName);
          fs.writeFileSync(imagePath, response.data);
      
          console.log('Image downloaded and stored successfully:', imagePath);
          return imagePath; // Return the path to the stored image
        } catch (error) {
          console.error('Error downloading and storing image:', error);
          return null; // Return null if there's an error
        }
    }
}



