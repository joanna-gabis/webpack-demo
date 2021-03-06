const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: ['./src/js/app.js'], //entry file, may be many files separated with commas
	output: {
		path: path.resolve(__dirname, 'dest'), //output directory
		filename: 'app.js' //output file (merge all JS-files will into one app.js file)
	},
	module: {
		rules: [
			//scripts rule (*.js)
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'env',
								{
									targets: {
										browsers: ['> 1%', 'last 2 versions']
									}
								}
							]
						]
					}
				}
			},
			//styles rule (*.scss, *.css)
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						} 
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							plugins: () => [
								new require('autoprefixer')({
									browsers: [
										'> 1%'
									]
								})
							]
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						} 
					}
				]
			},
			//images rule
			{
				test: /\.(jpg|jpeg|gif|png)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'images'
					}
				}
			},
			//fonts rule
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						publicPath: 'fonts',
						outputPath: 'fonts'
					}
				}
			}
		]
	},
	plugins: [
		//cleans directory (dest)
		new CleanWebpackPlugin(['dest']),
		//adds all styles and scripts to the template index.html
		//and puts that file to the output directory as index.html file
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		}),
		//merges all CSS files into one app.css file
		new MiniCssExtractPlugin({
			filename: 'app.css'
		})
	],
	watch: true,
	mode: 'development', //alternative 'production'
	devtool: 'source-map'
}