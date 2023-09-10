# Vue 3 + TypeScript + Vite + Electron + TailwindCSS + ESLint + Prettier

This small project was made for bankers who work on securing credits. 
It allows you to conveniently look at completed gas purchases and see who won 
the auctions.

There are asynchronous data parsing requests and HTML parsing. 
How to configure scripts to run in development and production mode.

All dependencies are installed as dev dependencies because the finished product is the build itself, 
that is, the exe file.

# Explanation of how to run the project

1. Clone the repository
```bash
git clone https://github.com/bogdanfedorov/prosorro-dec
```
2. Install dependencies
```bash
npm install
```
3. Run the project in development mode
```bash
npm run dev
```
4. Build the project (vue -> js/htm/css)
```bash
npm run build
```
5. Make te project (js/htm/css -> exe)
```bash
npm run make
```

Please note that in the file ```electron/main.js``` there is a line ```mainWindow.webContents.openDevTools()```, comment it if you do not need dev tools in the image. I use it to test the build.

# Contact me

If you have any questions or propositions, please contact me by email:
```bash
bogdanfedorov@gmail.com
`
