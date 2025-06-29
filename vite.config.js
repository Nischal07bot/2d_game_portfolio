import {defineConfig} from 'vite'
export default defineConfig({
     base:"./",
     build:{
        minify:"terser",//there is a bug with kaboom that if we just use default es6 then the code will not work


     },  
})