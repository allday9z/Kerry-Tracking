# Kerry Express Tracking

This project provides a simple Express.js service that, given a Kerry Express (Thailand) tracking number, will scrape the official Kerry Express tracking website to return shipping details such as estimated delivery date, sender, receiver, and tracking history.

## Features

- **Puppeteer & Cheerio Integration:** Uses Puppeteer to navigate and click through the Kerry Express site, and Cheerio to parse the returned HTML.
- **Simple API Endpoint:** `/track/:trackingNumber` endpoint returns JSON-formatted tracking information.

## Requirements

- **Node.js & npm**: Make sure you have Node.js (LTS recommended) installed.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/Kerry-Tracking.git
    ```

2. **Navigate into the project directory:**
    ```bash
    cd Kerry-Tracking
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

## Usage

1. **Start the server:**
    ```bash
    npm start
    ```
   
   The server will start on `http://localhost:25565` by default (or the port set in `PORT` environment variable).

2. **Test the endpoint:**
    ```bash
    curl http://localhost:25565/track/YOUR_TRACKING_NUMBER
    ```
   
   Replace `YOUR_TRACKING_NUMBER` with a valid Kerry Express tracking number. The endpoint will return a JSON object similar to:
   
   ```json
   {
     "กำหนดส่ง": "2024-12-20",
     "ผู้ส่ง": "John Doe",
     "ผู้รับ": "Jane Smith",
     "info": [
       {
         "date": "2024-12-18",
         "time": "10:30",
         "description": "Parcel has been received at the origin center",
         "location": "Bangkok Distribution Center"
       },
       {
         "date": "2024-12-19",
         "time": "14:45",
         "description": "Parcel is in transit",
         "location": "On the way to Chiang Mai"
       }
     ]
   }

Environment Variables
PORT: Set a custom port number if you don't want to use the default port (25565).

Troubleshooting
Timeouts or No Results: If the scraper takes too long or returns no results, ensure the tracking number is correct and that the Kerry Express site is accessible.
Puppeteer Issues on Linux Servers: Make sure to use --no-sandbox --disable-setuid-sandbox arguments as shown in the code, or ensure all system dependencies for Puppeteer are installed.

MIT License

Copyright (c) 2024 M2Dev

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.
