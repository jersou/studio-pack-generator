(()=>{var Ma=Object.defineProperty;var Ra=(t,e)=>{for(var o in e)Ma(t,o,{get:e[o],enumerable:!0})};var ii=Object.defineProperty,Fa=Object.defineProperties,Ba=Object.getOwnPropertyDescriptor,Va=Object.getOwnPropertyDescriptors,oi=Object.getOwnPropertySymbols,Ha=Object.prototype.hasOwnProperty,Na=Object.prototype.propertyIsEnumerable,ur=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),ri=(t,e,o)=>e in t?ii(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,yt=(t,e)=>{for(var o in e||(e={}))Ha.call(e,o)&&ri(t,o,e[o]);if(oi)for(var o of oi(e))Na.call(e,o)&&ri(t,o,e[o]);return t},ie=(t,e)=>Fa(t,Va(e)),s=(t,e,o,r)=>{for(var i=r>1?void 0:r?Ba(e,o):e,a=t.length-1,n;a>=0;a--)(n=t[a])&&(i=(r?n(e,o,i):n(i))||i);return r&&i&&ii(e,o,i),i},Ua=function(t,e){this[0]=t,this[1]=e},si=t=>{var e=t[ur("asyncIterator")],o=!1,r,i={};return e==null?(e=t[ur("iterator")](),r=a=>i[a]=n=>e[a](n)):(e=e.call(t),r=a=>i[a]=n=>{if(o){if(o=!1,a==="throw")throw n;return n}return o=!0,{done:!1,value:new Ua(new Promise(d=>{var c=e[a](n);if(!(c instanceof Object))throw TypeError("Object expected");d(c)}),1)}}),i[ur("iterator")]=()=>i,r("next"),"throw"in e?r("throw"):i.throw=a=>{throw a},"return"in e&&r("return"),i};var Be=new WeakMap,oo=new WeakMap,ro=new WeakMap,fr=new WeakSet,Do=new WeakMap,ut=class{constructor(t,e){this.handleFormData=o=>{let r=this.options.disabled(this.host),i=this.options.name(this.host),a=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!r&&!n&&typeof i=="string"&&i.length>0&&typeof a<"u"&&(Array.isArray(a)?a.forEach(d=>{o.formData.append(i,d.toString())}):o.formData.append(i,a.toString()))},this.handleFormSubmit=o=>{var r;let i=this.options.disabled(this.host),a=this.options.reportValidity;this.form&&!this.form.noValidate&&((r=Be.get(this.form))==null||r.forEach(n=>{this.setUserInteracted(n,!0)})),this.form&&!this.form.noValidate&&!i&&!a(this.host)&&(o.preventDefault(),o.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),Do.set(this.host,[])},this.handleInteraction=o=>{let r=Do.get(this.host);r.includes(o.type)||r.push(o.type),r.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let o=this.form.querySelectorAll("*");for(let r of o)if(typeof r.checkValidity=="function"&&!r.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let o=this.form.querySelectorAll("*");for(let r of o)if(typeof r.reportValidity=="function"&&!r.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options=yt({form:o=>{let r=o.form;if(r){let a=o.getRootNode().querySelector(`#${r}`);if(a)return a}return o.closest("form")},name:o=>o.name,value:o=>o.value,defaultValue:o=>o.defaultValue,disabled:o=>{var r;return(r=o.disabled)!=null?r:!1},reportValidity:o=>typeof o.reportValidity=="function"?o.reportValidity():!0,checkValidity:o=>typeof o.checkValidity=="function"?o.checkValidity():!0,setValue:(o,r)=>o.value=r,assumeInteractionOn:["sl-input"]},e)}hostConnected(){let t=this.options.form(this.host);t&&this.attachForm(t),Do.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),Do.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction)})}hostUpdated(){let t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,Be.has(this.form)?Be.get(this.form).add(this.host):Be.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),oo.has(this.form)||(oo.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),ro.has(this.form)||(ro.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;let t=Be.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),oo.has(this.form)&&(this.form.reportValidity=oo.get(this.form),oo.delete(this.form)),ro.has(this.form)&&(this.form.checkValidity=ro.get(this.form),ro.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?fr.add(t):fr.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){let o=document.createElement("button");o.type=t,o.style.position="absolute",o.style.width="0",o.style.height="0",o.style.clipPath="inset(50%)",o.style.overflow="hidden",o.style.whiteSpace="nowrap",e&&(o.name=e.name,o.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(r=>{e.hasAttribute(r)&&o.setAttribute(r,e.getAttribute(r))})),this.form.append(o),o.click(),o.remove()}}getForm(){var t;return(t=this.form)!=null?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){let e=this.host,o=!!fr.has(e),r=!!e.required;e.toggleAttribute("data-required",r),e.toggleAttribute("data-optional",!r),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&o),e.toggleAttribute("data-user-valid",t&&o)}updateValidity(){let t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){let e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||t?.preventDefault()}},Ve=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1}),ai=Object.freeze(ie(yt({},Ve),{valid:!1,valueMissing:!0})),li=Object.freeze(ie(yt({},Ve),{valid:!1,customError:!0}));var Oo=globalThis,Po=Oo.ShadowRoot&&(Oo.ShadyCSS===void 0||Oo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,mr=Symbol(),ni=new WeakMap,io=class{constructor(e,o,r){if(this._$cssResult$=!0,r!==mr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(Po&&e===void 0){let r=o!==void 0&&o.length===1;r&&(e=ni.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&ni.set(o,e))}return e}toString(){return this.cssText}},ci=t=>new io(typeof t=="string"?t:t+"",void 0,mr),_=(t,...e)=>{let o=t.length===1?t[0]:e.reduce((r,i,a)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1],t[0]);return new io(o,t,mr)},gr=(t,e)=>{if(Po)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of e){let r=document.createElement("style"),i=Oo.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=o.cssText,t.appendChild(r)}},Mo=Po?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let r of e.cssRules)o+=r.cssText;return ci(o)})(t):t;var{is:qa,defineProperty:Wa,getOwnPropertyDescriptor:ja,getOwnPropertyNames:Ka,getOwnPropertySymbols:Xa,getPrototypeOf:Ya}=Object,Ro=globalThis,di=Ro.trustedTypes,Ga=di?di.emptyScript:"",Qa=Ro.reactiveElementPolyfillSupport,so=(t,e)=>t,ue={toAttribute(t,e){switch(e){case Boolean:t=t?Ga:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},Fo=(t,e)=>!qa(t,e),pi={attribute:!0,type:String,converter:ue,reflect:!1,hasChanged:Fo};Symbol.metadata??=Symbol("metadata"),Ro.litPropertyMetadata??=new WeakMap;var se=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=pi){if(o.state&&(o.attribute=!1),this._$Ei(),this.elementProperties.set(e,o),!o.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(e,r,o);i!==void 0&&Wa(this.prototype,e,i)}}static getPropertyDescriptor(e,o,r){let{get:i,set:a}=ja(this.prototype,e)??{get(){return this[o]},set(n){this[o]=n}};return{get(){return i?.call(this)},set(n){let d=i?.call(this);a.call(this,n),this.requestUpdate(e,d,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??pi}static _$Ei(){if(this.hasOwnProperty(so("elementProperties")))return;let e=Ya(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(so("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(so("properties"))){let o=this.properties,r=[...Ka(o),...Xa(o)];for(let i of r)this.createProperty(i,o[i])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[r,i]of o)this.elementProperties.set(r,i)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let i=this._$Eu(o,r);i!==void 0&&this._$Eh.set(i,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let i of r)o.unshift(Mo(i))}else e!==void 0&&o.push(Mo(e));return o}static _$Eu(e,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$ES(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$E_??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$E_?.delete(e)}_$ES(){let e=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gr(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$E_?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$E_?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,r){this._$AK(e,r)}_$EO(e,o){let r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(i!==void 0&&r.reflect===!0){let a=(r.converter?.toAttribute!==void 0?r.converter:ue).toAttribute(o,r.type);this._$Em=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,o){let r=this.constructor,i=r._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let a=r.getPropertyOptions(i),n=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:ue;this._$Em=i,this[i]=n.fromAttribute(o,a.type),this._$Em=null}}requestUpdate(e,o,r,i=!1,a){if(e!==void 0){if(r??=this.constructor.getPropertyOptions(e),!(r.hasChanged??Fo)(i?a:this[e],o))return;this.C(e,o,r)}this.isUpdatePending===!1&&(this._$Eg=this._$EP())}C(e,o,r){this._$AL.has(e)||this._$AL.set(e,o),r.reflect===!0&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,a]of r)a.wrapped!==!0||this._$AL.has(i)||this[i]===void 0||this.C(i,this[i],a)}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$E_?.forEach(r=>r.hostUpdate?.()),this.update(o)):this._$ET()}catch(r){throw e=!1,this._$ET(),r}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$E_?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach(o=>this._$EO(o,this[o])),this._$ET()}updated(e){}firstUpdated(e){}};se.elementStyles=[],se.shadowRootOptions={mode:"open"},se[so("elementProperties")]=new Map,se[so("finalized")]=new Map,Qa?.({ReactiveElement:se}),(Ro.reactiveElementVersions??=[]).push("2.0.2");var vr=globalThis,Bo=vr.trustedTypes,hi=Bo?Bo.createPolicy("lit-html",{createHTML:t=>t}):void 0,yr="$lit$",ae=`lit$${(Math.random()+"").slice(9)}$`,_r="?"+ae,Za=`<${_r}>`,Ce=document,lo=()=>Ce.createComment(""),no=t=>t===null||typeof t!="object"&&typeof t!="function",vi=Array.isArray,yi=t=>vi(t)||typeof t?.[Symbol.iterator]=="function",br=`[ 	
\f\r]`,ao=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ui=/-->/g,fi=/>/g,we=RegExp(`>|${br}(?:([^\\s"'>=/]+)(${br}*=${br}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mi=/'/g,gi=/"/g,_i=/^(?:script|style|textarea|title)$/i,xi=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),m=xi(1),wi=xi(2),ft=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),bi=new WeakMap,ke=Ce.createTreeWalker(Ce,129);function ki(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return hi!==void 0?hi.createHTML(e):e}var Ci=(t,e)=>{let o=t.length-1,r=[],i,a=e===2?"<svg>":"",n=ao;for(let d=0;d<o;d++){let c=t[d],p,g,h=-1,u=0;for(;u<c.length&&(n.lastIndex=u,g=n.exec(c),g!==null);)u=n.lastIndex,n===ao?g[1]==="!--"?n=ui:g[1]!==void 0?n=fi:g[2]!==void 0?(_i.test(g[2])&&(i=RegExp("</"+g[2],"g")),n=we):g[3]!==void 0&&(n=we):n===we?g[0]===">"?(n=i??ao,h=-1):g[1]===void 0?h=-2:(h=n.lastIndex-g[2].length,p=g[1],n=g[3]===void 0?we:g[3]==='"'?gi:mi):n===gi||n===mi?n=we:n===ui||n===fi?n=ao:(n=we,i=void 0);let f=n===we&&t[d+1].startsWith("/>")?" ":"";a+=n===ao?c+Za:h>=0?(r.push(p),c.slice(0,h)+yr+c.slice(h)+ae+f):c+ae+(h===-2?d:f)}return[ki(t,a+(t[o]||"<?>")+(e===2?"</svg>":"")),r]},co=class t{constructor({strings:e,_$litType$:o},r){let i;this.parts=[];let a=0,n=0,d=e.length-1,c=this.parts,[p,g]=Ci(e,o);if(this.el=t.createElement(p,r),ke.currentNode=this.el.content,o===2){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=ke.nextNode())!==null&&c.length<d;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(yr)){let u=g[n++],f=i.getAttribute(h).split(ae),b=/([.?@])?(.*)/.exec(u);c.push({type:1,index:a,name:b[2],strings:f,ctor:b[1]==="."?Ho:b[1]==="?"?No:b[1]==="@"?Uo:$e}),i.removeAttribute(h)}else h.startsWith(ae)&&(c.push({type:6,index:a}),i.removeAttribute(h));if(_i.test(i.tagName)){let h=i.textContent.split(ae),u=h.length-1;if(u>0){i.textContent=Bo?Bo.emptyScript:"";for(let f=0;f<u;f++)i.append(h[f],lo()),ke.nextNode(),c.push({type:2,index:++a});i.append(h[u],lo())}}}else if(i.nodeType===8)if(i.data===_r)c.push({type:2,index:a});else{let h=-1;for(;(h=i.data.indexOf(ae,h+1))!==-1;)c.push({type:7,index:a}),h+=ae.length-1}a++}}static createElement(e,o){let r=Ce.createElement("template");return r.innerHTML=e,r}};function Se(t,e,o=t,r){if(e===ft)return e;let i=r!==void 0?o._$Co?.[r]:o._$Cl,a=no(e)?void 0:e._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(t),i._$AT(t,o,r)),r!==void 0?(o._$Co??=[])[r]=i:o._$Cl=i),i!==void 0&&(e=Se(t,i._$AS(t,e.values),i,r)),e}var Vo=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:r}=this._$AD,i=(e?.creationScope??Ce).importNode(o,!0);ke.currentNode=i;let a=ke.nextNode(),n=0,d=0,c=r[0];for(;c!==void 0;){if(n===c.index){let p;c.type===2?p=new He(a,a.nextSibling,this,e):c.type===1?p=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(p=new qo(a,this,e)),this._$AV.push(p),c=r[++d]}n!==c?.index&&(a=ke.nextNode(),n++)}return ke.currentNode=Ce,i}p(e){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,o),o+=r.strings.length-2):r._$AI(e[o])),o++}},He=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,r,i){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=Se(this,e,o),no(e)?e===G||e==null||e===""?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==ft&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):yi(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==G&&no(this._$AH)?this._$AA.nextSibling.data=e:this.$(Ce.createTextNode(e)),this._$AH=e}g(e){let{values:o,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=co.createElement(ki(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(o);else{let a=new Vo(i,this),n=a.u(this.options);a.p(o),this.$(n),this._$AH=a}}_$AC(e){let o=bi.get(e.strings);return o===void 0&&bi.set(e.strings,o=new co(e)),o}T(e){vi(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,i=0;for(let a of e)i===o.length?o.push(r=new t(this.k(lo()),this.k(lo()),this,this.options)):r=o[i],r._$AI(a),i++;i<o.length&&(this._$AR(r&&r._$AB.nextSibling,i),o.length=i)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e&&e!==this._$AB;){let r=e.nextSibling;e.remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},$e=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,r,i,a){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=o,this._$AM=i,this.options=a,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=G}_$AI(e,o=this,r,i){let a=this.strings,n=!1;if(a===void 0)e=Se(this,e,o,0),n=!no(e)||e!==this._$AH&&e!==ft,n&&(this._$AH=e);else{let d=e,c,p;for(e=a[0],c=0;c<a.length-1;c++)p=Se(this,d[r+c],o,c),p===ft&&(p=this._$AH[c]),n||=!no(p)||p!==this._$AH[c],p===G?e=G:e!==G&&(e+=(p??"")+a[c+1]),this._$AH[c]=p}n&&!i&&this.O(e)}O(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ho=class extends $e{constructor(){super(...arguments),this.type=3}O(e){this.element[this.name]=e===G?void 0:e}},No=class extends $e{constructor(){super(...arguments),this.type=4}O(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}},Uo=class extends $e{constructor(e,o,r,i,a){super(e,o,r,i,a),this.type=5}_$AI(e,o=this){if((e=Se(this,e,o,0)??G)===ft)return;let r=this._$AH,i=e===G&&r!==G||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,a=e!==G&&(r===G||i);i&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},qo=class{constructor(e,o,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){Se(this,e)}},Si={j:yr,P:ae,A:_r,C:1,M:Ci,L:Vo,R:yi,V:Se,D:He,I:$e,H:No,N:Uo,U:Ho,B:qo},Ja=vr.litHtmlPolyfillSupport;Ja?.(co,He),(vr.litHtmlVersions??=[]).push("3.1.0");var $i=(t,e,o)=>{let r=o?.renderBefore??e,i=r._$litPart$;if(i===void 0){let a=o?.renderBefore??null;r._$litPart$=i=new He(e.insertBefore(lo(),a),a,void 0,o??{})}return i._$AI(t),i};var fe=class extends se{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=$i(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ft}};fe._$litElement$=!0,fe.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:fe});var tl=globalThis.litElementPolyfillSupport;tl?.({LitElement:fe});(globalThis.litElementVersions??=[]).push("4.0.2");var zi=_`
  :host(:not(:focus-within)) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`;var C=_`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;var el={attribute:!0,type:String,converter:ue,reflect:!1,hasChanged:Fo},ol=(t=el,e,o)=>{let{kind:r,metadata:i}=o,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),a.set(o.name,t),r==="accessor"){let{name:n}=o;return{set(d){let c=e.get.call(this);e.set.call(this,d),this.requestUpdate(n,c,t)},init(d){return d!==void 0&&this.C(n,void 0,t),d}}}if(r==="setter"){let{name:n}=o;return function(d){let c=this[n];e.call(this,d),this.requestUpdate(n,c,t)}}throw Error("Unsupported decorator location: "+r)};function l(t){return(e,o)=>typeof o=="object"?ol(t,e,o):((r,i,a)=>{let n=i.hasOwnProperty(a);return i.constructor.createProperty(a,n?{...r,wrapped:!0}:r),n?Object.getOwnPropertyDescriptor(i,a):void 0})(t,e,o)}function E(t){return l({...t,state:!0,attribute:!1})}function Ne(t){return(e,o)=>{let r=typeof e=="function"?e:e[o];Object.assign(r,t)}}var me=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);function k(t,e){return(o,r,i)=>{let a=n=>n.renderRoot?.querySelector(t)??null;if(e){let{get:n,set:d}=typeof r=="object"?o:i??(()=>{let c=Symbol();return{get(){return this[c]},set(p){this[c]=p}}})();return me(o,r,{get(){let c=n.call(this);return c===void 0&&(c=a(this),(c!==null||this.hasUpdated)&&d.call(this,c)),c}})}return me(o,r,{get(){return a(this)}})}}function Ai(t){return(e,o)=>me(e,o,{async get(){return await this.updateComplete,this.renderRoot?.querySelector(t)??null}})}var v=class extends fe{constructor(){super(),Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){let o=new CustomEvent(t,yt({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(o),o}static define(t,e=this,o={}){let r=customElements.get(t);if(!r){customElements.define(t,class extends e{},o);return}let i=" (unknown version)",a=i;"version"in e&&e.version&&(i=" v"+e.version),"version"in r&&r.version&&(a=" v"+r.version),!(i&&a&&i===a)&&console.warn(`Attempted to register <${t}>${i}, but <${t}>${a} has already been registered.`)}};v.version="2.15.0";v.dependencies={};s([l()],v.prototype,"dir",2);s([l()],v.prototype,"lang",2);var po=class extends v{render(){return m` <slot></slot> `}};po.styles=[C,zi];po.define("sl-visually-hidden");var Ei=_`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`;var Ti=_`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;var Zt=Math.min,wt=Math.max,uo=Math.round,fo=Math.floor,le=t=>({x:t,y:t}),rl={left:"right",right:"left",bottom:"top",top:"bottom"},il={start:"end",end:"start"};function jo(t,e,o){return wt(t,Zt(e,o))}function ze(t,e){return typeof t=="function"?t(e):t}function ne(t){return t.split("-")[0]}function Ae(t){return t.split("-")[1]}function xr(t){return t==="x"?"y":"x"}function Ko(t){return t==="y"?"height":"width"}function Ue(t){return["top","bottom"].includes(ne(t))?"y":"x"}function Xo(t){return xr(Ue(t))}function Li(t,e,o){o===void 0&&(o=!1);let r=Ae(t),i=Xo(t),a=Ko(i),n=i==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[a]>e.floating[a]&&(n=ho(n)),[n,ho(n)]}function Ii(t){let e=ho(t);return[Wo(t),e,Wo(e)]}function Wo(t){return t.replace(/start|end/g,e=>il[e])}function sl(t,e,o){let r=["left","right"],i=["right","left"],a=["top","bottom"],n=["bottom","top"];switch(t){case"top":case"bottom":return o?e?i:r:e?r:i;case"left":case"right":return e?a:n;default:return[]}}function Di(t,e,o,r){let i=Ae(t),a=sl(ne(t),o==="start",r);return i&&(a=a.map(n=>n+"-"+i),e&&(a=a.concat(a.map(Wo)))),a}function ho(t){return t.replace(/left|right|bottom|top/g,e=>rl[e])}function al(t){return{top:0,right:0,bottom:0,left:0,...t}}function wr(t){return typeof t!="number"?al(t):{top:t,right:t,bottom:t,left:t}}function Ee(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}function Oi(t,e,o){let{reference:r,floating:i}=t,a=Ue(e),n=Xo(e),d=Ko(n),c=ne(e),p=a==="y",g=r.x+r.width/2-i.width/2,h=r.y+r.height/2-i.height/2,u=r[d]/2-i[d]/2,f;switch(c){case"top":f={x:g,y:r.y-i.height};break;case"bottom":f={x:g,y:r.y+r.height};break;case"right":f={x:r.x+r.width,y:h};break;case"left":f={x:r.x-i.width,y:h};break;default:f={x:r.x,y:r.y}}switch(Ae(e)){case"start":f[n]-=u*(o&&p?-1:1);break;case"end":f[n]+=u*(o&&p?-1:1);break}return f}var Pi=async(t,e,o)=>{let{placement:r="bottom",strategy:i="absolute",middleware:a=[],platform:n}=o,d=a.filter(Boolean),c=await(n.isRTL==null?void 0:n.isRTL(e)),p=await n.getElementRects({reference:t,floating:e,strategy:i}),{x:g,y:h}=Oi(p,r,c),u=r,f={},b=0;for(let w=0;w<d.length;w++){let{name:L,fn:O}=d[w],{x:$,y:T,data:x,reset:S}=await O({x:g,y:h,initialPlacement:r,placement:u,strategy:i,middlewareData:f,rects:p,platform:n,elements:{reference:t,floating:e}});if(g=$??g,h=T??h,f={...f,[L]:{...f[L],...x}},S&&b<=50){b++,typeof S=="object"&&(S.placement&&(u=S.placement),S.rects&&(p=S.rects===!0?await n.getElementRects({reference:t,floating:e,strategy:i}):S.rects),{x:g,y:h}=Oi(p,u,c)),w=-1;continue}}return{x:g,y:h,placement:u,strategy:i,middlewareData:f}};async function Yo(t,e){var o;e===void 0&&(e={});let{x:r,y:i,platform:a,rects:n,elements:d,strategy:c}=t,{boundary:p="clippingAncestors",rootBoundary:g="viewport",elementContext:h="floating",altBoundary:u=!1,padding:f=0}=ze(e,t),b=wr(f),L=d[u?h==="floating"?"reference":"floating":h],O=Ee(await a.getClippingRect({element:(o=await(a.isElement==null?void 0:a.isElement(L)))==null||o?L:L.contextElement||await(a.getDocumentElement==null?void 0:a.getDocumentElement(d.floating)),boundary:p,rootBoundary:g,strategy:c})),$=h==="floating"?{...n.floating,x:r,y:i}:n.reference,T=await(a.getOffsetParent==null?void 0:a.getOffsetParent(d.floating)),x=await(a.isElement==null?void 0:a.isElement(T))?await(a.getScale==null?void 0:a.getScale(T))||{x:1,y:1}:{x:1,y:1},S=Ee(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({rect:$,offsetParent:T,strategy:c}):$);return{top:(O.top-S.top+b.top)/x.y,bottom:(S.bottom-O.bottom+b.bottom)/x.y,left:(O.left-S.left+b.left)/x.x,right:(S.right-O.right+b.right)/x.x}}var kr=t=>({name:"arrow",options:t,async fn(e){let{x:o,y:r,placement:i,rects:a,platform:n,elements:d,middlewareData:c}=e,{element:p,padding:g=0}=ze(t,e)||{};if(p==null)return{};let h=wr(g),u={x:o,y:r},f=Xo(i),b=Ko(f),w=await n.getDimensions(p),L=f==="y",O=L?"top":"left",$=L?"bottom":"right",T=L?"clientHeight":"clientWidth",x=a.reference[b]+a.reference[f]-u[f]-a.floating[b],S=u[f]-a.reference[f],I=await(n.getOffsetParent==null?void 0:n.getOffsetParent(p)),B=I?I[T]:0;(!B||!await(n.isElement==null?void 0:n.isElement(I)))&&(B=d.floating[T]||a.floating[b]);let H=x/2-S/2,M=B/2-w[b]/2-1,P=Zt(h[O],M),vt=Zt(h[$],M),rt=P,It=B-w[b]-vt,ht=B/2-w[b]/2+H,xt=jo(rt,ht,It),Nt=!c.arrow&&Ae(i)!=null&&ht!=xt&&a.reference[b]/2-(ht<rt?P:vt)-w[b]/2<0,re=Nt?ht<rt?ht-rt:ht-It:0;return{[f]:u[f]+re,data:{[f]:xt,centerOffset:ht-xt-re,...Nt&&{alignmentOffset:re}},reset:Nt}}});var Cr=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o,r;let{placement:i,middlewareData:a,rects:n,initialPlacement:d,platform:c,elements:p}=e,{mainAxis:g=!0,crossAxis:h=!0,fallbackPlacements:u,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:w=!0,...L}=ze(t,e);if((o=a.arrow)!=null&&o.alignmentOffset)return{};let O=ne(i),$=ne(d)===d,T=await(c.isRTL==null?void 0:c.isRTL(p.floating)),x=u||($||!w?[ho(d)]:Ii(d));!u&&b!=="none"&&x.push(...Di(d,w,b,T));let S=[d,...x],I=await Yo(e,L),B=[],H=((r=a.flip)==null?void 0:r.overflows)||[];if(g&&B.push(I[O]),h){let rt=Li(i,n,T);B.push(I[rt[0]],I[rt[1]])}if(H=[...H,{placement:i,overflows:B}],!B.every(rt=>rt<=0)){var M,P;let rt=(((M=a.flip)==null?void 0:M.index)||0)+1,It=S[rt];if(It)return{data:{index:rt,overflows:H},reset:{placement:It}};let ht=(P=H.filter(xt=>xt.overflows[0]<=0).sort((xt,Nt)=>xt.overflows[1]-Nt.overflows[1])[0])==null?void 0:P.placement;if(!ht)switch(f){case"bestFit":{var vt;let xt=(vt=H.map(Nt=>[Nt.placement,Nt.overflows.filter(re=>re>0).reduce((re,Pa)=>re+Pa,0)]).sort((Nt,re)=>Nt[1]-re[1])[0])==null?void 0:vt[0];xt&&(ht=xt);break}case"initialPlacement":ht=d;break}if(i!==ht)return{reset:{placement:ht}}}return{}}}};async function ll(t,e){let{placement:o,platform:r,elements:i}=t,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),n=ne(o),d=Ae(o),c=Ue(o)==="y",p=["left","top"].includes(n)?-1:1,g=a&&c?-1:1,h=ze(e,t),{mainAxis:u,crossAxis:f,alignmentAxis:b}=typeof h=="number"?{mainAxis:h,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...h};return d&&typeof b=="number"&&(f=d==="end"?b*-1:b),c?{x:f*g,y:u*p}:{x:u*p,y:f*g}}var Sr=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){let{x:o,y:r}=e,i=await ll(e,t);return{x:o+i.x,y:r+i.y,data:i}}}},$r=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:o,y:r,placement:i}=e,{mainAxis:a=!0,crossAxis:n=!1,limiter:d={fn:L=>{let{x:O,y:$}=L;return{x:O,y:$}}},...c}=ze(t,e),p={x:o,y:r},g=await Yo(e,c),h=Ue(ne(i)),u=xr(h),f=p[u],b=p[h];if(a){let L=u==="y"?"top":"left",O=u==="y"?"bottom":"right",$=f+g[L],T=f-g[O];f=jo($,f,T)}if(n){let L=h==="y"?"top":"left",O=h==="y"?"bottom":"right",$=b+g[L],T=b-g[O];b=jo($,b,T)}let w=d.fn({...e,[u]:f,[h]:b});return{...w,data:{x:w.x-o,y:w.y-r}}}}};var Go=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){let{placement:o,rects:r,platform:i,elements:a}=e,{apply:n=()=>{},...d}=ze(t,e),c=await Yo(e,d),p=ne(o),g=Ae(o),h=Ue(o)==="y",{width:u,height:f}=r.floating,b,w;p==="top"||p==="bottom"?(b=p,w=g===(await(i.isRTL==null?void 0:i.isRTL(a.floating))?"start":"end")?"left":"right"):(w=p,b=g==="end"?"top":"bottom");let L=f-c[b],O=u-c[w],$=!e.middlewareData.shift,T=L,x=O;if(h){let I=u-c.left-c.right;x=g||$?Zt(O,I):I}else{let I=f-c.top-c.bottom;T=g||$?Zt(L,I):I}if($&&!g){let I=wt(c.left,0),B=wt(c.right,0),H=wt(c.top,0),M=wt(c.bottom,0);h?x=u-2*(I!==0||B!==0?I+B:wt(c.left,c.right)):T=f-2*(H!==0||M!==0?H+M:wt(c.top,c.bottom))}await n({...e,availableWidth:x,availableHeight:T});let S=await i.getDimensions(a.floating);return u!==S.width||f!==S.height?{reset:{rects:!0}}:{}}}};function ce(t){return Ri(t)?(t.nodeName||"").toLowerCase():"#document"}function kt(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function Jt(t){var e;return(e=(Ri(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Ri(t){return t instanceof Node||t instanceof kt(t).Node}function te(t){return t instanceof Element||t instanceof kt(t).Element}function Ut(t){return t instanceof HTMLElement||t instanceof kt(t).HTMLElement}function Mi(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof kt(t).ShadowRoot}function We(t){let{overflow:e,overflowX:o,overflowY:r,display:i}=Dt(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+o)&&!["inline","contents"].includes(i)}function Fi(t){return["table","td","th"].includes(ce(t))}function Qo(t){let e=Zo(),o=Dt(t);return o.transform!=="none"||o.perspective!=="none"||(o.containerType?o.containerType!=="normal":!1)||!e&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!e&&(o.filter?o.filter!=="none":!1)||["transform","perspective","filter"].some(r=>(o.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(o.contain||"").includes(r))}function Bi(t){let e=Te(t);for(;Ut(e)&&!mo(e);){if(Qo(e))return e;e=Te(e)}return null}function Zo(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function mo(t){return["html","body","#document"].includes(ce(t))}function Dt(t){return kt(t).getComputedStyle(t)}function go(t){return te(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function Te(t){if(ce(t)==="html")return t;let e=t.assignedSlot||t.parentNode||Mi(t)&&t.host||Jt(t);return Mi(e)?e.host:e}function Vi(t){let e=Te(t);return mo(e)?t.ownerDocument?t.ownerDocument.body:t.body:Ut(e)&&We(e)?e:Vi(e)}function qe(t,e,o){var r;e===void 0&&(e=[]),o===void 0&&(o=!0);let i=Vi(t),a=i===((r=t.ownerDocument)==null?void 0:r.body),n=kt(i);return a?e.concat(n,n.visualViewport||[],We(i)?i:[],n.frameElement&&o?qe(n.frameElement):[]):e.concat(i,qe(i,[],o))}function Ui(t){let e=Dt(t),o=parseFloat(e.width)||0,r=parseFloat(e.height)||0,i=Ut(t),a=i?t.offsetWidth:o,n=i?t.offsetHeight:r,d=uo(o)!==a||uo(r)!==n;return d&&(o=a,r=n),{width:o,height:r,$:d}}function zr(t){return te(t)?t:t.contextElement}function je(t){let e=zr(t);if(!Ut(e))return le(1);let o=e.getBoundingClientRect(),{width:r,height:i,$:a}=Ui(e),n=(a?uo(o.width):o.width)/r,d=(a?uo(o.height):o.height)/i;return(!n||!Number.isFinite(n))&&(n=1),(!d||!Number.isFinite(d))&&(d=1),{x:n,y:d}}var nl=le(0);function qi(t){let e=kt(t);return!Zo()||!e.visualViewport?nl:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function cl(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==kt(t)?!1:e}function Le(t,e,o,r){e===void 0&&(e=!1),o===void 0&&(o=!1);let i=t.getBoundingClientRect(),a=zr(t),n=le(1);e&&(r?te(r)&&(n=je(r)):n=je(t));let d=cl(a,o,r)?qi(a):le(0),c=(i.left+d.x)/n.x,p=(i.top+d.y)/n.y,g=i.width/n.x,h=i.height/n.y;if(a){let u=kt(a),f=r&&te(r)?kt(r):r,b=u.frameElement;for(;b&&r&&f!==u;){let w=je(b),L=b.getBoundingClientRect(),O=Dt(b),$=L.left+(b.clientLeft+parseFloat(O.paddingLeft))*w.x,T=L.top+(b.clientTop+parseFloat(O.paddingTop))*w.y;c*=w.x,p*=w.y,g*=w.x,h*=w.y,c+=$,p+=T,b=kt(b).frameElement}}return Ee({width:g,height:h,x:c,y:p})}function dl(t){let{rect:e,offsetParent:o,strategy:r}=t,i=Ut(o),a=Jt(o);if(o===a)return e;let n={scrollLeft:0,scrollTop:0},d=le(1),c=le(0);if((i||!i&&r!=="fixed")&&((ce(o)!=="body"||We(a))&&(n=go(o)),Ut(o))){let p=Le(o);d=je(o),c.x=p.x+o.clientLeft,c.y=p.y+o.clientTop}return{width:e.width*d.x,height:e.height*d.y,x:e.x*d.x-n.scrollLeft*d.x+c.x,y:e.y*d.y-n.scrollTop*d.y+c.y}}function pl(t){return Array.from(t.getClientRects())}function Wi(t){return Le(Jt(t)).left+go(t).scrollLeft}function hl(t){let e=Jt(t),o=go(t),r=t.ownerDocument.body,i=wt(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),a=wt(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight),n=-o.scrollLeft+Wi(t),d=-o.scrollTop;return Dt(r).direction==="rtl"&&(n+=wt(e.clientWidth,r.clientWidth)-i),{width:i,height:a,x:n,y:d}}function ul(t,e){let o=kt(t),r=Jt(t),i=o.visualViewport,a=r.clientWidth,n=r.clientHeight,d=0,c=0;if(i){a=i.width,n=i.height;let p=Zo();(!p||p&&e==="fixed")&&(d=i.offsetLeft,c=i.offsetTop)}return{width:a,height:n,x:d,y:c}}function fl(t,e){let o=Le(t,!0,e==="fixed"),r=o.top+t.clientTop,i=o.left+t.clientLeft,a=Ut(t)?je(t):le(1),n=t.clientWidth*a.x,d=t.clientHeight*a.y,c=i*a.x,p=r*a.y;return{width:n,height:d,x:c,y:p}}function Hi(t,e,o){let r;if(e==="viewport")r=ul(t,o);else if(e==="document")r=hl(Jt(t));else if(te(e))r=fl(e,o);else{let i=qi(t);r={...e,x:e.x-i.x,y:e.y-i.y}}return Ee(r)}function ji(t,e){let o=Te(t);return o===e||!te(o)||mo(o)?!1:Dt(o).position==="fixed"||ji(o,e)}function ml(t,e){let o=e.get(t);if(o)return o;let r=qe(t,[],!1).filter(d=>te(d)&&ce(d)!=="body"),i=null,a=Dt(t).position==="fixed",n=a?Te(t):t;for(;te(n)&&!mo(n);){let d=Dt(n),c=Qo(n);!c&&d.position==="fixed"&&(i=null),(a?!c&&!i:!c&&d.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||We(n)&&!c&&ji(t,n))?r=r.filter(g=>g!==n):i=d,n=Te(n)}return e.set(t,r),r}function gl(t){let{element:e,boundary:o,rootBoundary:r,strategy:i}=t,n=[...o==="clippingAncestors"?ml(e,this._c):[].concat(o),r],d=n[0],c=n.reduce((p,g)=>{let h=Hi(e,g,i);return p.top=wt(h.top,p.top),p.right=Zt(h.right,p.right),p.bottom=Zt(h.bottom,p.bottom),p.left=wt(h.left,p.left),p},Hi(e,d,i));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function bl(t){return Ui(t)}function vl(t,e,o){let r=Ut(e),i=Jt(e),a=o==="fixed",n=Le(t,!0,a,e),d={scrollLeft:0,scrollTop:0},c=le(0);if(r||!r&&!a)if((ce(e)!=="body"||We(i))&&(d=go(e)),r){let p=Le(e,!0,a,e);c.x=p.x+e.clientLeft,c.y=p.y+e.clientTop}else i&&(c.x=Wi(i));return{x:n.left+d.scrollLeft-c.x,y:n.top+d.scrollTop-c.y,width:n.width,height:n.height}}function Ni(t,e){return!Ut(t)||Dt(t).position==="fixed"?null:e?e(t):t.offsetParent}function Ki(t,e){let o=kt(t);if(!Ut(t))return o;let r=Ni(t,e);for(;r&&Fi(r)&&Dt(r).position==="static";)r=Ni(r,e);return r&&(ce(r)==="html"||ce(r)==="body"&&Dt(r).position==="static"&&!Qo(r))?o:r||Bi(t)||o}var yl=async function(t){let{reference:e,floating:o,strategy:r}=t,i=this.getOffsetParent||Ki,a=this.getDimensions;return{reference:vl(e,await i(o),r),floating:{x:0,y:0,...await a(o)}}};function _l(t){return Dt(t).direction==="rtl"}var bo={convertOffsetParentRelativeRectToViewportRelativeRect:dl,getDocumentElement:Jt,getClippingRect:gl,getOffsetParent:Ki,getElementRects:yl,getClientRects:pl,getDimensions:bl,getScale:je,isElement:te,isRTL:_l};function xl(t,e){let o=null,r,i=Jt(t);function a(){clearTimeout(r),o&&o.disconnect(),o=null}function n(d,c){d===void 0&&(d=!1),c===void 0&&(c=1),a();let{left:p,top:g,width:h,height:u}=t.getBoundingClientRect();if(d||e(),!h||!u)return;let f=fo(g),b=fo(i.clientWidth-(p+h)),w=fo(i.clientHeight-(g+u)),L=fo(p),$={rootMargin:-f+"px "+-b+"px "+-w+"px "+-L+"px",threshold:wt(0,Zt(1,c))||1},T=!0;function x(S){let I=S[0].intersectionRatio;if(I!==c){if(!T)return n();I?n(!1,I):r=setTimeout(()=>{n(!1,1e-7)},100)}T=!1}try{o=new IntersectionObserver(x,{...$,root:i.ownerDocument})}catch{o=new IntersectionObserver(x,$)}o.observe(t)}return n(!0),a}function Xi(t,e,o,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:d=typeof IntersectionObserver=="function",animationFrame:c=!1}=r,p=zr(t),g=i||a?[...p?qe(p):[],...qe(e)]:[];g.forEach(O=>{i&&O.addEventListener("scroll",o,{passive:!0}),a&&O.addEventListener("resize",o)});let h=p&&d?xl(p,o):null,u=-1,f=null;n&&(f=new ResizeObserver(O=>{let[$]=O;$&&$.target===p&&f&&(f.unobserve(e),cancelAnimationFrame(u),u=requestAnimationFrame(()=>{f&&f.observe(e)})),o()}),p&&!c&&f.observe(p),f.observe(e));let b,w=c?Le(t):null;c&&L();function L(){let O=Le(t);w&&(O.x!==w.x||O.y!==w.y||O.width!==w.width||O.height!==w.height)&&o(),w=O,b=requestAnimationFrame(L)}return o(),()=>{g.forEach(O=>{i&&O.removeEventListener("scroll",o),a&&O.removeEventListener("resize",o)}),h&&h(),f&&f.disconnect(),f=null,c&&cancelAnimationFrame(b)}}var Yi=(t,e,o)=>{let r=new Map,i={platform:bo,...o},a={...i.platform,_c:r};return Pi(t,e,{...i,platform:a})};var _t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},qt=t=>(...e)=>({_$litDirective$:t,values:e}),Ot=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,r){this._$Ct=e,this._$AM=o,this._$Ci=r}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};var z=qt(class extends Ot{constructor(t){if(super(t),t.type!==_t.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.it===void 0){this.it=new Set,t.strings!==void 0&&(this.st=new Set(t.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in e)e[r]&&!this.st?.has(r)&&this.it.add(r);return this.render(e)}let o=t.element.classList;for(let r of this.it)r in e||(o.remove(r),this.it.delete(r));for(let r in e){let i=!!e[r];i===this.it.has(r)||this.st?.has(r)||(i?(o.add(r),this.it.add(r)):(o.remove(r),this.it.delete(r)))}return ft}});function Gi(t){return wl(t)}function Ar(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function wl(t){for(let e=t;e;e=Ar(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Ar(t);e;e=Ar(e)){if(!(e instanceof Element))continue;let o=getComputedStyle(e);if(o.display!=="contents"&&(o.position!=="static"||o.filter!=="none"||e.tagName==="BODY"))return e}return null}function kl(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var N=class extends v{constructor(){super(...arguments),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),r=0,i=0,a=0,n=0,d=0,c=0,p=0,g=0;o?t.top<e.top?(r=t.left,i=t.bottom,a=t.right,n=t.bottom,d=e.left,c=e.top,p=e.right,g=e.top):(r=e.left,i=e.bottom,a=e.right,n=e.bottom,d=t.left,c=t.top,p=t.right,g=t.top):t.left<e.left?(r=t.right,i=t.top,a=e.left,n=e.top,d=t.right,c=t.bottom,p=e.left,g=e.bottom):(r=e.right,i=e.top,a=t.left,n=t.top,d=e.right,c=e.bottom,p=t.left,g=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${a}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${d}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${g}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||kl(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&(this.cleanup=Xi(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;let t=[Sr({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Go({apply:({rects:o})=>{let r=this.sync==="width"||this.sync==="both",i=this.sync==="height"||this.sync==="both";this.popup.style.width=r?`${o.reference.width}px`:"",this.popup.style.height=i?`${o.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Cr({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push($r({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Go({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:o,availableHeight:r})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${r}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${o}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(kr({element:this.arrowEl,padding:this.arrowPadding}));let e=this.strategy==="absolute"?o=>bo.getOffsetParent(o,Gi):bo.getOffsetParent;Yi(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:ie(yt({},bo),{getOffsetParent:e})}).then(({x:o,y:r,middlewareData:i,placement:a})=>{let n=getComputedStyle(this).direction==="rtl",d={top:"bottom",right:"left",bottom:"top",left:"right"}[a.split("-")[0]];if(this.setAttribute("data-current-placement",a),Object.assign(this.popup.style,{left:`${o}px`,top:`${r}px`}),this.arrow){let c=i.arrow.x,p=i.arrow.y,g="",h="",u="",f="";if(this.arrowPlacement==="start"){let b=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";g=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",h=n?b:"",f=n?"":b}else if(this.arrowPlacement==="end"){let b=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=n?"":b,f=n?b:"",u=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(f=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":"",g=typeof p=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(f=typeof c=="number"?`${c}px`:"",g=typeof p=="number"?`${p}px`:"");Object.assign(this.arrowEl.style,{top:g,right:h,bottom:u,left:f,[d]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return m`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${z({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${z({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?m`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};N.styles=[C,Ti];s([k(".popup")],N.prototype,"popup",2);s([k(".popup__arrow")],N.prototype,"arrowEl",2);s([l()],N.prototype,"anchor",2);s([l({type:Boolean,reflect:!0})],N.prototype,"active",2);s([l({reflect:!0})],N.prototype,"placement",2);s([l({reflect:!0})],N.prototype,"strategy",2);s([l({type:Number})],N.prototype,"distance",2);s([l({type:Number})],N.prototype,"skidding",2);s([l({type:Boolean})],N.prototype,"arrow",2);s([l({attribute:"arrow-placement"})],N.prototype,"arrowPlacement",2);s([l({attribute:"arrow-padding",type:Number})],N.prototype,"arrowPadding",2);s([l({type:Boolean})],N.prototype,"flip",2);s([l({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],N.prototype,"flipFallbackPlacements",2);s([l({attribute:"flip-fallback-strategy"})],N.prototype,"flipFallbackStrategy",2);s([l({type:Object})],N.prototype,"flipBoundary",2);s([l({attribute:"flip-padding",type:Number})],N.prototype,"flipPadding",2);s([l({type:Boolean})],N.prototype,"shift",2);s([l({type:Object})],N.prototype,"shiftBoundary",2);s([l({attribute:"shift-padding",type:Number})],N.prototype,"shiftPadding",2);s([l({attribute:"auto-size"})],N.prototype,"autoSize",2);s([l()],N.prototype,"sync",2);s([l({type:Object})],N.prototype,"autoSizeBoundary",2);s([l({attribute:"auto-size-padding",type:Number})],N.prototype,"autoSizePadding",2);s([l({attribute:"hover-bridge",type:Boolean})],N.prototype,"hoverBridge",2);var Zi=new Map,Cl=new WeakMap;function Sl(t){return t??{keyframes:[],options:{duration:0}}}function Qi(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function V(t,e){Zi.set(t,Sl(e))}function W(t,e,o){let r=Cl.get(t);if(r?.[e])return Qi(r[e],o.dir);let i=Zi.get(e);return i?Qi(i,o.dir):{keyframes:[],options:{duration:0}}}function et(t,e){return new Promise(o=>{function r(i){i.target===t&&(t.removeEventListener(e,r),o())}t.addEventListener(e,r)})}function X(t,e,o){return new Promise(r=>{if(o?.duration===1/0)throw new Error("Promise-based animations must be finite.");let i=t.animate(e,ie(yt({},o),{duration:Jo()?0:o.duration}));i.addEventListener("cancel",r,{once:!0}),i.addEventListener("finish",r,{once:!0})})}function Er(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?parseFloat(t)*1e3:parseFloat(t)}function Jo(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Q(t){return Promise.all(t.getAnimations().map(e=>new Promise(o=>{e.cancel(),requestAnimationFrame(o)})))}function Ke(t,e){return t.map(o=>ie(yt({},o),{height:o.height==="auto"?`${e}px`:o.height}))}var Tr=new Set,$l=new MutationObserver(es),Xe=new Map,Ji=document.documentElement.dir||"ltr",ts=document.documentElement.lang||navigator.language,Ie;$l.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]});function vo(...t){t.map(e=>{let o=e.$code.toLowerCase();Xe.has(o)?Xe.set(o,Object.assign(Object.assign({},Xe.get(o)),e)):Xe.set(o,e),Ie||(Ie=e)}),es()}function es(){Ji=document.documentElement.dir||"ltr",ts=document.documentElement.lang||navigator.language,[...Tr.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}var tr=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Tr.add(this.host)}hostDisconnected(){Tr.delete(this.host)}dir(){return`${this.host.dir||Ji}`.toLowerCase()}lang(){return`${this.host.lang||ts}`.toLowerCase()}getTranslationData(e){var o,r;let i=new Intl.Locale(e.replace(/_/g,"-")),a=i?.language.toLowerCase(),n=(r=(o=i?.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&r!==void 0?r:"",d=Xe.get(`${a}-${n}`),c=Xe.get(a);return{locale:i,language:a,region:n,primary:d,secondary:c}}exists(e,o){var r;let{primary:i,secondary:a}=this.getTranslationData((r=o.lang)!==null&&r!==void 0?r:this.lang());return o=Object.assign({includeFallback:!1},o),!!(i&&i[e]||a&&a[e]||o.includeFallback&&Ie&&Ie[e])}term(e,...o){let{primary:r,secondary:i}=this.getTranslationData(this.lang()),a;if(r&&r[e])a=r[e];else if(i&&i[e])a=i[e];else if(Ie&&Ie[e])a=Ie[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof a=="function"?a(...o):a}date(e,o){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),o).format(e)}number(e,o){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),o).format(e)}relativeTime(e,o,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(e,o)}};var os={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};vo(os);var rs=os;var D=class extends tr{};vo(rs);function y(t,e){let o=yt({waitUntilFirstUpdate:!1},e);return(r,i)=>{let{update:a}=r,n=Array.isArray(t)?t:[t];r.update=function(d){n.forEach(c=>{let p=c;if(d.has(p)){let g=d.get(p),h=this[p];g!==h&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[i](g,h)}}),a.call(this,d)}}}var at=class extends v{constructor(){super(),this.localize=new D(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){let t=Er(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let t=Er(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await Q(this.body),this.body.hidden=!1,this.popup.active=!0;let{keyframes:o,options:r}=W(this,"tooltip.show",{dir:this.localize.dir()});await X(this.popup.popup,o,r),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await Q(this.body);let{keyframes:o,options:r}=W(this,"tooltip.hide",{dir:this.localize.dir()});await X(this.popup.popup,o,r),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,et(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,et(this,"sl-after-hide")}render(){return m`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${z({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};at.styles=[C,Ei];at.dependencies={"sl-popup":N};s([k("slot:not([name])")],at.prototype,"defaultSlot",2);s([k(".tooltip__body")],at.prototype,"body",2);s([k("sl-popup")],at.prototype,"popup",2);s([l()],at.prototype,"content",2);s([l()],at.prototype,"placement",2);s([l({type:Boolean,reflect:!0})],at.prototype,"disabled",2);s([l({type:Number})],at.prototype,"distance",2);s([l({type:Boolean,reflect:!0})],at.prototype,"open",2);s([l({type:Number})],at.prototype,"skidding",2);s([l()],at.prototype,"trigger",2);s([l({type:Boolean})],at.prototype,"hoist",2);s([y("open",{waitUntilFirstUpdate:!0})],at.prototype,"handleOpenChange",1);s([y(["content","distance","hoist","placement","skidding"])],at.prototype,"handleOptionsChange",1);s([y("disabled")],at.prototype,"handleDisabledChange",1);V("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});V("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});at.define("sl-tooltip");var is=_`
  :host {
    /*
     * These are actually used by tree item, but we define them here so they can more easily be set and all tree items
     * stay consistent.
     */
    --indent-guide-color: var(--sl-color-neutral-200);
    --indent-guide-offset: 0;
    --indent-guide-style: solid;
    --indent-guide-width: 0;
    --indent-size: var(--sl-spacing-large);

    display: block;

    /*
     * Tree item indentation uses the "em" unit to increment its width on each level, so setting the font size to zero
     * here removes the indentation for all the nodes on the first level.
     */
    font-size: 0;
  }
`;var ss=_`
  :host {
    display: block;
    outline: 0;
    z-index: 0;
  }

  :host(:focus) {
    outline: none;
  }

  slot:not([name])::slotted(sl-icon) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .tree-item {
    position: relative;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    color: var(--sl-color-neutral-700);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  .tree-item__checkbox {
    pointer-events: none;
  }

  .tree-item__expand-button,
  .tree-item__checkbox,
  .tree-item__label {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-dense);
    letter-spacing: var(--sl-letter-spacing-normal);
  }

  .tree-item__checkbox::part(base) {
    display: flex;
    align-items: center;
  }

  .tree-item__indentation {
    display: block;
    width: 1em;
    flex-shrink: 0;
  }

  .tree-item__expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-x-small);
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    cursor: pointer;
  }

  .tree-item__expand-button {
    transition: var(--sl-transition-medium) rotate ease;
  }

  .tree-item--expanded .tree-item__expand-button {
    rotate: 90deg;
  }

  .tree-item--expanded.tree-item--rtl .tree-item__expand-button {
    rotate: -90deg;
  }

  .tree-item--expanded slot[name='expand-icon'],
  .tree-item:not(.tree-item--expanded) slot[name='collapse-icon'] {
    display: none;
  }

  .tree-item:not(.tree-item--has-expand-button) .tree-item__expand-icon-slot {
    display: none;
  }

  .tree-item__expand-button--visible {
    cursor: pointer;
  }

  .tree-item__item {
    display: flex;
    align-items: center;
    border-inline-start: solid 3px transparent;
  }

  .tree-item--disabled .tree-item__item {
    opacity: 0.5;
    outline: none;
    cursor: not-allowed;
  }

  :host(:focus-visible) .tree-item__item {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
    z-index: 2;
  }

  :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
    background-color: var(--sl-color-neutral-100);
    border-inline-start-color: var(--sl-color-primary-600);
  }

  :host(:not([aria-disabled='true'])) .tree-item__expand-button {
    color: var(--sl-color-neutral-600);
  }

  .tree-item__label {
    display: flex;
    align-items: center;
    transition: var(--sl-transition-fast) color;
  }

  .tree-item__children {
    display: block;
    font-size: calc(1em + var(--indent-size, var(--sl-spacing-medium)));
  }

  /* Indentation lines */
  .tree-item__children {
    position: relative;
  }

  .tree-item__children::before {
    content: '';
    position: absolute;
    top: var(--indent-guide-offset);
    bottom: var(--indent-guide-offset);
    left: calc(1em - (var(--indent-guide-width) / 2) - 1px);
    border-inline-end: var(--indent-guide-width) var(--indent-guide-style) var(--indent-guide-color);
    z-index: 1;
  }

  .tree-item--rtl .tree-item__children::before {
    left: auto;
    right: 1em;
  }

  @media (forced-colors: active) {
    :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
      outline: dashed 1px SelectedItem;
    }
  }
`;var as=_`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`;var Ct=(t="value")=>(e,o)=>{let r=e.constructor,i=r.prototype.attributeChangedCallback;r.prototype.attributeChangedCallback=function(a,n,d){var c;let p=r.getPropertyOptions(t),g=typeof p.attribute=="string"?p.attribute:t;if(a===g){let h=p.converter||ue,f=(typeof h=="function"?h:(c=h?.fromAttribute)!=null?c:ue.fromAttribute)(d,p.type);this[t]!==f&&(this[o]=f)}i.call(this,a,n,d)}};var St=_`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;var Y=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=o=>{let r=o.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===t.ELEMENT_NODE){let e=t;if(e.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};function ls(t){if(!t)return"";let e=t.assignedNodes({flatten:!0}),o="";return[...e].forEach(r=>{r.nodeType===Node.TEXT_NODE&&(o+=r.textContent)}),o}var ns={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},zl={name:"system",resolver:t=>t in ns?`data:image/svg+xml,${encodeURIComponent(ns[t])}`:""},cs=zl;var Lr="";function Ir(t){Lr=t}function Dr(t=""){if(!Lr){let e=[...document.getElementsByTagName("script")],o=e.find(r=>r.hasAttribute("data-shoelace"));if(o)Ir(o.getAttribute("data-shoelace"));else{let r=e.find(a=>/shoelace(\.min)?\.js($|\?)/.test(a.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(a.src)),i="";r&&(i=r.getAttribute("src")),Ir(i.split("/").slice(0,-1).join("/"))}}return Lr.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var Al={name:"default",resolver:t=>Dr(`assets/icons/${t}.svg`)},ds=Al;var El=[ds,cs],Or=[];function ps(t){Or.push(t)}function hs(t){Or=Or.filter(e=>e!==t)}function Pr(t){return El.find(e=>e.name===t)}var us=_`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;var{D:Wh}=Si;var fs=(t,e)=>e===void 0?t?._$litType$!==void 0:t?._$litType$===e;var er=t=>t.strings===void 0;var Tl={},ms=(t,e=Tl)=>t._$AH=e;var yo=Symbol(),or=Symbol(),Mr,Rr=new Map,R=class extends v{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var o;let r;if(e?.spriteSheet){this.svg=m`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;let i=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(i),this.svg}try{if(r=await fetch(t,{mode:"cors"}),!r.ok)return r.status===410?yo:or}catch{return or}try{let i=document.createElement("div");i.innerHTML=await r.text();let a=i.firstElementChild;if(((o=a?.tagName)==null?void 0:o.toLowerCase())!=="svg")return yo;Mr||(Mr=new DOMParser);let d=Mr.parseFromString(a.outerHTML,"text/html").body.querySelector("svg");return d?(d.part.add("svg"),document.adoptNode(d)):yo}catch{return yo}}connectedCallback(){super.connectedCallback(),ps(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),hs(this)}getIconSource(){let t=Pr(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;let{url:e,fromLibrary:o}=this.getIconSource(),r=o?Pr(this.library):void 0;if(!e){this.svg=null;return}let i=Rr.get(e);if(i||(i=this.resolveIcon(e,r),Rr.set(e,i)),!this.initialRender)return;let a=await i;if(a===or&&Rr.delete(e),e===this.getIconSource().url){if(fs(a)){this.svg=a;return}switch(a){case or:case yo:this.svg=null,this.emit("sl-error");break;default:this.svg=a.cloneNode(!0),(t=r?.mutator)==null||t.call(r,this.svg),this.emit("sl-load")}}}render(){return this.svg}};R.styles=[C,us];s([E()],R.prototype,"svg",2);s([l({reflect:!0})],R.prototype,"name",2);s([l()],R.prototype,"src",2);s([l()],R.prototype,"label",2);s([l({reflect:!0})],R.prototype,"library",2);s([y("label")],R.prototype,"handleLabelChange",1);s([y(["name","src","library"])],R.prototype,"setIcon",1);var A=t=>t??G;var Pt=qt(class extends Ot{constructor(t){if(super(t),t.type!==_t.PROPERTY&&t.type!==_t.ATTRIBUTE&&t.type!==_t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!er(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===ft||e===G)return e;let o=t.element,r=t.name;if(t.type===_t.PROPERTY){if(e===o[r])return ft}else if(t.type===_t.BOOLEAN_ATTRIBUTE){if(!!e===o.hasAttribute(r))return ft}else if(t.type===_t.ATTRIBUTE&&o.getAttribute(r)===e+"")return ft;return ms(t),e}});var st=class extends v{constructor(){super(...arguments),this.formControlController=new ut(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new Y(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.indeterminate=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,this.emit("sl-change")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.hasSlotController.test("help-text"),e=this.helpText?!0:!!t;return m`
      <div
        class=${z({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${z({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":this.size==="small","checkbox--medium":this.size==="medium","checkbox--large":this.size==="large"})}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${A(this.value)}
            .indeterminate=${Pt(this.indeterminate)}
            .checked=${Pt(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked?" control--checked":""}${this.indeterminate?" control--indeterminate":""}"
            class="checkbox__control"
          >
            ${this.checked?m`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                `:""}
            ${!this.checked&&this.indeterminate?m`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                `:""}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};st.styles=[C,St,as];st.dependencies={"sl-icon":R};s([k('input[type="checkbox"]')],st.prototype,"input",2);s([E()],st.prototype,"hasFocus",2);s([l()],st.prototype,"title",2);s([l()],st.prototype,"name",2);s([l()],st.prototype,"value",2);s([l({reflect:!0})],st.prototype,"size",2);s([l({type:Boolean,reflect:!0})],st.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],st.prototype,"checked",2);s([l({type:Boolean,reflect:!0})],st.prototype,"indeterminate",2);s([Ct("checked")],st.prototype,"defaultChecked",2);s([l({reflect:!0})],st.prototype,"form",2);s([l({type:Boolean,reflect:!0})],st.prototype,"required",2);s([l({attribute:"help-text"})],st.prototype,"helpText",2);s([y("disabled",{waitUntilFirstUpdate:!0})],st.prototype,"handleDisabledChange",1);s([y(["checked","indeterminate"],{waitUntilFirstUpdate:!0})],st.prototype,"handleStateChange",1);var gs=_`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;var de=class extends v{constructor(){super(...arguments),this.localize=new D(this)}render(){return m`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};de.styles=[C,gs];function Fr(t,e,o){return t?e(t):o?.(t)}var it=class Br extends v{constructor(){super(...arguments),this.localize=new D(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(e){return e instanceof Element&&e.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange()}async animateCollapse(){this.emit("sl-collapse"),await Q(this.childrenContainer);let{keyframes:e,options:o}=W(this,"tree-item.collapse",{dir:this.localize.dir()});await X(this.childrenContainer,Ke(e,this.childrenContainer.scrollHeight),o),this.childrenContainer.hidden=!0,this.emit("sl-after-collapse")}isNestedItem(){let e=this.parentElement;return!!e&&Br.isTreeItem(e)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0}willUpdate(e){e.has("selected")&&!e.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.emit("sl-expand"),await Q(this.childrenContainer),this.childrenContainer.hidden=!1;let{keyframes:e,options:o}=W(this,"tree-item.expand",{dir:this.localize.dir()});await X(this.childrenContainer,Ke(e,this.childrenContainer.scrollHeight),o),this.childrenContainer.style.height="auto",this.emit("sl-after-expand")}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.emit("sl-lazy-change")}getChildrenItems({includeDisabled:e=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(o=>Br.isTreeItem(o)&&(e||!o.disabled)):[]}render(){let e=this.localize.dir()==="rtl",o=!this.loading&&(!this.isLeaf||this.lazy);return m`
      <div
        part="base"
        class="${z({"tree-item":!0,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":o,"tree-item--rtl":this.localize.dir()==="rtl"})}"
      >
        <div
          class="tree-item__item"
          part="
            item
            ${this.disabled?"item--disabled":""}
            ${this.expanded?"item--expanded":""}
            ${this.indeterminate?"item--indeterminate":""}
            ${this.selected?"item--selected":""}
          "
        >
          <div class="tree-item__indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${z({"tree-item__expand-button":!0,"tree-item__expand-button--visible":o})}
            aria-hidden="true"
          >
            ${Fr(this.loading,()=>m` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${Fr(this.selectable,()=>m`
              <sl-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    control--checked:checkbox__control--checked,
                    control--indeterminate:checkbox__control--indeterminate,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="tree-item__checkbox"
                ?disabled="${this.disabled}"
                ?checked="${Pt(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></sl-checkbox>
            `)}

          <slot class="tree-item__label" part="label"></slot>
        </div>

        <div class="tree-item__children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};it.styles=[C,ss];it.dependencies={"sl-checkbox":st,"sl-icon":R,"sl-spinner":de};s([E()],it.prototype,"indeterminate",2);s([E()],it.prototype,"isLeaf",2);s([E()],it.prototype,"loading",2);s([E()],it.prototype,"selectable",2);s([l({type:Boolean,reflect:!0})],it.prototype,"expanded",2);s([l({type:Boolean,reflect:!0})],it.prototype,"selected",2);s([l({type:Boolean,reflect:!0})],it.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],it.prototype,"lazy",2);s([k("slot:not([name])")],it.prototype,"defaultSlot",2);s([k("slot[name=children]")],it.prototype,"childrenSlot",2);s([k(".tree-item__item")],it.prototype,"itemElement",2);s([k(".tree-item__children")],it.prototype,"childrenContainer",2);s([k(".tree-item__expand-button slot")],it.prototype,"expandButtonSlot",2);s([y("loading",{waitUntilFirstUpdate:!0})],it.prototype,"handleLoadingChange",1);s([y("disabled")],it.prototype,"handleDisabledChange",1);s([y("selected")],it.prototype,"handleSelectedChange",1);s([y("expanded",{waitUntilFirstUpdate:!0})],it.prototype,"handleExpandedChange",1);s([y("expanded",{waitUntilFirstUpdate:!0})],it.prototype,"handleExpandAnimation",1);s([y("lazy",{waitUntilFirstUpdate:!0})],it.prototype,"handleLazyChange",1);var De=it;V("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});V("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});function Z(t,e,o){let r=i=>Object.is(i,-0)?0:i;return t<e?r(e):t>o?r(o):r(t)}function bs(t,e=!1){function o(a){let n=a.getChildrenItems({includeDisabled:!1});if(n.length){let d=n.every(p=>p.selected),c=n.every(p=>!p.selected&&!p.indeterminate);a.selected=d,a.indeterminate=!d&&!c}}function r(a){let n=a.parentElement;De.isTreeItem(n)&&(o(n),r(n))}function i(a){for(let n of a.getChildrenItems())n.selected=e?a.selected||n.selected:!n.disabled&&a.selected,i(n);e&&o(a)}i(t),r(t)}var ge=class extends v{constructor(){super(),this.selection="single",this.localize=new D(this),this.clickTarget=null,this.initTreeItem=t=>{t.selectable=this.selection==="multiple",["expand","collapse"].filter(e=>!!this.querySelector(`[slot="${e}-icon"]`)).forEach(e=>{let o=t.querySelector(`[slot="${e}-icon"]`),r=this.getExpandButtonIcon(e);r&&(o===null?t.append(r):o.hasAttribute("data-default")&&o.replaceWith(r))})},this.handleTreeChanged=t=>{for(let e of t){let o=[...e.addedNodes].filter(De.isTreeItem),r=[...e.removedNodes].filter(De.isTreeItem);o.forEach(this.initTreeItem),this.lastFocusedItem&&r.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=t=>{let e=t.relatedTarget;(!e||!this.contains(e))&&(this.tabIndex=0)},this.handleFocusIn=t=>{let e=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),De.isTreeItem(e)&&!e.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=e,this.tabIndex=-1,e.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver.disconnect()}getExpandButtonIcon(t){let o=(t==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(o){let r=o.cloneNode(!0);return[r,...r.querySelectorAll("[id]")].forEach(i=>i.removeAttribute("id")),r.setAttribute("data-default",""),r.slot=`${t}-icon`,r}return null}selectItem(t){let e=[...this.selectedItems];if(this.selection==="multiple")t.selected=!t.selected,t.lazy&&(t.expanded=!0),bs(t);else if(this.selection==="single"||t.isLeaf){let r=this.getAllTreeItems();for(let i of r)i.selected=i===t}else this.selection==="leaf"&&(t.expanded=!t.expanded);let o=this.selectedItems;(e.length!==o.length||o.some(r=>!e.includes(r)))&&Promise.all(o.map(r=>r.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:o}})})}getAllTreeItems(){return[...this.querySelectorAll("sl-tree-item")]}focusItem(t){t?.focus()}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(i=>{var a;return["input","textarea"].includes((a=i?.tagName)==null?void 0:a.toLowerCase())}))return;let e=this.getFocusableItems(),o=this.localize.dir()==="ltr",r=this.localize.dir()==="rtl";if(e.length>0){t.preventDefault();let i=e.findIndex(c=>c.matches(":focus")),a=e[i],n=c=>{let p=e[Z(c,0,e.length-1)];this.focusItem(p)},d=c=>{a.expanded=c};t.key==="ArrowDown"?n(i+1):t.key==="ArrowUp"?n(i-1):o&&t.key==="ArrowRight"||r&&t.key==="ArrowLeft"?!a||a.disabled||a.expanded||a.isLeaf&&!a.lazy?n(i+1):d(!0):o&&t.key==="ArrowLeft"||r&&t.key==="ArrowRight"?!a||a.disabled||a.isLeaf||!a.expanded?n(i-1):d(!1):t.key==="Home"?n(0):t.key==="End"?n(e.length-1):(t.key==="Enter"||t.key===" ")&&(a.disabled||this.selectItem(a))}}handleClick(t){let e=t.target,o=e.closest("sl-tree-item"),r=t.composedPath().some(i=>{var a;return(a=i?.classList)==null?void 0:a.contains("tree-item__expand-button")});!o||o.disabled||e!==this.clickTarget||(r?o.expanded=!o.expanded:this.selectItem(o))}handleMouseDown(t){this.clickTarget=t.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){let t=this.selection==="multiple",e=this.getAllTreeItems();this.setAttribute("aria-multiselectable",t?"true":"false");for(let o of e)o.selectable=t;t&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(o=>bs(o,!0)))}get selectedItems(){let t=this.getAllTreeItems(),e=o=>o.selected;return t.filter(e)}getFocusableItems(){let t=this.getAllTreeItems(),e=new Set;return t.filter(o=>{var r;if(o.disabled)return!1;let i=(r=o.parentElement)==null?void 0:r.closest("[role=treeitem]");return i&&(!i.expanded||i.loading||e.has(i))&&e.add(o),!e.has(o)})}render(){return m`
      <div
        part="base"
        class="tree"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
        <span hidden aria-hidden="true"><slot name="expand-icon"></slot></span>
        <span hidden aria-hidden="true"><slot name="collapse-icon"></slot></span>
      </div>
    `}};ge.styles=[C,is];s([k("slot:not([name])")],ge.prototype,"defaultSlot",2);s([k("slot[name=expand-icon]")],ge.prototype,"expandedIconSlot",2);s([k("slot[name=collapse-icon]")],ge.prototype,"collapsedIconSlot",2);s([l()],ge.prototype,"selection",2);s([y("selection")],ge.prototype,"handleSelectionChange",1);ge.define("sl-tree");De.define("sl-tree-item");var vs=_`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`;var Ll=0,Ye=class extends v{constructor(){super(...arguments),this.attrId=++Ll,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return m`
      <slot
        part="base"
        class=${z({"tab-panel":!0,"tab-panel--active":this.active})}
      ></slot>
    `}};Ye.styles=[C,vs];s([l({reflect:!0})],Ye.prototype,"name",2);s([l({type:Boolean,reflect:!0})],Ye.prototype,"active",2);s([y("active")],Ye.prototype,"handleActiveChange",1);Ye.define("sl-tab-panel");var ys=_`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;var _s=_`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;var ws=Symbol.for(""),Il=t=>{if(t?.r===ws)return t?._$litStatic$};var Ge=(t,...e)=>({_$litStatic$:e.reduce((o,r,i)=>o+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+t[i+1],t[0]),r:ws}),xs=new Map,ks=t=>(e,...o)=>{let r=o.length,i,a,n=[],d=[],c,p=0,g=!1;for(;p<r;){for(c=e[p];p<r&&(a=o[p],(i=Il(a))!==void 0);)c+=i+e[++p],g=!0;p!==r&&d.push(a),n.push(c),p++}if(p===r&&n.push(e[r]),g){let h=n.join("$$lit$$");(e=xs.get(h))===void 0&&(n.raw=n,xs.set(h,e=n)),o=d}return t(e,...o)},be=ks(m),jf=ks(wi);var J=class extends v{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){let t=!!this.href,e=t?Ge`a`:Ge`button`;return be`
      <${e}
        part="base"
        class=${z({"icon-button":!0,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${A(t?void 0:this.disabled)}
        type=${A(t?void 0:"button")}
        href=${A(t?this.href:void 0)}
        target=${A(t?this.target:void 0)}
        download=${A(t?this.download:void 0)}
        rel=${A(t&&this.target?"noreferrer noopener":void 0)}
        role=${A(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${A(this.name)}
          library=${A(this.library)}
          src=${A(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};J.styles=[C,_s];J.dependencies={"sl-icon":R};s([k(".icon-button")],J.prototype,"button",2);s([E()],J.prototype,"hasFocus",2);s([l()],J.prototype,"name",2);s([l()],J.prototype,"library",2);s([l()],J.prototype,"src",2);s([l()],J.prototype,"href",2);s([l()],J.prototype,"target",2);s([l()],J.prototype,"download",2);s([l()],J.prototype,"label",2);s([l({type:Boolean,reflect:!0})],J.prototype,"disabled",2);var ee=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return m`
      <span
        part="base"
        class=${z({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?m`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </span>
    `}};ee.styles=[C,ys];ee.dependencies={"sl-icon-button":J};s([l({reflect:!0})],ee.prototype,"variant",2);s([l({reflect:!0})],ee.prototype,"size",2);s([l({type:Boolean,reflect:!0})],ee.prototype,"pill",2);s([l({type:Boolean})],ee.prototype,"removable",2);ee.define("sl-tag");var Cs=_`
  :host {
    display: block;
  }

  .textarea {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    color: var(--sl-input-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`;var j=class extends v{constructor(){super(...arguments),this.formControlController=new ut(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Y(this,"help-text","label"),this.hasFocus=!1,this.title="",this.name="",this.value="",this.size="medium",this.filled=!1,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.form="",this.required=!1,this.spellcheck=!0,this.defaultValue=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input)})}firstUpdated(){this.formControlController.updateValidity()}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this.input)}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}setTextareaHeight(){this.resize==="auto"?(this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height=void 0}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleRowsChange(){this.setTextareaHeight()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,r="preserve"){let i=e??this.input.selectionStart,a=o??this.input.selectionEnd;this.input.setRangeText(t,i,a,r),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight())}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=this.label?!0:!!t,r=this.helpText?!0:!!e;return m`
      <div
        part="form-control"
        class=${z({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":o,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${z({textarea:!0,"textarea--small":this.size==="small","textarea--medium":this.size==="medium","textarea--large":this.size==="large","textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":this.resize==="none","textarea--resize-vertical":this.resize==="vertical","textarea--resize-auto":this.resize==="auto"})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${A(this.name)}
              .value=${Pt(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${A(this.placeholder)}
              rows=${A(this.rows)}
              minlength=${A(this.minlength)}
              maxlength=${A(this.maxlength)}
              autocapitalize=${A(this.autocapitalize)}
              autocorrect=${A(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${A(this.spellcheck)}
              enterkeyhint=${A(this.enterkeyhint)}
              inputmode=${A(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};j.styles=[C,St,Cs];s([k(".textarea__control")],j.prototype,"input",2);s([E()],j.prototype,"hasFocus",2);s([l()],j.prototype,"title",2);s([l()],j.prototype,"name",2);s([l()],j.prototype,"value",2);s([l({reflect:!0})],j.prototype,"size",2);s([l({type:Boolean,reflect:!0})],j.prototype,"filled",2);s([l()],j.prototype,"label",2);s([l({attribute:"help-text"})],j.prototype,"helpText",2);s([l()],j.prototype,"placeholder",2);s([l({type:Number})],j.prototype,"rows",2);s([l()],j.prototype,"resize",2);s([l({type:Boolean,reflect:!0})],j.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],j.prototype,"readonly",2);s([l({reflect:!0})],j.prototype,"form",2);s([l({type:Boolean,reflect:!0})],j.prototype,"required",2);s([l({type:Number})],j.prototype,"minlength",2);s([l({type:Number})],j.prototype,"maxlength",2);s([l()],j.prototype,"autocapitalize",2);s([l()],j.prototype,"autocorrect",2);s([l()],j.prototype,"autocomplete",2);s([l({type:Boolean})],j.prototype,"autofocus",2);s([l()],j.prototype,"enterkeyhint",2);s([l({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],j.prototype,"spellcheck",2);s([l()],j.prototype,"inputmode",2);s([Ct()],j.prototype,"defaultValue",2);s([y("disabled",{waitUntilFirstUpdate:!0})],j.prototype,"handleDisabledChange",1);s([y("rows",{waitUntilFirstUpdate:!0})],j.prototype,"handleRowsChange",1);s([y("value",{waitUntilFirstUpdate:!0})],j.prototype,"handleValueChange",1);j.define("sl-textarea");var Ss=_`
  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition:
      var(--transition-speed) box-shadow,
      var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus {
    outline: none;
  }

  .tab:focus-visible:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`;var Dl=0,Wt=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.attrId=++Dl,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=!1,this.closable=!1,this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}handleCloseClick(t){t.stopPropagation(),this.emit("sl-close")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}focus(t){this.tab.focus(t)}blur(){this.tab.blur()}render(){return this.id=this.id.length>0?this.id:this.componentId,m`
      <div
        part="base"
        class=${z({tab:!0,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
        tabindex=${this.disabled?"-1":"0"}
      >
        <slot></slot>
        ${this.closable?m`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </div>
    `}};Wt.styles=[C,Ss];Wt.dependencies={"sl-icon-button":J};s([k(".tab")],Wt.prototype,"tab",2);s([l({reflect:!0})],Wt.prototype,"panel",2);s([l({type:Boolean,reflect:!0})],Wt.prototype,"active",2);s([l({type:Boolean})],Wt.prototype,"closable",2);s([l({type:Boolean,reflect:!0})],Wt.prototype,"disabled",2);s([y("active")],Wt.prototype,"handleActiveChange",1);s([y("disabled")],Wt.prototype,"handleDisabledChange",1);Wt.define("sl-tab");var $s=_`
  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`;function Ol(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}var Vr=new Set;function Pl(){let t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Ml(){let t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function Oe(t){if(Vr.add(t),!document.documentElement.classList.contains("sl-scroll-lock")){let e=Pl()+Ml();document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${e}px`)}}function Pe(t){Vr.delete(t),Vr.size===0&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}function _o(t,e,o="vertical",r="smooth"){let i=Ol(t,e),a=i.top+e.scrollTop,n=i.left+e.scrollLeft,d=e.scrollLeft,c=e.scrollLeft+e.offsetWidth,p=e.scrollTop,g=e.scrollTop+e.offsetHeight;(o==="horizontal"||o==="both")&&(n<d?e.scrollTo({left:n,behavior:r}):n+t.clientWidth>c&&e.scrollTo({left:n-e.offsetWidth+t.clientWidth,behavior:r})),(o==="vertical"||o==="both")&&(a<p?e.scrollTo({top:a,behavior:r}):a+t.clientHeight>g&&e.scrollTo({top:a-e.offsetHeight+t.clientHeight,behavior:r}))}var $t=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.tabs=[],this.panels=[],this.hasScrollControls=!1,this.placement="top",this.activation="auto",this.noScrollControls=!1}connectedCallback(){let t=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls()}),this.mutationObserver=new MutationObserver(e=>{e.some(o=>!["aria-labelledby","aria-controls"].includes(o.attributeName))&&setTimeout(()=>this.setAriaLabels()),e.some(o=>o.attributeName==="disabled")&&this.syncTabsAndPanels()}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),t.then(()=>{new IntersectionObserver((o,r)=>{var i;o[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((i=this.getActiveTab())!=null?i:this.tabs[0],{emitEvents:!1}),r.unobserve(o[0].target))}).observe(this.tabGroup)})})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver.disconnect(),this.resizeObserver.unobserve(this.nav)}getAllTabs(t={includeDisabled:!0}){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter(o=>t.includeDisabled?o.tagName.toLowerCase()==="sl-tab":o.tagName.toLowerCase()==="sl-tab"&&!o.disabled)}getAllPanels(){return[...this.body.assignedElements()].filter(t=>t.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){let o=t.target.closest("sl-tab");o?.closest("sl-tab-group")===this&&o!==null&&this.setActiveTab(o,{scrollBehavior:"smooth"})}handleKeyDown(t){let o=t.target.closest("sl-tab");if(o?.closest("sl-tab-group")===this&&(["Enter"," "].includes(t.key)&&o!==null&&(this.setActiveTab(o,{scrollBehavior:"smooth"}),t.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key))){let i=this.tabs.find(n=>n.matches(":focus")),a=this.localize.dir()==="rtl";if(i?.tagName.toLowerCase()==="sl-tab"){let n=this.tabs.indexOf(i);t.key==="Home"?n=0:t.key==="End"?n=this.tabs.length-1:["top","bottom"].includes(this.placement)&&t.key===(a?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"?n--:(["top","bottom"].includes(this.placement)&&t.key===(a?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown")&&n++,n<0&&(n=this.tabs.length-1),n>this.tabs.length-1&&(n=0),this.tabs[n].focus({preventScroll:!0}),this.activation==="auto"&&this.setActiveTab(this.tabs[n],{scrollBehavior:"smooth"}),["top","bottom"].includes(this.placement)&&_o(this.tabs[n],this.nav,"horizontal"),t.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(t,e){if(e=yt({emitEvents:!0,scrollBehavior:"auto"},e),t!==this.activeTab&&!t.disabled){let o=this.activeTab;this.activeTab=t,this.tabs.forEach(r=>r.active=r===this.activeTab),this.panels.forEach(r=>{var i;return r.active=r.name===((i=this.activeTab)==null?void 0:i.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&_o(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(o&&this.emit("sl-tab-hide",{detail:{name:o.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach(t=>{let e=this.panels.find(o=>o.name===t.panel);e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))})}repositionIndicator(){let t=this.getActiveTab();if(!t)return;let e=t.clientWidth,o=t.clientHeight,r=this.localize.dir()==="rtl",i=this.getAllTabs(),n=i.slice(0,i.indexOf(t)).reduce((d,c)=>({left:d.left+c.clientWidth,top:d.top+c.clientHeight}),{left:0,top:0});switch(this.placement){case"top":case"bottom":this.indicator.style.width=`${e}px`,this.indicator.style.height="auto",this.indicator.style.translate=r?`${-1*n.left}px`:`${n.left}px`;break;case"start":case"end":this.indicator.style.width="auto",this.indicator.style.height=`${o}px`,this.indicator.style.translate=`0 ${n.top}px`;break}}syncTabsAndPanels(){this.tabs=this.getAllTabs({includeDisabled:!1}),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls())}updateScrollControls(){this.noScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none"}show(t){let e=this.tabs.find(o=>o.panel===t);e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}render(){let t=this.localize.dir()==="rtl";return m`
      <div
        part="base"
        class=${z({"tab-group":!0,"tab-group--top":this.placement==="top","tab-group--bottom":this.placement==="bottom","tab-group--start":this.placement==="start","tab-group--end":this.placement==="end","tab-group--rtl":this.localize.dir()==="rtl","tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?m`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--start"
                  name=${t?"chevron-right":"chevron-left"}
                  library="system"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?m`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--end"
                  name=${t?"chevron-left":"chevron-right"}
                  library="system"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};$t.styles=[C,$s];$t.dependencies={"sl-icon-button":J};s([k(".tab-group")],$t.prototype,"tabGroup",2);s([k(".tab-group__body")],$t.prototype,"body",2);s([k(".tab-group__nav")],$t.prototype,"nav",2);s([k(".tab-group__indicator")],$t.prototype,"indicator",2);s([E()],$t.prototype,"hasScrollControls",2);s([l()],$t.prototype,"placement",2);s([l()],$t.prototype,"activation",2);s([l({attribute:"no-scroll-controls",type:Boolean})],$t.prototype,"noScrollControls",2);s([y("noScrollControls",{waitUntilFirstUpdate:!0})],$t.prototype,"updateScrollControls",1);s([y("placement",{waitUntilFirstUpdate:!0})],$t.prototype,"syncIndicator",1);$t.define("sl-tab-group");de.define("sl-spinner");var zs=_`
  :host {
    --divider-width: 4px;
    --divider-hit-area: 12px;
    --min: 0%;
    --max: 100%;

    display: grid;
  }

  .start,
  .end {
    overflow: hidden;
  }

  .divider {
    flex: 0 0 var(--divider-width);
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-900);
    z-index: 1;
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider:focus-visible {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  :host([disabled]) .divider {
    cursor: not-allowed;
  }

  /* Horizontal */
  :host(:not([vertical], [disabled])) .divider {
    cursor: col-resize;
  }

  :host(:not([vertical])) .divider::after {
    display: flex;
    content: '';
    position: absolute;
    height: 100%;
    left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    width: var(--divider-hit-area);
  }

  /* Vertical */
  :host([vertical]) {
    flex-direction: column;
  }

  :host([vertical]:not([disabled])) .divider {
    cursor: row-resize;
  }

  :host([vertical]) .divider::after {
    content: '';
    position: absolute;
    width: 100%;
    top: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    height: var(--divider-hit-area);
  }

  @media (forced-colors: active) {
    .divider {
      outline: solid 1px transparent;
    }
  }
`;function ve(t,e){function o(i){let a=t.getBoundingClientRect(),n=t.ownerDocument.defaultView,d=a.left+n.scrollX,c=a.top+n.scrollY,p=i.pageX-d,g=i.pageY-c;e?.onMove&&e.onMove(p,g)}function r(){document.removeEventListener("pointermove",o),document.removeEventListener("pointerup",r),e?.onStop&&e.onStop()}document.addEventListener("pointermove",o,{passive:!0}),document.addEventListener("pointerup",r),e?.initialEvent instanceof PointerEvent&&o(e.initialEvent)}var zt=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.position=50,this.vertical=!1,this.disabled=!1,this.snapThreshold=12}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this)}detectSize(){let{width:t,height:e}=this.getBoundingClientRect();this.size=this.vertical?e:t}percentageToPixels(t){return this.size*(t/100)}pixelsToPercentage(t){return t/this.size*100}handleDrag(t){let e=this.localize.dir()==="rtl";this.disabled||(t.cancelable&&t.preventDefault(),ve(this,{onMove:(o,r)=>{let i=this.vertical?r:o;this.primary==="end"&&(i=this.size-i),this.snap&&this.snap.split(" ").forEach(n=>{let d;n.endsWith("%")?d=this.size*(parseFloat(n)/100):d=parseFloat(n),e&&!this.vertical&&(d=this.size-d),i>=d-this.snapThreshold&&i<=d+this.snapThreshold&&(i=d)}),this.position=Z(this.pixelsToPercentage(i),0,100)},initialEvent:t}))}handleKeyDown(t){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key)){let e=this.position,o=(t.shiftKey?10:1)*(this.primary==="end"?-1:1);t.preventDefault(),(t.key==="ArrowLeft"&&!this.vertical||t.key==="ArrowUp"&&this.vertical)&&(e-=o),(t.key==="ArrowRight"&&!this.vertical||t.key==="ArrowDown"&&this.vertical)&&(e+=o),t.key==="Home"&&(e=this.primary==="end"?100:0),t.key==="End"&&(e=this.primary==="end"?0:100),this.position=Z(e,0,100)}}handleResize(t){let{width:e,height:o}=t[0].contentRect;this.size=this.vertical?o:e,this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels))}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition")}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels)}handleVerticalChange(){this.detectSize()}render(){let t=this.vertical?"gridTemplateRows":"gridTemplateColumns",e=this.vertical?"gridTemplateColumns":"gridTemplateRows",o=this.localize.dir()==="rtl",r=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,i="auto";return this.primary==="end"?o&&!this.vertical?this.style[t]=`${r} var(--divider-width) ${i}`:this.style[t]=`${i} var(--divider-width) ${r}`:o&&!this.vertical?this.style[t]=`${i} var(--divider-width) ${r}`:this.style[t]=`${r} var(--divider-width) ${i}`,this.style[e]="",m`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${A(this.disabled?void 0:"0")}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term("resize")}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `}};zt.styles=[C,zs];s([k(".divider")],zt.prototype,"divider",2);s([l({type:Number,reflect:!0})],zt.prototype,"position",2);s([l({attribute:"position-in-pixels",type:Number})],zt.prototype,"positionInPixels",2);s([l({type:Boolean,reflect:!0})],zt.prototype,"vertical",2);s([l({type:Boolean,reflect:!0})],zt.prototype,"disabled",2);s([l()],zt.prototype,"primary",2);s([l()],zt.prototype,"snap",2);s([l({type:Number,attribute:"snap-threshold"})],zt.prototype,"snapThreshold",2);s([y("position")],zt.prototype,"handlePositionChange",1);s([y("positionInPixels")],zt.prototype,"handlePositionInPixelsChange",1);s([y("vertical")],zt.prototype,"handleVerticalChange",1);zt.define("sl-split-panel");var As=_`
  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  @media (forced-colors: active) {
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
    .switch--checked .switch__control .switch__thumb {
      background-color: ButtonText;
    }
  }
`;var gt=class extends v{constructor(){super(...arguments),this.formControlController=new ut(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new Y(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=!1,this.emit("sl-change"),this.emit("sl-input")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=!0,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.hasSlotController.test("help-text"),e=this.helpText?!0:!!t;return m`
      <div
        class=${z({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${z({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":this.size==="small","switch--medium":this.size==="medium","switch--large":this.size==="large"})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${A(this.value)}
            .checked=${Pt(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            role="switch"
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          />

          <span part="control" class="switch__control">
            <span part="thumb" class="switch__thumb"></span>
          </span>

          <div part="label" class="switch__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};gt.styles=[C,St,As];s([k('input[type="checkbox"]')],gt.prototype,"input",2);s([E()],gt.prototype,"hasFocus",2);s([l()],gt.prototype,"title",2);s([l()],gt.prototype,"name",2);s([l()],gt.prototype,"value",2);s([l({reflect:!0})],gt.prototype,"size",2);s([l({type:Boolean,reflect:!0})],gt.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],gt.prototype,"checked",2);s([Ct("checked")],gt.prototype,"defaultChecked",2);s([l({reflect:!0})],gt.prototype,"form",2);s([l({type:Boolean,reflect:!0})],gt.prototype,"required",2);s([l({attribute:"help-text"})],gt.prototype,"helpText",2);s([y("checked",{waitUntilFirstUpdate:!0})],gt.prototype,"handleCheckedChange",1);s([y("disabled",{waitUntilFirstUpdate:!0})],gt.prototype,"handleDisabledChange",1);gt.define("sl-switch");var Es=_`
  :host {
    display: contents;
  }
`;var xo=class extends v{constructor(){super(...arguments),this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>{this.emit("sl-resize",{detail:{entries:t}})}),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){let t=this.shadowRoot.querySelector("slot");if(t!==null){let e=t.assignedElements({flatten:!0});this.observedElements.forEach(o=>this.resizeObserver.unobserve(o)),this.observedElements=[],e.forEach(o=>{this.resizeObserver.observe(o),this.observedElements.push(o)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return m` <slot @slotchange=${this.handleSlotChange}></slot> `}};xo.styles=[C,Es];s([l({type:Boolean,reflect:!0})],xo.prototype,"disabled",2);s([y("disabled",{waitUntilFirstUpdate:!0})],xo.prototype,"handleDisabledChange",1);xo.define("sl-resize-observer");var Ts=_`
  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix */
  .select__prefix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`;var wo=class extends Ot{constructor(e){if(super(e),this.et=G,e.type!==_t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===G||e==null)return this.vt=void 0,this.et=e;if(e===ft)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.vt;this.et=e;let o=[e];return o.raw=o,this.vt={_$litType$:this.constructor.resultType,strings:o,values:[]}}};wo.directiveName="unsafeHTML",wo.resultType=1;var Qe=qt(wo);var U=class extends v{constructor(){super(...arguments),this.formControlController=new ut(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Y(this,"help-text","label"),this.localize=new D(this),this.typeToSelectString="",this.hasFocus=!1,this.displayLabel="",this.selectedOptions=[],this.name="",this.value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.clearable=!1,this.open=!1,this.hoist=!1,this.filled=!1,this.pill=!1,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=!1,this.getTag=t=>m`
      <sl-tag
        part="tag"
        exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
        ?pill=${this.pill}
        size=${this.size}
        removable
        @sl-remove=${e=>this.handleTagRemove(e,t)}
      >
        ${t.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{let e=t.target,o=e.closest(".select__clear")!==null,r=e.closest("sl-icon-button")!==null;if(!(o||r)){if(t.key==="Escape"&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let i=this.getAllOptions(),a=i.indexOf(this.currentOption),n=Math.max(0,a);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(n=a+1,n>i.length-1&&(n=0)):t.key==="ArrowUp"?(n=a-1,n<0&&(n=i.length-1)):t.key==="Home"?n=0:t.key==="End"&&(n=i.length-1),this.setCurrentOption(i[n])}if(t.key.length===1||t.key==="Backspace"){let i=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(let a of i)if(a.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(a);break}}}},this.handleDocumentMouseDown=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide()}}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),this.open=!1}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:!0}))})}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(t=this.closeWatcher)==null||t.destroy()}handleFocus(){this.hasFocus=!0,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleLabelClick(){this.displayInput.focus()}handleComboboxMouseDown(t){let o=t.composedPath().some(r=>r instanceof Element&&r.tagName.toLowerCase()==="sl-icon-button");this.disabled||o||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.key!=="Tab"&&(t.stopPropagation(),this.handleDocumentKeyDown(t))}handleClearClick(t){t.stopPropagation(),this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){let o=t.target.closest("sl-option"),r=this.value;o&&!o.disabled&&(this.multiple?this.toggleOptionSelection(o):this.setSelectedOptions(o),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.value!==r&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){let t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],o=[];customElements.get("sl-option")?(t.forEach(r=>o.push(r.value)),this.setSelectedOptions(t.filter(r=>e.includes(r.value)))):customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange())}handleTagRemove(t,e){t.stopPropagation(),this.disabled||(this.toggleOptionSelection(e,!1),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}))}getAllOptions(){return[...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(o=>{o.current=!1,o.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){let e=this.getAllOptions(),o=Array.isArray(t)?t:[t];e.forEach(r=>r.selected=!1),o.length&&o.forEach(r=>r.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){var t,e,o,r;this.selectedOptions=this.getAllOptions().filter(i=>i.selected),this.multiple?(this.value=this.selectedOptions.map(i=>i.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length)):(this.value=(e=(t=this.selectedOptions[0])==null?void 0:t.value)!=null?e:"",this.displayLabel=(r=(o=this.selectedOptions[0])==null?void 0:o.getTextLabel())!=null?r:""),this.updateComplete.then(()=>{this.formControlController.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){let o=this.getTag(t,e);return m`<div @sl-remove=${r=>this.handleTagRemove(r,t)}>
          ${typeof o=="string"?Qe(o):o}
        </div>`}else if(e===this.maxOptionsVisible)return m`<sl-tag size=${this.size}>+${this.selectedOptions.length-e}</sl-tag>`;return m``})}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleDisabledChange(){this.disabled&&(this.open=!1,this.handleOpenChange())}handleValueChange(){let t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(o=>e.includes(o.value)))}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await Q(this),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)});let{keyframes:t,options:e}=W(this,"select.show",{dir:this.localize.dir()});await X(this.popup.popup,t,e),this.currentOption&&_o(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await Q(this);let{keyframes:t,options:e}=W(this,"select.hide",{dir:this.localize.dir()});await X(this.popup.popup,t,e),this.listbox.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,et(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,et(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity()}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=this.label?!0:!!t,r=this.helpText?!0:!!e,i=this.clearable&&!this.disabled&&this.value.length>0,a=this.placeholder&&this.value.length===0;return m`
      <div
        part="form-control"
        class=${z({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":o,"form-control--has-help-text":r})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${z({select:!0,"select--standard":!0,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":a,"select--top":this.placement==="top","select--bottom":this.placement==="bottom","select--small":this.size==="small","select--medium":this.size==="medium","select--large":this.size==="large"})}
            placement=${this.placement}
            strategy=${this.hoist?"fixed":"absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple?m`<div part="tags" class="select__tags">${this.tags}</div>`:""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${i?m`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};U.styles=[C,St,Ts];U.dependencies={"sl-icon":R,"sl-popup":N,"sl-tag":ee};s([k(".select")],U.prototype,"popup",2);s([k(".select__combobox")],U.prototype,"combobox",2);s([k(".select__display-input")],U.prototype,"displayInput",2);s([k(".select__value-input")],U.prototype,"valueInput",2);s([k(".select__listbox")],U.prototype,"listbox",2);s([E()],U.prototype,"hasFocus",2);s([E()],U.prototype,"displayLabel",2);s([E()],U.prototype,"currentOption",2);s([E()],U.prototype,"selectedOptions",2);s([l()],U.prototype,"name",2);s([l({converter:{fromAttribute:t=>t.split(" "),toAttribute:t=>t.join(" ")}})],U.prototype,"value",2);s([Ct()],U.prototype,"defaultValue",2);s([l({reflect:!0})],U.prototype,"size",2);s([l()],U.prototype,"placeholder",2);s([l({type:Boolean,reflect:!0})],U.prototype,"multiple",2);s([l({attribute:"max-options-visible",type:Number})],U.prototype,"maxOptionsVisible",2);s([l({type:Boolean,reflect:!0})],U.prototype,"disabled",2);s([l({type:Boolean})],U.prototype,"clearable",2);s([l({type:Boolean,reflect:!0})],U.prototype,"open",2);s([l({type:Boolean})],U.prototype,"hoist",2);s([l({type:Boolean,reflect:!0})],U.prototype,"filled",2);s([l({type:Boolean,reflect:!0})],U.prototype,"pill",2);s([l()],U.prototype,"label",2);s([l({reflect:!0})],U.prototype,"placement",2);s([l({attribute:"help-text"})],U.prototype,"helpText",2);s([l({reflect:!0})],U.prototype,"form",2);s([l({type:Boolean,reflect:!0})],U.prototype,"required",2);s([l()],U.prototype,"getTag",2);s([y("disabled",{waitUntilFirstUpdate:!0})],U.prototype,"handleDisabledChange",1);s([y("value",{waitUntilFirstUpdate:!0})],U.prototype,"handleValueChange",1);s([y("open",{waitUntilFirstUpdate:!0})],U.prototype,"handleOpenChange",1);V("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});V("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});U.define("sl-select");var Ls=_`
  :host {
    --border-radius: var(--sl-border-radius-pill);
    --color: var(--sl-color-neutral-200);
    --sheen-color: var(--sl-color-neutral-300);

    display: block;
    position: relative;
  }

  .skeleton {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .skeleton__indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--border-radius);
  }

  .skeleton--sheen .skeleton__indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  .skeleton--pulse .skeleton__indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    :host {
      --color: GrayText;
    }
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;var rr=class extends v{constructor(){super(...arguments),this.effect="none"}render(){return m`
      <div
        part="base"
        class=${z({skeleton:!0,"skeleton--pulse":this.effect==="pulse","skeleton--sheen":this.effect==="sheen"})}
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `}};rr.styles=[C,Ls];s([l()],rr.prototype,"effect",2);rr.define("sl-skeleton");var Is=_`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-active-offset: 0%;
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    --percent: 0%;
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
    margin: 0;

    background-image: linear-gradient(
      to right,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  .range--rtl .range__control {
    background-image: linear-gradient(
      to left,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-webkit-slider-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-moz-range-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control:focus-visible {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 0;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    translate: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }

  @media (forced-colors: active) {
    .range__control,
    .range__tooltip {
      border: solid 1px transparent;
    }

    .range__control::-webkit-slider-thumb {
      border: solid 1px transparent;
    }

    .range__control::-moz-range-thumb {
      border: solid 1px transparent;
    }

    .range__tooltip:after {
      display: none;
    }
  }
`;var tt=class extends v{constructor(){super(...arguments),this.formControlController=new ut(this),this.hasSlotController=new Y(this,"help-text","label"),this.localize=new D(this),this.hasFocus=!1,this.hasTooltip=!1,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=!1,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString(),this.form="",this.defaultValue=0}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input)})}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this.input)}handleChange(){this.emit("sl-change")}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange()}handleBlur(){this.hasFocus=!1,this.hasTooltip=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.hasTooltip=!0,this.emit("sl-focus")}handleThumbDragStart(){this.hasTooltip=!0}handleThumbDragEnd(){this.hasTooltip=!1}syncProgress(t){this.input.style.setProperty("--percent",`${t*100}%`)}syncTooltip(t){if(this.output!==null){let e=this.input.offsetWidth,o=this.output.offsetWidth,r=getComputedStyle(this.input).getPropertyValue("--thumb-size"),i=this.localize.dir()==="rtl",a=e*t;if(i){let n=`${e-a}px + ${t} * ${r}`;this.output.style.translate=`calc((${n} - ${o/2}px - ${r} / 2))`}else{let n=`${a}px - ${t} * ${r}`;this.output.style.translate=`calc(${n} - ${o/2}px + ${r} / 2)`}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange()}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}syncRange(){let t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),this.tooltip!=="none"&&this.syncTooltip(t)}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}focus(t){this.input.focus(t)}blur(){this.input.blur()}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=this.label?!0:!!t,r=this.helpText?!0:!!e;return m`
      <div
        part="form-control"
        class=${z({"form-control":!0,"form-control--medium":!0,"form-control--has-label":o,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${z({range:!0,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--rtl":this.localize.dir()==="rtl","range--tooltip-visible":this.hasTooltip,"range--tooltip-top":this.tooltip==="top","range--tooltip-bottom":this.tooltip==="bottom"})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              class="range__control"
              title=${this.title}
              type="range"
              name=${A(this.name)}
              ?disabled=${this.disabled}
              min=${A(this.min)}
              max=${A(this.max)}
              step=${A(this.step)}
              .value=${Pt(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${this.tooltip!=="none"&&!this.disabled?m`
                  <output part="tooltip" class="range__tooltip">
                    ${typeof this.tooltipFormatter=="function"?this.tooltipFormatter(this.value):this.value}
                  </output>
                `:""}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};tt.styles=[C,St,Is];s([k(".range__control")],tt.prototype,"input",2);s([k(".range__tooltip")],tt.prototype,"output",2);s([E()],tt.prototype,"hasFocus",2);s([E()],tt.prototype,"hasTooltip",2);s([l()],tt.prototype,"title",2);s([l()],tt.prototype,"name",2);s([l({type:Number})],tt.prototype,"value",2);s([l()],tt.prototype,"label",2);s([l({attribute:"help-text"})],tt.prototype,"helpText",2);s([l({type:Boolean,reflect:!0})],tt.prototype,"disabled",2);s([l({type:Number})],tt.prototype,"min",2);s([l({type:Number})],tt.prototype,"max",2);s([l({type:Number})],tt.prototype,"step",2);s([l()],tt.prototype,"tooltip",2);s([l({attribute:!1})],tt.prototype,"tooltipFormatter",2);s([l({reflect:!0})],tt.prototype,"form",2);s([Ct()],tt.prototype,"defaultValue",2);s([Ne({passive:!0})],tt.prototype,"handleThumbDragStart",1);s([y("value",{waitUntilFirstUpdate:!0})],tt.prototype,"handleValueChange",1);s([y("disabled",{waitUntilFirstUpdate:!0})],tt.prototype,"handleDisabledChange",1);s([y("hasTooltip",{waitUntilFirstUpdate:!0})],tt.prototype,"syncRange",1);tt.define("sl-range");var Ds=_`
  :host {
    --symbol-color: var(--sl-color-neutral-300);
    --symbol-color-active: var(--sl-color-amber-500);
    --symbol-size: 1.2rem;
    --symbol-spacing: var(--sl-spacing-3x-small);

    display: inline-flex;
  }

  .rating {
    position: relative;
    display: inline-flex;
    border-radius: var(--sl-border-radius-medium);
    vertical-align: middle;
  }

  .rating:focus {
    outline: none;
  }

  .rating:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .rating__symbols {
    display: inline-flex;
    position: relative;
    font-size: var(--symbol-size);
    line-height: 0;
    color: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
  }

  .rating__symbols > * {
    padding: var(--symbol-spacing);
  }

  .rating__symbol--active,
  .rating__partial--filled {
    color: var(--symbol-color-active);
  }

  .rating__partial-symbol-container {
    position: relative;
  }

  .rating__partial--filled {
    position: absolute;
    top: var(--symbol-spacing);
    left: var(--symbol-spacing);
  }

  .rating__symbol {
    transition: var(--sl-transition-fast) scale;
    pointer-events: none;
  }

  .rating__symbol--hover {
    scale: 1.2;
  }

  .rating--disabled .rating__symbols,
  .rating--readonly .rating__symbols {
    cursor: default;
  }

  .rating--disabled .rating__symbol--hover,
  .rating--readonly .rating__symbol--hover {
    scale: none;
  }

  .rating--disabled {
    opacity: 0.5;
  }

  .rating--disabled .rating__symbols {
    cursor: not-allowed;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    .rating__symbol--active {
      color: SelectedItem;
    }
  }
`;var Os="important",Rl=" !"+Os,lt=qt(class extends Ot{constructor(t){if(super(t),t.type!==_t.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{let r=t[o];return r==null?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[e]){let{style:o}=t.element;if(this.ut===void 0)return this.ut=new Set(Object.keys(e)),this.render(e);for(let r of this.ut)e[r]==null&&(this.ut.delete(r),r.includes("-")?o.removeProperty(r):o[r]=null);for(let r in e){let i=e[r];if(i!=null){this.ut.add(r);let a=typeof i=="string"&&i.endsWith(Rl);r.includes("-")||a?o.setProperty(r,a?i.slice(0,-11):i,a?Os:""):o[r]=i}}return ft}});var bt=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.hoverValue=0,this.isHovering=!1,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=!1,this.disabled=!1,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>'}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){let e=this.localize.dir()==="rtl",{left:o,right:r,width:i}=this.rating.getBoundingClientRect(),a=e?this.roundToPrecision((r-t)/i*this.max,this.precision):this.roundToPrecision((t-o)/i*this.max,this.precision);return Z(a,0,this.max)}handleClick(t){this.disabled||(this.setValue(this.getValueFromMousePosition(t)),this.emit("sl-change"))}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=!1)}handleKeyDown(t){let e=this.localize.dir()==="ltr",o=this.localize.dir()==="rtl",r=this.value;if(!(this.disabled||this.readonly)){if(t.key==="ArrowDown"||e&&t.key==="ArrowLeft"||o&&t.key==="ArrowRight"){let i=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-i),t.preventDefault()}if(t.key==="ArrowUp"||e&&t.key==="ArrowRight"||o&&t.key==="ArrowLeft"){let i=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+i),t.preventDefault()}t.key==="Home"&&(this.value=0,t.preventDefault()),t.key==="End"&&(this.value=this.max,t.preventDefault()),this.value!==r&&this.emit("sl-change")}}handleMouseEnter(t){this.isHovering=!0,this.hoverValue=this.getValueFromMousePosition(t)}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t)}handleMouseLeave(){this.isHovering=!1}handleTouchStart(t){this.isHovering=!0,this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault()}handleTouchMove(t){this.hoverValue=this.getValueFromTouchPosition(t)}handleTouchEnd(t){this.isHovering=!1,this.setValue(this.hoverValue),this.emit("sl-change"),t.preventDefault()}roundToPrecision(t,e=.5){let o=1/e;return Math.ceil(t*o)/o}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}})}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}})}focus(t){this.rating.focus(t)}blur(){this.rating.blur()}render(){let t=this.localize.dir()==="rtl",e=Array.from(Array(this.max).keys()),o=0;return this.disabled||this.readonly?o=this.value:o=this.isHovering?this.hoverValue:this.value,m`
      <div
        part="base"
        class=${z({rating:!0,"rating--readonly":this.readonly,"rating--disabled":this.disabled,"rating--rtl":t})}
        role="slider"
        aria-label=${this.label}
        aria-disabled=${this.disabled?"true":"false"}
        aria-readonly=${this.readonly?"true":"false"}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled?"-1":"0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols">
          ${e.map(r=>o>r&&o<r+1?m`
                <span
                  class=${z({rating__symbol:!0,"rating__partial-symbol-container":!0,"rating__symbol--hover":this.isHovering&&Math.ceil(o)===r+1})}
                  role="presentation"
                >
                  <div
                    style=${lt({clipPath:t?`inset(0 ${(o-r)*100}% 0 0)`:`inset(0 0 0 ${(o-r)*100}%)`})}
                  >
                    ${Qe(this.getSymbol(r+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${lt({clipPath:t?`inset(0 0 0 ${100-(o-r)*100}%)`:`inset(0 ${100-(o-r)*100}% 0 0)`})}
                  >
                    ${Qe(this.getSymbol(r+1))}
                  </div>
                </span>
              `:m`
              <span
                class=${z({rating__symbol:!0,"rating__symbol--hover":this.isHovering&&Math.ceil(o)===r+1,"rating__symbol--active":o>=r+1})}
                role="presentation"
              >
                ${Qe(this.getSymbol(r+1))}
              </span>
            `)}
        </span>
      </div>
    `}};bt.styles=[C,Ds];bt.dependencies={"sl-icon":R};s([k(".rating")],bt.prototype,"rating",2);s([E()],bt.prototype,"hoverValue",2);s([E()],bt.prototype,"isHovering",2);s([l()],bt.prototype,"label",2);s([l({type:Number})],bt.prototype,"value",2);s([l({type:Number})],bt.prototype,"max",2);s([l({type:Number})],bt.prototype,"precision",2);s([l({type:Boolean,reflect:!0})],bt.prototype,"readonly",2);s([l({type:Boolean,reflect:!0})],bt.prototype,"disabled",2);s([l()],bt.prototype,"getSymbol",2);s([Ne({passive:!0})],bt.prototype,"handleTouchMove",1);s([y("hoverValue")],bt.prototype,"handleHoverValueChange",1);s([y("isHovering")],bt.prototype,"handleIsHoveringChange",1);bt.define("sl-rating");var Fl=[{max:276e4,value:6e4,unit:"minute"},{max:72e6,value:36e5,unit:"hour"},{max:5184e5,value:864e5,unit:"day"},{max:24192e5,value:6048e5,unit:"week"},{max:28512e6,value:2592e6,unit:"month"},{max:1/0,value:31536e6,unit:"year"}],pe=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.isoTime="",this.relativeTime="",this.titleTime="",this.date=new Date,this.format="long",this.numeric="auto",this.sync=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.updateTimeout)}render(){let t=new Date,e=new Date(this.date);if(isNaN(e.getMilliseconds()))return this.relativeTime="",this.isoTime="","";let o=e.getTime()-t.getTime(),{unit:r,value:i}=Fl.find(a=>Math.abs(o)<a.max);if(this.isoTime=e.toISOString(),this.titleTime=this.localize.date(e,{month:"long",year:"numeric",day:"numeric",hour:"numeric",minute:"numeric",timeZoneName:"short"}),this.relativeTime=this.localize.relativeTime(Math.round(o/i),r,{numeric:this.numeric,style:this.format}),clearTimeout(this.updateTimeout),this.sync){let a;r==="minute"?a=ir("second"):r==="hour"?a=ir("minute"):r==="day"?a=ir("hour"):a=ir("day"),this.updateTimeout=window.setTimeout(()=>this.requestUpdate(),a)}return m` <time datetime=${this.isoTime} title=${this.titleTime}>${this.relativeTime}</time> `}};s([E()],pe.prototype,"isoTime",2);s([E()],pe.prototype,"relativeTime",2);s([E()],pe.prototype,"titleTime",2);s([l()],pe.prototype,"date",2);s([l()],pe.prototype,"format",2);s([l()],pe.prototype,"numeric",2);s([l({type:Boolean})],pe.prototype,"sync",2);function ir(t){let o={second:1e3,minute:6e4,hour:36e5,day:864e5}[t];return o-Date.now()%o}pe.define("sl-relative-time");var sr=_`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button[checked]]) {
    z-index: 2;
  }
`;var Ps=_`
  ${sr}

  .button__prefix,
  .button__suffix,
  .button__label {
    display: inline-flex;
    position: relative;
    align-items: center;
  }

  /* We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
    We can't actually hide it, though, otherwise the messages will be suppressed by the browser. */
  .hidden-input {
    all: unset;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: dotted 1px red;
    opacity: 0;
    z-index: -1;
  }
`;var Rt=class extends v{constructor(){super(...arguments),this.hasSlotController=new Y(this,"[default]","prefix","suffix"),this.hasFocus=!1,this.checked=!1,this.disabled=!1,this.size="medium",this.pill=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleClick(t){if(this.disabled){t.preventDefault(),t.stopPropagation();return}this.checked=!0}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){return be`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked?" button--checked":""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${z({button:!0,"button--default":!0,"button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":!0,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
          aria-disabled=${this.disabled}
          type="button"
          value=${A(this.value)}
          tabindex="${this.checked?"0":"-1"}"
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `}};Rt.styles=[C,Ps];s([k(".button")],Rt.prototype,"input",2);s([k(".hidden-input")],Rt.prototype,"hiddenInput",2);s([E()],Rt.prototype,"hasFocus",2);s([l({type:Boolean,reflect:!0})],Rt.prototype,"checked",2);s([l()],Rt.prototype,"value",2);s([l({type:Boolean,reflect:!0})],Rt.prototype,"disabled",2);s([l({reflect:!0})],Rt.prototype,"size",2);s([l({type:Boolean,reflect:!0})],Rt.prototype,"pill",2);s([y("disabled",{waitUntilFirstUpdate:!0})],Rt.prototype,"handleDisabledChange",1);Rt.define("sl-radio-button");var Ms=_`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;var Rs=_`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;var oe=class extends v{constructor(){super(...arguments),this.disableRole=!1,this.label=""}handleFocus(t){let e=ko(t.target);e?.toggleAttribute("data-sl-button-group__button--focus",!0)}handleBlur(t){let e=ko(t.target);e?.toggleAttribute("data-sl-button-group__button--focus",!1)}handleMouseOver(t){let e=ko(t.target);e?.toggleAttribute("data-sl-button-group__button--hover",!0)}handleMouseOut(t){let e=ko(t.target);e?.toggleAttribute("data-sl-button-group__button--hover",!1)}handleSlotChange(){let t=[...this.defaultSlot.assignedElements({flatten:!0})];t.forEach(e=>{let o=t.indexOf(e),r=ko(e);r&&(r.toggleAttribute("data-sl-button-group__button",!0),r.toggleAttribute("data-sl-button-group__button--first",o===0),r.toggleAttribute("data-sl-button-group__button--inner",o>0&&o<t.length-1),r.toggleAttribute("data-sl-button-group__button--last",o===t.length-1),r.toggleAttribute("data-sl-button-group__button--radio",r.tagName.toLowerCase()==="sl-radio-button"))})}render(){return m`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};oe.styles=[C,Rs];s([k("slot")],oe.prototype,"defaultSlot",2);s([E()],oe.prototype,"disableRole",2);s([l()],oe.prototype,"label",2);function ko(t){var e;let o="sl-button, sl-radio-button";return(e=t.closest(o))!=null?e:t.querySelector(o)}var mt=class extends v{constructor(){super(...arguments),this.formControlController=new ut(this),this.hasSlotController=new Y(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=!1,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=!1}get validity(){let t=this.required&&!this.value;return this.customValidityMessage!==""?li:t?ai:Ve}get validationMessage(){let t=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value}firstUpdated(){this.formControlController.updateValidity()}getAllRadios(){return[...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){let e=t.target.closest("sl-radio, sl-radio-button"),o=this.getAllRadios(),r=this.value;e.disabled||(this.value=e.value,o.forEach(i=>i.checked=i===e),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")))}handleKeyDown(t){var e;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;let o=this.getAllRadios().filter(d=>!d.disabled),r=(e=o.find(d=>d.checked))!=null?e:o[0],i=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,a=this.value,n=o.indexOf(r)+i;n<0&&(n=o.length-1),n>o.length-1&&(n=0),this.getAllRadios().forEach(d=>{d.checked=!1,this.hasButtonGroup||(d.tabIndex=-1)}),this.value=o[n].value,o[n].checked=!0,this.hasButtonGroup?o[n].shadowRoot.querySelector("button").focus():(o[n].tabIndex=0,o[n].focus()),this.value!==a&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault()}handleLabelClick(){let t=this.getAllRadios(),o=t.find(r=>r.checked)||t[0];o&&o.focus()}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}async syncRadioElements(){var t,e;let o=this.getAllRadios();if(await Promise.all(o.map(async r=>{await r.updateComplete,r.checked=r.value===this.value,r.size=this.size})),this.hasButtonGroup=o.some(r=>r.tagName.toLowerCase()==="sl-radio-button"),o.length>0&&!o.some(r=>r.checked))if(this.hasButtonGroup){let r=(t=o[0].shadowRoot)==null?void 0:t.querySelector("button");r&&(r.tabIndex=0)}else o[0].tabIndex=0;if(this.hasButtonGroup){let r=(e=this.shadowRoot)==null?void 0:e.querySelector("sl-button-group");r&&(r.disableRole=!0)}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios())}updateCheckedRadio(){this.getAllRadios().forEach(e=>e.checked=e.value===this.value),this.formControlController.setValidity(this.validity.valid)}handleSizeChange(){this.syncRadios()}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio()}checkValidity(){let t=this.required&&!this.value,e=this.customValidityMessage!=="";return t||e?(this.formControlController.emitInvalidEvent(),!1):!0}getForm(){return this.formControlController.getForm()}reportValidity(){let t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=!0,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=!1,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=!0,1e4)),t}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=this.label?!0:!!t,r=this.helpText?!0:!!e,i=m`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return m`
      <fieldset
        part="form-control"
        class=${z({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--radio-group":!0,"form-control--has-label":o,"form-control--has-help-text":r})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup?m`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${i}
                </sl-button-group>
              `:i}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `}};mt.styles=[C,St,Ms];mt.dependencies={"sl-button-group":oe};s([k("slot:not([name])")],mt.prototype,"defaultSlot",2);s([k(".radio-group__validation-input")],mt.prototype,"validationInput",2);s([E()],mt.prototype,"hasButtonGroup",2);s([E()],mt.prototype,"errorMessage",2);s([E()],mt.prototype,"defaultValue",2);s([l()],mt.prototype,"label",2);s([l({attribute:"help-text"})],mt.prototype,"helpText",2);s([l()],mt.prototype,"name",2);s([l({reflect:!0})],mt.prototype,"value",2);s([l({reflect:!0})],mt.prototype,"size",2);s([l({reflect:!0})],mt.prototype,"form",2);s([l({type:Boolean,reflect:!0})],mt.prototype,"required",2);s([y("size",{waitUntilFirstUpdate:!0})],mt.prototype,"handleSizeChange",1);s([y("value")],mt.prototype,"handleValueChange",1);mt.define("sl-radio-group");var Fs=_`
  :host {
    --size: 128px;
    --track-width: 4px;
    --track-color: var(--sl-color-neutral-200);
    --indicator-width: var(--track-width);
    --indicator-color: var(--sl-color-primary-600);
    --indicator-transition-duration: 0.35s;

    display: inline-flex;
  }

  .progress-ring {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .progress-ring__image {
    width: var(--size);
    height: var(--size);
    rotate: -90deg;
    transform-origin: 50% 50%;
  }

  .progress-ring__track,
  .progress-ring__indicator {
    --radius: calc(var(--size) / 2 - max(var(--track-width), var(--indicator-width)) * 0.5);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    fill: none;
    r: var(--radius);
    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
  }

  .progress-ring__track {
    stroke: var(--track-color);
    stroke-width: var(--track-width);
  }

  .progress-ring__indicator {
    stroke: var(--indicator-color);
    stroke-width: var(--indicator-width);
    stroke-linecap: round;
    transition-property: stroke-dashoffset;
    transition-duration: var(--indicator-transition-duration);
    stroke-dasharray: var(--circumference) var(--circumference);
    stroke-dashoffset: calc(var(--circumference) - var(--percentage) * var(--circumference));
  }

  .progress-ring__label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
  }
`;var Me=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.value=0,this.label=""}updated(t){if(super.updated(t),t.has("value")){let e=parseFloat(getComputedStyle(this.indicator).getPropertyValue("r")),o=2*Math.PI*e,r=o-this.value/100*o;this.indicatorOffset=`${r}px`}}render(){return m`
      <div
        part="base"
        class="progress-ring"
        role="progressbar"
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-describedby="label"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style="--percentage: ${this.value/100}"
      >
        <svg class="progress-ring__image">
          <circle class="progress-ring__track"></circle>
          <circle class="progress-ring__indicator" style="stroke-dashoffset: ${this.indicatorOffset}"></circle>
        </svg>

        <slot id="label" part="label" class="progress-ring__label"></slot>
      </div>
    `}};Me.styles=[C,Fs];s([k(".progress-ring__indicator")],Me.prototype,"indicator",2);s([E()],Me.prototype,"indicatorOffset",2);s([l({type:Number,reflect:!0})],Me.prototype,"value",2);s([l()],Me.prototype,"label",2);Me.define("sl-progress-ring");var Bs=_`
  :host {
    display: inline-block;
  }
`;var Vs=null,ar=class{};ar.render=function(t,e){Vs(t,e)};self.QrCreator=ar;(function(t){function e(d,c,p,g){var h={},u=t(p,c);u.u(d),u.J(),g=g||0;var f=u.h(),b=u.h()+2*g;return h.text=d,h.level=c,h.version=p,h.O=b,h.a=function(w,L){return w-=g,L-=g,0>w||w>=f||0>L||L>=f?!1:u.a(w,L)},h}function o(d,c,p,g,h,u,f,b,w,L){function O($,T,x,S,I,B,H){$?(d.lineTo(T+B,x+H),d.arcTo(T,x,S,I,u)):d.lineTo(T,x)}f?d.moveTo(c+u,p):d.moveTo(c,p),O(b,g,p,g,h,-u,0),O(w,g,h,c,h,0,-u),O(L,c,h,c,p,u,0),O(f,c,p,g,p,0,u)}function r(d,c,p,g,h,u,f,b,w,L){function O($,T,x,S){d.moveTo($+x,T),d.lineTo($,T),d.lineTo($,T+S),d.arcTo($,T,$+x,T,u)}f&&O(c,p,u,u),b&&O(g,p,-u,u),w&&O(g,h,-u,-u),L&&O(c,h,u,-u)}function i(d,c){var p=c.fill;if(typeof p=="string")d.fillStyle=p;else{var g=p.type,h=p.colorStops;if(p=p.position.map(f=>Math.round(f*c.size)),g==="linear-gradient")var u=d.createLinearGradient.apply(d,p);else if(g==="radial-gradient")u=d.createRadialGradient.apply(d,p);else throw Error("Unsupported fill");h.forEach(([f,b])=>{u.addColorStop(f,b)}),d.fillStyle=u}}function a(d,c){t:{var p=c.text,g=c.v,h=c.N,u=c.K,f=c.P;for(h=Math.max(1,h||1),u=Math.min(40,u||40);h<=u;h+=1)try{var b=e(p,g,h,f);break t}catch{}b=void 0}if(!b)return null;for(p=d.getContext("2d"),c.background&&(p.fillStyle=c.background,p.fillRect(c.left,c.top,c.size,c.size)),g=b.O,u=c.size/g,p.beginPath(),f=0;f<g;f+=1)for(h=0;h<g;h+=1){var w=p,L=c.left+h*u,O=c.top+f*u,$=f,T=h,x=b.a,S=L+u,I=O+u,B=$-1,H=$+1,M=T-1,P=T+1,vt=Math.floor(Math.min(.5,Math.max(0,c.R))*u),rt=x($,T),It=x(B,M),ht=x(B,T);B=x(B,P);var xt=x($,P);P=x(H,P),T=x(H,T),H=x(H,M),$=x($,M),L=Math.round(L),O=Math.round(O),S=Math.round(S),I=Math.round(I),rt?o(w,L,O,S,I,vt,!ht&&!$,!ht&&!xt,!T&&!xt,!T&&!$):r(w,L,O,S,I,vt,ht&&$&&It,ht&&xt&&B,T&&xt&&P,T&&$&&H)}return i(p,c),p.fill(),d}var n={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};Vs=function(d,c){var p={};Object.assign(p,n,d),p.N=p.minVersion,p.K=p.maxVersion,p.v=p.ecLevel,p.left=p.left,p.top=p.top,p.size=p.size,p.fill=p.fill,p.background=p.background,p.text=p.text,p.R=p.radius,p.P=p.quiet,c instanceof HTMLCanvasElement?((c.width!==p.size||c.height!==p.size)&&(c.width=p.size,c.height=p.size),c.getContext("2d").clearRect(0,0,c.width,c.height),a(c,p)):(d=document.createElement("canvas"),d.width=p.size,d.height=p.size,p=a(d,p),c.appendChild(p))}})(function(){function t(c){var p=o.s(c);return{S:function(){return 4},b:function(){return p.length},write:function(g){for(var h=0;h<p.length;h+=1)g.put(p[h],8)}}}function e(){var c=[],p=0,g={B:function(){return c},c:function(h){return(c[Math.floor(h/8)]>>>7-h%8&1)==1},put:function(h,u){for(var f=0;f<u;f+=1)g.m((h>>>u-f-1&1)==1)},f:function(){return p},m:function(h){var u=Math.floor(p/8);c.length<=u&&c.push(0),h&&(c[u]|=128>>>p%8),p+=1}};return g}function o(c,p){function g($,T){for(var x=-1;7>=x;x+=1)if(!(-1>=$+x||b<=$+x))for(var S=-1;7>=S;S+=1)-1>=T+S||b<=T+S||(f[$+x][T+S]=0<=x&&6>=x&&(S==0||S==6)||0<=S&&6>=S&&(x==0||x==6)||2<=x&&4>=x&&2<=S&&4>=S)}function h($,T){for(var x=b=4*c+17,S=Array(x),I=0;I<x;I+=1){S[I]=Array(x);for(var B=0;B<x;B+=1)S[I][B]=null}for(f=S,g(0,0),g(b-7,0),g(0,b-7),x=a.G(c),S=0;S<x.length;S+=1)for(I=0;I<x.length;I+=1){B=x[S];var H=x[I];if(f[B][H]==null)for(var M=-2;2>=M;M+=1)for(var P=-2;2>=P;P+=1)f[B+M][H+P]=M==-2||M==2||P==-2||P==2||M==0&&P==0}for(x=8;x<b-8;x+=1)f[x][6]==null&&(f[x][6]=x%2==0);for(x=8;x<b-8;x+=1)f[6][x]==null&&(f[6][x]=x%2==0);for(x=a.w(u<<3|T),S=0;15>S;S+=1)I=!$&&(x>>S&1)==1,f[6>S?S:8>S?S+1:b-15+S][8]=I,f[8][8>S?b-S-1:9>S?15-S:14-S]=I;if(f[b-8][8]=!$,7<=c){for(x=a.A(c),S=0;18>S;S+=1)I=!$&&(x>>S&1)==1,f[Math.floor(S/3)][S%3+b-8-3]=I;for(S=0;18>S;S+=1)I=!$&&(x>>S&1)==1,f[S%3+b-8-3][Math.floor(S/3)]=I}if(w==null){for($=d.I(c,u),x=e(),S=0;S<L.length;S+=1)I=L[S],x.put(4,4),x.put(I.b(),a.f(4,c)),I.write(x);for(S=I=0;S<$.length;S+=1)I+=$[S].j;if(x.f()>8*I)throw Error("code length overflow. ("+x.f()+">"+8*I+")");for(x.f()+4<=8*I&&x.put(0,4);x.f()%8!=0;)x.m(!1);for(;!(x.f()>=8*I)&&(x.put(236,8),!(x.f()>=8*I));)x.put(17,8);var vt=0;for(I=S=0,B=Array($.length),H=Array($.length),M=0;M<$.length;M+=1){var rt=$[M].j,It=$[M].o-rt;for(S=Math.max(S,rt),I=Math.max(I,It),B[M]=Array(rt),P=0;P<B[M].length;P+=1)B[M][P]=255&x.B()[P+vt];for(vt+=rt,P=a.C(It),rt=r(B[M],P.b()-1).l(P),H[M]=Array(P.b()-1),P=0;P<H[M].length;P+=1)It=P+rt.b()-H[M].length,H[M][P]=0<=It?rt.c(It):0}for(P=x=0;P<$.length;P+=1)x+=$[P].o;for(x=Array(x),P=vt=0;P<S;P+=1)for(M=0;M<$.length;M+=1)P<B[M].length&&(x[vt]=B[M][P],vt+=1);for(P=0;P<I;P+=1)for(M=0;M<$.length;M+=1)P<H[M].length&&(x[vt]=H[M][P],vt+=1);w=x}for($=w,x=-1,S=b-1,I=7,B=0,T=a.F(T),H=b-1;0<H;H-=2)for(H==6&&--H;;){for(M=0;2>M;M+=1)f[S][H-M]==null&&(P=!1,B<$.length&&(P=($[B]>>>I&1)==1),T(S,H-M)&&(P=!P),f[S][H-M]=P,--I,I==-1&&(B+=1,I=7));if(S+=x,0>S||b<=S){S-=x,x=-x;break}}}var u=i[p],f=null,b=0,w=null,L=[],O={u:function($){$=t($),L.push($),w=null},a:function($,T){if(0>$||b<=$||0>T||b<=T)throw Error($+","+T);return f[$][T]},h:function(){return b},J:function(){for(var $=0,T=0,x=0;8>x;x+=1){h(!0,x);var S=a.D(O);(x==0||$>S)&&($=S,T=x)}h(!1,T)}};return O}function r(c,p){if(typeof c.length>"u")throw Error(c.length+"/"+p);var g=function(){for(var u=0;u<c.length&&c[u]==0;)u+=1;for(var f=Array(c.length-u+p),b=0;b<c.length-u;b+=1)f[b]=c[b+u];return f}(),h={c:function(u){return g[u]},b:function(){return g.length},multiply:function(u){for(var f=Array(h.b()+u.b()-1),b=0;b<h.b();b+=1)for(var w=0;w<u.b();w+=1)f[b+w]^=n.i(n.g(h.c(b))+n.g(u.c(w)));return r(f,0)},l:function(u){if(0>h.b()-u.b())return h;for(var f=n.g(h.c(0))-n.g(u.c(0)),b=Array(h.b()),w=0;w<h.b();w+=1)b[w]=h.c(w);for(w=0;w<u.b();w+=1)b[w]^=n.i(n.g(u.c(w))+f);return r(b,0).l(u)}};return h}o.s=function(c){for(var p=[],g=0;g<c.length;g++){var h=c.charCodeAt(g);128>h?p.push(h):2048>h?p.push(192|h>>6,128|h&63):55296>h||57344<=h?p.push(224|h>>12,128|h>>6&63,128|h&63):(g++,h=65536+((h&1023)<<10|c.charCodeAt(g)&1023),p.push(240|h>>18,128|h>>12&63,128|h>>6&63,128|h&63))}return p};var i={L:1,M:0,Q:3,H:2},a=function(){function c(h){for(var u=0;h!=0;)u+=1,h>>>=1;return u}var p=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],g={w:function(h){for(var u=h<<10;0<=c(u)-c(1335);)u^=1335<<c(u)-c(1335);return(h<<10|u)^21522},A:function(h){for(var u=h<<12;0<=c(u)-c(7973);)u^=7973<<c(u)-c(7973);return h<<12|u},G:function(h){return p[h-1]},F:function(h){switch(h){case 0:return function(u,f){return(u+f)%2==0};case 1:return function(u){return u%2==0};case 2:return function(u,f){return f%3==0};case 3:return function(u,f){return(u+f)%3==0};case 4:return function(u,f){return(Math.floor(u/2)+Math.floor(f/3))%2==0};case 5:return function(u,f){return u*f%2+u*f%3==0};case 6:return function(u,f){return(u*f%2+u*f%3)%2==0};case 7:return function(u,f){return(u*f%3+(u+f)%2)%2==0};default:throw Error("bad maskPattern:"+h)}},C:function(h){for(var u=r([1],0),f=0;f<h;f+=1)u=u.multiply(r([1,n.i(f)],0));return u},f:function(h,u){if(h!=4||1>u||40<u)throw Error("mode: "+h+"; type: "+u);return 10>u?8:16},D:function(h){for(var u=h.h(),f=0,b=0;b<u;b+=1)for(var w=0;w<u;w+=1){for(var L=0,O=h.a(b,w),$=-1;1>=$;$+=1)if(!(0>b+$||u<=b+$))for(var T=-1;1>=T;T+=1)0>w+T||u<=w+T||($!=0||T!=0)&&O==h.a(b+$,w+T)&&(L+=1);5<L&&(f+=3+L-5)}for(b=0;b<u-1;b+=1)for(w=0;w<u-1;w+=1)L=0,h.a(b,w)&&(L+=1),h.a(b+1,w)&&(L+=1),h.a(b,w+1)&&(L+=1),h.a(b+1,w+1)&&(L+=1),(L==0||L==4)&&(f+=3);for(b=0;b<u;b+=1)for(w=0;w<u-6;w+=1)h.a(b,w)&&!h.a(b,w+1)&&h.a(b,w+2)&&h.a(b,w+3)&&h.a(b,w+4)&&!h.a(b,w+5)&&h.a(b,w+6)&&(f+=40);for(w=0;w<u;w+=1)for(b=0;b<u-6;b+=1)h.a(b,w)&&!h.a(b+1,w)&&h.a(b+2,w)&&h.a(b+3,w)&&h.a(b+4,w)&&!h.a(b+5,w)&&h.a(b+6,w)&&(f+=40);for(w=L=0;w<u;w+=1)for(b=0;b<u;b+=1)h.a(b,w)&&(L+=1);return f+=Math.abs(100*L/u/u-50)/5*10}};return g}(),n=function(){for(var c=Array(256),p=Array(256),g=0;8>g;g+=1)c[g]=1<<g;for(g=8;256>g;g+=1)c[g]=c[g-4]^c[g-5]^c[g-6]^c[g-8];for(g=0;255>g;g+=1)p[c[g]]=g;return{g:function(h){if(1>h)throw Error("glog("+h+")");return p[h]},i:function(h){for(;0>h;)h+=255;for(;256<=h;)h-=255;return c[h]}}}(),d=function(){function c(h,u){switch(u){case i.L:return p[4*(h-1)];case i.M:return p[4*(h-1)+1];case i.Q:return p[4*(h-1)+2];case i.H:return p[4*(h-1)+3]}}var p=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],g={I:function(h,u){var f=c(h,u);if(typeof f>"u")throw Error("bad rs block @ typeNumber:"+h+"/errorCorrectLevel:"+u);h=f.length/3,u=[];for(var b=0;b<h;b+=1)for(var w=f[3*b],L=f[3*b+1],O=f[3*b+2],$=0;$<w;$+=1){var T=O,x={};x.o=L,x.j=T,u.push(x)}return u}};return g}();return o}());var Hs=QrCreator;var Ft=class extends v{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H"}firstUpdated(){this.generate()}generate(){this.hasUpdated&&Hs.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:this.size*2},this.canvas)}render(){var t;return m`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${((t=this.label)==null?void 0:t.length)>0?this.label:this.value}
        style=${lt({width:`${this.size}px`,height:`${this.size}px`})}
      ></canvas>
    `}};Ft.styles=[C,Bs];s([k("canvas")],Ft.prototype,"canvas",2);s([l()],Ft.prototype,"value",2);s([l()],Ft.prototype,"label",2);s([l({type:Number})],Ft.prototype,"size",2);s([l()],Ft.prototype,"fill",2);s([l()],Ft.prototype,"background",2);s([l({type:Number})],Ft.prototype,"radius",2);s([l({attribute:"error-correction"})],Ft.prototype,"errorCorrection",2);s([y(["background","errorCorrection","fill","radius","size","value"])],Ft.prototype,"generate",1);Ft.define("sl-qr-code");var Ns=_`
  :host {
    display: block;
  }

  :host(:focus-visible) {
    outline: 0px;
  }

  .radio {
    display: inline-flex;
    align-items: top;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .radio--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .radio--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .radio__checked-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 50%;
    background-color: var(--sl-input-background-color);
    color: transparent;
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked + focus */
  :host(:focus-visible) .radio__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }
`;var jt=class extends v{constructor(){super(),this.checked=!1,this.hasFocus=!1,this.size="medium",this.disabled=!1,this.handleBlur=()=>{this.hasFocus=!1,this.emit("sl-blur")},this.handleClick=()=>{this.disabled||(this.checked=!0)},this.handleFocus=()=>{this.hasFocus=!0,this.emit("sl-focus")},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}render(){return m`
      <span
        part="base"
        class=${z({radio:!0,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":this.size==="small","radio--medium":this.size==="medium","radio--large":this.size==="large"})}
      >
        <span part="${`control${this.checked?" control--checked":""}`}" class="radio__control">
          ${this.checked?m` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};jt.styles=[C,Ns];jt.dependencies={"sl-icon":R};s([E()],jt.prototype,"checked",2);s([E()],jt.prototype,"hasFocus",2);s([l()],jt.prototype,"value",2);s([l({reflect:!0})],jt.prototype,"size",2);s([l({type:Boolean,reflect:!0})],jt.prototype,"disabled",2);s([y("checked")],jt.prototype,"handleCheckedChange",1);s([y("disabled",{waitUntilFirstUpdate:!0})],jt.prototype,"handleDisabledChange",1);jt.define("sl-radio");var Us=_`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;var Mt=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.current=!1,this.selected=!1,this.hasHover=!1,this.value="",this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false")}handleDefaultSlotChange(){let t=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=t;return}t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}handleMouseEnter(){this.hasHover=!0}handleMouseLeave(){this.hasHover=!1}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"))}getTextLabel(){let t=this.childNodes,e="";return[...t].forEach(o=>{o.nodeType===Node.ELEMENT_NODE&&(o.hasAttribute("slot")||(e+=o.textContent)),o.nodeType===Node.TEXT_NODE&&(e+=o.textContent)}),e.trim()}render(){return m`
      <div
        part="base"
        class=${z({option:!0,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};Mt.styles=[C,Us];Mt.dependencies={"sl-icon":R};s([k(".option__label")],Mt.prototype,"defaultSlot",2);s([E()],Mt.prototype,"current",2);s([E()],Mt.prototype,"selected",2);s([E()],Mt.prototype,"hasHover",2);s([l({reflect:!0})],Mt.prototype,"value",2);s([l({type:Boolean,reflect:!0})],Mt.prototype,"disabled",2);s([y("disabled")],Mt.prototype,"handleDisabledChange",1);s([y("selected")],Mt.prototype,"handleSelectedChange",1);s([y("value")],Mt.prototype,"handleValueChange",1);Mt.define("sl-option");var qs=_`
  :host {
    --height: 1rem;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);
    --label-color: var(--sl-color-neutral-0);

    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset var(--sl-shadow-small);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: var(--sl-font-sans);
    font-size: 12px;
    font-weight: var(--sl-font-weight-normal);
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition:
      400ms width,
      400ms background-color;
    user-select: none;
    -webkit-user-select: none;
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  .progress-bar--indeterminate.progress-bar--rtl .progress-bar__indicator {
    animation-name: indeterminate-rtl;
  }

  @media (forced-colors: active) {
    .progress-bar {
      outline: solid 1px SelectedItem;
      background-color: var(--sl-color-neutral-0);
    }

    .progress-bar__indicator {
      outline: solid 1px SelectedItem;
      background-color: SelectedItem;
    }
  }

  @keyframes indeterminate {
    0% {
      left: -50%;
      width: 50%;
    }
    75%,
    100% {
      left: 100%;
      width: 50%;
    }
  }

  @keyframes indeterminate-rtl {
    0% {
      right: -50%;
      width: 50%;
    }
    75%,
    100% {
      right: 100%;
      width: 50%;
    }
  }
`;var Ze=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.value=0,this.indeterminate=!1,this.label=""}render(){return m`
      <div
        part="base"
        class=${z({"progress-bar":!0,"progress-bar--indeterminate":this.indeterminate,"progress-bar--rtl":this.localize.dir()==="rtl"})}
        role="progressbar"
        title=${A(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?0:this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${lt({width:`${this.value}%`})}>
          ${this.indeterminate?"":m` <slot part="label" class="progress-bar__label"></slot> `}
        </div>
      </div>
    `}};Ze.styles=[C,qs];s([l({type:Number,reflect:!0})],Ze.prototype,"value",2);s([l({type:Boolean,reflect:!0})],Ze.prototype,"indeterminate",2);s([l()],Ze.prototype,"label",2);Ze.define("sl-progress-bar");N.define("sl-popup");var Ws=_`
  :host {
    display: block;
  }

  .menu-label {
    display: inline-block;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-large);
    user-select: none;
    -webkit-user-select: none;
  }
`;var Hr=class extends v{render(){return m` <slot part="base" class="menu-label"></slot> `}};Hr.styles=[C,Ws];Hr.define("sl-menu-label");var js=_`
  :host {
    display: contents;
  }
`;var Kt=class extends v{constructor(){super(...arguments),this.attrOldValue=!1,this.charData=!1,this.charDataOldValue=!1,this.childList=!1,this.disabled=!1,this.handleMutation=t=>{this.emit("sl-mutation",{detail:{mutationList:t}})}}connectedCallback(){super.connectedCallback(),this.mutationObserver=new MutationObserver(this.handleMutation),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}startObserver(){let t=typeof this.attr=="string"&&this.attr.length>0,e=t&&this.attr!=="*"?this.attr.split(" "):void 0;try{this.mutationObserver.observe(this,{subtree:!0,childList:this.childList,attributes:t,attributeFilter:e,attributeOldValue:this.attrOldValue,characterData:this.charData,characterDataOldValue:this.charDataOldValue})}catch{}}stopObserver(){this.mutationObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}handleChange(){this.stopObserver(),this.startObserver()}render(){return m` <slot></slot> `}};Kt.styles=[C,js];s([l({reflect:!0})],Kt.prototype,"attr",2);s([l({attribute:"attr-old-value",type:Boolean,reflect:!0})],Kt.prototype,"attrOldValue",2);s([l({attribute:"char-data",type:Boolean,reflect:!0})],Kt.prototype,"charData",2);s([l({attribute:"char-data-old-value",type:Boolean,reflect:!0})],Kt.prototype,"charDataOldValue",2);s([l({attribute:"child-list",type:Boolean,reflect:!0})],Kt.prototype,"childList",2);s([l({type:Boolean,reflect:!0})],Kt.prototype,"disabled",2);s([y("disabled")],Kt.prototype,"handleDisabledChange",1);s([y("attr",{waitUntilFirstUpdate:!0}),y("attr-old-value",{waitUntilFirstUpdate:!0}),y("char-data",{waitUntilFirstUpdate:!0}),y("char-data-old-value",{waitUntilFirstUpdate:!0}),y("childList",{waitUntilFirstUpdate:!0})],Kt.prototype,"handleChange",1);Kt.define("sl-mutation-observer");var Ks=_`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;var F=class extends v{constructor(){super(...arguments),this.formControlController=new ut(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Y(this,"help-text","label"),this.localize=new D(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleKeyDown(t){let e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!e&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,r="preserve"){let i=e??this.input.selectionStart,a=o??this.input.selectionEnd;this.input.setRangeText(t,i,a,r),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=this.label?!0:!!t,r=this.helpText?!0:!!e,a=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return m`
      <div
        part="form-control"
        class=${z({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":o,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${z({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${A(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${A(this.placeholder)}
              minlength=${A(this.minlength)}
              maxlength=${A(this.maxlength)}
              min=${A(this.min)}
              max=${A(this.max)}
              step=${A(this.step)}
              .value=${Pt(this.value)}
              autocapitalize=${A(this.autocapitalize)}
              autocomplete=${A(this.autocomplete)}
              autocorrect=${A(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${A(this.pattern)}
              enterkeyhint=${A(this.enterkeyhint)}
              inputmode=${A(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${a?m`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?m`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?m`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:m`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};F.styles=[C,St,Ks];F.dependencies={"sl-icon":R};s([k(".input__control")],F.prototype,"input",2);s([E()],F.prototype,"hasFocus",2);s([l()],F.prototype,"title",2);s([l({reflect:!0})],F.prototype,"type",2);s([l()],F.prototype,"name",2);s([l()],F.prototype,"value",2);s([Ct()],F.prototype,"defaultValue",2);s([l({reflect:!0})],F.prototype,"size",2);s([l({type:Boolean,reflect:!0})],F.prototype,"filled",2);s([l({type:Boolean,reflect:!0})],F.prototype,"pill",2);s([l()],F.prototype,"label",2);s([l({attribute:"help-text"})],F.prototype,"helpText",2);s([l({type:Boolean})],F.prototype,"clearable",2);s([l({type:Boolean,reflect:!0})],F.prototype,"disabled",2);s([l()],F.prototype,"placeholder",2);s([l({type:Boolean,reflect:!0})],F.prototype,"readonly",2);s([l({attribute:"password-toggle",type:Boolean})],F.prototype,"passwordToggle",2);s([l({attribute:"password-visible",type:Boolean})],F.prototype,"passwordVisible",2);s([l({attribute:"no-spin-buttons",type:Boolean})],F.prototype,"noSpinButtons",2);s([l({reflect:!0})],F.prototype,"form",2);s([l({type:Boolean,reflect:!0})],F.prototype,"required",2);s([l()],F.prototype,"pattern",2);s([l({type:Number})],F.prototype,"minlength",2);s([l({type:Number})],F.prototype,"maxlength",2);s([l()],F.prototype,"min",2);s([l()],F.prototype,"max",2);s([l()],F.prototype,"step",2);s([l()],F.prototype,"autocapitalize",2);s([l()],F.prototype,"autocorrect",2);s([l()],F.prototype,"autocomplete",2);s([l({type:Boolean})],F.prototype,"autofocus",2);s([l()],F.prototype,"enterkeyhint",2);s([l({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],F.prototype,"spellcheck",2);s([l()],F.prototype,"inputmode",2);s([y("disabled",{waitUntilFirstUpdate:!0})],F.prototype,"handleDisabledChange",1);s([y("step",{waitUntilFirstUpdate:!0})],F.prototype,"handleStepChange",1);s([y("value",{waitUntilFirstUpdate:!0})],F.prototype,"handleValueChange",1);F.define("sl-input");var Xs=_`
  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`;var lr=class extends v{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(t){let e=["menuitem","menuitemcheckbox"],o=t.composedPath().find(i=>{var a;return e.includes(((a=i?.getAttribute)==null?void 0:a.call(i,"role"))||"")});if(!o)return;let r=o;r.type==="checkbox"&&(r.checked=!r.checked),this.emit("sl-select",{detail:{item:r}})}handleKeyDown(t){if(t.key==="Enter"||t.key===" "){let e=this.getCurrentItem();t.preventDefault(),t.stopPropagation(),e?.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(t.key)){let e=this.getAllItems(),o=this.getCurrentItem(),r=o?e.indexOf(o):0;e.length>0&&(t.preventDefault(),t.stopPropagation(),t.key==="ArrowDown"?r++:t.key==="ArrowUp"?r--:t.key==="Home"?r=0:t.key==="End"&&(r=e.length-1),r<0&&(r=e.length-1),r>e.length-1&&(r=0),this.setCurrentItem(e[r]),e[r].focus())}}handleMouseDown(t){let e=t.target;this.isMenuItem(e)&&this.setCurrentItem(e)}handleSlotChange(){let t=this.getAllItems();t.length>0&&this.setCurrentItem(t[0])}isMenuItem(t){var e;return t.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((e=t.getAttribute("role"))!=null?e:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(t=>!(t.inert||!this.isMenuItem(t)))}getCurrentItem(){return this.getAllItems().find(t=>t.getAttribute("tabindex")==="0")}setCurrentItem(t){this.getAllItems().forEach(o=>{o.setAttribute("tabindex",o===t?"0":"-1")})}render(){return m`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};lr.styles=[C,Xs];s([k("slot")],lr.prototype,"defaultSlot",2);lr.define("sl-menu");var Ys=_`
  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;var Co=(t,e)=>{let o=t._$AN;if(o===void 0)return!1;for(let r of o)r._$AO?.(e,!1),Co(r,e);return!0},nr=t=>{let e,o;do{if((e=t._$AM)===void 0)break;o=e._$AN,o.delete(t),t=e}while(o?.size===0)},Gs=t=>{for(let e;e=t._$AM;t=e){let o=e._$AN;if(o===void 0)e._$AN=o=new Set;else if(o.has(t))break;o.add(t),Hl(e)}};function Bl(t){this._$AN!==void 0?(nr(this),this._$AM=t,Gs(this)):this._$AM=t}function Vl(t,e=!1,o=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(e)if(Array.isArray(r))for(let a=o;a<r.length;a++)Co(r[a],!1),nr(r[a]);else r!=null&&(Co(r,!1),nr(r));else Co(this,t)}var Hl=t=>{t.type==_t.CHILD&&(t._$AP??=Vl,t._$AQ??=Bl)},cr=class extends Ot{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,o,r){super._$AT(e,o,r),Gs(this),this.isConnected=e._$AU}_$AO(e,o=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),o&&(Co(this,e),nr(this))}setValue(e){if(er(this._$Ct))this._$Ct._$AI(e,this);else{let o=[...this._$Ct._$AH];o[this._$Ci]=e,this._$Ct._$AI(o,this,0)}}disconnected(){}reconnected(){}};var Qs=()=>new Ur,Ur=class{},Nr=new WeakMap,Zs=qt(class extends cr{render(t){return G}update(t,[e]){let o=e!==this.G;return o&&this.G!==void 0&&this.ot(void 0),(o||this.rt!==this.lt)&&(this.G=e,this.ct=t.options?.host,this.ot(this.lt=t.element)),G}ot(t){if(typeof this.G=="function"){let e=this.ct??globalThis,o=Nr.get(e);o===void 0&&(o=new WeakMap,Nr.set(e,o)),o.get(this.G)!==void 0&&this.G.call(this.ct,void 0),o.set(this.G,t),t!==void 0&&this.G.call(this.ct,t)}else this.G.value=t}get rt(){return typeof this.G=="function"?Nr.get(this.ct??globalThis)?.get(this.G):this.G?.value}disconnected(){this.rt===this.lt&&this.ot(void 0)}reconnected(){this.ot(this.lt)}});var Js=class{constructor(t,e,o){this.popupRef=Qs(),this.enableSubmenuTimer=-1,this.isConnected=!1,this.isPopupConnected=!1,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=r=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${r.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${r.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=r=>{switch(r.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":r.target!==this.host&&(r.preventDefault(),r.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(r);break;default:break}},this.handleClick=r=>{var i;r.target===this.host?(r.preventDefault(),r.stopPropagation()):r.target instanceof Element&&(r.target.tagName==="sl-menu-item"||(i=r.target.role)!=null&&i.startsWith("menuitem"))&&this.disableSubmenu()},this.handleFocusOut=r=>{r.relatedTarget&&r.relatedTarget instanceof Element&&this.host.contains(r.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=r=>{r.stopPropagation()},this.handlePopupReposition=()=>{let r=this.host.renderRoot.querySelector("slot[name='submenu']"),i=r?.assignedElements({flatten:!0}).filter(g=>g.localName==="sl-menu")[0],a=this.localize.dir()==="rtl";if(!i)return;let{left:n,top:d,width:c,height:p}=i.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${a?n+c:n}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${d}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${a?n+c:n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${d+p}px`)},(this.host=t).addController(this),this.hasSlotController=e,this.localize=o}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=!0),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!0)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=!1),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!1)}handleSubmenuEntry(t){let e=this.host.renderRoot.querySelector("slot[name='submenu']");if(!e){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let o=null;for(let r of e.assignedElements())if(o=r.querySelectorAll("sl-menu-item, [role^='menuitem']"),o.length!==0)break;if(!(!o||o.length===0)){o[0].setAttribute("tabindex","0");for(let r=1;r!==o.length;++r)o[r].setAttribute("tabindex","-1");this.popupRef.value&&(t.preventDefault(),t.stopPropagation(),this.popupRef.value.active?o[0]instanceof HTMLElement&&o[0].focus():(this.enableSubmenu(!1),this.host.updateComplete.then(()=>{o[0]instanceof HTMLElement&&o[0].focus()}),this.host.requestUpdate()))}}setSubmenuState(t){this.popupRef.value&&this.popupRef.value.active!==t&&(this.popupRef.value.active=t,this.host.requestUpdate())}enableSubmenu(t=!0){t?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(!0)},this.submenuOpenDelay)):this.setSubmenuState(!0)}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(!1)}updateSkidding(){var t;if(!((t=this.host.parentElement)!=null&&t.computedStyleMap))return;let e=this.host.parentElement.computedStyleMap(),r=["padding-top","border-top-width","margin-top"].reduce((i,a)=>{var n;let d=(n=e.get(a))!=null?n:new CSSUnitValue(0,"px"),p=(d instanceof CSSUnitValue?d:new CSSUnitValue(0,"px")).to("px");return i-p.value},0);this.skidding=r}isExpanded(){return this.popupRef.value?this.popupRef.value.active:!1}renderSubmenu(){let t=this.localize.dir()==="ltr";return this.isConnected?m`
      <sl-popup
        ${Zs(this.popupRef)}
        placement=${t?"right-start":"left-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `:m` <slot name="submenu" hidden></slot> `}};var At=class extends v{constructor(){super(...arguments),this.type="normal",this.checked=!1,this.value="",this.loading=!1,this.disabled=!1,this.localize=new D(this),this.hasSlotController=new Y(this,"submenu"),this.submenuController=new Js(this,this.hasSlotController,this.localize),this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())},this.handleMouseOver=t=>{this.focus(),t.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){let t=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=t;return}t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=!1,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return ls(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){let t=this.localize.dir()==="rtl",e=this.submenuController.isExpanded();return m`
      <div
        id="anchor"
        part="base"
        class=${z({"menu-item":!0,"menu-item--rtl":t,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":e})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!e}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${t?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?m` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};At.styles=[C,Ys];At.dependencies={"sl-icon":R,"sl-popup":N,"sl-spinner":de};s([k("slot:not([name])")],At.prototype,"defaultSlot",2);s([k(".menu-item")],At.prototype,"menuItem",2);s([l()],At.prototype,"type",2);s([l({type:Boolean,reflect:!0})],At.prototype,"checked",2);s([l()],At.prototype,"value",2);s([l({type:Boolean,reflect:!0})],At.prototype,"loading",2);s([l({type:Boolean,reflect:!0})],At.prototype,"disabled",2);s([y("checked")],At.prototype,"handleCheckedChange",1);s([y("disabled")],At.prototype,"handleDisabledChange",1);s([y("type")],At.prototype,"handleTypeChange",1);At.define("sl-menu-item");var ta=_`
  :host {
    --divider-width: 2px;
    --handle-size: 2.5rem;

    display: inline-block;
    position: relative;
  }

  .image-comparer {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .image-comparer__before,
  .image-comparer__after {
    display: block;
    pointer-events: none;
  }

  .image-comparer__before::slotted(img),
  .image-comparer__after::slotted(img),
  .image-comparer__before::slotted(svg),
  .image-comparer__after::slotted(svg) {
    display: block;
    max-width: 100% !important;
    height: auto;
  }

  .image-comparer__after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .image-comparer__divider {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: var(--divider-width);
    height: 100%;
    background-color: var(--sl-color-neutral-0);
    translate: calc(var(--divider-width) / -2);
    cursor: ew-resize;
  }

  .image-comparer__handle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50% - (var(--handle-size) / 2));
    width: var(--handle-size);
    height: var(--handle-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: var(--sl-border-radius-circle);
    font-size: calc(var(--handle-size) * 0.5);
    color: var(--sl-color-neutral-700);
    cursor: inherit;
    z-index: 10;
  }

  .image-comparer__handle:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }
`;var ye=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.position=50}handleDrag(t){let{width:e}=this.base.getBoundingClientRect(),o=this.localize.dir()==="rtl";t.preventDefault(),ve(this.base,{onMove:r=>{this.position=parseFloat(Z(r/e*100,0,100).toFixed(2)),o&&(this.position=100-this.position)},initialEvent:t})}handleKeyDown(t){let e=this.localize.dir()==="ltr",o=this.localize.dir()==="rtl";if(["ArrowLeft","ArrowRight","Home","End"].includes(t.key)){let r=t.shiftKey?10:1,i=this.position;t.preventDefault(),(e&&t.key==="ArrowLeft"||o&&t.key==="ArrowRight")&&(i-=r),(e&&t.key==="ArrowRight"||o&&t.key==="ArrowLeft")&&(i+=r),t.key==="Home"&&(i=0),t.key==="End"&&(i=100),i=Z(i,0,100),this.position=i}}handlePositionChange(){this.emit("sl-change")}render(){let t=this.localize.dir()==="rtl";return m`
      <div
        part="base"
        id="image-comparer"
        class=${z({"image-comparer":!0,"image-comparer--rtl":t})}
        @keydown=${this.handleKeyDown}
      >
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before"></slot>
          </div>

          <div
            part="after"
            class="image-comparer__after"
            style=${lt({clipPath:t?`inset(0 0 0 ${100-this.position}%)`:`inset(0 ${100-this.position}% 0 0)`})}
          >
            <slot name="after"></slot>
          </div>
        </div>

        <div
          part="divider"
          class="image-comparer__divider"
          style=${lt({left:t?`${100-this.position}%`:`${this.position}%`})}
          @mousedown=${this.handleDrag}
          @touchstart=${this.handleDrag}
        >
          <div
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow=${this.position}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-controls="image-comparer"
            tabindex="0"
          >
            <slot name="handle">
              <sl-icon library="system" name="grip-vertical"></sl-icon>
            </slot>
          </div>
        </div>
      </div>
    `}};ye.styles=[C,ta];ye.scopedElement={"sl-icon":R};s([k(".image-comparer")],ye.prototype,"base",2);s([k(".image-comparer__handle")],ye.prototype,"handle",2);s([l({type:Number,reflect:!0})],ye.prototype,"position",2);s([y("position",{waitUntilFirstUpdate:!0})],ye.prototype,"handlePositionChange",1);ye.define("sl-image-comparer");var ea=_`
  :host {
    display: block;
  }
`;var qr=new Map;function oa(t,e="cors"){let o=qr.get(t);if(o!==void 0)return Promise.resolve(o);let r=fetch(t,{mode:e}).then(async i=>{let a={ok:i.ok,status:i.status,html:await i.text()};return qr.set(t,a),a});return qr.set(t,r),r}var Re=class extends v{constructor(){super(...arguments),this.mode="cors",this.allowScripts=!1}executeScript(t){let e=document.createElement("script");[...t.attributes].forEach(o=>e.setAttribute(o.name,o.value)),e.textContent=t.textContent,t.parentNode.replaceChild(e,t)}async handleSrcChange(){try{let t=this.src,e=await oa(t,this.mode);if(t!==this.src)return;if(!e.ok){this.emit("sl-error",{detail:{status:e.status}});return}this.innerHTML=e.html,this.allowScripts&&[...this.querySelectorAll("script")].forEach(o=>this.executeScript(o)),this.emit("sl-load")}catch{this.emit("sl-error",{detail:{status:-1}})}}render(){return m`<slot></slot>`}};Re.styles=[C,ea];s([l()],Re.prototype,"src",2);s([l()],Re.prototype,"mode",2);s([l({attribute:"allow-scripts",type:Boolean})],Re.prototype,"allowScripts",2);s([y("src")],Re.prototype,"handleSrcChange",1);Re.define("sl-include");var Bt=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.value=0,this.type="decimal",this.noGrouping=!1,this.currency="USD",this.currencyDisplay="symbol"}render(){return isNaN(this.value)?"":this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.noGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};s([l({type:Number})],Bt.prototype,"value",2);s([l()],Bt.prototype,"type",2);s([l({attribute:"no-grouping",type:Boolean})],Bt.prototype,"noGrouping",2);s([l()],Bt.prototype,"currency",2);s([l({attribute:"currency-display"})],Bt.prototype,"currencyDisplay",2);s([l({attribute:"minimum-integer-digits",type:Number})],Bt.prototype,"minimumIntegerDigits",2);s([l({attribute:"minimum-fraction-digits",type:Number})],Bt.prototype,"minimumFractionDigits",2);s([l({attribute:"maximum-fraction-digits",type:Number})],Bt.prototype,"maximumFractionDigits",2);s([l({attribute:"minimum-significant-digits",type:Number})],Bt.prototype,"minimumSignificantDigits",2);s([l({attribute:"maximum-significant-digits",type:Number})],Bt.prototype,"maximumSignificantDigits",2);Bt.define("sl-format-number");J.define("sl-icon-button");var So=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.value=0,this.unit="byte",this.display="short"}render(){if(isNaN(this.value))return"";let t=["","kilo","mega","giga","tera"],e=["","kilo","mega","giga","tera","peta"],o=this.unit==="bit"?t:e,r=Math.max(0,Math.min(Math.floor(Math.log10(this.value)/3),o.length-1)),i=o[r]+this.unit,a=parseFloat((this.value/Math.pow(1e3,r)).toPrecision(3));return this.localize.number(a,{style:"unit",unit:i,unitDisplay:this.display})}};s([l({type:Number})],So.prototype,"value",2);s([l()],So.prototype,"unit",2);s([l()],So.prototype,"display",2);So.define("sl-format-bytes");var Et=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.date=new Date,this.hourFormat="auto"}render(){let t=new Date(this.date),e=this.hourFormat==="auto"?void 0:this.hourFormat==="12";if(!isNaN(t.getMilliseconds()))return m`
      <time datetime=${t.toISOString()}>
        ${this.localize.date(t,{weekday:this.weekday,era:this.era,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:e})}
      </time>
    `}};s([l()],Et.prototype,"date",2);s([l()],Et.prototype,"weekday",2);s([l()],Et.prototype,"era",2);s([l()],Et.prototype,"year",2);s([l()],Et.prototype,"month",2);s([l()],Et.prototype,"day",2);s([l()],Et.prototype,"hour",2);s([l()],Et.prototype,"minute",2);s([l()],Et.prototype,"second",2);s([l({attribute:"time-zone-name"})],Et.prototype,"timeZoneName",2);s([l({attribute:"time-zone"})],Et.prototype,"timeZone",2);s([l({attribute:"hour-format"})],Et.prototype,"hourFormat",2);Et.define("sl-format-date");R.define("sl-icon");var ra=_`
  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`;var $o=class extends v{constructor(){super(...arguments),this.vertical=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};$o.styles=[C,ra];s([l({type:Boolean,reflect:!0})],$o.prototype,"vertical",2);s([y("vertical")],$o.prototype,"handleVerticalChange",1);$o.define("sl-divider");var ia=_`
  :host {
    --size: 25rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .drawer {
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--sl-z-index-drawer);
  }

  .drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-large);
    overflow: auto;
    pointer-events: all;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--end .drawer__panel {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .drawer--bottom .drawer__panel {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--start .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .drawer__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .drawer__header-actions sl-icon-button,
  .drawer__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .drawer__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer__footer {
    text-align: right;
    padding: var(--footer-spacing);
  }

  .drawer__footer ::slotted(sl-button:not(:last-of-type)) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
    pointer-events: all;
  }

  .drawer--contained .drawer__overlay {
    display: none;
  }

  @media (forced-colors: active) {
    .drawer__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;var sa=new WeakMap;function aa(t){let e=sa.get(t);return e||(e=window.getComputedStyle(t,null),sa.set(t,e)),e}function Nl(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});let e=aa(t);return e.visibility!=="hidden"&&e.display!=="none"}function Ul(t){let e=aa(t),{overflowY:o,overflowX:r}=e;return o==="scroll"||r==="scroll"?!0:o!=="auto"||r!=="auto"?!1:t.scrollHeight>t.clientHeight&&o==="auto"||t.scrollWidth>t.clientWidth&&r==="auto"}function ql(t){let e=t.tagName.toLowerCase(),o=Number(t.getAttribute("tabindex"));return t.hasAttribute("tabindex")&&(isNaN(o)||o<=-1)||t.hasAttribute("disabled")||t.closest("[inert]")||e==="input"&&t.getAttribute("type")==="radio"&&!t.hasAttribute("checked")||!Nl(t)?!1:(e==="audio"||e==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:Ul(t)}function la(t){var e,o;let r=dr(t),i=(e=r[0])!=null?e:null,a=(o=r[r.length-1])!=null?o:null;return{start:i,end:a}}function Wl(t,e){var o;return((o=t.getRootNode({composed:!0}))==null?void 0:o.host)!==e}function dr(t){let e=new WeakMap,o=[];function r(i){if(i instanceof Element){if(i.hasAttribute("inert")||i.closest("[inert]")||e.has(i))return;e.set(i,!0),!o.includes(i)&&ql(i)&&o.push(i),i instanceof HTMLSlotElement&&Wl(i,t)&&i.assignedElements({flatten:!0}).forEach(a=>{r(a)}),i.shadowRoot!==null&&i.shadowRoot.mode==="open"&&r(i.shadowRoot)}for(let a of i.children)r(a)}return r(t),o.sort((i,a)=>{let n=Number(i.getAttribute("tabindex"))||0;return(Number(a.getAttribute("tabindex"))||0)-n})}function*Wr(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*si(Wr(t.shadowRoot.activeElement))))}function jl(){return[...Wr()].pop()}var zo=[],pr=class{constructor(t){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=e=>{var o;if(e.key!=="Tab"||this.isExternalActivated||!this.isActive())return;let r=jl();if(this.previousFocus=r,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;e.shiftKey?this.tabDirection="backward":this.tabDirection="forward";let i=dr(this.element),a=i.findIndex(d=>d===r);this.previousFocus=this.currentFocus;let n=this.tabDirection==="forward"?1:-1;for(;;){a+n>=i.length?a=0:a+n<0?a=i.length-1:a+=n,this.previousFocus=this.currentFocus;let d=i[a];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||d&&this.possiblyHasTabbableChildren(d))return;e.preventDefault(),this.currentFocus=d,(o=this.currentFocus)==null||o.focus({preventScroll:!1});let c=[...Wr()];if(c.includes(this.currentFocus)||!c.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=t,this.elementsWithTabbableControls=["iframe"]}activate(){zo.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){zo=zo.filter(t=>t!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return zo[zo.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){let t=dr(this.element);if(!this.element.matches(":focus-within")){let e=t[0],o=t[t.length-1],r=this.tabDirection==="forward"?e:o;typeof r?.focus=="function"&&(this.currentFocus=r,r.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(t){return this.elementsWithTabbableControls.includes(t.tagName.toLowerCase())||t.hasAttribute("controls")}};function na(t){return t.charAt(0).toUpperCase()+t.slice(1)}var Tt=class extends v{constructor(){super(...arguments),this.hasSlotController=new Y(this,"footer"),this.localize=new D(this),this.modal=new pr(this),this.open=!1,this.label="",this.placement="end",this.contained=!1,this.noHeader=!1,this.handleDocumentKeyDown=t=>{this.contained||t.key==="Escape"&&this.modal.isActive()&&this.open&&(t.stopImmediatePropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.drawer.hidden=!this.open,this.open&&(this.addOpenListeners(),this.contained||(this.modal.activate(),Oe(this)))}disconnectedCallback(){var t;super.disconnectedCallback(),Pe(this),(t=this.closeWatcher)==null||t.destroy()}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){let o=W(this,"drawer.denyClose",{dir:this.localize.dir()});X(this.panel,o.keyframes,o.options);return}this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.contained||(this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard"))):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;document.removeEventListener("keydown",this.handleDocumentKeyDown),(t=this.closeWatcher)==null||t.destroy()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.contained||(this.modal.activate(),Oe(this));let t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([Q(this.drawer),Q(this.overlay)]),this.drawer.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});let e=W(this,`drawer.show${na(this.placement)}`,{dir:this.localize.dir()}),o=W(this,"drawer.overlay.show",{dir:this.localize.dir()});await Promise.all([X(this.panel,e.keyframes,e.options),X(this.overlay,o.keyframes,o.options)]),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),this.contained||(this.modal.deactivate(),Pe(this)),await Promise.all([Q(this.drawer),Q(this.overlay)]);let t=W(this,`drawer.hide${na(this.placement)}`,{dir:this.localize.dir()}),e=W(this,"drawer.overlay.hide",{dir:this.localize.dir()});await Promise.all([X(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=!0}),X(this.panel,t.keyframes,t.options).then(()=>{this.panel.hidden=!0})]),this.drawer.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1;let o=this.originalTrigger;typeof o?.focus=="function"&&setTimeout(()=>o.focus()),this.emit("sl-after-hide")}}handleNoModalChange(){this.open&&!this.contained&&(this.modal.activate(),Oe(this)),this.open&&this.contained&&(this.modal.deactivate(),Pe(this))}async show(){if(!this.open)return this.open=!0,et(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,et(this,"sl-after-hide")}render(){return m`
      <div
        part="base"
        class=${z({drawer:!0,"drawer--open":this.open,"drawer--top":this.placement==="top","drawer--end":this.placement==="end","drawer--bottom":this.placement==="bottom","drawer--start":this.placement==="start","drawer--contained":this.contained,"drawer--fixed":!this.contained,"drawer--rtl":this.localize.dir()==="rtl","drawer--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="drawer__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${A(this.noHeader?this.label:void 0)}
          aria-labelledby=${A(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":m`
                <header part="header" class="drawer__header">
                  <h2 part="title" class="drawer__title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="drawer__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="drawer__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click=${()=>this.requestClose("close-button")}
                    ></sl-icon-button>
                  </div>
                </header>
              `}

          <slot part="body" class="drawer__body"></slot>

          <footer part="footer" class="drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};Tt.styles=[C,ia];Tt.dependencies={"sl-icon-button":J};s([k(".drawer")],Tt.prototype,"drawer",2);s([k(".drawer__panel")],Tt.prototype,"panel",2);s([k(".drawer__overlay")],Tt.prototype,"overlay",2);s([l({type:Boolean,reflect:!0})],Tt.prototype,"open",2);s([l({reflect:!0})],Tt.prototype,"label",2);s([l({reflect:!0})],Tt.prototype,"placement",2);s([l({type:Boolean,reflect:!0})],Tt.prototype,"contained",2);s([l({attribute:"no-header",type:Boolean,reflect:!0})],Tt.prototype,"noHeader",2);s([y("open",{waitUntilFirstUpdate:!0})],Tt.prototype,"handleOpenChange",1);s([y("contained",{waitUntilFirstUpdate:!0})],Tt.prototype,"handleNoModalChange",1);V("drawer.showTop",{keyframes:[{opacity:0,translate:"0 -100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}});V("drawer.hideTop",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 -100%"}],options:{duration:250,easing:"ease"}});V("drawer.showEnd",{keyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}});V("drawer.hideEnd",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],options:{duration:250,easing:"ease"}});V("drawer.showBottom",{keyframes:[{opacity:0,translate:"0 100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}});V("drawer.hideBottom",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 100%"}],options:{duration:250,easing:"ease"}});V("drawer.showStart",{keyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}});V("drawer.hideStart",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],options:{duration:250,easing:"ease"}});V("drawer.denyClose",{keyframes:[{scale:1},{scale:1.01},{scale:1}],options:{duration:250}});V("drawer.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});V("drawer.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});Tt.define("sl-drawer");var ca=_`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;var nt=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=t=>{var e;if(t.key==="Escape"&&this.open&&!this.closeWatcher){t.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(t.key==="Tab"){if(this.open&&((e=document.activeElement)==null?void 0:e.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}setTimeout(()=>{var o,r,i;let a=((o=this.containingElement)==null?void 0:o.getRootNode())instanceof ShadowRoot?(i=(r=document.activeElement)==null?void 0:r.shadowRoot)==null?void 0:i.activeElement:document.activeElement;(!this.containingElement||a?.closest(this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide()})}},this.handleDocumentMouseDown=t=>{let e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=t=>{let e=t.target;!this.stayOpenOnSelect&&e.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){let t=this.trigger.assignedElements({flatten:!0})[0];typeof t?.focus=="function"&&t.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}let e=this.getMenu();if(e){let o=e.getAllItems(),r=o[0],i=o[o.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),o.length>0&&this.updateComplete.then(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(e.setCurrentItem(r),r.focus()),(t.key==="ArrowUp"||t.key==="End")&&(e.setCurrentItem(i),i.focus())}))}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){let e=this.trigger.assignedElements({flatten:!0}).find(r=>la(r).start),o;if(e){switch(e.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":o=e.button;break;default:o=e}o.setAttribute("aria-haspopup","true"),o.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,et(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,et(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(t=this.closeWatcher)==null||t.destroy()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await Q(this),this.panel.hidden=!1,this.popup.active=!0;let{keyframes:t,options:e}=W(this,"dropdown.show",{dir:this.localize.dir()});await X(this.popup.popup,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await Q(this);let{keyframes:t,options:e}=W(this,"dropdown.hide",{dir:this.localize.dir()});await X(this.popup.popup,t,e),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return m`
      <sl-popup
        part="base"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${A(this.sync?this.sync:void 0)}
        class=${z({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};nt.styles=[C,ca];nt.dependencies={"sl-popup":N};s([k(".dropdown")],nt.prototype,"popup",2);s([k(".dropdown__trigger")],nt.prototype,"trigger",2);s([k(".dropdown__panel")],nt.prototype,"panel",2);s([l({type:Boolean,reflect:!0})],nt.prototype,"open",2);s([l({reflect:!0})],nt.prototype,"placement",2);s([l({type:Boolean,reflect:!0})],nt.prototype,"disabled",2);s([l({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],nt.prototype,"stayOpenOnSelect",2);s([l({attribute:!1})],nt.prototype,"containingElement",2);s([l({type:Number})],nt.prototype,"distance",2);s([l({type:Number})],nt.prototype,"skidding",2);s([l({type:Boolean})],nt.prototype,"hoist",2);s([l({reflect:!0})],nt.prototype,"sync",2);s([y("open",{waitUntilFirstUpdate:!0})],nt.prototype,"handleOpenChange",1);V("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});V("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});nt.define("sl-dropdown");var da=_`
  :host {
    --error-color: var(--sl-color-danger-600);
    --success-color: var(--sl-color-success-600);

    display: inline-block;
  }

  .copy-button__button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
  }

  .copy-button--success .copy-button__button {
    color: var(--success-color);
  }

  .copy-button--error .copy-button__button {
    color: var(--error-color);
  }

  .copy-button__button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .copy-button__button[disabled] {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  slot {
    display: inline-flex;
  }
`;var ct=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.isCopying=!1,this.status="rest",this.value="",this.from="",this.disabled=!1,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top",this.hoist=!1}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let t=this.value;if(this.from){let e=this.getRootNode(),o=this.from.includes("."),r=this.from.includes("[")&&this.from.includes("]"),i=this.from,a="";o?[i,a]=this.from.trim().split("."):r&&([i,a]=this.from.trim().replace(/\]$/,"").split("["));let n="getElementById"in e?e.getElementById(i):null;n?r?t=n.getAttribute(a)||"":o?t=n[a]||"":t=n.textContent||"":(this.showStatus("error"),this.emit("sl-error"))}if(!t)this.showStatus("error"),this.emit("sl-error");else try{await navigator.clipboard.writeText(t),this.showStatus("success"),this.emit("sl-copy",{detail:{value:t}})}catch{this.showStatus("error"),this.emit("sl-error")}}async showStatus(t){let e=this.copyLabel||this.localize.term("copy"),o=this.successLabel||this.localize.term("copied"),r=this.errorLabel||this.localize.term("error"),i=t==="success"?this.successIcon:this.errorIcon,a=W(this,"copy.in",{dir:"ltr"}),n=W(this,"copy.out",{dir:"ltr"});this.tooltip.content=t==="success"?o:r,await this.copyIcon.animate(n.keyframes,n.options).finished,this.copyIcon.hidden=!0,this.status=t,i.hidden=!1,await i.animate(a.keyframes,a.options).finished,setTimeout(async()=>{await i.animate(n.keyframes,n.options).finished,i.hidden=!0,this.status="rest",this.copyIcon.hidden=!1,await this.copyIcon.animate(a.keyframes,a.options).finished,this.tooltip.content=e,this.isCopying=!1},this.feedbackDuration)}render(){let t=this.copyLabel||this.localize.term("copy");return m`
      <sl-tooltip
        class=${z({"copy-button":!0,"copy-button--success":this.status==="success","copy-button--error":this.status==="error"})}
        content=${t}
        placement=${this.tooltipPlacement}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        exportparts="
          base:tooltip__base,
          base__popup:tooltip__base__popup,
          base__arrow:tooltip__base__arrow,
          body:tooltip__body
        "
      >
        <button
          class="copy-button__button"
          part="button"
          type="button"
          ?disabled=${this.disabled}
          @click=${this.handleCopy}
        >
          <slot part="copy-icon" name="copy-icon">
            <sl-icon library="system" name="copy"></sl-icon>
          </slot>
          <slot part="success-icon" name="success-icon" hidden>
            <sl-icon library="system" name="check"></sl-icon>
          </slot>
          <slot part="error-icon" name="error-icon" hidden>
            <sl-icon library="system" name="x-lg"></sl-icon>
          </slot>
        </button>
      </sl-tooltip>
    `}};ct.styles=[C,da];ct.dependencies={"sl-icon":R,"sl-tooltip":at};s([k('slot[name="copy-icon"]')],ct.prototype,"copyIcon",2);s([k('slot[name="success-icon"]')],ct.prototype,"successIcon",2);s([k('slot[name="error-icon"]')],ct.prototype,"errorIcon",2);s([k("sl-tooltip")],ct.prototype,"tooltip",2);s([E()],ct.prototype,"isCopying",2);s([E()],ct.prototype,"status",2);s([l()],ct.prototype,"value",2);s([l()],ct.prototype,"from",2);s([l({type:Boolean,reflect:!0})],ct.prototype,"disabled",2);s([l({attribute:"copy-label"})],ct.prototype,"copyLabel",2);s([l({attribute:"success-label"})],ct.prototype,"successLabel",2);s([l({attribute:"error-label"})],ct.prototype,"errorLabel",2);s([l({attribute:"feedback-duration",type:Number})],ct.prototype,"feedbackDuration",2);s([l({attribute:"tooltip-placement"})],ct.prototype,"tooltipPlacement",2);s([l({type:Boolean})],ct.prototype,"hoist",2);V("copy.in",{keyframes:[{scale:".25",opacity:".25"},{scale:"1",opacity:"1"}],options:{duration:100}});V("copy.out",{keyframes:[{scale:"1",opacity:"1"},{scale:".25",opacity:"0"}],options:{duration:100}});ct.define("sl-copy-button");var pa=_`
  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }

  .details__header::-webkit-details-marker {
    display: none;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(1px + var(--sl-focus-ring-offset));
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
  }

  .details--open .details__summary-icon {
    rotate: 90deg;
  }

  .details--open.details--rtl .details__summary-icon {
    rotate: -90deg;
  }

  .details--open slot[name='expand-icon'],
  .details:not(.details--open) slot[name='collapse-icon'] {
    display: none;
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    display: block;
    padding: var(--sl-spacing-medium);
  }
`;var Vt=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.open=!1,this.disabled=!1}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(let e of t)e.type==="attributes"&&e.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver.disconnect()}handleSummaryClick(t){t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus())}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show())}async handleOpenChange(){if(this.open){if(this.details.open=!0,this.emit("sl-show",{cancelable:!0}).defaultPrevented){this.open=!1,this.details.open=!1;return}await Q(this.body);let{keyframes:e,options:o}=W(this,"details.show",{dir:this.localize.dir()});await X(this.body,Ke(e,this.body.scrollHeight),o),this.body.style.height="auto",this.emit("sl-after-show")}else{if(this.emit("sl-hide",{cancelable:!0}).defaultPrevented){this.details.open=!0,this.open=!0;return}await Q(this.body);let{keyframes:e,options:o}=W(this,"details.hide",{dir:this.localize.dir()});await X(this.body,Ke(e,this.body.scrollHeight),o),this.body.style.height="auto",this.details.open=!1,this.emit("sl-after-hide")}}async show(){if(!(this.open||this.disabled))return this.open=!0,et(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,et(this,"sl-after-hide")}render(){let t=this.localize.dir()==="rtl";return m`
      <details
        part="base"
        class=${z({details:!0,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":t})}
      >
        <summary
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary" class="details__summary">${this.summary}</slot>

          <span part="summary-icon" class="details__summary-icon">
            <slot name="expand-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot name="collapse-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </span>
        </summary>

        <div class="details__body" role="region" aria-labelledby="header">
          <slot part="content" id="content" class="details__content"></slot>
        </div>
      </details>
    `}};Vt.styles=[C,pa];Vt.dependencies={"sl-icon":R};s([k(".details")],Vt.prototype,"details",2);s([k(".details__header")],Vt.prototype,"header",2);s([k(".details__body")],Vt.prototype,"body",2);s([k(".details__expand-icon-slot")],Vt.prototype,"expandIconSlot",2);s([l({type:Boolean,reflect:!0})],Vt.prototype,"open",2);s([l()],Vt.prototype,"summary",2);s([l({type:Boolean,reflect:!0})],Vt.prototype,"disabled",2);s([y("open",{waitUntilFirstUpdate:!0})],Vt.prototype,"handleOpenChange",1);V("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});V("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});Vt.define("sl-details");var ha=_`
  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;var Xt=class extends v{constructor(){super(...arguments),this.hasSlotController=new Y(this,"footer"),this.localize=new D(this),this.modal=new pr(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.modal.isActive()&&this.open&&(t.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),Oe(this))}disconnectedCallback(){var t;super.disconnectedCallback(),this.modal.deactivate(),Pe(this),(t=this.closeWatcher)==null||t.destroy()}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){let o=W(this,"dialog.denyClose",{dir:this.localize.dir()});X(this.panel,o.keyframes,o.options);return}this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),Oe(this);let t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([Q(this.dialog),Q(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});let e=W(this,"dialog.show",{dir:this.localize.dir()}),o=W(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([X(this.panel,e.keyframes,e.options),X(this.overlay,o.keyframes,o.options)]),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([Q(this.dialog),Q(this.overlay)]);let t=W(this,"dialog.hide",{dir:this.localize.dir()}),e=W(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([X(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=!0}),X(this.panel,t.keyframes,t.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,Pe(this);let o=this.originalTrigger;typeof o?.focus=="function"&&setTimeout(()=>o.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,et(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,et(this,"sl-after-hide")}render(){return m`
      <div
        part="base"
        class=${z({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${A(this.noHeader?this.label:void 0)}
          aria-labelledby=${A(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":m`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <div part="body" class="dialog__body" tabindex="-1"><slot></slot></div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};Xt.styles=[C,ha];Xt.dependencies={"sl-icon-button":J};s([k(".dialog")],Xt.prototype,"dialog",2);s([k(".dialog__panel")],Xt.prototype,"panel",2);s([k(".dialog__overlay")],Xt.prototype,"overlay",2);s([l({type:Boolean,reflect:!0})],Xt.prototype,"open",2);s([l({reflect:!0})],Xt.prototype,"label",2);s([l({attribute:"no-header",type:Boolean,reflect:!0})],Xt.prototype,"noHeader",2);s([y("open",{waitUntilFirstUpdate:!0})],Xt.prototype,"handleOpenChange",1);V("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});V("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});V("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}});V("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});V("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});Xt.define("sl-dialog");st.define("sl-checkbox");var ua=_`
  :host {
    --grid-width: 280px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 15px;
    --slider-handle-size: 17px;
    --swatch-size: 25px;

    display: inline-block;
  }

  .color-picker {
    width: var(--grid-width);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    user-select: none;
    -webkit-user-select: none;
  }

  .color-picker--inline {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
  }

  .color-picker--inline:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
      linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
    forced-color-adjust: none;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
    transition: var(--sl-transition-fast) scale;
  }

  .color-picker__grid-handle--dragging {
    cursor: none;
    scale: 1.5;
  }

  .color-picker__grid-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__controls {
    padding: var(--sl-spacing-small);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    forced-color-adjust: none;
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--sl-spacing-small);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: var(--sl-border-radius-circle);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
    forced-color-adjust: none;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }

  .color-picker__preview-color--copied {
    animation: pulse 0.75s;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--sl-color-primary-500);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small);
  }

  .color-picker__user-input sl-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input sl-button-group {
    margin-left: var(--sl-spacing-small);
  }

  .color-picker__user-input sl-button {
    min-width: 3.25rem;
    max-width: 3.25rem;
    font-size: 1rem;
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
    border-top: solid 1px var(--sl-color-neutral-200);
    padding: var(--sl-spacing-small);
    forced-color-adjust: none;
  }

  .color-picker__swatch {
    position: relative;
    width: var(--swatch-size);
    height: var(--swatch-size);
    border-radius: var(--sl-border-radius-small);
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%);
    background-size: 10px 10px;
    background-position:
      0 0,
      0 0,
      -5px -5px,
      5px 5px;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown::part(panel) {
    max-height: none;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    forced-color-adjust: none;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--sl-input-height-small);
    height: var(--sl-input-height-small);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--sl-input-height-medium);
    height: var(--sl-input-height-medium);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--sl-input-height-large);
    height: var(--sl-input-height-large);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow:
      inset 0 0 0 2px var(--sl-input-border-color),
      inset 0 0 0 4px var(--sl-color-neutral-0);
  }

  .color-dropdown__trigger--empty:before {
    background-color: transparent;
  }

  .color-dropdown__trigger:focus-visible {
    outline: none;
  }

  .color-dropdown__trigger:focus-visible:not(.color-dropdown__trigger--disabled) {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var K=class extends v{constructor(){super(...arguments),this.formControlController=new ut(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new Y(this,"[default]","prefix","suffix"),this.localize=new D(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:Ve}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){let t=this.isLink(),e=t?Ge`a`:Ge`button`;return be`
      <${e}
        part="base"
        class=${z({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${A(t?void 0:this.disabled)}
        type=${A(t?void 0:this.type)}
        title=${this.title}
        name=${A(t?void 0:this.name)}
        value=${A(t?void 0:this.value)}
        href=${A(t?this.href:void 0)}
        target=${A(t?this.target:void 0)}
        download=${A(t?this.download:void 0)}
        rel=${A(t?this.rel:void 0)}
        role=${A(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?be` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?be`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};K.styles=[C,sr];K.dependencies={"sl-icon":R,"sl-spinner":de};s([k(".button")],K.prototype,"button",2);s([E()],K.prototype,"hasFocus",2);s([E()],K.prototype,"invalid",2);s([l()],K.prototype,"title",2);s([l({reflect:!0})],K.prototype,"variant",2);s([l({reflect:!0})],K.prototype,"size",2);s([l({type:Boolean,reflect:!0})],K.prototype,"caret",2);s([l({type:Boolean,reflect:!0})],K.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],K.prototype,"loading",2);s([l({type:Boolean,reflect:!0})],K.prototype,"outline",2);s([l({type:Boolean,reflect:!0})],K.prototype,"pill",2);s([l({type:Boolean,reflect:!0})],K.prototype,"circle",2);s([l()],K.prototype,"type",2);s([l()],K.prototype,"name",2);s([l()],K.prototype,"value",2);s([l()],K.prototype,"href",2);s([l()],K.prototype,"target",2);s([l()],K.prototype,"rel",2);s([l()],K.prototype,"download",2);s([l()],K.prototype,"form",2);s([l({attribute:"formaction"})],K.prototype,"formAction",2);s([l({attribute:"formenctype"})],K.prototype,"formEnctype",2);s([l({attribute:"formmethod"})],K.prototype,"formMethod",2);s([l({attribute:"formnovalidate",type:Boolean})],K.prototype,"formNoValidate",2);s([l({attribute:"formtarget"})],K.prototype,"formTarget",2);s([y("disabled",{waitUntilFirstUpdate:!0})],K.prototype,"handleDisabledChange",1);function dt(t,e){Kl(t)&&(t="100%");let o=Xl(t);return t=e===360?t:Math.min(e,Math.max(0,parseFloat(t))),o&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:(e===360?t=(t<0?t%e+e:t%e)/parseFloat(String(e)):t=t%e/parseFloat(String(e)),t)}function Ao(t){return Math.min(1,Math.max(0,t))}function Kl(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function Xl(t){return typeof t=="string"&&t.indexOf("%")!==-1}function hr(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function Eo(t){return Number(t)<=1?`${Number(t)*100}%`:t}function _e(t){return t.length===1?"0"+t:String(t)}function fa(t,e,o){return{r:dt(t,255)*255,g:dt(e,255)*255,b:dt(o,255)*255}}function Kr(t,e,o){t=dt(t,255),e=dt(e,255),o=dt(o,255);let r=Math.max(t,e,o),i=Math.min(t,e,o),a=0,n=0,d=(r+i)/2;if(r===i)n=0,a=0;else{let c=r-i;switch(n=d>.5?c/(2-r-i):c/(r+i),r){case t:a=(e-o)/c+(e<o?6:0);break;case e:a=(o-t)/c+2;break;case o:a=(t-e)/c+4;break;default:break}a/=6}return{h:a,s:n,l:d}}function jr(t,e,o){return o<0&&(o+=1),o>1&&(o-=1),o<1/6?t+(e-t)*(6*o):o<1/2?e:o<2/3?t+(e-t)*(2/3-o)*6:t}function ma(t,e,o){let r,i,a;if(t=dt(t,360),e=dt(e,100),o=dt(o,100),e===0)i=o,a=o,r=o;else{let n=o<.5?o*(1+e):o+e-o*e,d=2*o-n;r=jr(d,n,t+1/3),i=jr(d,n,t),a=jr(d,n,t-1/3)}return{r:r*255,g:i*255,b:a*255}}function Xr(t,e,o){t=dt(t,255),e=dt(e,255),o=dt(o,255);let r=Math.max(t,e,o),i=Math.min(t,e,o),a=0,n=r,d=r-i,c=r===0?0:d/r;if(r===i)a=0;else{switch(r){case t:a=(e-o)/d+(e<o?6:0);break;case e:a=(o-t)/d+2;break;case o:a=(t-e)/d+4;break;default:break}a/=6}return{h:a,s:c,v:n}}function ga(t,e,o){t=dt(t,360)*6,e=dt(e,100),o=dt(o,100);let r=Math.floor(t),i=t-r,a=o*(1-e),n=o*(1-i*e),d=o*(1-(1-i)*e),c=r%6,p=[o,n,a,a,d,o][c],g=[d,o,o,n,a,a][c],h=[a,a,d,o,o,n][c];return{r:p*255,g:g*255,b:h*255}}function Yr(t,e,o,r){let i=[_e(Math.round(t).toString(16)),_e(Math.round(e).toString(16)),_e(Math.round(o).toString(16))];return r&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function ba(t,e,o,r,i){let a=[_e(Math.round(t).toString(16)),_e(Math.round(e).toString(16)),_e(Math.round(o).toString(16)),_e(Yl(r))];return i&&a[0].startsWith(a[0].charAt(1))&&a[1].startsWith(a[1].charAt(1))&&a[2].startsWith(a[2].charAt(1))&&a[3].startsWith(a[3].charAt(1))?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0)+a[3].charAt(0):a.join("")}function Yl(t){return Math.round(parseFloat(t)*255).toString(16)}function Gr(t){return Lt(t)/255}function Lt(t){return parseInt(t,16)}function va(t){return{r:t>>16,g:(t&65280)>>8,b:t&255}}var To={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function ya(t){let e={r:0,g:0,b:0},o=1,r=null,i=null,a=null,n=!1,d=!1;return typeof t=="string"&&(t=Zl(t)),typeof t=="object"&&(he(t.r)&&he(t.g)&&he(t.b)?(e=fa(t.r,t.g,t.b),n=!0,d=String(t.r).substr(-1)==="%"?"prgb":"rgb"):he(t.h)&&he(t.s)&&he(t.v)?(r=Eo(t.s),i=Eo(t.v),e=ga(t.h,r,i),n=!0,d="hsv"):he(t.h)&&he(t.s)&&he(t.l)&&(r=Eo(t.s),a=Eo(t.l),e=ma(t.h,r,a),n=!0,d="hsl"),Object.prototype.hasOwnProperty.call(t,"a")&&(o=t.a)),o=hr(o),{ok:n,format:t.format||d,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:o}}var Gl="[-\\+]?\\d+%?",Ql="[-\\+]?\\d*\\.\\d+%?",xe=`(?:${Ql})|(?:${Gl})`,Qr=`[\\s|\\(]+(${xe})[,|\\s]+(${xe})[,|\\s]+(${xe})\\s*\\)?`,Zr=`[\\s|\\(]+(${xe})[,|\\s]+(${xe})[,|\\s]+(${xe})[,|\\s]+(${xe})\\s*\\)?`,Yt={CSS_UNIT:new RegExp(xe),rgb:new RegExp("rgb"+Qr),rgba:new RegExp("rgba"+Zr),hsl:new RegExp("hsl"+Qr),hsla:new RegExp("hsla"+Zr),hsv:new RegExp("hsv"+Qr),hsva:new RegExp("hsva"+Zr),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Zl(t){if(t=t.trim().toLowerCase(),t.length===0)return!1;let e=!1;if(To[t])t=To[t],e=!0;else if(t==="transparent")return{r:0,g:0,b:0,a:0,format:"name"};let o=Yt.rgb.exec(t);return o?{r:o[1],g:o[2],b:o[3]}:(o=Yt.rgba.exec(t),o?{r:o[1],g:o[2],b:o[3],a:o[4]}:(o=Yt.hsl.exec(t),o?{h:o[1],s:o[2],l:o[3]}:(o=Yt.hsla.exec(t),o?{h:o[1],s:o[2],l:o[3],a:o[4]}:(o=Yt.hsv.exec(t),o?{h:o[1],s:o[2],v:o[3]}:(o=Yt.hsva.exec(t),o?{h:o[1],s:o[2],v:o[3],a:o[4]}:(o=Yt.hex8.exec(t),o?{r:Lt(o[1]),g:Lt(o[2]),b:Lt(o[3]),a:Gr(o[4]),format:e?"name":"hex8"}:(o=Yt.hex6.exec(t),o?{r:Lt(o[1]),g:Lt(o[2]),b:Lt(o[3]),format:e?"name":"hex"}:(o=Yt.hex4.exec(t),o?{r:Lt(o[1]+o[1]),g:Lt(o[2]+o[2]),b:Lt(o[3]+o[3]),a:Gr(o[4]+o[4]),format:e?"name":"hex8"}:(o=Yt.hex3.exec(t),o?{r:Lt(o[1]+o[1]),g:Lt(o[2]+o[2]),b:Lt(o[3]+o[3]),format:e?"name":"hex"}:!1)))))))))}function he(t){return!!Yt.CSS_UNIT.exec(String(t))}var Lo=class t{constructor(e="",o={}){if(e instanceof t)return e;typeof e=="number"&&(e=va(e)),this.originalInput=e;let r=ya(e);this.originalInput=e,this.r=r.r,this.g=r.g,this.b=r.b,this.a=r.a,this.roundA=Math.round(100*this.a)/100,this.format=o.format??r.format,this.gradientType=o.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=r.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){let e=this.toRgb();return(e.r*299+e.g*587+e.b*114)/1e3}getLuminance(){let e=this.toRgb(),o,r,i,a=e.r/255,n=e.g/255,d=e.b/255;return a<=.03928?o=a/12.92:o=Math.pow((a+.055)/1.055,2.4),n<=.03928?r=n/12.92:r=Math.pow((n+.055)/1.055,2.4),d<=.03928?i=d/12.92:i=Math.pow((d+.055)/1.055,2.4),.2126*o+.7152*r+.0722*i}getAlpha(){return this.a}setAlpha(e){return this.a=hr(e),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){let{s:e}=this.toHsl();return e===0}toHsv(){let e=Xr(this.r,this.g,this.b);return{h:e.h*360,s:e.s,v:e.v,a:this.a}}toHsvString(){let e=Xr(this.r,this.g,this.b),o=Math.round(e.h*360),r=Math.round(e.s*100),i=Math.round(e.v*100);return this.a===1?`hsv(${o}, ${r}%, ${i}%)`:`hsva(${o}, ${r}%, ${i}%, ${this.roundA})`}toHsl(){let e=Kr(this.r,this.g,this.b);return{h:e.h*360,s:e.s,l:e.l,a:this.a}}toHslString(){let e=Kr(this.r,this.g,this.b),o=Math.round(e.h*360),r=Math.round(e.s*100),i=Math.round(e.l*100);return this.a===1?`hsl(${o}, ${r}%, ${i}%)`:`hsla(${o}, ${r}%, ${i}%, ${this.roundA})`}toHex(e=!1){return Yr(this.r,this.g,this.b,e)}toHexString(e=!1){return"#"+this.toHex(e)}toHex8(e=!1){return ba(this.r,this.g,this.b,this.a,e)}toHex8String(e=!1){return"#"+this.toHex8(e)}toHexShortString(e=!1){return this.a===1?this.toHexString(e):this.toHex8String(e)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){let e=Math.round(this.r),o=Math.round(this.g),r=Math.round(this.b);return this.a===1?`rgb(${e}, ${o}, ${r})`:`rgba(${e}, ${o}, ${r}, ${this.roundA})`}toPercentageRgb(){let e=o=>`${Math.round(dt(o,255)*100)}%`;return{r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}}toPercentageRgbString(){let e=o=>Math.round(dt(o,255)*100);return this.a===1?`rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)`:`rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`}toName(){if(this.a===0)return"transparent";if(this.a<1)return!1;let e="#"+Yr(this.r,this.g,this.b,!1);for(let[o,r]of Object.entries(To))if(e===r)return o;return!1}toString(e){let o=!!e;e=e??this.format;let r=!1,i=this.a<1&&this.a>=0;return!o&&i&&(e.startsWith("hex")||e==="name")?e==="name"&&this.a===0?this.toName():this.toRgbString():(e==="rgb"&&(r=this.toRgbString()),e==="prgb"&&(r=this.toPercentageRgbString()),(e==="hex"||e==="hex6")&&(r=this.toHexString()),e==="hex3"&&(r=this.toHexString(!0)),e==="hex4"&&(r=this.toHex8String(!0)),e==="hex8"&&(r=this.toHex8String()),e==="name"&&(r=this.toName()),e==="hsl"&&(r=this.toHslString()),e==="hsv"&&(r=this.toHsvString()),r||this.toHexString())}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new t(this.toString())}lighten(e=10){let o=this.toHsl();return o.l+=e/100,o.l=Ao(o.l),new t(o)}brighten(e=10){let o=this.toRgb();return o.r=Math.max(0,Math.min(255,o.r-Math.round(255*-(e/100)))),o.g=Math.max(0,Math.min(255,o.g-Math.round(255*-(e/100)))),o.b=Math.max(0,Math.min(255,o.b-Math.round(255*-(e/100)))),new t(o)}darken(e=10){let o=this.toHsl();return o.l-=e/100,o.l=Ao(o.l),new t(o)}tint(e=10){return this.mix("white",e)}shade(e=10){return this.mix("black",e)}desaturate(e=10){let o=this.toHsl();return o.s-=e/100,o.s=Ao(o.s),new t(o)}saturate(e=10){let o=this.toHsl();return o.s+=e/100,o.s=Ao(o.s),new t(o)}greyscale(){return this.desaturate(100)}spin(e){let o=this.toHsl(),r=(o.h+e)%360;return o.h=r<0?360+r:r,new t(o)}mix(e,o=50){let r=this.toRgb(),i=new t(e).toRgb(),a=o/100,n={r:(i.r-r.r)*a+r.r,g:(i.g-r.g)*a+r.g,b:(i.b-r.b)*a+r.b,a:(i.a-r.a)*a+r.a};return new t(n)}analogous(e=6,o=30){let r=this.toHsl(),i=360/o,a=[this];for(r.h=(r.h-(i*e>>1)+720)%360;--e;)r.h=(r.h+i)%360,a.push(new t(r));return a}complement(){let e=this.toHsl();return e.h=(e.h+180)%360,new t(e)}monochromatic(e=6){let o=this.toHsv(),{h:r}=o,{s:i}=o,{v:a}=o,n=[],d=1/e;for(;e--;)n.push(new t({h:r,s:i,v:a})),a=(a+d)%1;return n}splitcomplement(){let e=this.toHsl(),{h:o}=e;return[this,new t({h:(o+72)%360,s:e.s,l:e.l}),new t({h:(o+216)%360,s:e.s,l:e.l})]}onBackground(e){let o=this.toRgb(),r=new t(e).toRgb(),i=o.a+r.a*(1-o.a);return new t({r:(o.r*o.a+r.r*r.a*(1-o.a))/i,g:(o.g*o.a+r.g*r.a*(1-o.a))/i,b:(o.b*o.a+r.b*r.a*(1-o.a))/i,a:i})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(e){let o=this.toHsl(),{h:r}=o,i=[this],a=360/e;for(let n=1;n<e;n++)i.push(new t({h:(r+n*a)%360,s:o.s,l:o.l}));return i}equals(e){return this.toRgbString()===new t(e).toRgbString()}};var _a="EyeDropper"in window,q=class extends v{constructor(){super(),this.formControlController=new ut(this),this.isSafeValue=!1,this.localize=new D(this),this.hasFocus=!1,this.isDraggingGridHandle=!1,this.isEmpty=!1,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=!1,this.size="medium",this.noFormatToggle=!1,this.name="",this.disabled=!1,this.hoist=!1,this.opacity=!1,this.uppercase=!1,this.swatches="",this.form="",this.required=!1,this.handleFocusIn=()=>{this.hasFocus=!0,this.emit("sl-focus")},this.handleFocusOut=()=>{this.hasFocus=!1,this.emit("sl-blur")},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut)}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity()})}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied")})}handleFormatToggle(){let t=["hex","rgb","hsl","hsv"],e=(t.indexOf(this.format)+1)%t.length;this.format=t[e],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input")}handleAlphaDrag(t){let e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),o=e.querySelector(".color-picker__slider-handle"),{width:r}=e.getBoundingClientRect(),i=this.value,a=this.value;o.focus(),t.preventDefault(),ve(e,{onMove:n=>{this.alpha=Z(n/r*100,0,100),this.syncValues(),this.value!==a&&(a=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"))},initialEvent:t})}handleHueDrag(t){let e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),o=e.querySelector(".color-picker__slider-handle"),{width:r}=e.getBoundingClientRect(),i=this.value,a=this.value;o.focus(),t.preventDefault(),ve(e,{onMove:n=>{this.hue=Z(n/r*360,0,360),this.syncValues(),this.value!==a&&(a=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"))},initialEvent:t})}handleGridDrag(t){let e=this.shadowRoot.querySelector(".color-picker__grid"),o=e.querySelector(".color-picker__grid-handle"),{width:r,height:i}=e.getBoundingClientRect(),a=this.value,n=this.value;o.focus(),t.preventDefault(),this.isDraggingGridHandle=!0,ve(e,{onMove:(d,c)=>{this.saturation=Z(d/r*100,0,100),this.brightness=Z(100-c/i*100,0,100),this.syncValues(),this.value!==n&&(n=this.value,this.emit("sl-input"))},onStop:()=>{this.isDraggingGridHandle=!1,this.value!==a&&(a=this.value,this.emit("sl-change"))},initialEvent:t})}handleAlphaKeyDown(t){let e=t.shiftKey?10:1,o=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=Z(this.alpha-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=Z(this.alpha+e,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input"))}handleHueKeyDown(t){let e=t.shiftKey?10:1,o=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=Z(this.hue-e,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=Z(this.hue+e,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input"))}handleGridKeyDown(t){let e=t.shiftKey?10:1,o=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=Z(this.saturation-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=Z(this.saturation+e,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=Z(this.brightness+e,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=Z(this.brightness-e,0,100),this.syncValues()),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputChange(t){let e=t.target,o=this.value;t.stopPropagation(),this.input.value?(this.setColor(e.value),e.value=this.value):this.value="",this.value!==o&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputInput(t){this.formControlController.updateValidity(),t.stopPropagation()}handleInputKeyDown(t){if(t.key==="Enter"){let e=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==e&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0}}handleInputInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleTouchMove(t){t.preventDefault()}parseColor(t){let e=new Lo(t);if(!e.isValid)return null;let o=e.toHsl(),r={h:o.h,s:o.s*100,l:o.l*100,a:o.a},i=e.toRgb(),a=e.toHexString(),n=e.toHex8String(),d=e.toHsv(),c={h:d.h,s:d.s*100,v:d.v*100,a:d.a};return{hsl:{h:r.h,s:r.s,l:r.l,string:this.setLetterCase(`hsl(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%)`)},hsla:{h:r.h,s:r.s,l:r.l,a:r.a,string:this.setLetterCase(`hsla(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%, ${r.a.toFixed(2).toString()})`)},hsv:{h:c.h,s:c.s,v:c.v,string:this.setLetterCase(`hsv(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%)`)},hsva:{h:c.h,s:c.s,v:c.v,a:c.a,string:this.setLetterCase(`hsva(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%, ${c.a.toFixed(2).toString()})`)},rgb:{r:i.r,g:i.g,b:i.b,string:this.setLetterCase(`rgb(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)})`)},rgba:{r:i.r,g:i.g,b:i.b,a:i.a,string:this.setLetterCase(`rgba(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)}, ${i.a.toFixed(2).toString()})`)},hex:this.setLetterCase(a),hexa:this.setLetterCase(n)}}setColor(t){let e=this.parseColor(t);return e===null?!1:(this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=this.opacity?e.hsva.a*100:100,this.syncValues(),!0)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){let t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied")}handleEyeDropper(){if(!_a)return;new EyeDropper().open().then(e=>{let o=this.value;this.setColor(e.sRGBHex),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input"))}).catch(()=>{})}selectSwatch(t){let e=this.value;this.disabled||(this.setColor(t),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input")))}getHexString(t,e,o,r=100){let i=new Lo(`hsva(${t}, ${e}%, ${o}%, ${r/100})`);return i.isValid?i.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation()}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}handleValueChange(t,e){if(this.isEmpty=!e,e||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){let o=this.parseColor(e);o!==null?(this.inputValue=this.value,this.hue=o.hsva.h,this.saturation=o.hsva.s,this.brightness=o.hsva.v,this.alpha=o.hsva.a*100,this.syncValues()):this.inputValue=t??""}}focus(t){this.inline?this.base.focus(t):this.trigger.focus(t)}blur(){var t;let e=this.inline?this.base:this.trigger;this.hasFocus&&(e.focus({preventScroll:!0}),e.blur()),(t=this.dropdown)!=null&&t.open&&this.dropdown.hide()}getFormattedValue(t="hex"){let e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(e===null)return"";switch(t){case"hex":return e.hex;case"hexa":return e.hexa;case"rgb":return e.rgb.string;case"rgba":return e.rgba.string;case"hsl":return e.hsl.string;case"hsla":return e.hsla.string;case"hsv":return e.hsv.string;case"hsva":return e.hsva.string;default:return""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return!this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:!0}),this.disabled||this.formControlController.emitInvalidEvent(),!1):this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.saturation,e=100-this.brightness,o=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(i=>i.trim()!==""),r=m`
      <div
        part="base"
        class=${z({"color-picker":!0,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-labelledby="label"
        tabindex=${this.inline?"0":"-1"}
      >
        ${this.inline?m`
              <sl-visually-hidden id="label">
                <slot name="label">${this.label}</slot>
              </sl-visually-hidden>
            `:null}

        <div
          part="grid"
          class="color-picker__grid"
          style=${lt({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${z({"color-picker__grid-handle":!0,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${lt({top:`${e}%`,left:`${t}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${A(this.disabled?void 0:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="color-picker__slider-handle"
                style=${lt({left:`${this.hue===0?0:100/(360/this.hue)}%`})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${A(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?m`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${lt({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="color-picker__slider-handle"
                      style=${lt({left:`${this.alpha}%`})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${A(this.disabled?void 0:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${lt({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="color-picker__user-input" aria-live="polite">
          <sl-input
            part="input"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            value=${this.isEmpty?"":this.inputValue}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
            @sl-input=${this.handleInputInput}
            @sl-invalid=${this.handleInputInvalid}
            @sl-blur=${this.stopNestedEventPropagation}
            @sl-focus=${this.stopNestedEventPropagation}
          ></sl-input>

          <sl-button-group>
            ${this.noFormatToggle?"":m`
                  <sl-button
                    part="format-button"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      prefix:format-button__prefix,
                      label:format-button__label,
                      suffix:format-button__suffix,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    ${this.setLetterCase(this.format)}
                  </sl-button>
                `}
            ${_a?m`
                  <sl-button
                    part="eye-dropper-button"
                    exportparts="
                      base:eye-dropper-button__base,
                      prefix:eye-dropper-button__prefix,
                      label:eye-dropper-button__label,
                      suffix:eye-dropper-button__suffix,
                      caret:eye-dropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    <sl-icon
                      library="system"
                      name="eyedropper"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></sl-icon>
                  </sl-button>
                `:""}
          </sl-button-group>
        </div>

        ${o.length>0?m`
              <div part="swatches" class="color-picker__swatches">
                ${o.map(i=>{let a=this.parseColor(i);return a?m`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${A(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${i}
                      @click=${()=>this.selectSwatch(i)}
                      @keydown=${n=>!this.disabled&&n.key==="Enter"&&this.setColor(a.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${lt({backgroundColor:a.hexa})}
                      ></div>
                    </div>
                  `:(console.error(`Unable to parse swatch color: "${i}"`,this),"")})}
              </div>
            `:""}
      </div>
    `;return this.inline?r:m`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled?"true":"false"}
        .containing-element=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${z({"color-dropdown__trigger":!0,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":this.size==="small","color-dropdown__trigger--medium":this.size==="medium","color-dropdown__trigger--large":this.size==="large","color-dropdown__trigger--empty":this.isEmpty,"color-dropdown__trigger--focused":this.hasFocus,"color-picker__transparent-bg":!0})}
          style=${lt({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${r}
      </sl-dropdown>
    `}};q.styles=[C,ua];q.dependencies={"sl-button-group":oe,"sl-button":K,"sl-dropdown":nt,"sl-icon":R,"sl-input":F,"sl-visually-hidden":po};s([k('[part~="base"]')],q.prototype,"base",2);s([k('[part~="input"]')],q.prototype,"input",2);s([k(".color-dropdown")],q.prototype,"dropdown",2);s([k('[part~="preview"]')],q.prototype,"previewButton",2);s([k('[part~="trigger"]')],q.prototype,"trigger",2);s([E()],q.prototype,"hasFocus",2);s([E()],q.prototype,"isDraggingGridHandle",2);s([E()],q.prototype,"isEmpty",2);s([E()],q.prototype,"inputValue",2);s([E()],q.prototype,"hue",2);s([E()],q.prototype,"saturation",2);s([E()],q.prototype,"brightness",2);s([E()],q.prototype,"alpha",2);s([l()],q.prototype,"value",2);s([Ct()],q.prototype,"defaultValue",2);s([l()],q.prototype,"label",2);s([l()],q.prototype,"format",2);s([l({type:Boolean,reflect:!0})],q.prototype,"inline",2);s([l({reflect:!0})],q.prototype,"size",2);s([l({attribute:"no-format-toggle",type:Boolean})],q.prototype,"noFormatToggle",2);s([l()],q.prototype,"name",2);s([l({type:Boolean,reflect:!0})],q.prototype,"disabled",2);s([l({type:Boolean})],q.prototype,"hoist",2);s([l({type:Boolean})],q.prototype,"opacity",2);s([l({type:Boolean})],q.prototype,"uppercase",2);s([l()],q.prototype,"swatches",2);s([l({reflect:!0})],q.prototype,"form",2);s([l({type:Boolean,reflect:!0})],q.prototype,"required",2);s([y("format",{waitUntilFirstUpdate:!0})],q.prototype,"handleFormatChange",1);s([y("opacity",{waitUntilFirstUpdate:!0})],q.prototype,"handleOpacityChange",1);s([y("value")],q.prototype,"handleValueChange",1);q.define("sl-color-picker");var xa=_`
  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`;var Jr=class extends v{constructor(){super(...arguments),this.hasSlotController=new Y(this,"footer","header","image")}render(){return m`
      <div
        part="base"
        class=${z({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};Jr.styles=[C,xa];Jr.define("sl-card");var wa=class{constructor(t,e){this.timerId=0,this.activeInteractions=0,this.paused=!1,this.stopped=!0,this.pause=()=>{this.activeInteractions++||(this.paused=!0,this.host.requestUpdate())},this.resume=()=>{--this.activeInteractions||(this.paused=!1,this.host.requestUpdate())},t.addController(this),this.host=t,this.tickCallback=e}hostConnected(){this.host.addEventListener("mouseenter",this.pause),this.host.addEventListener("mouseleave",this.resume),this.host.addEventListener("focusin",this.pause),this.host.addEventListener("focusout",this.resume),this.host.addEventListener("touchstart",this.pause,{passive:!0}),this.host.addEventListener("touchend",this.resume)}hostDisconnected(){this.stop(),this.host.removeEventListener("mouseenter",this.pause),this.host.removeEventListener("mouseleave",this.resume),this.host.removeEventListener("focusin",this.pause),this.host.removeEventListener("focusout",this.resume),this.host.removeEventListener("touchstart",this.pause),this.host.removeEventListener("touchend",this.resume)}start(t){this.stop(),this.stopped=!1,this.timerId=window.setInterval(()=>{this.paused||this.tickCallback()},t)}stop(){clearInterval(this.timerId),this.stopped=!0,this.host.requestUpdate()}};var ka=_`
  :host {
    --slide-gap: var(--sl-spacing-medium, 1rem);
    --aspect-ratio: 16 / 9;
    --scroll-hint: 0px;

    display: flex;
  }

  .carousel {
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: 1fr min-content;
    grid-template-areas:
      '. slides .'
      '. pagination .';
    gap: var(--sl-spacing-medium);
    align-items: center;
    min-height: 100%;
    min-width: 100%;
    position: relative;
  }

  .carousel__pagination {
    grid-area: pagination;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--sl-spacing-small);
  }

  .carousel__slides {
    grid-area: slides;

    display: grid;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-items: center;
    overflow: auto;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    aspect-ratio: calc(var(--aspect-ratio) * var(--slides-per-page));
    border-radius: var(--sl-border-radius-small);

    --slide-size: calc((100% - (var(--slides-per-page) - 1) * var(--slide-gap)) / var(--slides-per-page));
  }

  @media (prefers-reduced-motion) {
    :where(.carousel__slides) {
      scroll-behavior: auto;
    }
  }

  .carousel__slides--horizontal {
    grid-auto-flow: column;
    grid-auto-columns: var(--slide-size);
    grid-auto-rows: 100%;
    column-gap: var(--slide-gap);
    scroll-snap-type: x mandatory;
    scroll-padding-inline: var(--scroll-hint);
    padding-inline: var(--scroll-hint);
    overflow-y: hidden;
  }

  .carousel__slides--vertical {
    grid-auto-flow: row;
    grid-auto-columns: 100%;
    grid-auto-rows: var(--slide-size);
    row-gap: var(--slide-gap);
    scroll-snap-type: y mandatory;
    scroll-padding-block: var(--scroll-hint);
    padding-block: var(--scroll-hint);
    overflow-x: hidden;
  }

  .carousel__slides--dragging {
  }

  :host([vertical]) ::slotted(sl-carousel-item) {
    height: 100%;
  }

  .carousel__slides::-webkit-scrollbar {
    display: none;
  }

  .carousel__navigation {
    grid-area: navigation;
    display: contents;
    font-size: var(--sl-font-size-x-large);
  }

  .carousel__navigation-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-small);
    font-size: inherit;
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    appearance: none;
  }

  .carousel__navigation-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .carousel__navigation-button--disabled::part(base) {
    pointer-events: none;
  }

  .carousel__navigation-button--previous {
    grid-column: 1;
    grid-row: 1;
  }

  .carousel__navigation-button--next {
    grid-column: 3;
    grid-row: 1;
  }

  .carousel__pagination-item {
    display: block;
    cursor: pointer;
    background: none;
    border: 0;
    border-radius: var(--sl-border-radius-circle);
    width: var(--sl-spacing-small);
    height: var(--sl-spacing-small);
    background-color: var(--sl-color-neutral-300);
    padding: 0;
    margin: 0;
  }

  .carousel__pagination-item--active {
    background-color: var(--sl-color-neutral-700);
    transform: scale(1.2);
  }

  /* Focus styles */
  .carousel__slides:focus-visible,
  .carousel__navigation-button:focus-visible,
  .carousel__pagination-item:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }
`;function*Ca(t,e){if(t!==void 0){let o=0;for(let r of t)yield e(r,o++)}}function*Sa(t,e,o=1){let r=e===void 0?0:t;e??=t;for(let i=r;o>0?i<e:e<i;i+=o)yield i}var Jl=(t,e)=>{let o=0;return function(...r){window.clearTimeout(o),o=window.setTimeout(()=>{t.call(this,...r)},e)}},$a=(t,e,o)=>{let r=t[e];t[e]=function(...i){r.call(this,...i),o.call(this,r,...i)}},tn="onscrollend"in window;if(!tn){let t=new Set,e=new WeakMap,o=i=>{for(let a of i.changedTouches)t.add(a.identifier)},r=i=>{for(let a of i.changedTouches)t.delete(a.identifier)};document.addEventListener("touchstart",o,!0),document.addEventListener("touchend",r,!0),document.addEventListener("touchcancel",r,!0),$a(EventTarget.prototype,"addEventListener",function(i,a){if(a!=="scrollend")return;let n=Jl(()=>{t.size?n():this.dispatchEvent(new Event("scrollend"))},100);i.call(this,"scroll",n,{passive:!0}),e.set(this,n)}),$a(EventTarget.prototype,"removeEventListener",function(i,a){if(a!=="scrollend")return;let n=e.get(this);n&&i.call(this,"scroll",n,{passive:!0})})}var ot=class extends v{constructor(){super(...arguments),this.loop=!1,this.navigation=!1,this.pagination=!1,this.autoplay=!1,this.autoplayInterval=3e3,this.slidesPerPage=1,this.slidesPerMove=1,this.orientation="horizontal",this.mouseDragging=!1,this.activeSlide=0,this.scrolling=!1,this.dragging=!1,this.autoplayController=new wa(this,()=>this.next()),this.localize=new D(this),this.handleMouseDrag=t=>{this.dragging||(this.scrollContainer.style.setProperty("scroll-snap-type","none"),this.dragging=!0),this.scrollContainer.scrollBy({left:-t.movementX,top:-t.movementY,behavior:"instant"})},this.handleMouseDragEnd=()=>{let t=this.scrollContainer;document.removeEventListener("pointermove",this.handleMouseDrag,{capture:!0});let e=t.scrollLeft,o=t.scrollTop;t.style.removeProperty("scroll-snap-type"),t.style.setProperty("overflow","hidden");let r=t.scrollLeft,i=t.scrollTop;t.style.removeProperty("overflow"),t.style.setProperty("scroll-snap-type","none"),t.scrollTo({left:e,top:o,behavior:"instant"}),requestAnimationFrame(async()=>{(e!==r||o!==i)&&(t.scrollTo({left:r,top:i,behavior:Jo()?"auto":"smooth"}),await et(t,"scrollend")),t.style.removeProperty("scroll-snap-type"),this.dragging=!1,this.handleScrollEnd()})},this.handleSlotChange=t=>{t.some(o=>[...o.addedNodes,...o.removedNodes].some(r=>this.isCarouselItem(r)&&!r.hasAttribute("data-clone")))&&this.initializeSlides(),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","region"),this.setAttribute("aria-label",this.localize.term("carousel"))}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver.disconnect()}firstUpdated(){this.initializeSlides(),this.mutationObserver=new MutationObserver(this.handleSlotChange),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}willUpdate(t){(t.has("slidesPerMove")||t.has("slidesPerPage"))&&(this.slidesPerMove=Math.min(this.slidesPerMove,this.slidesPerPage))}getPageCount(){let t=this.getSlides().length,{slidesPerPage:e,slidesPerMove:o,loop:r}=this,i=r?t/o:(t-e)/o+1;return Math.ceil(i)}getCurrentPage(){return Math.ceil(this.activeSlide/this.slidesPerMove)}canScrollNext(){return this.loop||this.getCurrentPage()<this.getPageCount()-1}canScrollPrev(){return this.loop||this.getCurrentPage()>0}getSlides({excludeClones:t=!0}={}){return[...this.children].filter(e=>this.isCarouselItem(e)&&(!t||!e.hasAttribute("data-clone")))}handleKeyDown(t){if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key)){let e=t.target,o=this.localize.dir()==="rtl",r=e.closest('[part~="pagination-item"]')!==null,i=t.key==="ArrowDown"||!o&&t.key==="ArrowRight"||o&&t.key==="ArrowLeft",a=t.key==="ArrowUp"||!o&&t.key==="ArrowLeft"||o&&t.key==="ArrowRight";t.preventDefault(),a&&this.previous(),i&&this.next(),t.key==="Home"&&this.goToSlide(0),t.key==="End"&&this.goToSlide(this.getSlides().length-1),r&&this.updateComplete.then(()=>{var n;let d=(n=this.shadowRoot)==null?void 0:n.querySelector('[part~="pagination-item--active"]');d&&d.focus()})}}handleMouseDragStart(t){this.mouseDragging&&t.button===0&&(t.preventDefault(),document.addEventListener("pointermove",this.handleMouseDrag,{capture:!0,passive:!0}),document.addEventListener("pointerup",this.handleMouseDragEnd,{capture:!0,once:!0}))}handleScroll(){this.scrolling=!0}synchronizeSlides(){let t=new IntersectionObserver(e=>{t.disconnect();for(let r of e){let i=r.target;i.toggleAttribute("inert",!r.isIntersecting),i.classList.toggle("--in-view",r.isIntersecting),i.setAttribute("aria-hidden",r.isIntersecting?"false":"true")}let o=e.find(r=>r.isIntersecting);if(o)if(this.loop&&o.target.hasAttribute("data-clone")){let r=Number(o.target.getAttribute("data-clone"));this.goToSlide(r,"instant")}else{let i=this.getSlides().indexOf(o.target);this.activeSlide=Math.ceil(i/this.slidesPerMove)*this.slidesPerMove}},{root:this.scrollContainer,threshold:.6});this.getSlides({excludeClones:!1}).forEach(e=>{t.observe(e)})}handleScrollEnd(){!this.scrolling||this.dragging||(this.synchronizeSlides(),this.scrolling=!1)}isCarouselItem(t){return t instanceof Element&&t.tagName.toLowerCase()==="sl-carousel-item"}initializeSlides(){this.getSlides({excludeClones:!1}).forEach((t,e)=>{t.classList.remove("--in-view"),t.classList.remove("--is-active"),t.setAttribute("aria-label",this.localize.term("slideNum",e+1)),t.hasAttribute("data-clone")&&t.remove()}),this.updateSlidesSnap(),this.loop&&this.createClones(),this.synchronizeSlides(),this.goToSlide(this.activeSlide,"auto")}createClones(){let t=this.getSlides(),e=this.slidesPerPage,o=t.slice(-e),r=t.slice(0,e);o.reverse().forEach((i,a)=>{let n=i.cloneNode(!0);n.setAttribute("data-clone",String(t.length-a-1)),this.prepend(n)}),r.forEach((i,a)=>{let n=i.cloneNode(!0);n.setAttribute("data-clone",String(a)),this.append(n)})}handelSlideChange(){let t=this.getSlides();t.forEach((e,o)=>{e.classList.toggle("--is-active",o===this.activeSlide)}),this.hasUpdated&&this.emit("sl-slide-change",{detail:{index:this.activeSlide,slide:t[this.activeSlide]}})}updateSlidesSnap(){let t=this.getSlides(),e=this.slidesPerMove;t.forEach((o,r)=>{(r+e)%e===0?o.style.removeProperty("scroll-snap-align"):o.style.setProperty("scroll-snap-align","none")})}handleAutoplayChange(){this.autoplayController.stop(),this.autoplay&&this.autoplayController.start(this.autoplayInterval)}previous(t="smooth"){this.goToSlide(this.activeSlide-this.slidesPerMove,t)}next(t="smooth"){this.goToSlide(this.activeSlide+this.slidesPerMove,t)}goToSlide(t,e="smooth"){let{slidesPerPage:o,loop:r}=this,i=this.getSlides(),a=this.getSlides({excludeClones:!1});if(!i.length)return;let n=r?(t+i.length)%i.length:Z(t,0,i.length-1);this.activeSlide=n;let d=Z(t+(r?o:0),0,a.length-1),c=a[d];this.scrollToSlide(c,Jo()?"auto":e)}scrollToSlide(t,e="smooth"){let o=this.scrollContainer,r=o.getBoundingClientRect(),i=t.getBoundingClientRect(),a=i.left-r.left,n=i.top-r.top;o.scrollTo({left:a+o.scrollLeft,top:n+o.scrollTop,behavior:e})}render(){let{slidesPerMove:t,scrolling:e}=this,o=this.getPageCount(),r=this.getCurrentPage(),i=this.canScrollPrev(),a=this.canScrollNext(),n=this.localize.dir()==="ltr";return m`
      <div part="base" class="carousel">
        <div
          id="scroll-container"
          part="scroll-container"
          class="${z({carousel__slides:!0,"carousel__slides--horizontal":this.orientation==="horizontal","carousel__slides--vertical":this.orientation==="vertical","carousel__slides--dragging":this.dragging})}"
          style="--slides-per-page: ${this.slidesPerPage};"
          aria-busy="${e?"true":"false"}"
          aria-atomic="true"
          tabindex="0"
          @keydown=${this.handleKeyDown}
          @mousedown="${this.handleMouseDragStart}"
          @scroll="${this.handleScroll}"
          @scrollend=${this.handleScrollEnd}
        >
          <slot></slot>
        </div>

        ${this.navigation?m`
              <div part="navigation" class="carousel__navigation">
                <button
                  part="navigation-button navigation-button--previous"
                  class="${z({"carousel__navigation-button":!0,"carousel__navigation-button--previous":!0,"carousel__navigation-button--disabled":!i})}"
                  aria-label="${this.localize.term("previousSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${i?"false":"true"}"
                  @click=${i?()=>this.previous():null}
                >
                  <slot name="previous-icon">
                    <sl-icon library="system" name="${n?"chevron-left":"chevron-right"}"></sl-icon>
                  </slot>
                </button>

                <button
                  part="navigation-button navigation-button--next"
                  class=${z({"carousel__navigation-button":!0,"carousel__navigation-button--next":!0,"carousel__navigation-button--disabled":!a})}
                  aria-label="${this.localize.term("nextSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${a?"false":"true"}"
                  @click=${a?()=>this.next():null}
                >
                  <slot name="next-icon">
                    <sl-icon library="system" name="${n?"chevron-right":"chevron-left"}"></sl-icon>
                  </slot>
                </button>
              </div>
            `:""}
        ${this.pagination?m`
              <div part="pagination" role="tablist" class="carousel__pagination" aria-controls="scroll-container">
                ${Ca(Sa(o),d=>{let c=d===r;return m`
                    <button
                      part="pagination-item ${c?"pagination-item--active":""}"
                      class="${z({"carousel__pagination-item":!0,"carousel__pagination-item--active":c})}"
                      role="tab"
                      aria-selected="${c?"true":"false"}"
                      aria-label="${this.localize.term("goToSlide",d+1,o)}"
                      tabindex=${c?"0":"-1"}
                      @click=${()=>this.goToSlide(d*t)}
                      @keydown=${this.handleKeyDown}
                    ></button>
                  `})}
              </div>
            `:""}
      </div>
    `}};ot.styles=[C,ka];ot.dependencies={"sl-icon":R};s([l({type:Boolean,reflect:!0})],ot.prototype,"loop",2);s([l({type:Boolean,reflect:!0})],ot.prototype,"navigation",2);s([l({type:Boolean,reflect:!0})],ot.prototype,"pagination",2);s([l({type:Boolean,reflect:!0})],ot.prototype,"autoplay",2);s([l({type:Number,attribute:"autoplay-interval"})],ot.prototype,"autoplayInterval",2);s([l({type:Number,attribute:"slides-per-page"})],ot.prototype,"slidesPerPage",2);s([l({type:Number,attribute:"slides-per-move"})],ot.prototype,"slidesPerMove",2);s([l()],ot.prototype,"orientation",2);s([l({type:Boolean,reflect:!0,attribute:"mouse-dragging"})],ot.prototype,"mouseDragging",2);s([k(".carousel__slides")],ot.prototype,"scrollContainer",2);s([k(".carousel__pagination")],ot.prototype,"paginationContainer",2);s([E()],ot.prototype,"activeSlide",2);s([E()],ot.prototype,"scrolling",2);s([E()],ot.prototype,"dragging",2);s([Ne({passive:!0})],ot.prototype,"handleScroll",1);s([y("loop",{waitUntilFirstUpdate:!0}),y("slidesPerPage",{waitUntilFirstUpdate:!0})],ot.prototype,"initializeSlides",1);s([y("activeSlide")],ot.prototype,"handelSlideChange",1);s([y("slidesPerMove")],ot.prototype,"updateSlidesSnap",1);s([y("autoplay")],ot.prototype,"handleAutoplayChange",1);ot.define("sl-carousel");var za=_`
  :host {
    --aspect-ratio: inherit;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
    aspect-ratio: var(--aspect-ratio);
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  ::slotted(img) {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
`;var ti=class extends v{connectedCallback(){super.connectedCallback(),this.setAttribute("role","group")}render(){return m` <slot></slot> `}};ti.styles=[C,za];ti.define("sl-carousel-item");K.define("sl-button");oe.define("sl-button-group");var Aa=_`
  :host {
    display: inline-flex;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-600);
    line-height: var(--sl-line-height-normal);
    white-space: nowrap;
  }

  .breadcrumb-item__label {
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: var(--sl-transition-fast) --color;
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label {
    color: var(--sl-color-primary-600);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:hover {
    color: var(--sl-color-primary-500);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:active {
    color: var(--sl-color-primary-600);
  }

  .breadcrumb-item__label:focus {
    outline: none;
  }

  .breadcrumb-item__label:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .breadcrumb-item__prefix,
  .breadcrumb-item__suffix {
    display: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .breadcrumb-item--has-prefix .breadcrumb-item__prefix {
    display: inline-flex;
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .breadcrumb-item--has-suffix .breadcrumb-item__suffix {
    display: inline-flex;
    margin-inline-start: var(--sl-spacing-x-small);
  }

  :host(:last-of-type) .breadcrumb-item__separator {
    display: none;
  }

  .breadcrumb-item__separator {
    display: inline-flex;
    align-items: center;
    margin: 0 var(--sl-spacing-x-small);
    user-select: none;
    -webkit-user-select: none;
  }
`;var Je=class extends v{constructor(){super(...arguments),this.hasSlotController=new Y(this,"prefix","suffix"),this.rel="noreferrer noopener"}render(){let t=!!this.href;return m`
      <div
        part="base"
        class=${z({"breadcrumb-item":!0,"breadcrumb-item--has-prefix":this.hasSlotController.test("prefix"),"breadcrumb-item--has-suffix":this.hasSlotController.test("suffix")})}
      >
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix"></slot>
        </span>

        ${t?m`
              <a
                part="label"
                class="breadcrumb-item__label breadcrumb-item__label--link"
                href="${this.href}"
                target="${A(this.target?this.target:void 0)}"
                rel=${A(this.target?this.rel:void 0)}
              >
                <slot></slot>
              </a>
            `:m`
              <button part="label" type="button" class="breadcrumb-item__label breadcrumb-item__label--button">
                <slot></slot>
              </button>
            `}

        <span part="suffix" class="breadcrumb-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span part="separator" class="breadcrumb-item__separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </div>
    `}};Je.styles=[C,Aa];s([l()],Je.prototype,"href",2);s([l()],Je.prototype,"target",2);s([l()],Je.prototype,"rel",2);Je.define("sl-breadcrumb-item");var Ea=_`
  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;var Fe=class extends v{constructor(){super(...arguments),this.localize=new D(this),this.separatorDir=this.localize.dir(),this.label=""}getSeparator(){let e=this.separatorSlot.assignedElements({flatten:!0})[0].cloneNode(!0);return[e,...e.querySelectorAll("[id]")].forEach(o=>o.removeAttribute("id")),e.setAttribute("data-default",""),e.slot="separator",e}handleSlotChange(){let t=[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>e.tagName.toLowerCase()==="sl-breadcrumb-item");t.forEach((e,o)=>{let r=e.querySelector('[slot="separator"]');r===null?e.append(this.getSeparator()):r.hasAttribute("data-default")&&r.replaceWith(this.getSeparator()),o===t.length-1?e.setAttribute("aria-current","page"):e.removeAttribute("aria-current")})}render(){return this.separatorDir!==this.localize.dir()&&(this.separatorDir=this.localize.dir(),this.updateComplete.then(()=>this.handleSlotChange())),m`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <span hidden aria-hidden="true">
        <slot name="separator">
          <sl-icon name=${this.localize.dir()==="rtl"?"chevron-left":"chevron-right"} library="system"></sl-icon>
        </slot>
      </span>
    `}};Fe.styles=[C,Ea];Fe.dependencies={"sl-icon":R};s([k("slot")],Fe.prototype,"defaultSlot",2);s([k('slot[name="separator"]')],Fe.prototype,"separatorSlot",2);s([l()],Fe.prototype,"label",2);Fe.define("sl-breadcrumb");var Ta=_`
  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`;var to=class extends v{constructor(){super(...arguments),this.variant="primary",this.pill=!1,this.pulse=!1}render(){return m`
      <span
        part="base"
        class=${z({badge:!0,"badge--primary":this.variant==="primary","badge--success":this.variant==="success","badge--neutral":this.variant==="neutral","badge--warning":this.variant==="warning","badge--danger":this.variant==="danger","badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `}};to.styles=[C,Ta];s([l({reflect:!0})],to.prototype,"variant",2);s([l({type:Boolean,reflect:!0})],to.prototype,"pill",2);s([l({type:Boolean,reflect:!0})],to.prototype,"pulse",2);to.define("sl-badge");var La=_`
  :host {
    display: contents;
  }
`;var Io={};Ra(Io,{backInDown:()=>mn,backInLeft:()=>gn,backInRight:()=>bn,backInUp:()=>vn,backOutDown:()=>yn,backOutLeft:()=>_n,backOutRight:()=>xn,backOutUp:()=>wn,bounce:()=>en,bounceIn:()=>kn,bounceInDown:()=>Cn,bounceInLeft:()=>Sn,bounceInRight:()=>$n,bounceInUp:()=>zn,bounceOut:()=>An,bounceOutDown:()=>En,bounceOutLeft:()=>Tn,bounceOutRight:()=>Ln,bounceOutUp:()=>In,easings:()=>ei,fadeIn:()=>Dn,fadeInBottomLeft:()=>On,fadeInBottomRight:()=>Pn,fadeInDown:()=>Mn,fadeInDownBig:()=>Rn,fadeInLeft:()=>Fn,fadeInLeftBig:()=>Bn,fadeInRight:()=>Vn,fadeInRightBig:()=>Hn,fadeInTopLeft:()=>Nn,fadeInTopRight:()=>Un,fadeInUp:()=>qn,fadeInUpBig:()=>Wn,fadeOut:()=>jn,fadeOutBottomLeft:()=>Kn,fadeOutBottomRight:()=>Xn,fadeOutDown:()=>Yn,fadeOutDownBig:()=>Gn,fadeOutLeft:()=>Qn,fadeOutLeftBig:()=>Zn,fadeOutRight:()=>Jn,fadeOutRightBig:()=>tc,fadeOutTopLeft:()=>ec,fadeOutTopRight:()=>oc,fadeOutUp:()=>rc,fadeOutUpBig:()=>ic,flash:()=>on,flip:()=>sc,flipInX:()=>ac,flipInY:()=>lc,flipOutX:()=>nc,flipOutY:()=>cc,headShake:()=>rn,heartBeat:()=>sn,hinge:()=>Ic,jackInTheBox:()=>Dc,jello:()=>an,lightSpeedInLeft:()=>dc,lightSpeedInRight:()=>pc,lightSpeedOutLeft:()=>hc,lightSpeedOutRight:()=>uc,pulse:()=>ln,rollIn:()=>Oc,rollOut:()=>Pc,rotateIn:()=>fc,rotateInDownLeft:()=>mc,rotateInDownRight:()=>gc,rotateInUpLeft:()=>bc,rotateInUpRight:()=>vc,rotateOut:()=>yc,rotateOutDownLeft:()=>_c,rotateOutDownRight:()=>xc,rotateOutUpLeft:()=>wc,rotateOutUpRight:()=>kc,rubberBand:()=>nn,shake:()=>cn,shakeX:()=>dn,shakeY:()=>pn,slideInDown:()=>Cc,slideInLeft:()=>Sc,slideInRight:()=>$c,slideInUp:()=>zc,slideOutDown:()=>Ac,slideOutLeft:()=>Ec,slideOutRight:()=>Tc,slideOutUp:()=>Lc,swing:()=>hn,tada:()=>un,wobble:()=>fn,zoomIn:()=>Mc,zoomInDown:()=>Rc,zoomInLeft:()=>Fc,zoomInRight:()=>Bc,zoomInUp:()=>Vc,zoomOut:()=>Hc,zoomOutDown:()=>Nc,zoomOutLeft:()=>Uc,zoomOutRight:()=>qc,zoomOutUp:()=>Wc});var en=[{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.4,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.43,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.53,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.7,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -15px, 0) scaleY(1.05)"},{offset:.8,"transition-timing-function":"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0) scaleY(0.95)"},{offset:.9,transform:"translate3d(0, -4px, 0) scaleY(1.02)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"}];var on=[{offset:0,opacity:"1"},{offset:.25,opacity:"0"},{offset:.5,opacity:"1"},{offset:.75,opacity:"0"},{offset:1,opacity:"1"}];var rn=[{offset:0,transform:"translateX(0)"},{offset:.065,transform:"translateX(-6px) rotateY(-9deg)"},{offset:.185,transform:"translateX(5px) rotateY(7deg)"},{offset:.315,transform:"translateX(-3px) rotateY(-5deg)"},{offset:.435,transform:"translateX(2px) rotateY(3deg)"},{offset:.5,transform:"translateX(0)"}];var sn=[{offset:0,transform:"scale(1)"},{offset:.14,transform:"scale(1.3)"},{offset:.28,transform:"scale(1)"},{offset:.42,transform:"scale(1.3)"},{offset:.7,transform:"scale(1)"}];var an=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.111,transform:"translate3d(0, 0, 0)"},{offset:.222,transform:"skewX(-12.5deg) skewY(-12.5deg)"},{offset:.33299999999999996,transform:"skewX(6.25deg) skewY(6.25deg)"},{offset:.444,transform:"skewX(-3.125deg) skewY(-3.125deg)"},{offset:.555,transform:"skewX(1.5625deg) skewY(1.5625deg)"},{offset:.6659999999999999,transform:"skewX(-0.78125deg) skewY(-0.78125deg)"},{offset:.777,transform:"skewX(0.390625deg) skewY(0.390625deg)"},{offset:.888,transform:"skewX(-0.1953125deg) skewY(-0.1953125deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}];var ln=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.5,transform:"scale3d(1.05, 1.05, 1.05)"},{offset:1,transform:"scale3d(1, 1, 1)"}];var nn=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.3,transform:"scale3d(1.25, 0.75, 1)"},{offset:.4,transform:"scale3d(0.75, 1.25, 1)"},{offset:.5,transform:"scale3d(1.15, 0.85, 1)"},{offset:.65,transform:"scale3d(0.95, 1.05, 1)"},{offset:.75,transform:"scale3d(1.05, 0.95, 1)"},{offset:1,transform:"scale3d(1, 1, 1)"}];var cn=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}];var dn=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}];var pn=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(0, -10px, 0)"},{offset:.2,transform:"translate3d(0, 10px, 0)"},{offset:.3,transform:"translate3d(0, -10px, 0)"},{offset:.4,transform:"translate3d(0, 10px, 0)"},{offset:.5,transform:"translate3d(0, -10px, 0)"},{offset:.6,transform:"translate3d(0, 10px, 0)"},{offset:.7,transform:"translate3d(0, -10px, 0)"},{offset:.8,transform:"translate3d(0, 10px, 0)"},{offset:.9,transform:"translate3d(0, -10px, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}];var hn=[{offset:.2,transform:"rotate3d(0, 0, 1, 15deg)"},{offset:.4,transform:"rotate3d(0, 0, 1, -10deg)"},{offset:.6,transform:"rotate3d(0, 0, 1, 5deg)"},{offset:.8,transform:"rotate3d(0, 0, 1, -5deg)"},{offset:1,transform:"rotate3d(0, 0, 1, 0deg)"}];var un=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.1,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.2,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.3,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.4,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.5,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.6,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.7,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.8,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.9,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:1,transform:"scale3d(1, 1, 1)"}];var fn=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.15,transform:"translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)"},{offset:.3,transform:"translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)"},{offset:.45,transform:"translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)"},{offset:.6,transform:"translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)"},{offset:.75,transform:"translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}];var mn=[{offset:0,transform:"translateY(-1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}];var gn=[{offset:0,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}];var bn=[{offset:0,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}];var vn=[{offset:0,transform:"translateY(1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}];var yn=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(700px) scale(0.7)",opacity:"0.7"}];var _n=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"}];var xn=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"}];var wn=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(-700px) scale(0.7)",opacity:"0.7"}];var kn=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.2,transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.4,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.4,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"scale3d(1.03, 1.03, 1.03)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.8,transform:"scale3d(0.97, 0.97, 0.97)"},{offset:.8,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,opacity:"1",transform:"scale3d(1, 1, 1)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}];var Cn=[{offset:0,opacity:"0",transform:"translate3d(0, -3000px, 0) scaleY(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, 25px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, -10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, 5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}];var Sn=[{offset:0,opacity:"0",transform:"translate3d(-3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(-10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}];var $n=[{offset:0,opacity:"0",transform:"translate3d(3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(-25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(-5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}];var zn=[{offset:0,opacity:"0",transform:"translate3d(0, 3000px, 0) scaleY(5)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, 10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, -5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}];var An=[{offset:.2,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.5,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.55,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:1,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"}];var En=[{offset:.2,transform:"translate3d(0, 10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0) scaleY(3)"}];var Tn=[{offset:.2,opacity:"1",transform:"translate3d(20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0) scaleX(2)"}];var Ln=[{offset:.2,opacity:"1",transform:"translate3d(-20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0) scaleX(2)"}];var In=[{offset:.2,transform:"translate3d(0, -10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0) scaleY(3)"}];var Dn=[{offset:0,opacity:"0"},{offset:1,opacity:"1"}];var On=[{offset:0,opacity:"0",transform:"translate3d(-100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}];var Pn=[{offset:0,opacity:"0",transform:"translate3d(100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}];var Mn=[{offset:0,opacity:"0",transform:"translate3d(0, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}];var Rn=[{offset:0,opacity:"0",transform:"translate3d(0, -2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}];var Fn=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}];var Bn=[{offset:0,opacity:"0",transform:"translate3d(-2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}];var Vn=[{offset:0,opacity:"0",transform:"translate3d(100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}];var Hn=[{offset:0,opacity:"0",transform:"translate3d(2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}];var Nn=[{offset:0,opacity:"0",transform:"translate3d(-100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}];var Un=[{offset:0,opacity:"0",transform:"translate3d(100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}];var qn=[{offset:0,opacity:"0",transform:"translate3d(0, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}];var Wn=[{offset:0,opacity:"0",transform:"translate3d(0, 2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}];var jn=[{offset:0,opacity:"1"},{offset:1,opacity:"0"}];var Kn=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, 100%, 0)"}];var Xn=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, 100%, 0)"}];var Yn=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 100%, 0)"}];var Gn=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0)"}];var Qn=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-100%, 0, 0)"}];var Zn=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0)"}];var Jn=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0)"}];var tc=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0)"}];var ec=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, -100%, 0)"}];var oc=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, -100%, 0)"}];var rc=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -100%, 0)"}];var ic=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0)"}];var sc=[{offset:0,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)",easing:"ease-out"},{offset:.4,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -190deg)`,easing:"ease-out"},{offset:.5,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -170deg)`,easing:"ease-in"},{offset:.8,transform:`perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)
      rotate3d(0, 1, 0, 0deg)`,easing:"ease-in"},{offset:1,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)",easing:"ease-in"}];var ac=[{offset:0,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(1, 0, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(1, 0, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}];var lc=[{offset:0,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(0, 1, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(0, 1, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(0, 1, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}];var nc=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",opacity:"0"}];var cc=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(0, 1, 0, -15deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",opacity:"0"}];var dc=[{offset:0,transform:"translate3d(-100%, 0, 0) skewX(30deg)",opacity:"0"},{offset:.6,transform:"skewX(-20deg)",opacity:"1"},{offset:.8,transform:"skewX(5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}];var pc=[{offset:0,transform:"translate3d(100%, 0, 0) skewX(-30deg)",opacity:"0"},{offset:.6,transform:"skewX(20deg)",opacity:"1"},{offset:.8,transform:"skewX(-5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}];var hc=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(-100%, 0, 0) skewX(-30deg)",opacity:"0"}];var uc=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(100%, 0, 0) skewX(30deg)",opacity:"0"}];var fc=[{offset:0,transform:"rotate3d(0, 0, 1, -200deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}];var mc=[{offset:0,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}];var gc=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}];var bc=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}];var vc=[{offset:0,transform:"rotate3d(0, 0, 1, -90deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}];var yc=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 200deg)",opacity:"0"}];var _c=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"}];var xc=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}];var wc=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}];var kc=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 90deg)",opacity:"0"}];var Cc=[{offset:0,transform:"translate3d(0, -100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}];var Sc=[{offset:0,transform:"translate3d(-100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}];var $c=[{offset:0,transform:"translate3d(100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}];var zc=[{offset:0,transform:"translate3d(0, 100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}];var Ac=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, 100%, 0)"}];var Ec=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(-100%, 0, 0)"}];var Tc=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(100%, 0, 0)"}];var Lc=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, -100%, 0)"}];var Ic=[{offset:0,easing:"ease-in-out"},{offset:.2,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.4,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:.6,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.8,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:1,transform:"translate3d(0, 700px, 0)",opacity:"0"}];var Dc=[{offset:0,opacity:"0",transform:"scale(0.1) rotate(30deg)","transform-origin":"center bottom"},{offset:.5,transform:"rotate(-10deg)"},{offset:.7,transform:"rotate(3deg)"},{offset:1,opacity:"1",transform:"scale(1)"}];var Oc=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}];var Pc=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)"}];var Mc=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:.5,opacity:"1"}];var Rc=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}];var Fc=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}];var Bc=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}];var Vc=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}];var Hc=[{offset:0,opacity:"1"},{offset:.5,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:1,opacity:"0"}];var Nc=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}];var Uc=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(-2000px, 0, 0)"}];var qc=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(2000px, 0, 0)"}];var Wc=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}];var ei={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",easeInSine:"cubic-bezier(0.47, 0, 0.745, 0.715)",easeOutSine:"cubic-bezier(0.39, 0.575, 0.565, 1)",easeInOutSine:"cubic-bezier(0.445, 0.05, 0.55, 0.95)",easeInQuad:"cubic-bezier(0.55, 0.085, 0.68, 0.53)",easeOutQuad:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",easeInOutQuad:"cubic-bezier(0.455, 0.03, 0.515, 0.955)",easeInCubic:"cubic-bezier(0.55, 0.055, 0.675, 0.19)",easeOutCubic:"cubic-bezier(0.215, 0.61, 0.355, 1)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1)",easeInQuart:"cubic-bezier(0.895, 0.03, 0.685, 0.22)",easeOutQuart:"cubic-bezier(0.165, 0.84, 0.44, 1)",easeInOutQuart:"cubic-bezier(0.77, 0, 0.175, 1)",easeInQuint:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",easeOutQuint:"cubic-bezier(0.23, 1, 0.32, 1)",easeInOutQuint:"cubic-bezier(0.86, 0, 0.07, 1)",easeInExpo:"cubic-bezier(0.95, 0.05, 0.795, 0.035)",easeOutExpo:"cubic-bezier(0.19, 1, 0.22, 1)",easeInOutExpo:"cubic-bezier(1, 0, 0, 1)",easeInCirc:"cubic-bezier(0.6, 0.04, 0.98, 0.335)",easeOutCirc:"cubic-bezier(0.075, 0.82, 0.165, 1)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.15, 0.86)",easeInBack:"cubic-bezier(0.6, -0.28, 0.735, 0.045)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",easeInOutBack:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"};var pt=class extends v{constructor(){super(...arguments),this.hasStarted=!1,this.name="none",this.play=!1,this.delay=0,this.direction="normal",this.duration=1e3,this.easing="linear",this.endDelay=0,this.fill="auto",this.iterations=1/0,this.iterationStart=0,this.playbackRate=1,this.handleAnimationFinish=()=>{this.play=!1,this.hasStarted=!1,this.emit("sl-finish")},this.handleAnimationCancel=()=>{this.play=!1,this.hasStarted=!1,this.emit("sl-cancel")}}get currentTime(){var t,e;return(e=(t=this.animation)==null?void 0:t.currentTime)!=null?e:0}set currentTime(t){this.animation&&(this.animation.currentTime=t)}connectedCallback(){super.connectedCallback(),this.createAnimation()}disconnectedCallback(){super.disconnectedCallback(),this.destroyAnimation()}handleSlotChange(){this.destroyAnimation(),this.createAnimation()}async createAnimation(){var t,e;let o=(t=Io.easings[this.easing])!=null?t:this.easing,r=(e=this.keyframes)!=null?e:Io[this.name],a=(await this.defaultSlot).assignedElements()[0];return!a||!r?!1:(this.destroyAnimation(),this.animation=a.animate(r,{delay:this.delay,direction:this.direction,duration:this.duration,easing:o,endDelay:this.endDelay,fill:this.fill,iterationStart:this.iterationStart,iterations:this.iterations}),this.animation.playbackRate=this.playbackRate,this.animation.addEventListener("cancel",this.handleAnimationCancel),this.animation.addEventListener("finish",this.handleAnimationFinish),this.play?(this.hasStarted=!0,this.emit("sl-start")):this.animation.pause(),!0)}destroyAnimation(){this.animation&&(this.animation.cancel(),this.animation.removeEventListener("cancel",this.handleAnimationCancel),this.animation.removeEventListener("finish",this.handleAnimationFinish),this.hasStarted=!1)}handleAnimationChange(){this.hasUpdated&&this.createAnimation()}handlePlayChange(){return this.animation?(this.play&&!this.hasStarted&&(this.hasStarted=!0,this.emit("sl-start")),this.play?this.animation.play():this.animation.pause(),!0):!1}handlePlaybackRateChange(){this.animation&&(this.animation.playbackRate=this.playbackRate)}cancel(){var t;(t=this.animation)==null||t.cancel()}finish(){var t;(t=this.animation)==null||t.finish()}render(){return m` <slot @slotchange=${this.handleSlotChange}></slot> `}};pt.styles=[C,La];s([Ai("slot")],pt.prototype,"defaultSlot",2);s([l()],pt.prototype,"name",2);s([l({type:Boolean,reflect:!0})],pt.prototype,"play",2);s([l({type:Number})],pt.prototype,"delay",2);s([l()],pt.prototype,"direction",2);s([l({type:Number})],pt.prototype,"duration",2);s([l()],pt.prototype,"easing",2);s([l({attribute:"end-delay",type:Number})],pt.prototype,"endDelay",2);s([l()],pt.prototype,"fill",2);s([l({type:Number})],pt.prototype,"iterations",2);s([l({attribute:"iteration-start",type:Number})],pt.prototype,"iterationStart",2);s([l({attribute:!1})],pt.prototype,"keyframes",2);s([l({attribute:"playback-rate",type:Number})],pt.prototype,"playbackRate",2);s([y(["name","delay","direction","duration","easing","endDelay","fill","iterations","iterationsStart","keyframes"])],pt.prototype,"handleAnimationChange",1);s([y("play")],pt.prototype,"handlePlayChange",1);s([y("playbackRate")],pt.prototype,"handlePlaybackRateChange",1);pt.define("sl-animation");var Ia=_`
  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`;var Gt=class extends v{constructor(){super(...arguments),this.hasError=!1,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=!1}render(){let t=m`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${()=>this.hasError=!0}"
      />
    `,e=m``;return this.initials?e=m`<div part="initials" class="avatar__initials">${this.initials}</div>`:e=m`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <sl-icon name="person-fill" library="system"></sl-icon>
          </slot>
        </div>
      `,m`
      <div
        part="base"
        class=${z({avatar:!0,"avatar--circle":this.shape==="circle","avatar--rounded":this.shape==="rounded","avatar--square":this.shape==="square"})}
        role="img"
        aria-label=${this.label}
      >
        ${this.image&&!this.hasError?t:e}
      </div>
    `}};Gt.styles=[C,Ia];Gt.dependencies={"sl-icon":R};s([E()],Gt.prototype,"hasError",2);s([l()],Gt.prototype,"image",2);s([l()],Gt.prototype,"label",2);s([l()],Gt.prototype,"initials",2);s([l()],Gt.prototype,"loading",2);s([l({reflect:!0})],Gt.prototype,"shape",2);s([y("image")],Gt.prototype,"handleImageChange",1);Gt.define("sl-avatar");var Da=_`
  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    padding-inline-end: var(--sl-spacing-medium);
  }
`;var eo=Object.assign(document.createElement("div"),{className:"sl-toast-stack"}),Qt=class extends v{constructor(){super(...arguments),this.hasSlotController=new Y(this,"icon","suffix"),this.localize=new D(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0}firstUpdated(){this.base.hidden=!this.open}restartAutoHide(){clearTimeout(this.autoHideTimeout),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.duration))}handleCloseClick(){this.hide()}handleMouseMove(){this.restartAutoHide()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.duration<1/0&&this.restartAutoHide(),await Q(this.base),this.base.hidden=!1;let{keyframes:t,options:e}=W(this,"alert.show",{dir:this.localize.dir()});await X(this.base,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),clearTimeout(this.autoHideTimeout),await Q(this.base);let{keyframes:t,options:e}=W(this,"alert.hide",{dir:this.localize.dir()});await X(this.base,t,e),this.base.hidden=!0,this.emit("sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}async show(){if(!this.open)return this.open=!0,et(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,et(this,"sl-after-hide")}async toast(){return new Promise(t=>{eo.parentElement===null&&document.body.append(eo),eo.appendChild(this),requestAnimationFrame(()=>{this.clientWidth,this.show()}),this.addEventListener("sl-after-hide",()=>{eo.removeChild(this),t(),eo.querySelector("sl-alert")===null&&eo.remove()},{once:!0})})}render(){return m`
      <div
        part="base"
        class=${z({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":this.variant==="primary","alert--success":this.variant==="success","alert--neutral":this.variant==="neutral","alert--warning":this.variant==="warning","alert--danger":this.variant==="danger"})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mousemove=${this.handleMouseMove}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable?m`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}
      </div>
    `}};Qt.styles=[C,Da];Qt.dependencies={"sl-icon-button":J};s([k('[part~="base"]')],Qt.prototype,"base",2);s([l({type:Boolean,reflect:!0})],Qt.prototype,"open",2);s([l({type:Boolean,reflect:!0})],Qt.prototype,"closable",2);s([l({reflect:!0})],Qt.prototype,"variant",2);s([l({type:Number})],Qt.prototype,"duration",2);s([y("open",{waitUntilFirstUpdate:!0})],Qt.prototype,"handleOpenChange",1);s([y("duration")],Qt.prototype,"handleDurationChange",1);V("alert.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});V("alert.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});Qt.define("sl-alert");var Oa=_`
  :host {
    --control-box-size: 3rem;
    --icon-size: calc(var(--control-box-size) * 0.625);

    display: inline-flex;
    position: relative;
    cursor: pointer;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  img[aria-hidden='true'] {
    display: none;
  }

  .animated-image__control-box {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: calc(50% - var(--control-box-size) / 2);
    right: calc(50% - var(--control-box-size) / 2);
    width: var(--control-box-size);
    height: var(--control-box-size);
    font-size: var(--icon-size);
    background: none;
    border: solid 2px currentColor;
    background-color: rgb(0 0 0 /50%);
    border-radius: var(--sl-border-radius-circle);
    color: white;
    pointer-events: none;
    transition: var(--sl-transition-fast) opacity;
  }

  :host([play]:hover) .animated-image__control-box {
    opacity: 1;
  }

  :host([play]:not(:hover)) .animated-image__control-box {
    opacity: 0;
  }

  :host([play]) slot[name='play-icon'],
  :host(:not([play])) slot[name='pause-icon'] {
    display: none;
  }
`;var Ht=class extends v{constructor(){super(...arguments),this.isLoaded=!1}handleClick(){this.play=!this.play}handleLoad(){let t=document.createElement("canvas"),{width:e,height:o}=this.animatedImage;t.width=e,t.height=o,t.getContext("2d").drawImage(this.animatedImage,0,0,e,o),this.frozenFrame=t.toDataURL("image/gif"),this.isLoaded||(this.emit("sl-load"),this.isLoaded=!0)}handleError(){this.emit("sl-error")}handlePlayChange(){this.play&&(this.animatedImage.src="",this.animatedImage.src=this.src)}handleSrcChange(){this.isLoaded=!1}render(){return m`
      <div class="animated-image">
        <img
          class="animated-image__animated"
          src=${this.src}
          alt=${this.alt}
          crossorigin="anonymous"
          aria-hidden=${this.play?"false":"true"}
          @click=${this.handleClick}
          @load=${this.handleLoad}
          @error=${this.handleError}
        />

        ${this.isLoaded?m`
              <img
                class="animated-image__frozen"
                src=${this.frozenFrame}
                alt=${this.alt}
                aria-hidden=${this.play?"true":"false"}
                @click=${this.handleClick}
              />

              <div part="control-box" class="animated-image__control-box">
                <slot name="play-icon"><sl-icon name="play-fill" library="system"></sl-icon></slot>
                <slot name="pause-icon"><sl-icon name="pause-fill" library="system"></sl-icon></slot>
              </div>
            `:""}
      </div>
    `}};Ht.styles=[C,Oa];Ht.dependencies={"sl-icon":R};s([k(".animated-image__animated")],Ht.prototype,"animatedImage",2);s([E()],Ht.prototype,"frozenFrame",2);s([E()],Ht.prototype,"isLoaded",2);s([l()],Ht.prototype,"src",2);s([l()],Ht.prototype,"alt",2);s([l({type:Boolean,reflect:!0})],Ht.prototype,"play",2);s([y("play",{waitUntilFirstUpdate:!0})],Ht.prototype,"handlePlayChange",1);s([y("src")],Ht.prototype,"handleSrcChange",1);Ht.define("sl-animated-image");})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/when.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/ref.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/map.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/range.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
