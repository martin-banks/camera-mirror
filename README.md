![Camera Mirror logo](/src/files/images/camera-mirror-logo-light-background@3x.png)

# Camera Mirror

A fun little project playing around with the webcam from the `mediaDevices` api to create symetrical images.

The idea comes from the notion that no-one's face is symetrical, so what what would we look like if they were? And how to find out if you don't know your way around PhotoShop?


## What does it use?
Gatsby with React Styled Components is the setup I've been using recently and there is much to learn, so let's keep on with that.

The rest is good old vanilla JS and a little bit of maths.

Shoutout to Wes Bos' [JavsScript 30 course](https://javascript30.com/). Great inspiration and reference to get up and running using the webcam in a browser.



## How?
This isn't a full technical guide, only outlining some of the high level concepts I used to get to the end reseult.


### Take a live feed from the webcam.
Get a webcam feed and display as a video element as a live feed to help the user line up along the center of the frame.

### Get the image data
Converting the video into a canvas, we can get read the image data as a massive array of pixel values. Each of the RGBA values are listed in a single array, so before I can figure out which side the data represents it should grouped into sub arrays representing each pixel.

### Identifying sides and creating the mirror effect
The dimensions of the video describes the boundary of a grid the pixels are plotted in. For example; in a 10 x 10 grid the 15th pixel will be on the second row and fifth column; meaning it's on the right hand side of the image.

[I built another small project you can check out here,](https://github.com/martin-banks/array-mirror) that goes into more detail of how I'm handling this.


### Render the update
With the new mirrored-arrays for each side we can now render images into canvas elements (ensuring that each of the nested arrays are spread into a single array of numbers again). With running within an interval loop we know have a live feed of the mirrored images



## What did I learn?
- Brushing up on React and the the new(ish) Hooks
- Working with very large arrays performance was very important; turns out good old for loops are more efficient that the array methods I've come to rely on so much.
- One small spelling mistake and break everything and not throw an error :(


## Taking it further

This was a fun project to refresh some (admittedly rusty) skills and learn some nerw tricks along the way. I built what I set out to do but there's always more, maybe I'll come back to it one day...

- Remove steps where the pixel data is grouped and ungrouped into into sub-arrays of 'pixels'; this feel like and unnecessary performance hit.
- Create output images at the maximum resolution supported by the web cam.
- Additional manipulation types.
- Change the manipulation after the the capture is complete.

