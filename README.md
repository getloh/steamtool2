# Steve's Steam Tool v2
A steam library and profile comparison tool made with Next.JS, TailwindCSS and utilizing the Steamworks API

## Live version
(For now) The project has been deployed to Vercel and is available to see there.
[https://steamtool.vercel.app/](https://steamtool.vercel.app/)
## Running Locally

Clone and create a .env file in the root, supplying your steam dev API key - https://steamcommunity.com/dev

Then run locally via 

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

### NextJS 13
Utilizes Next13's App folder for routing, as well as internal API routes to forward fetch requests.

### (Almost) All custom code
I used react-hot-toast for some pop-up warning messages, but otherwise modals etc and other components are all home made.

### Responsive for mobile
Features like hover-over make sense on desktop, but many elements had to be remade and repositioned for mobile view.

## Screenshots
Intro/Tutorial Page

![https://github.com/getloh/steamtool2/blob/main/documentation/steamtool2-1.png?raw=true](https://github.com/getloh/steamtool2/blob/main/documentation/steamtool2-1.png?raw=true)

Main page showing multiple user filter mode

![https://github.com/getloh/steamtool2/blob/main/documentation/steamtool2-2.png?raw=true](https://github.com/getloh/steamtool2/blob/main/documentation/steamtool2-2.png?raw=true)

Player detail modal view

![https://github.com/getloh/steamtool2/blob/main/documentation/steamtool2-3.png?raw=true](https://github.com/getloh/steamtool2/blob/main/documentation/steamtool2-3.png?raw=true)

Responsive mobile views

![https://github.com/getloh/steamtool2/blob/main/documentation/steamtool2-mobile.png?raw=true](https://github.com/getloh/steamtool2/blob/main/documentation/steamtool2-mobile.png?raw=true)

## Video
![https://github.com/getloh/steamtool2/blob/main/documentation/steamtool2-video.mp4?raw=true](https://github.com/getloh/steamtool2/blob/main/documentation/steamtool2-video.mp4?raw=true)
