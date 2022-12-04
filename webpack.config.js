const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
let target = 'web';

if (process.env.NODE_ENV === 'production') {
	mode = 'production';
	target = 'browserslist';
}

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true,
		static: path.resolve(__dirname, './build'),
		open: true,
		compress: true,
		hot: false,
		port: 8080,
		client: {
			overlay: {
				errors: true,
				warnings: false,
			},
			progress: true,
		},
	},
	entry: {
		main: path.resolve(__dirname, './src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.js',
		clean: true,
	},
	target,
	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				exclude: /node_modules/,
				type: mode === 'production' ? 'asset' : 'asset/resource',
			},
			{
				test: /\.m?mp3$/,
				exclude: /node_modules/,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				exclude: /node_modules/,
				type: 'asset/inline',
			},
			{
				test: /\.(s[ac]|c)ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{loader: 'css-loader'},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								sourceMap: true,
								plugins: [require('autoprefixer')],
							},
						},
					},
					{loader: 'sass-loader'},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new HtmlWebpackPlugin({
			title: '[title]',
			template: './src/index.html',
		}),
	],
};
