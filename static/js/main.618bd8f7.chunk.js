(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{125:function(e,t,n){},167:function(e,t,n){},173:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(16),c=n.n(o),l=(n(87),n(8)),u=n(9),s=n(12),i=n(10),m=n(11),d=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(e){window.scrollTo(0,0)}},{key:"render",value:function(){return this.props.children}}]),t}(a.Component),p=n(267),h=n(209),f=n(264),g=n(266),E=(n(79),function(e){return function(t){function n(){var e,t;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(t=Object(s.a)(this,(e=Object(i.a)(n)).call.apply(e,[this].concat(r)))).state={component:null},t}return Object(m.a)(n,t),Object(u.a)(n,[{key:"componentDidMount",value:function(){var t=this;e().then(function(e){t.setState({component:e.default})})}},{key:"render",value:function(){var e=this.state.component;return e?r.a.createElement(e,this.props):null}}]),n}(a.Component)}),b=n(26),v=n(18),O=(n(125),n(127),n(69)),j=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(i.a)(t).call(this,e))).logoutMethod=function(){n.props.logout(),n.props.history.push("./")},n.storyclick=function(e){e.preventDefault(),n.props.history.push("./dashboard/newstory")},n.state={academicProgress:"",data:[]},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentWillReceiveProps",value:function(e){console.log(e,"nexttpropsssss")}},{key:"render",value:function(){console.log("props_in_the_dashboard",this.props);return localStorage.getItem("user_token")||this.props.history.push("/"),r.a.createElement("div",{className:"container-fluid"},r.a.createElement(O.a,{logout:this.logoutMethod}),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-2"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{for:"usr"},"Search"),r.a.createElement("input",{type:"text",className:"form-control",id:"usr1",placeholder:"Search By Name"}))),r.a.createElement("div",{className:"col-sm-2"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{for:"usr"},"Ratings"),r.a.createElement("select",{className:"custom-select",id:"inputGroupSelect01"},r.a.createElement("option",{selected:!0},"--Select Rating"),r.a.createElement("option",{value:"1"},"One"),r.a.createElement("option",{value:"2"},"Two"),r.a.createElement("option",{value:"3"},"Three")))),r.a.createElement("div",{className:"col-sm-2"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{for:"usr"},"--All Generes--"),r.a.createElement("select",{className:"custom-select",id:"inputGroupSelect01"},r.a.createElement("option",{selected:!0},"Choose..."),r.a.createElement("option",{value:"1"},"One"),r.a.createElement("option",{value:"2"},"Two"),r.a.createElement("option",{value:"3"},"Three")))),r.a.createElement("div",{className:"col-sm-2"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{for:"usr"},"Length"),r.a.createElement("select",{className:"custom-select",id:"inputGroupSelect01"},r.a.createElement("option",{selected:!0},"--Select Length--"),r.a.createElement("option",{value:"1"},"One"),r.a.createElement("option",{value:"2"},"Two"),r.a.createElement("option",{value:"3"},"Three")))),r.a.createElement("div",{className:"col-sm-2"},r.a.createElement("button",null,"Search"))),r.a.createElement("div",{className:"new_Story"},r.a.createElement("button",{onClick:this.storyclick},"New Story")),r.a.createElement("div",{className:"flag"},r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"page-header"},"Welcome ",this.props.loginuser?this.props.loginuser.email:"Loading"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",{className:"row "}))))}}]),t}(a.Component),y=Object(v.connect)(function(e){return{loginuser:e.auth.loguser,loginUser1:e.auth.loginUser}},function(e){return{logout:function(){return e(b.c())}}})(j),S=(n(167),function(e){function t(e){return Object(l.a)(this,t),Object(s.a)(this,Object(i.a)(t).call(this,e))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("form",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{for:"exampleInputEmail1"},"Email address"),r.a.createElement("input",{type:"email",className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Enter email"}),r.a.createElement("small",{id:"emailHelp",className:"form-text text-muted"},"We'll never share your email with anyone else.")),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{for:"exampleInputPassword1"},"Password"),r.a.createElement("input",{type:"password",className:"form-control",id:"exampleInputPassword1",placeholder:"Password"})),r.a.createElement("div",{className:"form-check"},r.a.createElement("input",{type:"checkbox",className:"form-check-input",id:"exampleCheck1"}),r.a.createElement("label",{className:"form-check-label",for:"exampleCheck1"},"Check me out")),r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Submit")))}}]),t}(a.Component)),N=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return console.log("isAuthenticatedAlone",this.props.isAuthenticated),r.a.createElement(p.a,null,r.a.createElement(h.a,{path:"/",exact:!0,component:E(function(){return Promise.all([n.e(0),n.e(7),n.e(2)]).then(n.bind(null,268))})}),r.a.createElement(h.a,{path:"/signup",component:E(function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,269))}),exact:!0}),r.a.createElement(h.a,{path:"/dashboard",exact:!0,render:function(e){return r.a.createElement(y,Object.assign({},e,{isAuthenticated:!0}))}}),r.a.createElement(h.a,{path:"/changepassword",exact:!0,render:function(e){return r.a.createElement(S,e)}}),r.a.createElement(h.a,{path:"/logout",exact:!0,component:E(function(){return n.e(4).then(n.bind(null,261))})}),r.a.createElement(h.a,{path:"/dashboard/newstory",exact:!0,component:E(function(){return Promise.all([n.e(8),n.e(5)]).then(n.bind(null,262))})}),r.a.createElement(f.a,{to:"/"}))}}]),t}(a.Component),w=Object(g.a)(Object(v.connect)(function(e){return{isAuthenticated:null!==e.auth.token}},null)(N)),k=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(d,null,r.a.createElement(w,null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var U=n(265),_=n(15),C=n(73),I={counter:0},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I;return(arguments.length>1?arguments[1]:void 0).type,e},x=n(5),A=n(74),P=function(e,t){return Object(A.a)({},e,t)},R={logindata:[]},G=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;switch(console.log("entered in the reducer",t),t.type){case x.g:return P(e,{logindata:t.user})}return e},L={token:null,userId:null,error:null,loading:!1,authRedirectPath:"/",users:null,signupUsers:null,loginUser:null,loguser:null,genere:[]},D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case x.c:return function(e,t){return P(e,{error:null,loading:!0})}(e);case x.d:return function(e,t){return console.log(t,"action in the reducer"),P(e,{token:t.idToken,userId:t.userId,error:null})}(e,t);case x.a:return function(e,t){return P(e,{error:t.error,loading:!1})}(e,t);case x.b:return function(e,t){return P(e,{token:null,userId:null})}(e);case x.g:return function(e,t){return P(e,{users:t.user,token:t.user.token,loginUser:t.loginUser})}(e,t);case x.e:return function(e,t){return console.log("justGenereSuccess",t.genere),P(e,{genere:t.genere.category})}(e,t);case x.h:return function(e,t){return P(e,{loguser:t.loginUser})}(e,t);case x.i:return function(e,t){return P(e,{signupUsers:t.user})}(e,t);case x.f:return function(e,t){return P(e,{authRedirectPath:t.path})}(e,t);default:return e}},H=n(77),M=n(17),W=n.n(M),B=n(39),J=n(75),X=n(76),F=n.n(X),V=Object(_.c)({toastr:M.reducer,ctr:T,res:G,auth:D}),$={key:"root",storage:F.a},q=Object(B.a)($,V),z=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||_.d,K=Object(_.e)(q,z(Object(_.a)(function(e){return function(t){return function(n){console.log("[Middleware] Dispatching",n);var a=t(n);return console.log("[Middleware] next state",e.getState()),a}}},C.a))),Q=Object(B.b)(K);c.a.render(r.a.createElement(v.Provider,{store:K},r.a.createElement(J.a,{loading:null,persistor:Q},r.a.createElement(U.a,null,r.a.createElement(H.a,null,r.a.createElement(k,null),r.a.createElement(W.a,{timeOut:2500,preventDuplicates:!0,position:"top-right",transitionIn:"fadeIn",transitionOut:"fadeOut"}))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},26:function(e,t,n){"use strict";n.d(t,"c",function(){return s}),n.d(t,"d",function(){return i}),n.d(t,"b",function(){return m}),n.d(t,"a",function(){return d});var a=n(5),r=n(25),o=n.n(r),c=n(17),l=(n(81),n(71)),u=n.n(l)()(),s=function(){return console.log("entered here in logout of authjs"),localStorage.removeItem("user_token"),localStorage.removeItem("userId"),u.push("/"),{type:a.b}},i=function(e){return console.log("entered in Signup"),function(t){return o.a.post("http://localhost:5400/user/signup",e).then(function(e){var n;return"success"===e.data.status?c.toastr.success(e.data.message):c.toastr.error(e.data.message),t((n=e.data,{type:a.i,user:n})),e.data}).catch(function(e){throw e})}},m=function(e){return function(t){return o.a.post("http://localhost:5400/user/login",e).then(function(n){var r;return"success"===n.data.status?(t((r=e,{type:a.h,loginUser:r})),c.toastr.success(n.data.message)):c.toastr.error(n.data.message),t(function(e,t){return{type:a.g,user:e,loginUser:t}}(n.data,e)),console.log(e,"loginUser"),n.data}).catch(function(e){throw e})}},d=function(e){return function(e){return o.a.get("http://fable.mobilytedev.com:8098/api/story/allGenres").then(function(t){var n;return console.log(t,"responseGenere"),1===t.data.status&&e((n=t.data,{type:a.e,genere:n})),t.data}).catch(function(e){throw e})}}},5:function(e,t,n){"use strict";n.d(t,"i",function(){return a}),n.d(t,"g",function(){return r}),n.d(t,"b",function(){return o}),n.d(t,"c",function(){return c}),n.d(t,"d",function(){return l}),n.d(t,"a",function(){return u}),n.d(t,"f",function(){return s}),n.d(t,"h",function(){return i}),n.d(t,"e",function(){return m});var a="USER_SIGNUP_SUCCESS",r="USER_LOGIN_SUCCESS",o="AUTH_LOGOUT",c="AUTH_START",l="AUTH_SUCCESS",u="AUTH_FAIL",s="SET_AUTH_REDIRECT_PATH",i="USER_LOGIN_USER_SUCCESS",m="GENERE_SUCCESS"},69:function(e,t,n){"use strict";var a=n(8),r=n(9),o=n(12),c=n(10),l=n(11),u=n(0),s=n.n(u),i=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(o.a)(this,Object(c.a)(t).call(this,e))).logout=function(){n.props.logout()},n}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return console.log("this_props",this.props),s.a.createElement("div",null,s.a.createElement("nav",{className:"navbar navbar-expand-md bg-dark navbar-dark"},s.a.createElement("a",{className:"navbar-brand",href:"#"},"AdminPanel"),s.a.createElement("button",{onClick:this.logout,className:"logoutbutton"},"Logout")))}}]),t}(u.Component);t.a=i},79:function(e,t,n){},82:function(e,t,n){e.exports=n(173)},87:function(e,t,n){}},[[82,9,6]]]);
//# sourceMappingURL=main.618bd8f7.chunk.js.map