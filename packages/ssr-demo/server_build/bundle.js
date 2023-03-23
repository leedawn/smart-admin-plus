/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pages/Domo/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/Domo/index.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst jsx_runtime_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react/jsx-runtime'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\nconst axios_1 = __importDefault(__webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'axios'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));\r\nconst react_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\nconst demo = () => {\r\n    const [content, setContent] = (0, react_1.useState)(\"\");\r\n    (0, react_1.useEffect)(() => {\r\n        axios_1.default\r\n            .post(\"/api/getDemoData\", {\r\n            content: \"这是一个DOMO页面\",\r\n        })\r\n            .then((res) => setContent(res.data.data.content));\r\n    }, []);\r\n    return (0, jsx_runtime_1.jsx)(\"div\", { children: content });\r\n};\r\nexports[\"default\"] = demo;\r\n\n\n//# sourceURL=webpack://ssr-demo/./src/pages/Domo/index.tsx?");

/***/ }),

/***/ "./src/pages/Home/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/Home/index.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst jsx_runtime_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react/jsx-runtime'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\nconst react_router_dom_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react-router-dom'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\nconst react_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\nconst react_helmet_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react-helmet'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\nconst Home = () => {\r\n    const navigator = (0, react_router_dom_1.useNavigate)();\r\n    return ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_helmet_1.Helmet, { children: [(0, jsx_runtime_1.jsx)(\"title\", { children: \"\\u670D\\u52A1\\u7AEF\\u6E32\\u67D3\" }), (0, jsx_runtime_1.jsx)(\"meta\", { name: \"description\", content: \"\\u670D\\u52A1\\u7AEF\\u6E32\\u67D3\" })] }), (0, jsx_runtime_1.jsxs)(\"div\", { children: [(0, jsx_runtime_1.jsx)(\"button\", Object.assign({ onClick: () => alert(\"hello ssr\") }, { children: \"test\" })), (0, jsx_runtime_1.jsx)(\"a\", Object.assign({ href: \"http://127.0.0.1:3000/demo\" }, { children: \"\\u94FE\\u63A5\\u8DF3\\u8F6C\" })), (0, jsx_runtime_1.jsx)(\"span\", Object.assign({ onClick: () => navigator(\"/demo\") }, { children: \"\\u8DEF\\u7531\\u8DF3\\u8F6C\" }))] })] }));\r\n};\r\nexports[\"default\"] = Home;\r\n\n\n//# sourceURL=webpack://ssr-demo/./src/pages/Home/index.tsx?");

/***/ }),

/***/ "./src/router.tsx":
/*!************************!*\
  !*** ./src/router.tsx ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst jsx_runtime_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react/jsx-runtime'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\nconst Home_1 = __importDefault(__webpack_require__(/*! ./pages/Home */ \"./src/pages/Home/index.tsx\"));\r\nconst Domo_1 = __importDefault(__webpack_require__(/*! ./pages/Domo */ \"./src/pages/Domo/index.tsx\"));\r\nconst router = [\r\n    {\r\n        path: \"/\",\r\n        element: (0, jsx_runtime_1.jsx)(Home_1.default, {}),\r\n    },\r\n    {\r\n        path: \"/demo\",\r\n        element: (0, jsx_runtime_1.jsx)(Domo_1.default, {}),\r\n    },\r\n];\r\nexports[\"default\"] = router;\r\n\n\n//# sourceURL=webpack://ssr-demo/./src/router.tsx?");

/***/ }),

/***/ "./src/server/index.tsx":
/*!******************************!*\
  !*** ./src/server/index.tsx ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst jsx_runtime_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react/jsx-runtime'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\nconst react_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\nconst express_1 = __importDefault(__webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'express'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));\r\nconst child_process_1 = __importDefault(__webpack_require__(/*! child_process */ \"child_process\"));\r\nconst server_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react-dom/server'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\r\nconst router_1 = __importDefault(__webpack_require__(/*! ../router */ \"./src/router.tsx\"));\r\nconst server_2 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react-router-dom/server'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\nconst react_router_dom_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react-router-dom'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\nconst react_helmet_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react-helmet'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\n// const bodyParser = require(\"body-parser\");\r\n// console.log(\"🚀 ~ file: index.tsx:11 ~ bodyParser\", bodyParser);\r\nconst app = (0, express_1.default)();\r\napp.use(express_1.default.static(path_1.default.resolve(process.cwd(), \"client_build\")));\r\n// app.use(bodyParser.json());\r\n// app.use(bodyParser.urlencoded({ extended: true }));\r\napp.post(\"/api/getDemoData\", (req, res) => {\r\n    res.send({\r\n        data: req.body,\r\n        status_code: 0,\r\n    });\r\n});\r\napp.get(\"*\", (req, res) => {\r\n    const content = (0, server_1.renderToString)((0, jsx_runtime_1.jsx)(server_2.StaticRouter, Object.assign({ location: req.path }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: router_1.default.map((item, index) => {\r\n                return (0, react_1.createElement)(react_router_dom_1.Route, Object.assign({}, item, { key: index }));\r\n            }) }) })));\r\n    const helmet = react_helmet_1.Helmet.renderStatic();\r\n    res.send(`\r\n    <html>\r\n    <head>\r\n      ${helmet.title.toString()}\r\n      ${helmet.meta.toString()}\r\n    </head>\r\n      <body>\r\n        <div id=\"root\">${content}</div>\r\n        <script src=\"/index.js\"></script>\r\n      </body>\r\n    </html>\r\n  `);\r\n});\r\napp.listen(3000, () => {\r\n    console.log(\"ssr-server listen on 3000\");\r\n});\r\nchild_process_1.default.exec(\"start http://127.0.0.1:3000\");\r\n\n\n//# sourceURL=webpack://ssr-demo/./src/server/index.tsx?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/index.tsx");
/******/ 	
/******/ })()
;