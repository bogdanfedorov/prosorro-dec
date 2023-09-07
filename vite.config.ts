import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path';


export default defineConfig(({command}) => {

  const config = {
    plugins: [vue()],
  }
  if (command === "build") {
    if (process.platform === "win32") {
      Object.assign(config, {
        base: path.resolve(__dirname, "./dist").split(path.sep).join("/")
      })

    } else {
      Object.assign(config, {
        base: path.resolve(__dirname, "./dist")
      })
    }
  }

  return config
})
