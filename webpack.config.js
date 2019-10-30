const path = require('path');//Requerimos el módulo path
const HtmlWebpackPlugin = require('html-webpack-plugin');//Instanciar el plugin de html-webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//Crear el scss

module.exports = {//Crear un nuevo módulo, para configurar cada elemento que necesitamos
    entry: './src/index.js',//Hacer referencia al archivo principal 
    output: {//Dónde vamos a guardar nuestros archivos resultantes cuando hagamos la compilación
        path: path.resolve(__dirname, 'dist'),//.resolve: detectar el directorio donde nos encontramos
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {//resolver las extensiones que vamos a utilizar para nuestro proyecto
        extensions: ['.js', '.jsx']//Utilizar las extensioones
    },
    module: {//Módulo con las reglas necesarias para nuestro proyecto
        rules: [
            {
                test: /\.(js|jsx)$/,//expresión regular. Identificación de nuestros archivos en js y jsx
                exclude: /node_modules/,//Pasar la exlusion de la carpeta node_modules
                use: {
                    loader: 'babel-loader'//Utilizar el loader de babel
                },
            },
            {
                test: /\.html$/,//Regla para trabajar con los archivos html
                use: [
                    {
                        loader: 'html-loader'//Utilizar el loader de html 
                    }
                ]
            },
            {
                test: /\.(s*)css$/,//Regla para trabajar con archivos scss o css
                use: [
                    { 
                        loader: MiniCssExtractPlugin.loader 
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|gif|jpg)$/,
                use: [
                    {
                        'loader': 'file-loader',
                        options:{
                            name: 'assets/[hash].[ext]'
                        }
                    }
                ]
            }
        ],
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [//Añadir los plugins
        new HtmlWebpackPlugin({// Crear una referencia al HtmlWebpackPlugin, le pasamos un objeto con la configuración que necesitamos
            template: './public/index.html',//Donde está ubicado el template que tenemos
            filename: './index.html',//El nombre del archivo
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].css'//Archivo resultante
        }),
    ], 
};