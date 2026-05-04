(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function r(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(i){if(i.ep)return;i.ep=!0;const o=r(i);fetch(i.href,o)}})();/*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT */function en(e){return typeof e>"u"||e===null}function Qn(e){return typeof e=="object"&&e!==null}function zn(e){return Array.isArray(e)?e:en(e)?[]:[e]}function Zn(e,n){var r,t,i,o;if(n)for(o=Object.keys(n),r=0,t=o.length;r<t;r+=1)i=o[r],e[i]=n[i];return e}function er(e,n){var r="",t;for(t=0;t<n;t+=1)r+=e;return r}function nr(e){return e===0&&Number.NEGATIVE_INFINITY===1/e}var rr=en,ir=Qn,tr=zn,or=er,sr=nr,ar=Zn,m={isNothing:rr,isObject:ir,toArray:tr,repeat:or,isNegativeZero:sr,extend:ar};function nn(e,n){var r="",t=e.reason||"(unknown reason)";return e.mark?(e.mark.name&&(r+='in "'+e.mark.name+'" '),r+="("+(e.mark.line+1)+":"+(e.mark.column+1)+")",!n&&e.mark.snippet&&(r+=`

`+e.mark.snippet),t+" "+r):t}function J(e,n){Error.call(this),this.name="YAMLException",this.reason=e,this.mark=n,this.message=nn(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}J.prototype=Object.create(Error.prototype);J.prototype.constructor=J;J.prototype.toString=function(n){return this.name+": "+nn(this,n)};var L=J;function pe(e,n,r,t,i){var o="",s="",a=Math.floor(i/2)-1;return t-n>a&&(o=" ... ",n=t-a+o.length),r-t>a&&(s=" ...",r=t+a-s.length),{str:o+e.slice(n,r).replace(/\t/g,"→")+s,pos:t-n+o.length}}function Ee(e,n){return m.repeat(" ",n-e.length)+e}function lr(e,n){if(n=Object.create(n||null),!e.buffer)return null;n.maxLength||(n.maxLength=79),typeof n.indent!="number"&&(n.indent=1),typeof n.linesBefore!="number"&&(n.linesBefore=3),typeof n.linesAfter!="number"&&(n.linesAfter=2);for(var r=/\r?\n|\r|\0/g,t=[0],i=[],o,s=-1;o=r.exec(e.buffer);)i.push(o.index),t.push(o.index+o[0].length),e.position<=o.index&&s<0&&(s=t.length-2);s<0&&(s=t.length-1);var a="",l,c,u=Math.min(e.line+n.linesAfter,i.length).toString().length,A=n.maxLength-(n.indent+u+3);for(l=1;l<=n.linesBefore&&!(s-l<0);l++)c=pe(e.buffer,t[s-l],i[s-l],e.position-(t[s]-t[s-l]),A),a=m.repeat(" ",n.indent)+Ee((e.line-l+1).toString(),u)+" | "+c.str+`
`+a;for(c=pe(e.buffer,t[s],i[s],e.position,A),a+=m.repeat(" ",n.indent)+Ee((e.line+1).toString(),u)+" | "+c.str+`
`,a+=m.repeat("-",n.indent+u+3+c.pos)+`^
`,l=1;l<=n.linesAfter&&!(s+l>=i.length);l++)c=pe(e.buffer,t[s+l],i[s+l],e.position-(t[s]-t[s+l]),A),a+=m.repeat(" ",n.indent)+Ee((e.line+l+1).toString(),u)+" | "+c.str+`
`;return a.replace(/\n$/,"")}var cr=lr,Ar=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],ur=["scalar","sequence","mapping"];function _r(e){var n={};return e!==null&&Object.keys(e).forEach(function(r){e[r].forEach(function(t){n[String(t)]=r})}),n}function pr(e,n){if(n=n||{},Object.keys(n).forEach(function(r){if(Ar.indexOf(r)===-1)throw new L('Unknown option "'+r+'" is met in definition of "'+e+'" YAML type.')}),this.options=n,this.tag=e,this.kind=n.kind||null,this.resolve=n.resolve||function(){return!0},this.construct=n.construct||function(r){return r},this.instanceOf=n.instanceOf||null,this.predicate=n.predicate||null,this.represent=n.represent||null,this.representName=n.representName||null,this.defaultStyle=n.defaultStyle||null,this.multi=n.multi||!1,this.styleAliases=_r(n.styleAliases||null),ur.indexOf(this.kind)===-1)throw new L('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')}var R=pr;function He(e,n){var r=[];return e[n].forEach(function(t){var i=r.length;r.forEach(function(o,s){o.tag===t.tag&&o.kind===t.kind&&o.multi===t.multi&&(i=s)}),r[i]=t}),r}function Er(){var e={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},n,r;function t(i){i.multi?(e.multi[i.kind].push(i),e.multi.fallback.push(i)):e[i.kind][i.tag]=e.fallback[i.tag]=i}for(n=0,r=arguments.length;n<r;n+=1)arguments[n].forEach(t);return e}function Oe(e){return this.extend(e)}Oe.prototype.extend=function(n){var r=[],t=[];if(n instanceof R)t.push(n);else if(Array.isArray(n))t=t.concat(n);else if(n&&(Array.isArray(n.implicit)||Array.isArray(n.explicit)))n.implicit&&(r=r.concat(n.implicit)),n.explicit&&(t=t.concat(n.explicit));else throw new L("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");r.forEach(function(o){if(!(o instanceof R))throw new L("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(o.loadKind&&o.loadKind!=="scalar")throw new L("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(o.multi)throw new L("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),t.forEach(function(o){if(!(o instanceof R))throw new L("Specified list of YAML types (or a single Type object) contains a non-Type object.")});var i=Object.create(Oe.prototype);return i.implicit=(this.implicit||[]).concat(r),i.explicit=(this.explicit||[]).concat(t),i.compiledImplicit=He(i,"implicit"),i.compiledExplicit=He(i,"explicit"),i.compiledTypeMap=Er(i.compiledImplicit,i.compiledExplicit),i};var rn=Oe,tn=new R("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return e!==null?e:""}}),on=new R("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return e!==null?e:[]}}),sn=new R("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return e!==null?e:{}}}),an=new rn({explicit:[tn,on,sn]});function Tr(e){if(e===null)return!0;var n=e.length;return n===1&&e==="~"||n===4&&(e==="null"||e==="Null"||e==="NULL")}function fr(){return null}function dr(e){return e===null}var ln=new R("tag:yaml.org,2002:null",{kind:"scalar",resolve:Tr,construct:fr,predicate:dr,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"});function Sr(e){if(e===null)return!1;var n=e.length;return n===4&&(e==="true"||e==="True"||e==="TRUE")||n===5&&(e==="false"||e==="False"||e==="FALSE")}function Or(e){return e==="true"||e==="True"||e==="TRUE"}function Ir(e){return Object.prototype.toString.call(e)==="[object Boolean]"}var cn=new R("tag:yaml.org,2002:bool",{kind:"scalar",resolve:Sr,construct:Or,predicate:Ir,represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"});function Nr(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function hr(e){return 48<=e&&e<=55}function mr(e){return 48<=e&&e<=57}function Cr(e){if(e===null)return!1;var n=e.length,r=0,t=!1,i;if(!n)return!1;if(i=e[r],(i==="-"||i==="+")&&(i=e[++r]),i==="0"){if(r+1===n)return!0;if(i=e[++r],i==="b"){for(r++;r<n;r++)if(i=e[r],i!=="_"){if(i!=="0"&&i!=="1")return!1;t=!0}return t&&i!=="_"}if(i==="x"){for(r++;r<n;r++)if(i=e[r],i!=="_"){if(!Nr(e.charCodeAt(r)))return!1;t=!0}return t&&i!=="_"}if(i==="o"){for(r++;r<n;r++)if(i=e[r],i!=="_"){if(!hr(e.charCodeAt(r)))return!1;t=!0}return t&&i!=="_"}}if(i==="_")return!1;for(;r<n;r++)if(i=e[r],i!=="_"){if(!mr(e.charCodeAt(r)))return!1;t=!0}return!(!t||i==="_")}function Rr(e){var n=e,r=1,t;if(n.indexOf("_")!==-1&&(n=n.replace(/_/g,"")),t=n[0],(t==="-"||t==="+")&&(t==="-"&&(r=-1),n=n.slice(1),t=n[0]),n==="0")return 0;if(t==="0"){if(n[1]==="b")return r*parseInt(n.slice(2),2);if(n[1]==="x")return r*parseInt(n.slice(2),16);if(n[1]==="o")return r*parseInt(n.slice(2),8)}return r*parseInt(n,10)}function Dr(e){return Object.prototype.toString.call(e)==="[object Number]"&&e%1===0&&!m.isNegativeZero(e)}var An=new R("tag:yaml.org,2002:int",{kind:"scalar",resolve:Cr,construct:Rr,predicate:Dr,represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0o"+e.toString(8):"-0o"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),gr=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Lr(e){return!(e===null||!gr.test(e)||e[e.length-1]==="_")}function Pr(e){var n,r;return n=e.replace(/_/g,"").toLowerCase(),r=n[0]==="-"?-1:1,"+-".indexOf(n[0])>=0&&(n=n.slice(1)),n===".inf"?r===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:n===".nan"?NaN:r*parseFloat(n,10)}var Mr=/^[-+]?[0-9]+e/;function yr(e,n){var r;if(isNaN(e))switch(n){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(n){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(n){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(m.isNegativeZero(e))return"-0.0";return r=e.toString(10),Mr.test(r)?r.replace("e",".e"):r}function vr(e){return Object.prototype.toString.call(e)==="[object Number]"&&(e%1!==0||m.isNegativeZero(e))}var un=new R("tag:yaml.org,2002:float",{kind:"scalar",resolve:Lr,construct:Pr,predicate:vr,represent:yr,defaultStyle:"lowercase"}),_n=an.extend({implicit:[ln,cn,An,un]}),pn=_n,En=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Tn=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function Gr(e){return e===null?!1:En.exec(e)!==null||Tn.exec(e)!==null}function Ur(e){var n,r,t,i,o,s,a,l=0,c=null,u,A,_;if(n=En.exec(e),n===null&&(n=Tn.exec(e)),n===null)throw new Error("Date resolve error");if(r=+n[1],t=+n[2]-1,i=+n[3],!n[4])return new Date(Date.UTC(r,t,i));if(o=+n[4],s=+n[5],a=+n[6],n[7]){for(l=n[7].slice(0,3);l.length<3;)l+="0";l=+l}return n[9]&&(u=+n[10],A=+(n[11]||0),c=(u*60+A)*6e4,n[9]==="-"&&(c=-c)),_=new Date(Date.UTC(r,t,i,o,s,a,l)),c&&_.setTime(_.getTime()-c),_}function xr(e){return e.toISOString()}var fn=new R("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:Gr,construct:Ur,instanceOf:Date,represent:xr});function Hr(e){return e==="<<"||e===null}var dn=new R("tag:yaml.org,2002:merge",{kind:"scalar",resolve:Hr}),De=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function Fr(e){if(e===null)return!1;var n,r,t=0,i=e.length,o=De;for(r=0;r<i;r++)if(n=o.indexOf(e.charAt(r)),!(n>64)){if(n<0)return!1;t+=6}return t%8===0}function wr(e){var n,r,t=e.replace(/[\r\n=]/g,""),i=t.length,o=De,s=0,a=[];for(n=0;n<i;n++)n%4===0&&n&&(a.push(s>>16&255),a.push(s>>8&255),a.push(s&255)),s=s<<6|o.indexOf(t.charAt(n));return r=i%4*6,r===0?(a.push(s>>16&255),a.push(s>>8&255),a.push(s&255)):r===18?(a.push(s>>10&255),a.push(s>>2&255)):r===12&&a.push(s>>4&255),new Uint8Array(a)}function Br(e){var n="",r=0,t,i,o=e.length,s=De;for(t=0;t<o;t++)t%3===0&&t&&(n+=s[r>>18&63],n+=s[r>>12&63],n+=s[r>>6&63],n+=s[r&63]),r=(r<<8)+e[t];return i=o%3,i===0?(n+=s[r>>18&63],n+=s[r>>12&63],n+=s[r>>6&63],n+=s[r&63]):i===2?(n+=s[r>>10&63],n+=s[r>>4&63],n+=s[r<<2&63],n+=s[64]):i===1&&(n+=s[r>>2&63],n+=s[r<<4&63],n+=s[64],n+=s[64]),n}function Yr(e){return Object.prototype.toString.call(e)==="[object Uint8Array]"}var Sn=new R("tag:yaml.org,2002:binary",{kind:"scalar",resolve:Fr,construct:wr,predicate:Yr,represent:Br}),br=Object.prototype.hasOwnProperty,kr=Object.prototype.toString;function Wr(e){if(e===null)return!0;var n=[],r,t,i,o,s,a=e;for(r=0,t=a.length;r<t;r+=1){if(i=a[r],s=!1,kr.call(i)!=="[object Object]")return!1;for(o in i)if(br.call(i,o))if(!s)s=!0;else return!1;if(!s)return!1;if(n.indexOf(o)===-1)n.push(o);else return!1}return!0}function Vr(e){return e!==null?e:[]}var On=new R("tag:yaml.org,2002:omap",{kind:"sequence",resolve:Wr,construct:Vr}),$r=Object.prototype.toString;function qr(e){if(e===null)return!0;var n,r,t,i,o,s=e;for(o=new Array(s.length),n=0,r=s.length;n<r;n+=1){if(t=s[n],$r.call(t)!=="[object Object]"||(i=Object.keys(t),i.length!==1))return!1;o[n]=[i[0],t[i[0]]]}return!0}function Kr(e){if(e===null)return[];var n,r,t,i,o,s=e;for(o=new Array(s.length),n=0,r=s.length;n<r;n+=1)t=s[n],i=Object.keys(t),o[n]=[i[0],t[i[0]]];return o}var In=new R("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:qr,construct:Kr}),Xr=Object.prototype.hasOwnProperty;function Jr(e){if(e===null)return!0;var n,r=e;for(n in r)if(Xr.call(r,n)&&r[n]!==null)return!1;return!0}function jr(e){return e!==null?e:{}}var Nn=new R("tag:yaml.org,2002:set",{kind:"mapping",resolve:Jr,construct:jr}),ge=pn.extend({implicit:[fn,dn],explicit:[Sn,On,In,Nn]}),F=Object.prototype.hasOwnProperty,re=1,hn=2,mn=3,ie=4,Te=1,Qr=2,Fe=3,zr=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Zr=/[\x85\u2028\u2029]/,ei=/[,\[\]\{\}]/,Cn=/^(?:!|!!|![a-z\-]+!)$/i,Rn=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function we(e){return Object.prototype.toString.call(e)}function y(e){return e===10||e===13}function w(e){return e===9||e===32}function P(e){return e===9||e===32||e===10||e===13}function b(e){return e===44||e===91||e===93||e===123||e===125}function ni(e){var n;return 48<=e&&e<=57?e-48:(n=e|32,97<=n&&n<=102?n-97+10:-1)}function ri(e){return e===120?2:e===117?4:e===85?8:0}function ii(e){return 48<=e&&e<=57?e-48:-1}function Be(e){return e===48?"\0":e===97?"\x07":e===98?"\b":e===116||e===9?"	":e===110?`
`:e===118?"\v":e===102?"\f":e===114?"\r":e===101?"\x1B":e===32?" ":e===34?'"':e===47?"/":e===92?"\\":e===78?"":e===95?" ":e===76?"\u2028":e===80?"\u2029":""}function ti(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function Dn(e,n,r){n==="__proto__"?Object.defineProperty(e,n,{configurable:!0,enumerable:!0,writable:!0,value:r}):e[n]=r}var gn=new Array(256),Ln=new Array(256);for(var B=0;B<256;B++)gn[B]=Be(B)?1:0,Ln[B]=Be(B);function oi(e,n){this.input=e,this.filename=n.filename||null,this.schema=n.schema||ge,this.onWarning=n.onWarning||null,this.legacy=n.legacy||!1,this.json=n.json||!1,this.listener=n.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function Pn(e,n){var r={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return r.snippet=cr(r),new L(n,r)}function E(e,n){throw Pn(e,n)}function te(e,n){e.onWarning&&e.onWarning.call(null,Pn(e,n))}var Ye={YAML:function(n,r,t){var i,o,s;n.version!==null&&E(n,"duplication of %YAML directive"),t.length!==1&&E(n,"YAML directive accepts exactly one argument"),i=/^([0-9]+)\.([0-9]+)$/.exec(t[0]),i===null&&E(n,"ill-formed argument of the YAML directive"),o=parseInt(i[1],10),s=parseInt(i[2],10),o!==1&&E(n,"unacceptable YAML version of the document"),n.version=t[0],n.checkLineBreaks=s<2,s!==1&&s!==2&&te(n,"unsupported YAML version of the document")},TAG:function(n,r,t){var i,o;t.length!==2&&E(n,"TAG directive accepts exactly two arguments"),i=t[0],o=t[1],Cn.test(i)||E(n,"ill-formed tag handle (first argument) of the TAG directive"),F.call(n.tagMap,i)&&E(n,'there is a previously declared suffix for "'+i+'" tag handle'),Rn.test(o)||E(n,"ill-formed tag prefix (second argument) of the TAG directive");try{o=decodeURIComponent(o)}catch{E(n,"tag prefix is malformed: "+o)}n.tagMap[i]=o}};function H(e,n,r,t){var i,o,s,a;if(n<r){if(a=e.input.slice(n,r),t)for(i=0,o=a.length;i<o;i+=1)s=a.charCodeAt(i),s===9||32<=s&&s<=1114111||E(e,"expected valid JSON character");else zr.test(a)&&E(e,"the stream contains non-printable characters");e.result+=a}}function be(e,n,r,t){var i,o,s,a;for(m.isObject(r)||E(e,"cannot merge mappings; the provided source object is unacceptable"),i=Object.keys(r),s=0,a=i.length;s<a;s+=1)o=i[s],F.call(n,o)||(Dn(n,o,r[o]),t[o]=!0)}function k(e,n,r,t,i,o,s,a,l){var c,u;if(Array.isArray(i))for(i=Array.prototype.slice.call(i),c=0,u=i.length;c<u;c+=1)Array.isArray(i[c])&&E(e,"nested arrays are not supported inside keys"),typeof i=="object"&&we(i[c])==="[object Object]"&&(i[c]="[object Object]");if(typeof i=="object"&&we(i)==="[object Object]"&&(i="[object Object]"),i=String(i),n===null&&(n={}),t==="tag:yaml.org,2002:merge")if(Array.isArray(o))for(c=0,u=o.length;c<u;c+=1)be(e,n,o[c],r);else be(e,n,o,r);else!e.json&&!F.call(r,i)&&F.call(n,i)&&(e.line=s||e.line,e.lineStart=a||e.lineStart,e.position=l||e.position,E(e,"duplicated mapping key")),Dn(n,i,o),delete r[i];return n}function Le(e){var n;n=e.input.charCodeAt(e.position),n===10?e.position++:n===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):E(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function h(e,n,r){for(var t=0,i=e.input.charCodeAt(e.position);i!==0;){for(;w(i);)i===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),i=e.input.charCodeAt(++e.position);if(n&&i===35)do i=e.input.charCodeAt(++e.position);while(i!==10&&i!==13&&i!==0);if(y(i))for(Le(e),i=e.input.charCodeAt(e.position),t++,e.lineIndent=0;i===32;)e.lineIndent++,i=e.input.charCodeAt(++e.position);else break}return r!==-1&&t!==0&&e.lineIndent<r&&te(e,"deficient indentation"),t}function Ae(e){var n=e.position,r;return r=e.input.charCodeAt(n),!!((r===45||r===46)&&r===e.input.charCodeAt(n+1)&&r===e.input.charCodeAt(n+2)&&(n+=3,r=e.input.charCodeAt(n),r===0||P(r)))}function Pe(e,n){n===1?e.result+=" ":n>1&&(e.result+=m.repeat(`
`,n-1))}function si(e,n,r){var t,i,o,s,a,l,c,u,A=e.kind,_=e.result,p;if(p=e.input.charCodeAt(e.position),P(p)||b(p)||p===35||p===38||p===42||p===33||p===124||p===62||p===39||p===34||p===37||p===64||p===96||(p===63||p===45)&&(i=e.input.charCodeAt(e.position+1),P(i)||r&&b(i)))return!1;for(e.kind="scalar",e.result="",o=s=e.position,a=!1;p!==0;){if(p===58){if(i=e.input.charCodeAt(e.position+1),P(i)||r&&b(i))break}else if(p===35){if(t=e.input.charCodeAt(e.position-1),P(t))break}else{if(e.position===e.lineStart&&Ae(e)||r&&b(p))break;if(y(p))if(l=e.line,c=e.lineStart,u=e.lineIndent,h(e,!1,-1),e.lineIndent>=n){a=!0,p=e.input.charCodeAt(e.position);continue}else{e.position=s,e.line=l,e.lineStart=c,e.lineIndent=u;break}}a&&(H(e,o,s,!1),Pe(e,e.line-l),o=s=e.position,a=!1),w(p)||(s=e.position+1),p=e.input.charCodeAt(++e.position)}return H(e,o,s,!1),e.result?!0:(e.kind=A,e.result=_,!1)}function ai(e,n){var r,t,i;if(r=e.input.charCodeAt(e.position),r!==39)return!1;for(e.kind="scalar",e.result="",e.position++,t=i=e.position;(r=e.input.charCodeAt(e.position))!==0;)if(r===39)if(H(e,t,e.position,!0),r=e.input.charCodeAt(++e.position),r===39)t=e.position,e.position++,i=e.position;else return!0;else y(r)?(H(e,t,i,!0),Pe(e,h(e,!1,n)),t=i=e.position):e.position===e.lineStart&&Ae(e)?E(e,"unexpected end of the document within a single quoted scalar"):(e.position++,i=e.position);E(e,"unexpected end of the stream within a single quoted scalar")}function li(e,n){var r,t,i,o,s,a;if(a=e.input.charCodeAt(e.position),a!==34)return!1;for(e.kind="scalar",e.result="",e.position++,r=t=e.position;(a=e.input.charCodeAt(e.position))!==0;){if(a===34)return H(e,r,e.position,!0),e.position++,!0;if(a===92){if(H(e,r,e.position,!0),a=e.input.charCodeAt(++e.position),y(a))h(e,!1,n);else if(a<256&&gn[a])e.result+=Ln[a],e.position++;else if((s=ri(a))>0){for(i=s,o=0;i>0;i--)a=e.input.charCodeAt(++e.position),(s=ni(a))>=0?o=(o<<4)+s:E(e,"expected hexadecimal character");e.result+=ti(o),e.position++}else E(e,"unknown escape sequence");r=t=e.position}else y(a)?(H(e,r,t,!0),Pe(e,h(e,!1,n)),r=t=e.position):e.position===e.lineStart&&Ae(e)?E(e,"unexpected end of the document within a double quoted scalar"):(e.position++,t=e.position)}E(e,"unexpected end of the stream within a double quoted scalar")}function ci(e,n){var r=!0,t,i,o,s=e.tag,a,l=e.anchor,c,u,A,_,p,T=Object.create(null),f,S,O,d;if(d=e.input.charCodeAt(e.position),d===91)u=93,p=!1,a=[];else if(d===123)u=125,p=!0,a={};else return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=a),d=e.input.charCodeAt(++e.position);d!==0;){if(h(e,!0,n),d=e.input.charCodeAt(e.position),d===u)return e.position++,e.tag=s,e.anchor=l,e.kind=p?"mapping":"sequence",e.result=a,!0;r?d===44&&E(e,"expected the node content, but found ','"):E(e,"missed comma between flow collection entries"),S=f=O=null,A=_=!1,d===63&&(c=e.input.charCodeAt(e.position+1),P(c)&&(A=_=!0,e.position++,h(e,!0,n))),t=e.line,i=e.lineStart,o=e.position,W(e,n,re,!1,!0),S=e.tag,f=e.result,h(e,!0,n),d=e.input.charCodeAt(e.position),(_||e.line===t)&&d===58&&(A=!0,d=e.input.charCodeAt(++e.position),h(e,!0,n),W(e,n,re,!1,!0),O=e.result),p?k(e,a,T,S,f,O,t,i,o):A?a.push(k(e,null,T,S,f,O,t,i,o)):a.push(f),h(e,!0,n),d=e.input.charCodeAt(e.position),d===44?(r=!0,d=e.input.charCodeAt(++e.position)):r=!1}E(e,"unexpected end of the stream within a flow collection")}function Ai(e,n){var r,t,i=Te,o=!1,s=!1,a=n,l=0,c=!1,u,A;if(A=e.input.charCodeAt(e.position),A===124)t=!1;else if(A===62)t=!0;else return!1;for(e.kind="scalar",e.result="";A!==0;)if(A=e.input.charCodeAt(++e.position),A===43||A===45)Te===i?i=A===43?Fe:Qr:E(e,"repeat of a chomping mode identifier");else if((u=ii(A))>=0)u===0?E(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):s?E(e,"repeat of an indentation width identifier"):(a=n+u-1,s=!0);else break;if(w(A)){do A=e.input.charCodeAt(++e.position);while(w(A));if(A===35)do A=e.input.charCodeAt(++e.position);while(!y(A)&&A!==0)}for(;A!==0;){for(Le(e),e.lineIndent=0,A=e.input.charCodeAt(e.position);(!s||e.lineIndent<a)&&A===32;)e.lineIndent++,A=e.input.charCodeAt(++e.position);if(!s&&e.lineIndent>a&&(a=e.lineIndent),y(A)){l++;continue}if(e.lineIndent<a){i===Fe?e.result+=m.repeat(`
`,o?1+l:l):i===Te&&o&&(e.result+=`
`);break}for(t?w(A)?(c=!0,e.result+=m.repeat(`
`,o?1+l:l)):c?(c=!1,e.result+=m.repeat(`
`,l+1)):l===0?o&&(e.result+=" "):e.result+=m.repeat(`
`,l):e.result+=m.repeat(`
`,o?1+l:l),o=!0,s=!0,l=0,r=e.position;!y(A)&&A!==0;)A=e.input.charCodeAt(++e.position);H(e,r,e.position,!1)}return!0}function ke(e,n){var r,t=e.tag,i=e.anchor,o=[],s,a=!1,l;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=o),l=e.input.charCodeAt(e.position);l!==0&&(e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,E(e,"tab characters must not be used in indentation")),!(l!==45||(s=e.input.charCodeAt(e.position+1),!P(s))));){if(a=!0,e.position++,h(e,!0,-1)&&e.lineIndent<=n){o.push(null),l=e.input.charCodeAt(e.position);continue}if(r=e.line,W(e,n,mn,!1,!0),o.push(e.result),h(e,!0,-1),l=e.input.charCodeAt(e.position),(e.line===r||e.lineIndent>n)&&l!==0)E(e,"bad indentation of a sequence entry");else if(e.lineIndent<n)break}return a?(e.tag=t,e.anchor=i,e.kind="sequence",e.result=o,!0):!1}function ui(e,n,r){var t,i,o,s,a,l,c=e.tag,u=e.anchor,A={},_=Object.create(null),p=null,T=null,f=null,S=!1,O=!1,d;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=A),d=e.input.charCodeAt(e.position);d!==0;){if(!S&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,E(e,"tab characters must not be used in indentation")),t=e.input.charCodeAt(e.position+1),o=e.line,(d===63||d===58)&&P(t))d===63?(S&&(k(e,A,_,p,T,null,s,a,l),p=T=f=null),O=!0,S=!0,i=!0):S?(S=!1,i=!0):E(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,d=t;else{if(s=e.line,a=e.lineStart,l=e.position,!W(e,r,hn,!1,!0))break;if(e.line===o){for(d=e.input.charCodeAt(e.position);w(d);)d=e.input.charCodeAt(++e.position);if(d===58)d=e.input.charCodeAt(++e.position),P(d)||E(e,"a whitespace character is expected after the key-value separator within a block mapping"),S&&(k(e,A,_,p,T,null,s,a,l),p=T=f=null),O=!0,S=!1,i=!1,p=e.tag,T=e.result;else if(O)E(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=c,e.anchor=u,!0}else if(O)E(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=c,e.anchor=u,!0}if((e.line===o||e.lineIndent>n)&&(S&&(s=e.line,a=e.lineStart,l=e.position),W(e,n,ie,!0,i)&&(S?T=e.result:f=e.result),S||(k(e,A,_,p,T,f,s,a,l),p=T=f=null),h(e,!0,-1),d=e.input.charCodeAt(e.position)),(e.line===o||e.lineIndent>n)&&d!==0)E(e,"bad indentation of a mapping entry");else if(e.lineIndent<n)break}return S&&k(e,A,_,p,T,null,s,a,l),O&&(e.tag=c,e.anchor=u,e.kind="mapping",e.result=A),O}function _i(e){var n,r=!1,t=!1,i,o,s;if(s=e.input.charCodeAt(e.position),s!==33)return!1;if(e.tag!==null&&E(e,"duplication of a tag property"),s=e.input.charCodeAt(++e.position),s===60?(r=!0,s=e.input.charCodeAt(++e.position)):s===33?(t=!0,i="!!",s=e.input.charCodeAt(++e.position)):i="!",n=e.position,r){do s=e.input.charCodeAt(++e.position);while(s!==0&&s!==62);e.position<e.length?(o=e.input.slice(n,e.position),s=e.input.charCodeAt(++e.position)):E(e,"unexpected end of the stream within a verbatim tag")}else{for(;s!==0&&!P(s);)s===33&&(t?E(e,"tag suffix cannot contain exclamation marks"):(i=e.input.slice(n-1,e.position+1),Cn.test(i)||E(e,"named tag handle cannot contain such characters"),t=!0,n=e.position+1)),s=e.input.charCodeAt(++e.position);o=e.input.slice(n,e.position),ei.test(o)&&E(e,"tag suffix cannot contain flow indicator characters")}o&&!Rn.test(o)&&E(e,"tag name cannot contain such characters: "+o);try{o=decodeURIComponent(o)}catch{E(e,"tag name is malformed: "+o)}return r?e.tag=o:F.call(e.tagMap,i)?e.tag=e.tagMap[i]+o:i==="!"?e.tag="!"+o:i==="!!"?e.tag="tag:yaml.org,2002:"+o:E(e,'undeclared tag handle "'+i+'"'),!0}function pi(e){var n,r;if(r=e.input.charCodeAt(e.position),r!==38)return!1;for(e.anchor!==null&&E(e,"duplication of an anchor property"),r=e.input.charCodeAt(++e.position),n=e.position;r!==0&&!P(r)&&!b(r);)r=e.input.charCodeAt(++e.position);return e.position===n&&E(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(n,e.position),!0}function Ei(e){var n,r,t;if(t=e.input.charCodeAt(e.position),t!==42)return!1;for(t=e.input.charCodeAt(++e.position),n=e.position;t!==0&&!P(t)&&!b(t);)t=e.input.charCodeAt(++e.position);return e.position===n&&E(e,"name of an alias node must contain at least one character"),r=e.input.slice(n,e.position),F.call(e.anchorMap,r)||E(e,'unidentified alias "'+r+'"'),e.result=e.anchorMap[r],h(e,!0,-1),!0}function W(e,n,r,t,i){var o,s,a,l=1,c=!1,u=!1,A,_,p,T,f,S;if(e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,o=s=a=ie===r||mn===r,t&&h(e,!0,-1)&&(c=!0,e.lineIndent>n?l=1:e.lineIndent===n?l=0:e.lineIndent<n&&(l=-1)),l===1)for(;_i(e)||pi(e);)h(e,!0,-1)?(c=!0,a=o,e.lineIndent>n?l=1:e.lineIndent===n?l=0:e.lineIndent<n&&(l=-1)):a=!1;if(a&&(a=c||i),(l===1||ie===r)&&(re===r||hn===r?f=n:f=n+1,S=e.position-e.lineStart,l===1?a&&(ke(e,S)||ui(e,S,f))||ci(e,f)?u=!0:(s&&Ai(e,f)||ai(e,f)||li(e,f)?u=!0:Ei(e)?(u=!0,(e.tag!==null||e.anchor!==null)&&E(e,"alias node should not have any properties")):si(e,f,re===r)&&(u=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):l===0&&(u=a&&ke(e,S))),e.tag===null)e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);else if(e.tag==="?"){for(e.result!==null&&e.kind!=="scalar"&&E(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),A=0,_=e.implicitTypes.length;A<_;A+=1)if(T=e.implicitTypes[A],T.resolve(e.result)){e.result=T.construct(e.result),e.tag=T.tag,e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);break}}else if(e.tag!=="!"){if(F.call(e.typeMap[e.kind||"fallback"],e.tag))T=e.typeMap[e.kind||"fallback"][e.tag];else for(T=null,p=e.typeMap.multi[e.kind||"fallback"],A=0,_=p.length;A<_;A+=1)if(e.tag.slice(0,p[A].tag.length)===p[A].tag){T=p[A];break}T||E(e,"unknown tag !<"+e.tag+">"),e.result!==null&&T.kind!==e.kind&&E(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+T.kind+'", not "'+e.kind+'"'),T.resolve(e.result,e.tag)?(e.result=T.construct(e.result,e.tag),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):E(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")}return e.listener!==null&&e.listener("close",e),e.tag!==null||e.anchor!==null||u}function Ti(e){var n=e.position,r,t,i,o=!1,s;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);(s=e.input.charCodeAt(e.position))!==0&&(h(e,!0,-1),s=e.input.charCodeAt(e.position),!(e.lineIndent>0||s!==37));){for(o=!0,s=e.input.charCodeAt(++e.position),r=e.position;s!==0&&!P(s);)s=e.input.charCodeAt(++e.position);for(t=e.input.slice(r,e.position),i=[],t.length<1&&E(e,"directive name must not be less than one character in length");s!==0;){for(;w(s);)s=e.input.charCodeAt(++e.position);if(s===35){do s=e.input.charCodeAt(++e.position);while(s!==0&&!y(s));break}if(y(s))break;for(r=e.position;s!==0&&!P(s);)s=e.input.charCodeAt(++e.position);i.push(e.input.slice(r,e.position))}s!==0&&Le(e),F.call(Ye,t)?Ye[t](e,t,i):te(e,'unknown document directive "'+t+'"')}if(h(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,h(e,!0,-1)):o&&E(e,"directives end mark is expected"),W(e,e.lineIndent-1,ie,!1,!0),h(e,!0,-1),e.checkLineBreaks&&Zr.test(e.input.slice(n,e.position))&&te(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&Ae(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,h(e,!0,-1));return}if(e.position<e.length-1)E(e,"end of the stream or a document separator is expected");else return}function Mn(e,n){e=String(e),n=n||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));var r=new oi(e,n),t=e.indexOf("\0");for(t!==-1&&(r.position=t,E(r,"null byte is not allowed in input")),r.input+="\0";r.input.charCodeAt(r.position)===32;)r.lineIndent+=1,r.position+=1;for(;r.position<r.length-1;)Ti(r);return r.documents}function fi(e,n,r){n!==null&&typeof n=="object"&&typeof r>"u"&&(r=n,n=null);var t=Mn(e,r);if(typeof n!="function")return t;for(var i=0,o=t.length;i<o;i+=1)n(t[i])}function di(e,n){var r=Mn(e,n);if(r.length!==0){if(r.length===1)return r[0];throw new L("expected a single document in the stream, but found more")}}var Si=fi,Oi=di,yn={loadAll:Si,load:Oi},vn=Object.prototype.toString,Gn=Object.prototype.hasOwnProperty,Me=65279,Ii=9,j=10,Ni=13,hi=32,mi=33,Ci=34,Ie=35,Ri=37,Di=38,gi=39,Li=42,Un=44,Pi=45,oe=58,Mi=61,yi=62,vi=63,Gi=64,xn=91,Hn=93,Ui=96,Fn=123,xi=124,wn=125,D={};D[0]="\\0";D[7]="\\a";D[8]="\\b";D[9]="\\t";D[10]="\\n";D[11]="\\v";D[12]="\\f";D[13]="\\r";D[27]="\\e";D[34]='\\"';D[92]="\\\\";D[133]="\\N";D[160]="\\_";D[8232]="\\L";D[8233]="\\P";var Hi=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],Fi=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function wi(e,n){var r,t,i,o,s,a,l;if(n===null)return{};for(r={},t=Object.keys(n),i=0,o=t.length;i<o;i+=1)s=t[i],a=String(n[s]),s.slice(0,2)==="!!"&&(s="tag:yaml.org,2002:"+s.slice(2)),l=e.compiledTypeMap.fallback[s],l&&Gn.call(l.styleAliases,a)&&(a=l.styleAliases[a]),r[s]=a;return r}function Bi(e){var n,r,t;if(n=e.toString(16).toUpperCase(),e<=255)r="x",t=2;else if(e<=65535)r="u",t=4;else if(e<=4294967295)r="U",t=8;else throw new L("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+r+m.repeat("0",t-n.length)+n}var Yi=1,Q=2;function bi(e){this.schema=e.schema||ge,this.indent=Math.max(1,e.indent||2),this.noArrayIndent=e.noArrayIndent||!1,this.skipInvalid=e.skipInvalid||!1,this.flowLevel=m.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=wi(this.schema,e.styles||null),this.sortKeys=e.sortKeys||!1,this.lineWidth=e.lineWidth||80,this.noRefs=e.noRefs||!1,this.noCompatMode=e.noCompatMode||!1,this.condenseFlow=e.condenseFlow||!1,this.quotingType=e.quotingType==='"'?Q:Yi,this.forceQuotes=e.forceQuotes||!1,this.replacer=typeof e.replacer=="function"?e.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function We(e,n){for(var r=m.repeat(" ",n),t=0,i=-1,o="",s,a=e.length;t<a;)i=e.indexOf(`
`,t),i===-1?(s=e.slice(t),t=a):(s=e.slice(t,i+1),t=i+1),s.length&&s!==`
`&&(o+=r),o+=s;return o}function Ne(e,n){return`
`+m.repeat(" ",e.indent*n)}function ki(e,n){var r,t,i;for(r=0,t=e.implicitTypes.length;r<t;r+=1)if(i=e.implicitTypes[r],i.resolve(n))return!0;return!1}function se(e){return e===hi||e===Ii}function z(e){return 32<=e&&e<=126||161<=e&&e<=55295&&e!==8232&&e!==8233||57344<=e&&e<=65533&&e!==Me||65536<=e&&e<=1114111}function Ve(e){return z(e)&&e!==Me&&e!==Ni&&e!==j}function $e(e,n,r){var t=Ve(e),i=t&&!se(e);return(r?t:t&&e!==Un&&e!==xn&&e!==Hn&&e!==Fn&&e!==wn)&&e!==Ie&&!(n===oe&&!i)||Ve(n)&&!se(n)&&e===Ie||n===oe&&i}function Wi(e){return z(e)&&e!==Me&&!se(e)&&e!==Pi&&e!==vi&&e!==oe&&e!==Un&&e!==xn&&e!==Hn&&e!==Fn&&e!==wn&&e!==Ie&&e!==Di&&e!==Li&&e!==mi&&e!==xi&&e!==Mi&&e!==yi&&e!==gi&&e!==Ci&&e!==Ri&&e!==Gi&&e!==Ui}function Vi(e){return!se(e)&&e!==oe}function X(e,n){var r=e.charCodeAt(n),t;return r>=55296&&r<=56319&&n+1<e.length&&(t=e.charCodeAt(n+1),t>=56320&&t<=57343)?(r-55296)*1024+t-56320+65536:r}function Bn(e){var n=/^\n* /;return n.test(e)}var Yn=1,he=2,bn=3,kn=4,Y=5;function $i(e,n,r,t,i,o,s,a){var l,c=0,u=null,A=!1,_=!1,p=t!==-1,T=-1,f=Wi(X(e,0))&&Vi(X(e,e.length-1));if(n||s)for(l=0;l<e.length;c>=65536?l+=2:l++){if(c=X(e,l),!z(c))return Y;f=f&&$e(c,u,a),u=c}else{for(l=0;l<e.length;c>=65536?l+=2:l++){if(c=X(e,l),c===j)A=!0,p&&(_=_||l-T-1>t&&e[T+1]!==" ",T=l);else if(!z(c))return Y;f=f&&$e(c,u,a),u=c}_=_||p&&l-T-1>t&&e[T+1]!==" "}return!A&&!_?f&&!s&&!i(e)?Yn:o===Q?Y:he:r>9&&Bn(e)?Y:s?o===Q?Y:he:_?kn:bn}function qi(e,n,r,t,i){e.dump=function(){if(n.length===0)return e.quotingType===Q?'""':"''";if(!e.noCompatMode&&(Hi.indexOf(n)!==-1||Fi.test(n)))return e.quotingType===Q?'"'+n+'"':"'"+n+"'";var o=e.indent*Math.max(1,r),s=e.lineWidth===-1?-1:Math.max(Math.min(e.lineWidth,40),e.lineWidth-o),a=t||e.flowLevel>-1&&r>=e.flowLevel;function l(c){return ki(e,c)}switch($i(n,a,e.indent,s,l,e.quotingType,e.forceQuotes&&!t,i)){case Yn:return n;case he:return"'"+n.replace(/'/g,"''")+"'";case bn:return"|"+qe(n,e.indent)+Ke(We(n,o));case kn:return">"+qe(n,e.indent)+Ke(We(Ki(n,s),o));case Y:return'"'+Xi(n)+'"';default:throw new L("impossible error: invalid scalar style")}}()}function qe(e,n){var r=Bn(e)?String(n):"",t=e[e.length-1]===`
`,i=t&&(e[e.length-2]===`
`||e===`
`),o=i?"+":t?"":"-";return r+o+`
`}function Ke(e){return e[e.length-1]===`
`?e.slice(0,-1):e}function Ki(e,n){for(var r=/(\n+)([^\n]*)/g,t=function(){var c=e.indexOf(`
`);return c=c!==-1?c:e.length,r.lastIndex=c,Xe(e.slice(0,c),n)}(),i=e[0]===`
`||e[0]===" ",o,s;s=r.exec(e);){var a=s[1],l=s[2];o=l[0]===" ",t+=a+(!i&&!o&&l!==""?`
`:"")+Xe(l,n),i=o}return t}function Xe(e,n){if(e===""||e[0]===" ")return e;for(var r=/ [^ ]/g,t,i=0,o,s=0,a=0,l="";t=r.exec(e);)a=t.index,a-i>n&&(o=s>i?s:a,l+=`
`+e.slice(i,o),i=o+1),s=a;return l+=`
`,e.length-i>n&&s>i?l+=e.slice(i,s)+`
`+e.slice(s+1):l+=e.slice(i),l.slice(1)}function Xi(e){for(var n="",r=0,t,i=0;i<e.length;r>=65536?i+=2:i++)r=X(e,i),t=D[r],!t&&z(r)?(n+=e[i],r>=65536&&(n+=e[i+1])):n+=t||Bi(r);return n}function Ji(e,n,r){var t="",i=e.tag,o,s,a;for(o=0,s=r.length;o<s;o+=1)a=r[o],e.replacer&&(a=e.replacer.call(r,String(o),a)),(G(e,n,a,!1,!1)||typeof a>"u"&&G(e,n,null,!1,!1))&&(t!==""&&(t+=","+(e.condenseFlow?"":" ")),t+=e.dump);e.tag=i,e.dump="["+t+"]"}function Je(e,n,r,t){var i="",o=e.tag,s,a,l;for(s=0,a=r.length;s<a;s+=1)l=r[s],e.replacer&&(l=e.replacer.call(r,String(s),l)),(G(e,n+1,l,!0,!0,!1,!0)||typeof l>"u"&&G(e,n+1,null,!0,!0,!1,!0))&&((!t||i!=="")&&(i+=Ne(e,n)),e.dump&&j===e.dump.charCodeAt(0)?i+="-":i+="- ",i+=e.dump);e.tag=o,e.dump=i||"[]"}function ji(e,n,r){var t="",i=e.tag,o=Object.keys(r),s,a,l,c,u;for(s=0,a=o.length;s<a;s+=1)u="",t!==""&&(u+=", "),e.condenseFlow&&(u+='"'),l=o[s],c=r[l],e.replacer&&(c=e.replacer.call(r,l,c)),G(e,n,l,!1,!1)&&(e.dump.length>1024&&(u+="? "),u+=e.dump+(e.condenseFlow?'"':"")+":"+(e.condenseFlow?"":" "),G(e,n,c,!1,!1)&&(u+=e.dump,t+=u));e.tag=i,e.dump="{"+t+"}"}function Qi(e,n,r,t){var i="",o=e.tag,s=Object.keys(r),a,l,c,u,A,_;if(e.sortKeys===!0)s.sort();else if(typeof e.sortKeys=="function")s.sort(e.sortKeys);else if(e.sortKeys)throw new L("sortKeys must be a boolean or a function");for(a=0,l=s.length;a<l;a+=1)_="",(!t||i!=="")&&(_+=Ne(e,n)),c=s[a],u=r[c],e.replacer&&(u=e.replacer.call(r,c,u)),G(e,n+1,c,!0,!0,!0)&&(A=e.tag!==null&&e.tag!=="?"||e.dump&&e.dump.length>1024,A&&(e.dump&&j===e.dump.charCodeAt(0)?_+="?":_+="? "),_+=e.dump,A&&(_+=Ne(e,n)),G(e,n+1,u,!0,A)&&(e.dump&&j===e.dump.charCodeAt(0)?_+=":":_+=": ",_+=e.dump,i+=_));e.tag=o,e.dump=i||"{}"}function je(e,n,r){var t,i,o,s,a,l;for(i=r?e.explicitTypes:e.implicitTypes,o=0,s=i.length;o<s;o+=1)if(a=i[o],(a.instanceOf||a.predicate)&&(!a.instanceOf||typeof n=="object"&&n instanceof a.instanceOf)&&(!a.predicate||a.predicate(n))){if(r?a.multi&&a.representName?e.tag=a.representName(n):e.tag=a.tag:e.tag="?",a.represent){if(l=e.styleMap[a.tag]||a.defaultStyle,vn.call(a.represent)==="[object Function]")t=a.represent(n,l);else if(Gn.call(a.represent,l))t=a.represent[l](n,l);else throw new L("!<"+a.tag+'> tag resolver accepts not "'+l+'" style');e.dump=t}return!0}return!1}function G(e,n,r,t,i,o,s){e.tag=null,e.dump=r,je(e,r,!1)||je(e,r,!0);var a=vn.call(e.dump),l=t,c;t&&(t=e.flowLevel<0||e.flowLevel>n);var u=a==="[object Object]"||a==="[object Array]",A,_;if(u&&(A=e.duplicates.indexOf(r),_=A!==-1),(e.tag!==null&&e.tag!=="?"||_||e.indent!==2&&n>0)&&(i=!1),_&&e.usedDuplicates[A])e.dump="*ref_"+A;else{if(u&&_&&!e.usedDuplicates[A]&&(e.usedDuplicates[A]=!0),a==="[object Object]")t&&Object.keys(e.dump).length!==0?(Qi(e,n,e.dump,i),_&&(e.dump="&ref_"+A+e.dump)):(ji(e,n,e.dump),_&&(e.dump="&ref_"+A+" "+e.dump));else if(a==="[object Array]")t&&e.dump.length!==0?(e.noArrayIndent&&!s&&n>0?Je(e,n-1,e.dump,i):Je(e,n,e.dump,i),_&&(e.dump="&ref_"+A+e.dump)):(Ji(e,n,e.dump),_&&(e.dump="&ref_"+A+" "+e.dump));else if(a==="[object String]")e.tag!=="?"&&qi(e,e.dump,n,o,l);else{if(a==="[object Undefined]")return!1;if(e.skipInvalid)return!1;throw new L("unacceptable kind of an object to dump "+a)}e.tag!==null&&e.tag!=="?"&&(c=encodeURI(e.tag[0]==="!"?e.tag.slice(1):e.tag).replace(/!/g,"%21"),e.tag[0]==="!"?c="!"+c:c.slice(0,18)==="tag:yaml.org,2002:"?c="!!"+c.slice(18):c="!<"+c+">",e.dump=c+" "+e.dump)}return!0}function zi(e,n){var r=[],t=[],i,o;for(me(e,r,t),i=0,o=t.length;i<o;i+=1)n.duplicates.push(r[t[i]]);n.usedDuplicates=new Array(o)}function me(e,n,r){var t,i,o;if(e!==null&&typeof e=="object")if(i=n.indexOf(e),i!==-1)r.indexOf(i)===-1&&r.push(i);else if(n.push(e),Array.isArray(e))for(i=0,o=e.length;i<o;i+=1)me(e[i],n,r);else for(t=Object.keys(e),i=0,o=t.length;i<o;i+=1)me(e[t[i]],n,r)}function Zi(e,n){n=n||{};var r=new bi(n);r.noRefs||zi(e,r);var t=e;return r.replacer&&(t=r.replacer.call({"":t},"",t)),G(r,0,t,!0,!0)?r.dump+`
`:""}var et=Zi,nt={dump:et};function ye(e,n){return function(){throw new Error("Function yaml."+e+" is removed in js-yaml 4. Use yaml."+n+" instead, which is now safe by default.")}}var rt=R,it=rn,tt=an,ot=_n,st=pn,at=ge,lt=yn.load,ct=yn.loadAll,At=nt.dump,ut=L,_t={binary:Sn,float:un,map:sn,null:ln,pairs:In,set:Nn,timestamp:fn,bool:cn,int:An,merge:dn,omap:On,seq:on,str:tn},pt=ye("safeLoad","load"),Et=ye("safeLoadAll","loadAll"),Tt=ye("safeDump","dump"),Wn={Type:rt,Schema:it,FAILSAFE_SCHEMA:tt,JSON_SCHEMA:ot,CORE_SCHEMA:st,DEFAULT_SCHEMA:at,load:lt,loadAll:ct,dump:At,YAMLException:ut,types:_t,safeLoad:pt,safeLoadAll:Et,safeDump:Tt};const ft=`
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


`;class dt{constructor(){this.patterns=new Map,this.compiled=new Map,this.loadBuiltins()}loadPatternText(n){for(const r of n.split(`
`)){const t=r.trim();if(!t||t.startsWith("#"))continue;const i=t.search(/\s/);if(i===-1)continue;const o=t.slice(0,i),s=t.slice(i).trim();this.patterns.set(o,s)}}addPattern(n,r){this.patterns.set(n,r),this.compiled.clear()}compile(n){const r=this.compiled.get(n);if(r)return r;const t=this.buildRegex(n);return this.compiled.set(n,t),t}buildRegex(n){const r=this.expandWithCaptures(n);try{return new RegExp(r,"s")}catch(t){return console.warn(`Grok compile error for pattern "${n}":`,t),/(?!)/}}expandWithCaptures(n,r=0){if(r>20)return".*?";let t="",i=0;for(;i<n.length;){const o=n.indexOf("%{",i);if(o===-1){t+=this.escapeNonGrok(n.slice(i));break}t+=this.escapeNonGrok(n.slice(i,o));const s=n.indexOf("}",o);if(s===-1){t+=this.escapeNonGrok(n.slice(o));break}const l=n.slice(o+2,s).split(":"),c=l[0],u=l[1],A=this.patterns.get(c)??".*?",_=this.expandWithCaptures(A,r+1);if(u){const p=u.replace(/[^a-zA-Z0-9_]/g,"_");t+=`(?<${p}>${_})`}else t+=`(?:${_})`;i=s+1}return t}escapeNonGrok(n){return n}match(n,r){const i=this.compile(n).exec(r);return i?i.groups??{}:null}matchRegex(n,r){const t=n.exec(r);return t?t.groups??{}:null}loadBuiltins(){this.loadPatternText(`
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
`)}}const ae=new dt;ae.loadPatternText(ft);function Vn(e,n){try{const r=St(e),i=new Ot(r).parseExpr();return C(i,n)}catch{return}}function V(e,n){return!!Vn(e,n)}function Z(e,n){const r=Vn(e,n);return r==null?"":String(r)}function St(e){const n=[];let r=0;for(;r<e.length;){const t=e[r];if(/\s/.test(t)){r++;continue}if(/[0-9]/.test(t)||t==="-"&&/[0-9]/.test(e[r+1]??"")){let i=r;for(e[i]==="-"&&i++;i<e.length&&/[0-9.]/.test(e[i]);)i++;n.push({kind:"NUM",value:e.slice(r,i)}),r=i;continue}if(t==='"'||t==="'"){const i=t;let o=r+1,s="";for(;o<e.length&&e[o]!==i;)e[o]==="\\"&&o+1<e.length?(s+=e[o+1],o+=2):s+=e[o++];n.push({kind:"STR",value:s}),r=o+1;continue}if(e[r]==="!"&&e[r+1]==="="){n.push({kind:"NEQ",value:"!="}),r+=2;continue}if(e[r]==="="&&e[r+1]==="="){n.push({kind:"EQ",value:"=="}),r+=2;continue}if(e[r]==="<"&&e[r+1]==="="){n.push({kind:"LTE",value:"<="}),r+=2;continue}if(e[r]===">"&&e[r+1]==="="){n.push({kind:"GTE",value:">="}),r+=2;continue}if(e[r]==="&"&&e[r+1]==="&"){n.push({kind:"AND",value:"&&"}),r+=2;continue}if(e[r]==="|"&&e[r+1]==="|"){n.push({kind:"OR",value:"||"}),r+=2;continue}if(t==="<"){n.push({kind:"LT",value:"<"}),r++;continue}if(t===">"){n.push({kind:"GT",value:">"}),r++;continue}if(t==="!"){n.push({kind:"NOT",value:"!"}),r++;continue}if(t==="."){n.push({kind:"DOT",value:"."}),r++;continue}if(t==="["){n.push({kind:"LBRACKET",value:"["}),r++;continue}if(t==="]"){n.push({kind:"RBRACKET",value:"]"}),r++;continue}if(t==="("){n.push({kind:"LPAREN",value:"("}),r++;continue}if(t===")"){n.push({kind:"RPAREN",value:")"}),r++;continue}if(t===","){n.push({kind:"COMMA",value:","}),r++;continue}if(t==="?"){n.push({kind:"QUESTION",value:"?"}),r++;continue}if(t===":"){n.push({kind:"COLON",value:":"}),r++;continue}if(t==="+"){n.push({kind:"PLUS",value:"+"}),r++;continue}if(t==="-"){n.push({kind:"MINUS",value:"-"}),r++;continue}if(t==="*"){n.push({kind:"STAR",value:"*"}),r++;continue}if(t==="/"){n.push({kind:"SLASH",value:"/"}),r++;continue}if(t==="%"){n.push({kind:"PERCENT",value:"%"}),r++;continue}if(/[a-zA-Z_]/.test(t)){let i=r;for(;i<e.length&&/[a-zA-Z0-9_]/.test(e[i]);)i++;const o=e.slice(r,i);if(o==="true"){n.push({kind:"BOOL",value:"true"}),r=i;continue}if(o==="false"){n.push({kind:"BOOL",value:"false"}),r=i;continue}if(o==="nil"||o==="null"){n.push({kind:"NULL",value:o}),r=i;continue}if(o==="in"){n.push({kind:"IN",value:"in"}),r=i;continue}if(o==="not"){let s=i;for(;s<e.length&&e[s]===" ";)s++;if(e.slice(s,s+2)==="in"){n.push({kind:"NOTIN",value:"not in"}),r=s+2;continue}n.push({kind:"NOT",value:"not"}),r=i;continue}n.push({kind:"IDENT",value:o}),r=i;continue}r++}return n.push({kind:"EOF",value:""}),n}class Ot{constructor(n){this.tokens=n,this.pos=0}peek(){return this.tokens[this.pos]}consume(){return this.tokens[this.pos++]}expect(n){const r=this.consume();if(r.kind!==n)throw new Error(`Expected ${n}, got ${r.kind} (${r.value})`);return r}parseExpr(){return this.parseTernary()}parseTernary(){const n=this.parseOr();if(this.peek().kind==="QUESTION"){this.consume();const r=this.parseExpr();this.expect("COLON");const t=this.parseExpr();return{t:"ternary",cond:n,then:r,else_:t}}return n}parseOr(){let n=this.parseAnd();for(;this.peek().kind==="OR";)this.consume(),n={t:"binary",op:"||",left:n,right:this.parseAnd()};return n}parseAnd(){let n=this.parseNot();for(;this.peek().kind==="AND";)this.consume(),n={t:"binary",op:"&&",left:n,right:this.parseNot()};return n}parseNot(){return this.peek().kind==="NOT"?(this.consume(),{t:"unary",op:"!",expr:this.parseNot()}):this.parseComparison()}parseComparison(){let n=this.parseInExpr();const r=["EQ","NEQ","LT","LTE","GT","GTE"];for(;r.includes(this.peek().kind);)n={t:"binary",op:this.consume().value,left:n,right:this.parseInExpr()};return n}parseInExpr(){let n=this.parseAddSub();return this.peek().kind==="IN"?(this.consume(),{t:"binary",op:"in",left:n,right:this.parseAddSub()}):this.peek().kind==="NOTIN"?(this.consume(),{t:"unary",op:"!",expr:{t:"binary",op:"in",left:n,right:this.parseAddSub()}}):n}parseAddSub(){let n=this.parseMulDiv();for(;this.peek().kind==="PLUS"||this.peek().kind==="MINUS";)n={t:"binary",op:this.consume().value,left:n,right:this.parseMulDiv()};return n}parseMulDiv(){let n=this.parseUnary();for(;["STAR","SLASH","PERCENT"].includes(this.peek().kind);)n={t:"binary",op:this.consume().value,left:n,right:this.parseUnary()};return n}parseUnary(){return this.peek().kind==="MINUS"?(this.consume(),{t:"unary",op:"-",expr:this.parsePostfix()}):this.parsePostfix()}parsePostfix(){let n=this.parsePrimary();for(;;)if(this.peek().kind==="DOT"){this.consume();const r=this.expect("IDENT").value;if(this.peek().kind==="LPAREN"){this.consume();const t=this.parseArgList();this.expect("RPAREN"),n={t:"method",obj:n,method:r,args:t}}else n={t:"field",obj:n,key:{t:"str",v:r}}}else if(this.peek().kind==="LBRACKET"){this.consume();const r=this.parseExpr();this.expect("RBRACKET"),n={t:"field",obj:n,key:r}}else break;return n}parseArgList(){const n=[];if(this.peek().kind==="RPAREN")return n;for(n.push(this.parseExpr());this.peek().kind==="COMMA";)this.consume(),n.push(this.parseExpr());return n}parsePrimary(){const n=this.peek();if(n.kind==="NUM")return this.consume(),{t:"num",v:parseFloat(n.value)};if(n.kind==="STR")return this.consume(),{t:"str",v:n.value};if(n.kind==="BOOL")return this.consume(),{t:"bool",v:n.value==="true"};if(n.kind==="NULL")return this.consume(),{t:"null"};if(n.kind==="LPAREN"){this.consume();const r=this.parseExpr();return this.expect("RPAREN"),r}if(n.kind==="LBRACKET"){this.consume();const r=[];if(this.peek().kind!=="RBRACKET")for(r.push(this.parseExpr());this.peek().kind==="COMMA";)this.consume(),r.push(this.parseExpr());return this.expect("RBRACKET"),{t:"array",items:r}}if(n.kind==="IDENT"){if(this.consume(),this.peek().kind==="LPAREN"){this.consume();const r=this.parseArgList();return this.expect("RPAREN"),{t:"call",fn:n.value,args:r}}return{t:"ident",v:n.value}}return this.consume(),{t:"null"}}}function C(e,n){switch(e.t){case"num":return e.v;case"str":return e.v;case"bool":return e.v;case"null":return null;case"ident":return e.v in n?n[e.v]:void 0;case"field":{const r=C(e.obj,n),t=C(e.key,n);return r==null?void 0:typeof t=="string"||typeof t=="number"?r[t]:void 0}case"array":return e.items.map(r=>C(r,n));case"unary":return e.op==="!"?!C(e.expr,n):e.op==="-"?-C(e.expr,n):void 0;case"ternary":return C(e.cond,n)?C(e.then,n):C(e.else_,n);case"call":return Nt(e.fn,e.args.map(r=>C(r,n)));case"method":{const r=C(e.obj,n),t=e.args.map(i=>C(i,n));return It(e.method,r,t)}case"binary":{const r=e.op;if(r==="&&")return!!C(e.left,n)&&!!C(e.right,n);if(r==="||")return!!C(e.left,n)||!!C(e.right,n);const t=C(e.left,n),i=C(e.right,n);return r==="in"?Array.isArray(i)?i.includes(t):typeof i=="object"&&i!==null?t in i:typeof i=="string"?i.includes(t):!1:r==="=="?t===i||String(t)===String(i):r==="!="?t!==i&&String(t)!==String(i):r==="<"?t<i:r==="<="?t<=i:r===">"?t>i:r===">="?t>=i:r==="+"?typeof t=="string"||typeof i=="string"?String(t??"")+String(i??""):t+i:r==="-"?t-i:r==="*"?t*i:r==="/"?i!==0?t/i:0:r==="%"?t%i:void 0}}}function It(e,n,r){if(typeof n=="string"){if(e==="startsWith")return n.startsWith(r[0]);if(e==="endsWith")return n.endsWith(r[0]);if(e==="contains")return n.includes(r[0]);if(e==="matches")try{return new RegExp(r[0]).test(n)}catch{return!1}if(e==="hasPrefix")return n.startsWith(r[0]);if(e==="hasSuffix")return n.endsWith(r[0]);if(e==="toLower")return n.toLowerCase();if(e==="toUpper")return n.toUpperCase();if(e==="trimSpace")return n.trim();if(e==="len")return n.length}if(Array.isArray(n)&&e==="len")return n.length;if(typeof n=="object"&&n!==null&&e==="contains")return r[0]in n}function Nt(e,n){switch(e){case"len":{const r=n[0];return typeof r=="string"||Array.isArray(r)?r.length:typeof r=="object"&&r!==null?Object.keys(r).length:0}case"Upper":return typeof n[0]=="string"?n[0].toUpperCase():"";case"Lower":return typeof n[0]=="string"?n[0].toLowerCase():"";case"string":return String(n[0]??"");case"int":return parseInt(String(n[0]??"0"),10);case"float":return parseFloat(String(n[0]??"0"));case"KeyExists":{const r=n[0],t=n[1];return!t||typeof t!="object"?!1:r in t}case"IpInRange":{const r=n[0],t=n[1];return ht(r,t)}case"ToString":return String(n[0]??"");case"Atof":return parseFloat(String(n[0]??"0"));case"sprintf":case"Sprintf":{let r=String(n[0]??""),t=1;return r=r.replace(/%[sdf]/g,()=>String(n[t++]??"")),r}default:return}}function ht(e,n){try{const[r,t]=n.split("/"),i=parseInt(t,10);if(isNaN(i))return!1;const o=Qe(e),s=Qe(r);if(o===null||s===null)return!1;const a=i===0?0:-1<<32-i>>>0;return(o&a)===(s&a)}catch{return!1}}function Qe(e){const n=e.split(".");if(n.length!==4)return null;const r=n.map(Number);return r.some(isNaN)?null:(r[0]<<24|r[1]<<16|r[2]<<8|r[3])>>>0}const ve={Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12,January:1,February:2,March:3,April:4,June:6,July:7,August:8,September:9,October:10,November:11,December:12};function mt(e){if(e=e.trim(),!e)return null;const n=Ct(e);if(n)return n;const r=Rt(e);if(r)return r;const t=Dt(e);if(t)return t;const i=gt(e);if(i)return i;const o=Lt(e);if(o)return o;const s=Pt(e);return s||null}function $(e){return isNaN(e.getTime())?null:{iso:e.toISOString(),date:e}}function Ct(e){if(/^\d{4}[-\/]\d{2}[-\/]\d{2}/.test(e)){const n=e.replace(/\//g,"-"),r=new Date(n);return $(r)}return null}function Rt(e){const n=e.match(/^(\d{2})\/(\w{3})\/(\d{4}):(\d{2}):(\d{2}):(\d{2})\s*([+-]\d{4})?/);if(!n)return null;const r=ve[n[2]];if(!r)return null;const t=n[7]?n[7].slice(0,3)+":"+n[7].slice(3):"Z",i=`${n[3]}-${String(r).padStart(2,"0")}-${n[1]}T${n[4]}:${n[5]}:${n[6]}${t}`;return $(new Date(i))}function Dt(e){const n=e.match(/^\w{3}\s+(\w{3})\s+(\d{1,2})\s+(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?\s+(\d{4})/);if(!n)return null;const r=ve[n[1]];if(!r)return null;const t=`${n[6]}-${String(r).padStart(2,"0")}-${n[2].padStart(2,"0")}T${n[3]}:${n[4]}:${n[5]}Z`;return $(new Date(t))}function gt(e){const n=e.match(/^(\w{3})\s+(\d{1,2})\s+(\d{2}):(\d{2}):(\d{2})/);if(!n)return null;const r=ve[n[1]];if(!r)return null;const i=`${new Date().getUTCFullYear()}-${String(r).padStart(2,"0")}-${n[2].padStart(2,"0")}T${n[3]}:${n[4]}:${n[5]}Z`;return $(new Date(i))}function Lt(e){const n=e.match(/^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}):(\d{2}))?/);if(!n)return null;const r=n[4]?`T${n[4]}:${n[5]}:${n[6]}Z`:"T00:00:00Z",t=`${n[3]}-${n[1]}-${n[2]}${r}`;return $(new Date(t))}function Pt(e){if(!/^\d+(\.\d+)?$/.test(e))return null;const n=parseFloat(e);return isNaN(n)?null:$(new Date(n*1e3))}function Mt(e){if(e){const r=mt(e);if(r)return r}const n=new Date;return{iso:n.toISOString(),date:n}}function yt(e,n="s01-parse"){const r=Wn.loadAll(e),t=[];for(const i of r){if(!i||typeof i!="object")continue;$n(i.pattern_syntax??{});const o=qn(i,n);o&&t.push(o)}return t}function $n(e){for(const[n,r]of Object.entries(e))ae.addPattern(n,r);return ae}function qn(e,n,r){const t=e.stage??n,i=$n(e.pattern_syntax??{}),o=[];for(const c of e.nodes??[]){const u=qn(c,t);u&&o.push(u)}let s;e.grok&&(s=vt(e.grok,i));const a=(e.statics??[]).map(c=>({config:c}));let l;return e.whitelist&&(l={reason:e.whitelist.reason??"",ips:new Set(e.whitelist.ip??[]),cidrs:e.whitelist.cidr??[],expressions:e.whitelist.expression??[]}),!s&&o.length===0&&a.length===0&&!l&&!e.filter?null:{name:e.name??"",stage:t,filter:e.filter??"",onsuccess:e.onsuccess??"continue",leaves:o,grok:s,statics:a,whitelist:l,localGrok:i}}function vt(e,n){let r=/(?!)/,t;e.pattern?(t=e.pattern,r=n.compile(e.pattern)):e.name&&(t=`%{${e.name}}`,r=n.compile(`%{${e.name}}`));const i=(e.statics??[]).map(o=>({config:o}));return{applyOn:e.apply_on??"Line.Raw",patternExpr:t,expressionSrc:e.expression,regex:r,statics:i}}function Gt(e,n,r){if(r.length===0)return e;e.Stage||(e.Stage=r[0]),e.Process=!1;for(const t of r){const i=r.indexOf(e.Stage),o=r.indexOf(t);if(i>o)continue;if(e.Stage!==t)return e.Process=!1,e;const s=n.get(t)??[];let a=!1;for(const l of s)if(Kn(l,e)&&(a=!0,l.onsuccess==="next_stage")||e.Stage!==t)break;if(!a)return e.Process=!1,e}return e.Process=!0,e}function Kn(e,n){if(e.filter&&!V(e.filter,ue(n)))return!1;e.whitelist&&Ht(e.whitelist,n);let r=!1,t=!0;if(e.grok){const[i,o]=Ut(e.grok,n);t=i,r=o}if(e.leaves.length>0&&(t=xt(e,n,t,r)),!t)return!1;for(const i of e.statics)Xn(i.config,n);return e.onsuccess==="next_stage"&&(n._nextStageRequested=!0),!0}function Ut(e,n){let r;if(e.expressionSrc?r=Z(e.expressionSrc,ue(n)):e.applyOn==="Line.Raw"?r=n.Line.Raw:r=n.Parsed[e.applyOn]??"",!r)return[!1,!1];const t=ae.matchRegex(e.regex,r);if(!t)return[!1,!1];for(const[i,o]of Object.entries(t))o!==void 0&&o!==""&&(n.Parsed[i]=o);for(const i of e.statics)Xn(i.config,n);return[!0,!0]}function xt(e,n,r,t){let i=r;for(const o of e.leaves)if(Kn(o,n)){if(i=!0,e.onsuccess==="next_stage")break}else t||(i=!1);return i}function Ht(e,n){const r=n.Meta.source_ip??n.Parsed.source_ip??"";if(r&&e.ips.has(r)){n.Whitelisted=!0;return}for(const t of e.expressions)if(V(t,ue(n))){n.Whitelisted=!0;return}}function Xn(e,n){const r=ue(n);let t="";if(e.value!==void 0&&e.value!=="")t=e.value;else if(e.expression)t=Z(e.expression,r);else if(e.method){const i=e.expression?Z(e.expression,r):e.value??"";Ft(e.method,i,n);return}if(!(t===""&&e.method!=="ParseDate"))if(e.target){const i=e.target.replace(/^evt\./,"");wt(n,i,t)}else e.parsed?n.Parsed[e.parsed]=t:e.meta?n.Meta[e.meta]=t:e.enriched&&(n.Enriched[e.enriched]=t)}function Ft(e,n,r){if(e==="ParseDate"){const t=Mt(n||r.StrTime);r.MarshaledTime=t.iso,r.Time=t.date;return}if(e==="UnmarshalJSON"){try{r.Unmarshaled=JSON.parse(n)}catch{}return}}function wt(e,n,r){if(n==="StrTime"){e.StrTime=r;return}if(n==="MarshaledTime"){e.MarshaledTime=r;return}if(n==="Process"){e.Process=r==="true";return}const t=n.indexOf(".");if(t!==-1){const i=n.slice(0,t),o=n.slice(t+1),s=e[i];s&&typeof s=="object"&&(s[o]=r)}}function ue(e){return{evt:e}}function Bt(e){const n=new Map;for(const t of e){const i=n.get(t.stage)??[];i.push(t),n.set(t.stage,i)}return[Array.from(n.keys()).sort(),n]}function Yt(e){const r=new TextEncoder().encode(e);return bt(r)}function bt(e){let n=1732584193,r=4023233417,t=2562383102,i=271733878,o=3285377520;const s=e.length,a=s+1+((s+9)%64===0?0:64-(s+9)%64)+8,l=new Uint8Array(a);l.set(e),l[s]=128;const c=s*8;new DataView(l.buffer).setUint32(a-4,c>>>0,!1);const A=new Uint32Array(80);for(let _=0;_<a;_+=64){const p=new DataView(l.buffer,_,64);for(let I=0;I<16;I++)A[I]=p.getUint32(I*4,!1);for(let I=16;I<80;I++)A[I]=fe(A[I-3]^A[I-8]^A[I-14]^A[I-16],1);let T=n,f=r,S=t,O=i,d=o;for(let I=0;I<80;I++){let U,x;I<20?(U=f&S|~f&O,x=1518500249):I<40?(U=f^S^O,x=1859775393):I<60?(U=f&S|f&O|S&O,x=2400959708):(U=f^S^O,x=3395469782);const K=fe(T,5)+U+d+x+A[I]>>>0;d=O,O=S,S=fe(f,30),f=T,T=K}n=n+T>>>0,r=r+f>>>0,t=t+S>>>0,i=i+O>>>0,o=o+d>>>0}return[n,r,t,i,o].map(_=>_.toString(16).padStart(8,"0")).join("")}function fe(e,n){return(e<<n|e>>>32-n)>>>0}function Ce(e){if(!e)return 0;let n=0;const r=/(\d+(?:\.\d+)?)\s*(ms|s|m|h|d)/g;let t;for(;(t=r.exec(e))!==null;){const i=parseFloat(t[1]);switch(t[2]){case"ms":n+=i;break;case"s":n+=i*1e3;break;case"m":n+=i*60*1e3;break;case"h":n+=i*3600*1e3;break;case"d":n+=i*86400*1e3;break}}return n}function kt(e,n){const r=Wn.loadAll(e),t=[];for(const i of r){if(!i||typeof i!="object"||!i.name)continue;const o={spec:i,leakspeedMs:Ce(i.leakspeed??""),durationMs:Ce(i.duration??""),overflowChan:n};t.push(o)}return t}function Wt(e,n){const r=e.spec,t=r.capacity??0;return{factory:e,mapkey:n,tokens:t,capacity:t,lastRefillTime:null,queue:[],firstTs:null,lastTs:null,ovflwTs:null,totalCount:0,overflowed:!1,canceled:!1,durationDeadline:null,timedOverflow:e.durationMs>0,conditionalOverflow:r.type==="conditional",distinctSeen:new Set,blackholeExpiry:null,bayesianProb:r.bayesian_prior??0}}class Vt{constructor(){this.store=new Map}get(n){return this.store.get(n)}set(n,r){this.store.set(n,r)}delete(n){this.store.delete(n)}getOrCreate(n,r){let t=this.store.get(n);return t||(t=Wt(r,n),this.store.set(n,t)),t}snapshot(){return Array.from(this.store.values())}size(){return this.store.size}clear(){this.store.clear()}serialize(){const n=Array.from(this.store.entries()).map(([r,t])=>{var i,o;return{key:r,scenario:t.factory.spec.name,mapkey:t.mapkey,tokens:t.tokens,capacity:t.capacity,firstTs:((i=t.firstTs)==null?void 0:i.toISOString())??null,lastTs:((o=t.lastTs)==null?void 0:o.toISOString())??null,totalCount:t.totalCount,overflowed:t.overflowed,queueLen:t.queue.length}});return JSON.stringify(n,null,2)}}function $t(e,n){const r=e.factory.spec,t=e.capacity;if(r.type==="trigger")return!1;if(t===-1)return!0;if(e.lastRefillTime!==null&&e.factory.leakspeedMs>0){const i=n.getTime()-e.lastRefillTime.getTime();if(i>0){const o=i/e.factory.leakspeedMs;e.tokens=Math.min(t,e.tokens+o)}}return e.lastRefillTime=n,e.tokens>=1?(e.tokens-=1,!0):!1}function qt(e,n,r){let t=!1;const i=e.Time??new Date;for(const o of n){const s=o.spec;if(s.filter&&!V(s.filter,le(e)))continue;let a="";s.groupby&&(a=Z(s.groupby,le(e)));const l=jt(s.filter??"",a,s.name),c=r.getOrCreate(l,o);Kt(c,e,i)&&Xt(c,o,r),t=!0}return t}function Kt(e,n,r){const t=e.factory.spec;if(t.distinct){const o=Z(t.distinct,le(n));if(e.distinctSeen.has(o))return!1;e.distinctSeen.add(o)}if(t.cancel_on&&V(t.cancel_on,le(n)))return e.canceled=!0,!1;if(e.totalCount++,e.firstTs||(e.firstTs=r),e.lastTs=r,!e.durationDeadline&&e.factory.durationMs>0&&(e.durationDeadline=new Date(r.getTime()+e.factory.durationMs)),e.timedOverflow&&e.durationDeadline&&r>e.durationDeadline)return e.queue.push(n),e.ovflwTs=r,!0;if($t(e,r)||e.conditionalOverflow)e.queue.push(n);else return e.queue.push(n),e.ovflwTs=r,!0;if(e.conditionalOverflow&&t.condition){const o={Queue:e.queue,GetQueue:()=>e.queue,L:e.queue.length};if(V(t.condition,{evt:n,queue:o,leaky:e}))return e.ovflwTs=r,!0}return!1}function Xt(e,n,r){if(n.spec.blackhole&&e.blackholeExpiry&&e.ovflwTs&&e.blackholeExpiry>e.ovflwTs){de(e,r);return}if(n.spec.overflow_filter&&!V(n.spec.overflow_filter,{leaky:e,queue:e.queue})){de(e,r);return}if(n.spec.blackhole&&e.ovflwTs){const t=Ce(n.spec.blackhole);e.blackholeExpiry=new Date(e.ovflwTs.getTime()+t)}e.overflowed=!0,n.overflowChan.push({factory:n,leaky:e,queue:[...e.queue]}),de(e,r)}function de(e,n){n.delete(e.mapkey)}function Jt(e,n){for(const r of n.snapshot()){if(r.overflowed||r.canceled){n.delete(r.mapkey);continue}const i=r.factory.spec.capacity??0;if(i<=0)continue;const o=r.factory.leakspeedMs;if(o<=0||!r.lastRefillTime)continue;const s=e.getTime()-r.lastRefillTime.getTime();Math.min(i,r.tokens+s/o)>=i&&n.delete(r.mapkey)}}function le(e){return{evt:e}}function jt(e,n,r){return Yt(`${e}\0${n}\0${r}`)}function Qt(e){var f,S,O,d,I,U,x;const{factory:n,leaky:r,queue:t}=e,i=n.spec;if(t.length===0)return null;const o=((f=r.firstTs)==null?void 0:f.toISOString())??new Date().toISOString(),s=((S=r.ovflwTs)==null?void 0:S.toISOString())??((O=r.lastTs)==null?void 0:O.toISOString())??new Date().toISOString(),a=((d=r.lastTs)==null?void 0:d.toISOString())??new Date().toISOString(),l=new Map;for(const K of t){const _e=zt(K,((I=i.scope)==null?void 0:I.type)??"Ip");_e&&l.set(_e.value,_e)}const c=Array.from(l.values()),u=t.map(K=>Zt(K)),A=c.length===0?"UNKNOWN":c.length===1?c[0].value:`${c.length} sources`,_=r.firstTs&&r.ovflwTs?Math.round((r.ovflwTs.getTime()-r.firstTs.getTime())/1e3):0,p=`${((U=i.scope)==null?void 0:U.type)??"Ip"} ${A} performed '${i.name}' (${r.totalCount} events over ${eo(_)}) at ${a}`,T=!!((x=i.labels)!=null&&x.remediation);return{mapkey:r.mapkey,scenario:i.name,scenarioDescription:i.description??"",capacity:i.capacity,eventsCount:r.totalCount,leakspeed:i.leakspeed??"",startAt:o,stopAt:s,message:p,sources:c,events:u,labels:i.labels??{},remediation:T,simulated:!1}}function zt(e,n){const r=e.Meta.source_ip??e.Parsed.source_ip??"";if(!r&&n==="Ip")return null;const t={ip:r,range:e.Meta.SourceRange??"",scope:n,value:r||"",cn:e.Enriched.IsoCode??e.Meta.IsoCode??"",asNumber:e.Enriched.ASNNumber??e.Meta.ASNNumber??"",asOrg:e.Enriched.ASNOrg??e.Meta.ASNOrg??"",latitude:parseFloat(e.Enriched.Latitude??"0")||0,longitude:parseFloat(e.Enriched.Longitude??"0")||0};return n==="Range"&&t.range&&(t.value=t.range),t}function Zt(e){var t;const n=[];for(const[i,o]of Object.entries(e.Meta))n.push({key:i,value:o});return n.sort((i,o)=>i.key.localeCompare(o.key)),{timestamp:e.MarshaledTime||((t=e.Time)==null?void 0:t.toISOString())||"",meta:n}}function eo(e){if(e<60)return`${e}s`;const n=Math.floor(e/3600),r=Math.floor(e%3600/60),t=e%60,i=[];return n&&i.push(`${n}h`),r&&i.push(`${r}m`),t&&i.push(`${t}s`),i.join("")}function no(e,n){return n<=0?100:Math.round((1-e/n)*100)}function ro(e,n={},r="user-paste"){return{Line:{Raw:e,Src:r,Time:new Date,Labels:n,Module:"file"},Parsed:{},Enriched:{},Unmarshaled:{},Meta:{},Stage:"",Process:!1,Whitelisted:!1,MarshaledTime:"",Time:new Date,StrTime:"",StrTimeFormat:"",Type:"LOG"}}const io=5e3;class to{constructor(){this.parsers=[],this.stages=[],this.parsersByStage=new Map,this.factories=[],this.store=new Vt,this.overflowChan=[]}loadParsers(n,r){for(const t of n){const i=yt(t,r);this.parsers.push(...i)}[this.stages,this.parsersByStage]=Bt(this.parsers)}loadScenarios(n){for(const r of n){const t=kt(r,this.overflowChan);this.factories.push(...t)}}clearParsers(){this.parsers=[],this.stages=[],this.parsersByStage=new Map}clearScenarios(){this.factories=[]}resetBuckets(){this.store.clear(),this.overflowChan=[];for(const n of this.factories)n.overflowChan=this.overflowChan}reset(){this.clearParsers(),this.clearScenarios(),this.resetBuckets()}get scenarioNames(){return this.factories.map(n=>n.spec.name)}get parserNames(){return this.parsers.map(n=>n.name).filter(Boolean)}replay(n,r={}){if(!r.keepBucketState){this.overflowChan=[];for(const u of this.factories)u.overflowChan=this.overflowChan}const t={};r.logType&&(t.type=r.logType);let i=0,o=0,s=0,a=0;for(const u of n){const A=u.trim();if(!A)continue;a++;const _=ro(A,t,r.logSrc??"replay");let p;if(this.stages.length>0?p=Gt(_,this.parsersByStage,this.stages):(_.Process=!0,_.Meta.source_ip="",p=_),!p.Process||p.Whitelisted){o++;continue}p.MarshaledTime||(p.MarshaledTime=new Date().toISOString(),p.Time=new Date),i++,i%io===0&&Jt(p.Time,this.store),this.factories.length>0&&qt(p,this.factories,this.store)&&s++}this.flushTimedBuckets();const l=[];for(const u of this.overflowChan){const A=Qt(u);A&&l.push(A)}const c=this.buildBucketReport();return{alerts:l,bucketReport:c,parsedCount:i,discardedCount:o,pouredCount:s,totalLines:a}}flushTimedBuckets(){for(const n of this.store.snapshot())n.overflowed||n.canceled||n.timedOverflow&&n.queue.length!==0&&(n.ovflwTs=n.durationDeadline??n.lastTs??new Date,n.overflowed=!0,this.overflowChan.push({factory:n.factory,leaky:n,queue:[...n.queue]}))}buildBucketReport(){var r,t;const n=[];for(const i of this.store.snapshot()){if(i.queue.length===0&&!i.overflowed)continue;const o=i.capacity,s=no(i.tokens,o),a=i.queue[i.queue.length-1],l=a?a.Meta.source_ip??a.Parsed.source_ip??i.mapkey.slice(0,8):i.mapkey.slice(0,8);n.push({scenario:i.factory.spec.name,mapkey:i.mapkey,partitionValue:l,totalEvents:i.totalCount,capacity:o,fillPercent:s,firstSeen:((r=i.firstTs)==null?void 0:r.toISOString())??"",lastSeen:((t=i.lastTs)==null?void 0:t.toISOString())??"",overflowed:i.overflowed})}return n.sort((i,o)=>o.fillPercent-i.fillPercent)}}const v=new to,g={parserFiles:[],scenarioFiles:[]},N=e=>document.getElementById(e),ce=N("log-input"),Ge=N("run-btn"),Ue=N("parser-list"),xe=N("scenario-list"),ze=N("status-badge"),oo=N("line-count"),so=N("stats-bar"),ne=N("alerts-container"),Re=N("buckets-container");function Jn(e,n,r,t,i){const o=N(e),s=N(n),a=async l=>{for(const c of Array.from(l)){if(r.some(A=>A.name===c.name))continue;const u=await c.text();r.push({name:c.name,text:u})}ee(r,t,i),jn(),q()};o.addEventListener("change",()=>{o.files&&a(o.files),o.value=""}),s.addEventListener("dragover",l=>{l.preventDefault(),s.classList.add("drag-over")}),s.addEventListener("dragleave",()=>s.classList.remove("drag-over")),s.addEventListener("drop",l=>{var c;l.preventDefault(),s.classList.remove("drag-over"),(c=l.dataTransfer)!=null&&c.files&&a(l.dataTransfer.files)})}function ee(e,n,r){n.innerHTML="";for(const t of e){const i=document.createElement("li");i.innerHTML=`<span>${M(t.name)}</span>
      <button class="remove-file" data-name="${M(t.name)}" data-kind="${r}" title="Remove">✕</button>`,n.appendChild(i)}}document.addEventListener("click",e=>{const n=e.target.closest(".remove-file");if(!n)return;const r=n.dataset.name;n.dataset.kind==="parser"?(g.parserFiles=g.parserFiles.filter(i=>i.name!==r),ee(g.parserFiles,Ue,"parser")):(g.scenarioFiles=g.scenarioFiles.filter(i=>i.name!==r),ee(g.scenarioFiles,xe,"scenario")),jn(),q()});function jn(){N("log-type-select").value,v.clearParsers(),v.clearScenarios();for(const e of g.parserFiles){const n=e.name.match(/^(s\d{2}-\w+)/),r=n?n[1]:"s01-parse";v.loadParsers([e.text],r)}v.loadScenarios(g.scenarioFiles.map(e=>e.text))}ce.addEventListener("input",()=>{const e=ce.value.split(`
`).filter(n=>n.trim()).length;oo.textContent=`${e} line${e!==1?"s":""}`,q()});function q(){const e=ce.value.trim().length>0,n=g.scenarioFiles.length>0||v.scenarioNames.length>0;Ge.disabled=!(e&&n)}Ge.addEventListener("click",ao);async function ao(){const n=ce.value.split(`
`),r=N("log-type-select").value,t=N("keep-state").checked;Se("running"),Ge.disabled=!0,await _o();try{const i=v.replay(n,{logType:r||void 0,keepBucketState:t});so.classList.remove("hidden"),N("stat-total").textContent=String(i.totalLines),N("stat-parsed").textContent=String(i.parsedCount),N("stat-poured").textContent=String(i.pouredCount),N("stat-alerts").textContent=String(i.alerts.length),lo(i.alerts),Ao(i.bucketReport),Se("done")}catch(i){console.error(i),Se("error"),ne.innerHTML=`<div class="empty-state" style="color:var(--cs-danger)">
      Error: ${M(String(i))}
    </div>`}finally{q()}}function lo(e){if(e.length===0){ne.innerHTML='<div class="empty-state">No alerts generated</div>';return}ne.innerHTML=e.map((n,r)=>co(n,r)).join(""),ne.querySelectorAll(".alert-details-toggle").forEach(n=>{n.addEventListener("click",()=>{const t=n.nextElementSibling.classList.toggle("open");n.textContent=t?"▾ Hide events":"▸ Show events"})})}function co(e,n){const r=e.remediation?'<span class="tag tag-ban">BAN</span>':'<span class="tag" style="background:rgba(245,158,11,0.2);color:var(--cs-warn)">ALERT</span>',t=`<span class="tag tag-events">${e.eventsCount} events</span>`,i=e.sources.map(l=>`<span class="tag tag-source">${M(l.value||l.ip)}</span>`).join(""),o=e.remediation?"remediation":"no-remediation",a=[["Scenario",e.scenario],["Start",e.startAt],["End",e.stopAt],["Events",String(e.eventsCount)],["Capacity",String(e.capacity)],["Leak speed",e.leakspeed],...e.sources.map(l=>["Source",`${l.value}${l.cn?" ("+l.cn+")":""}${l.asOrg?" / "+l.asOrg:""}`]),...Object.entries(e.labels).map(([l,c])=>[`Label.${l}`,String(c)])].map(([l,c])=>`<tr><td>${M(l)}</td><td>${M(c)}</td></tr>`).join("");return`
<div class="alert-card ${o}" id="alert-${n}">
  <div class="alert-header">
    <div>
      <div class="alert-scenario">${M(e.scenario)}</div>
      <div class="alert-meta">${M(e.scenarioDescription||"")}</div>
    </div>
    <div class="alert-tags">${r}${t}${i}</div>
  </div>
  <div class="alert-message">${M(e.message)}</div>
  <button class="alert-details-toggle">▸ Show events</button>
  <div class="alert-details">
    <table>${a}</table>
  </div>
</div>`}function Ao(e){if(e.length===0){Re.innerHTML='<div class="empty-state">No active buckets</div>';return}Re.innerHTML=e.map(n=>uo(n)).join("")}function uo(e){const n=e.fillPercent,r=n>=100?"fill-full":n>=75?"fill-high":n>=50?"fill-medium":"fill-low",t=e.overflowed?'<span class="bucket-overflowed">OVERFLOWED</span>':"";return`
<div class="bucket-card">
  <div class="bucket-header">
    <div>
      <div class="bucket-scenario">${M(e.scenario)}</div>
      <div class="bucket-partition">${M(e.partitionValue)}</div>
    </div>
    <div style="display:flex;align-items:center;gap:6px">
      ${t}
      <span style="font-size:13px;font-weight:700;color:var(--cs-text)">${n}%</span>
    </div>
  </div>
  <div class="fill-bar">
    <div class="fill-bar-inner ${r}" style="width:${Math.min(n,100)}%"></div>
  </div>
  <div class="bucket-stats">
    <span>${e.totalEvents} events</span>
    <span>cap: ${e.capacity}</span>
    ${e.firstSeen?`<span>first: ${Ze(e.firstSeen)}</span>`:""}
    ${e.lastSeen?`<span>last: ${Ze(e.lastSeen)}</span>`:""}
  </div>
</div>`}N("clear-parsers").addEventListener("click",()=>{g.parserFiles=[],ee(g.parserFiles,Ue,"parser"),v.clearParsers(),q()});N("clear-scenarios").addEventListener("click",()=>{g.scenarioFiles=[],ee(g.scenarioFiles,xe,"scenario"),v.clearScenarios(),q()});N("reset-buckets").addEventListener("click",()=>{v.resetBuckets(),Re.innerHTML='<div class="empty-state">Bucket state cleared</div>'});document.querySelectorAll(".tab").forEach(e=>{e.addEventListener("click",()=>{const n=e.dataset.tab;document.querySelectorAll(".tab").forEach(r=>r.classList.remove("active")),document.querySelectorAll(".tab-content").forEach(r=>r.classList.remove("active")),e.classList.add("active"),document.getElementById(`tab-${n}`).classList.add("active")})});Jn("parser-files","parser-drop",g.parserFiles,Ue,"parser");Jn("scenario-files","scenario-drop",g.scenarioFiles,xe,"scenario");function Se(e){ze.className=`badge badge-${e}`,ze.textContent=e.charAt(0).toUpperCase()+e.slice(1)}function _o(){return new Promise(e=>setTimeout(e,0))}function M(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ze(e){try{return new Date(e).toLocaleTimeString()}catch{return e}}
//# sourceMappingURL=index-C6QNhdOy.js.map
