# V60 IOT
I like V60 brew but I am to lazy. This is just the digitilaztion of the system. The automation part can be found in other reprositories.

## Program
The digitalization will use three.js for the visuaization and mqtt for the state of the machine. Will change if other method is found
 
## UI
![UI](\docs\ui_ver1.png)

This the current UI. The simplest work way of making this is using three.js and dotUI library. Three.js have an import function for many 3d file, such as 3dobj, stl, step, and glhf. I found that glhf is the best for web, but i found it hard since the objest i have is from solidworks which cannot export is easily. I used the stl import function and make the material in three.js. For assembly you probably need to do it in three.js and not solidworks, this include the mechanical mates, i used js for the mathemtical animation.

Some problem i have, (and you could have if your new to three.js) three.js rotate property of the 3d object will rotate the object around the center of the parent box, which at first is the scene. you could make a box model that encompasses the object you want to rotate. There is a good website for many basic problems/<a href='https://hofk.de/main/discourse.threejs/BeginnerExample/BeginnerExample.html'>example</a> of three.js . use inspect to see it.

The dotUI lib can help make ui for the button. its pretty easy.

## Data transmision
WIP. will continue after printed the real things