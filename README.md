# Mathematische Grundlagen von Computergrafik und Gestaltung
This repository contains supporting code for the lectures MaGrCGGe (MKB2) and STEM1 (GMB) in the summer term 2024

## Usage
The code has been developed and demonstrated using [Visual Studio Code](https://code.visualstudio.com/download). Settings and extension recommendations are committed. Make yourself familiar with the [terminal in VS Code](https://code.visualstudio.com/docs/terminal/basics).

## Vector and matrix calculus in 2D
Open [index.html](./index.html) using the live server extension. Change the ```drawStuff()``` method in [main.js](./main.js) in order to experiment with vectors and matrices in 2D. The implementation of the mathematical functions (add, scale, ...) is done in [math.js](./math.js).

## Rotation of images
Open [rotation.html](./rotation.html) using the live server extension. Move the slider to rotate the image. Below the image, the rotation matrix is shown, once with numbers and once with sine and cosine of the rotation angle.

## 3D cameras in WebGL with Three.JS
### Installation
The code is based on the three.js hello world application, created by following this [installation guide](https://threejs.org/docs/index.html#manual/en/introduction/Installation). In order to use the code [Node.js](https://nodejs.org/) needs to be installed. You can check if it is already installed by typing:
```
node --version
```
into the terminal.
Then install three.js and vite via npm as recommended by three.js by typing:
```
npm install 
```
(The package.json is already committed so that this command is enough.)

From your terminal, go to the camerasThreeJS subfolder and run vite:
```
cd camerasThreeJS
npx vite
```
This starts a local vite server. If everything went well, you'll see a URL like http://localhost:5173 appear in your terminal, and can open that URL to see your web application. Every time the code is changed and saved, the page is reloaded automatically. You can stop the server by pressing Ctrl-C in the terminal.

### Usage
The application renders a colored cube on the screen with a fixed size of 1000 by 1000 pixels using a perspective camera. There are the following interactions possible:
- [Orbit controls](https://threejs.org/docs/index.html#examples/en/controls/OrbitControls) to change the camera. You can rotate the cube with the left mouse button. Note that mathematically the camera is orbiting the cube. You can translate the camera with the arrow keys. It is also possible to zoom with the mouse wheel.
- Pressing 'o' switches to an orthographic camera.
- Pressing 'p' switches to an perspective camera.
- Pressing 'f' switches between the fixed screen size and window screen size.
- Pressing 'q' starts and stops a rotation of the cube.
For most of those interactions the corresponding transformation matrix is printed on the console. Open your browsers developer tools (usually F12) to see the matrix values.

### Code hints
The code is demonstrated in the lecture in order to explain how the projection matrices for both orthographic and perspective cameras are defined. It is highly recommended to change the code in order to understand the topic. Here are the most important lines of code listed:
- Change the screen size in *line 4* if your monitor resp. browser window is not large enough to display 1000 by 1000 pixels.
- The camera parameters are defined in *lines 12ff*.
  - The values for `left, right, top, bottom, near` and `far` resp. `aspect` and `fovy` are set as numbers that makes it easy to calculate during the lecture. 
  - Note that the camera position and orientation is set in the function `setupCamera()` to z=2 so that the cube object which is placed in the origin can be seen. The camera parameter `rotation` is set to `(0,0,0)` which is the default setting and makes the camera "look" towards the negative z-axis.
- In the *lines 97ff* the key events are handled.
- In *line 83* the animation loop is called and the cube is rotated if the `doAnimate` variable is `true`.
- In *line 71* the function `printMatrix(matrix)` is defined which prints out matrix values on the console. Note that three.js internally stores matrices in column-major order. 

