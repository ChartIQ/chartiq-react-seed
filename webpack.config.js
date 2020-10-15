var path = require('path');
var webpack = require('webpack');

module.exports = {
		entry: [
				"./src/index.js"
		],
		output: {
				publicPath: '/dist/',
				path: path.resolve(__dirname, './dist'),
				filename: "[name].js"
		},
		module: {
				rules: [
						{
							test: /\.(js|jsx)$/,
							exclude: [
									/node_modules/, /chartiq/
							],
							use: {
								loader: 'babel-loader',
								options: {
										presets: ['@babel/preset-env', '@babel/preset-react']
								}
							}
						}
				]
		},
		externals: {
		// List externals here
		},
		plugins: [
				new webpack.DefinePlugin({
						"process.env": {
								NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
						}
				})
		],
		devServer: {
				port: 3000,
				compress: true,
				inline: true,
				stats: 'minimal'
		},
		resolve: {
				extensions: ['.js', '.jsx'],
				symlinks: false
		}
};
