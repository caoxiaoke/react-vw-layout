最近在react 上配置使用vw 适配方案，总体表现优秀。所以很多同学们都在观望vw 适配到底行不行，靠不靠谱。

在这里，从我在项目中实战应用下来但经验来说，可行，靠谱！

简单配置，一劳永逸，高可靠的还原设计师的稿子，给你底气和设计师对标UI。

欢迎挑战还原度，从此做一个自信的前端工程师。哈哈～

一定要看到底，可能有你会遇到坑的解药！拿走不谢++++ 给个小星星吧


该demo 为vw 适配方案 react 16 && react-router-dom 4+ 搭配使用，一个多页面路由项目.

步骤：

1、创建项目 && 初始化
 ```html 
create-react-app react-vw-layout

cd react-vw-layout
 ```

2、开启我们的配置之路&&简单配置

react 把配置都隐藏了，需要我们手动来显示配置
 ```
npm run eject

//Are you sure you want to eject? This action is permanent. (y/N) y
 ```
 
之后可以看到 config文件 && scripts 文件夹

![Image text](https://github.com/caoxiaoke/react-vw-layout/blob/master/src/images/WX20190325-003909%402x.png)
<br/>

3、安装我们需要配置用到的插件(建议使用cnpm)
 ```html 
npm install --save postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano
 ```


4、开始配置

在config/webpack.config.js 中修改代码

先引入postcss cssnano插件

```html 
const postcssAspectRatioMini = require('postcss-aspect-ratio-mini');
const postcssPxToViewport = require('postcss-px-to-viewport');
const postcssWriteSvg = require('postcss-write-svg');
const postcssCssnext = require('postcss-cssnext');
const postcssViewportUnits = require('postcss-viewport-units');
const cssnano = require('cssnano');
 ```
 
增加postcss 配置

    {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            //在这个位置加入我们需要配置的代码
            //在这个位置加入我们需要配置的代码
            //在这个位置加入我们需要配置的代码
            postcssAspectRatioMini({}),
            postcssPxToViewport({
                viewportWidth: 750, // (Number) The width of the viewport.
                viewportHeight: 1334, // (Number) The height of the viewport.
                unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
                viewportUnit: 'vw', // (String) Expected units.
                selectorBlackList: ['.ignore', '.hairlines', '.list-row-bottom-line', '.list-row-top-line'], // (Array) The selectors to ignore and leave as px.
                minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
                mediaQuery: false // (Boolean) Allow px to be converted in media queries.
            }),
            postcssWriteSvg({
                utf8: false
            }),
            postcssPresetEnv({}),
            // postcssViewportUnits({
            // 	filterRule: rule => rule.selector.indexOf('::after') === -1 && rule.selector.indexOf('::before') === -1 && rule.selector.indexOf(':after') === -1 && rule.selector.indexOf(':before') === -1
            // }),
            postcssViewportUnits({}),
            cssnano({
                "cssnano-preset-advanced": {
                    zindex: false,
                    autoprefixer: false
                },
            })
            //在这个位置加入我们需要配置的代码
            //在这个位置加入我们需要配置的代码
            //在这个位置加入我们需要配置的代码
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      }

5、配置完成以后，我们可以看到vw 神奇的效果了

```html 
npm run start
 ```
 
浏览器会打开 http://localhost:8080/
```html 
.App {
	background-color: bisque;
	display: flex;
	color: white;
	justify-content: center;
	align-items: center;
	font-size: 30px;
	height: 200px;
	width: 750px;
}
 ```

![Image text](https://github.com/caoxiaoke/react-vw-layout/blob/master/src/images/WX20190325-005512%402x.png)
<br/>

6、我们加入兼容我们android 低版本的机型hack 加入viewport-units-buggyfill配置

同学们，经过实战配置viewport-units-buggyfill之后，4.2 4.3 4.4+ 系统版本上表现都 ok,项目中主要使用flexbox 布局

demo 版本中直接引入阿里的cdn 文件，在自己项目中可以放自己公司的服务器或者项目中。

打开public/index.html，在head 中插入 viewport-units-buggyfill 和body 中使用


```html 
<head>
    <script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
</head>

<body>
<script>
	window.onload = function () {
		window.viewportUnitsBuggyfill.init({
			hacks: window.viewportUnitsBuggyfillHacks
		});
	}
</script>
<body>
``` 

最后完整的index.html

```html 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,shrink-to-fit=no"/>

    <meta name="theme-color" content="#000000" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>react-vw-layout</title>
    <!--<script type="text/javascript" src="/zx_local_res/jssdk/zx.js"></script>-->
    <script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
    <script>
		window.onload = function () {
			window.viewportUnitsBuggyfill.init({
				hacks: window.viewportUnitsBuggyfillHacks
			});
		}
    </script>
  </body>
</html>
``` 


项目中有遇到的坑：
 ```html 
1、cssnano 如果你的版本为：4+ 以上，请在配置中如下方案配置：

cssnano({
    "cssnano-preset-advanced": {
        zindex: false,
        autoprefixer: false
    },
})

我遇到了始终把你定位的z-index值重新计算为：1，巨坑，不然你会一口老血喷出来的。

和cssnano 3+版本配置不一样。


2、ios 系统下img不显示问题，解决方案如下：

/*兼容ios不显示图片问题*/
img {
	content: normal !important
}


3、1px 问题，解决方案

/*1px 解决方案*/

@svg square {
	@rect {
		fill: var(--color, white);
		width: 100%;
		height: 50%;
	}
}

.example-line {
	width: 100%;
	background: white svg(square param(--color #E6E6E6));
	background-size: 100% 1px;
	background-repeat: no-repeat;
	background-position: bottom left;
}

/*1px 解决方案*/

/*伪元素1px*/

.row-cell:before {
	content: " ";
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	height: 1px;
	border-top: 1px solid #e5e5e5;
	color: #e5e5e5;
	transform-origin: 0 0;
	transform: scaleY(0.5);
	z-index: 2;
}
 ```

如果你不使用react 也不使用vue ，在项目中只使用html页面 vw实现移动端适配，请点这 <a href="https://github.com/caoxiaoke/html-vw-layout">《如何在html项目中使用vw实现移动端适配》</a>

![Image text](https://github.com/caoxiaoke/react-vw-layout/blob/master/src/images/home.png)
<br/>


![Image text](https://github.com/caoxiaoke/react-vw-layout/blob/master/src/images/WX20190325-005603%402x.png)
<br/>
