const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
  filename: './assets/css/app.css'
});

const config = {

	context: path.resolve(__dirname, 'src'),

	entry: {
    	// removing 'src' directory from entry point, since 'context' is taking care of that
		app: [ 'babel-polyfill', './app.js']
	},

  	output: {
    	path: path.resolve(__dirname, 'build'),
    	filename: './assets/js/[name].bundle.js'
  	},

  	module: {
	  rules: [
	    //babel-loader
	    {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			include: /src/,
			use:{

				loader: 'babel-loader',
				options: {
		          presets: ['es2015']
		        }
			}
		},
	     //html-loader
	    { 
	    	test: /\.html$/, 
	    	use: ['html-loader']
	    },

	    {
		  test: /\.scss$/,
		  include: [path.resolve(__dirname, "src/assets/scss")],
		  use: extractPlugin.extract({
		  	publicPath: '../../',
		    use: [
		    	{
			        loader: 'css-loader',
			        options: {
			        }
			    },
			    {
			        loader: 'sass-loader',
			        options: {
			          sourceMap: true
			        }
			    }
    		],
		    fallback: 'style-loader'
		  })
		}, 

		{
		  test: /\.(jpg|png|gif|svg|ico)$/,
		  use: [
		    {
		      loader: 'file-loader',
		      options: {
		        name: '[name].[ext]',
		        outputPath: './assets/media/'
		      }
		    }
		  ]
		},

		{
		  test: /\.(woff|woff2|eot|ttf|otf)$/,
		  use: ['file-loader']
		}

	  ]
	},

	plugins: [
  		new CleanWebpackPlugin(['build']),
  		new HtmlWebpackPlugin({template: 'index.html'}),
  		extractPlugin
	],

  	devServer: {
	  contentBase: path.resolve(__dirname, "./dist/assets/media"),
	  compress: true,
	  port: 12000,
	  stats: 'errors-only',
	  open: true,
	  historyApiFallback: true, 
      historyApiFallback: {
            index: '/index.html',
      },
	  proxy: {
		'/api/*': 
		 {
			target: 'http://localhost:5000'
		 }
	  }
	},
	//source-map use for production debug
	devtool: 'inline-source-map'
	

}

module.exports = config;