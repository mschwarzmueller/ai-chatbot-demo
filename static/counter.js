var Ue=Object.defineProperty;var Ze=(e,t,n)=>t in e?Ue(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var P=(e,t,n)=>Ze(e,typeof t!="symbol"?t+"":t,n);var ze={Stringify:1},w=(e,t)=>{const n=new String(e);return n.isEscaped=!0,n.callbacks=t,n},Ke=/[&<>'"]/,Ve=async(e,t)=>{let n="";t||(t=[]);const a=await Promise.all(e);for(let r=a.length-1;n+=a[r],r--,!(r<0);r--){let i=a[r];typeof i=="object"&&t.push(...i.callbacks||[]);const s=i.isEscaped;if(i=await(typeof i=="object"?i.toString():i),typeof i=="object"&&t.push(...i.callbacks||[]),i.isEscaped??s)n+=i;else{const l=[n];N(i,l),n=l[0]}}return w(n,t)},N=(e,t)=>{const n=e.search(Ke);if(n===-1){t[0]+=e;return}let a,r,i=0;for(r=n;r<e.length;r++){switch(e.charCodeAt(r)){case 34:a="&quot;";break;case 39:a="&#39;";break;case 38:a="&amp;";break;case 60:a="&lt;";break;case 62:a="&gt;";break;default:continue}t[0]+=e.substring(i,r)+a,i=r+1}t[0]+=e.substring(i,r)},Xe=e=>{const t=e.callbacks;if(!(t!=null&&t.length))return e;const n=[e],a={};return t.forEach(r=>r({phase:ze.Stringify,buffer:n,context:a})),n[0]},se=Symbol("RENDERER"),ae=Symbol("ERROR_HANDLER"),C=Symbol("STASH"),we=Symbol("INTERNAL"),Je=Symbol("MEMO"),z=Symbol("PERMALINK"),he=e=>(e[we]=!0,e),Pe=e=>({value:t,children:n})=>{if(!n)return;const a={children:[{tag:he(()=>{e.push(t)}),props:{}}]};Array.isArray(n)?a.children.push(...n.flat()):a.children.push(n),a.children.push({tag:he(()=>{e.pop()}),props:{}});const r={tag:"",props:a,type:""};return r[ae]=i=>{throw e.pop(),i},r},Te=e=>{const t=[e],n=Pe(t);return n.values=t,n.Provider=n,$.push(n),n},$=[],Ge=e=>{const t=[e],n=a=>{t.push(a.value);let r;try{r=a.children?(Array.isArray(a.children)?new Le("",{},a.children):a.children).toString():""}finally{t.pop()}return r instanceof Promise?r.then(i=>w(i,i.callbacks)):w(r)};return n.values=t,n.Provider=n,n[se]=Pe(t),$.push(n),n},L=e=>e.values.at(-1),q={title:[],script:["src"],style:["data-href"],link:["href"],meta:["name","httpEquiv","charset","itemProp"]},ie={},W="data-precedence",F=e=>Array.isArray(e)?e:[e],de=new WeakMap,me=(e,t,n,a)=>({buffer:r,context:i})=>{if(!r)return;const s=de.get(i)||{};de.set(i,s);const l=s[e]||(s[e]=[]);let c=!1;const g=q[e];if(g.length>0){e:for(const[,u]of l)for(const o of g)if(((u==null?void 0:u[o])??null)===(n==null?void 0:n[o])){c=!0;break e}}if(c?r[0]=r[0].replaceAll(t,""):g.length>0?l.push([t,n,a]):l.unshift([t,n,a]),r[0].indexOf("</head>")!==-1){let u;if(a===void 0)u=l.map(([o])=>o);else{const o=[];u=l.map(([f,,h])=>{let d=o.indexOf(h);return d===-1&&(o.push(h),d=o.length-1),[f,d]}).sort((f,h)=>f[1]-h[1]).map(([f])=>f)}u.forEach(o=>{r[0]=r[0].replaceAll(o,"")}),r[0]=r[0].replace(/(?=<\/head>)/,u.join(""))}},j=(e,t,n)=>w(new A(e,n,F(t??[])).toString()),B=(e,t,n,a)=>{if("itemProp"in n)return j(e,t,n);let{precedence:r,blocking:i,...s}=n;r=a?r??"":void 0,a&&(s[W]=r);const l=new A(e,s,F(t||[])).toString();return l instanceof Promise?l.then(c=>w(l,[...c.callbacks||[],me(e,c,s,r)])):w(l,[me(e,l,s,r)])},Qe=({children:e,...t})=>{const n=fe();if(n){const a=L(n);if(a==="svg"||a==="head")return new A("title",t,F(e??[]))}return B("title",e,t,!1)},Ye=({children:e,...t})=>{const n=fe();return["src","async"].some(a=>!t[a])||n&&L(n)==="head"?j("script",e,t):B("script",e,t,!1)},et=({children:e,...t})=>["href","precedence"].every(n=>n in t)?(t["data-href"]=t.href,delete t.href,B("style",e,t,!0)):j("style",e,t),tt=({children:e,...t})=>["onLoad","onError"].some(n=>n in t)||t.rel==="stylesheet"&&(!("precedence"in t)||"disabled"in t)?j("link",e,t):B("link",e,t,"precedence"in t),nt=({children:e,...t})=>{const n=fe();return n&&L(n)==="head"?j("meta",e,t):B("meta",e,t,!1)},Ne=(e,{children:t,...n})=>new A(e,n,F(t??[])),rt=e=>(typeof e.action=="function"&&(e.action=z in e.action?e.action[z]:void 0),Ne("form",e)),$e=(e,t)=>(typeof t.formAction=="function"&&(t.formAction=z in t.formAction?t.formAction[z]:void 0),Ne(e,t)),at=e=>$e("input",e),it=e=>$e("button",e);const J=Object.freeze(Object.defineProperty({__proto__:null,button:it,form:rt,input:at,link:tt,meta:nt,script:Ye,style:et,title:Qe},Symbol.toStringTag,{value:"Module"}));var lt=new Map([["className","class"],["htmlFor","for"],["crossOrigin","crossorigin"],["httpEquiv","http-equiv"],["itemProp","itemprop"],["fetchPriority","fetchpriority"],["noModule","nomodule"],["formAction","formaction"]]),K=e=>lt.get(e)||e,Me=(e,t)=>{for(const[n,a]of Object.entries(e)){const r=n[0]==="-"||!/[A-Z]/.test(n)?n:n.replace(/[A-Z]/g,i=>`-${i.toLowerCase()}`);t(r,a==null?null:typeof a=="number"?r.match(/^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/)?`${a}`:`${a}px`:a)}},O=void 0,fe=()=>O,st=e=>/[A-Z]/.test(e)&&e.match(/^(?:al|basel|clip(?:Path|Rule)$|co|do|fill|fl|fo|gl|let|lig|i|marker[EMS]|o|pai|pointe|sh|st[or]|text[^L]|tr|u|ve|w)/)?e.replace(/([A-Z])/g,"-$1").toLowerCase():e,ft=["area","base","br","col","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],ot=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","defer","disabled","download","formnovalidate","hidden","inert","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"],oe=(e,t)=>{for(let n=0,a=e.length;n<a;n++){const r=e[n];if(typeof r=="string")N(r,t);else{if(typeof r=="boolean"||r===null||r===void 0)continue;r instanceof A?r.toStringToBuffer(t):typeof r=="number"||r.isEscaped?t[0]+=r:r instanceof Promise?t.unshift("",r):oe(r,t)}}},A=class{constructor(e,t,n){P(this,"tag");P(this,"props");P(this,"key");P(this,"children");P(this,"isEscaped",!0);P(this,"localContexts");this.tag=e,this.props=t,this.children=n}get type(){return this.tag}get ref(){return this.props.ref||null}toString(){var t,n;const e=[""];(t=this.localContexts)==null||t.forEach(([a,r])=>{a.values.push(r)});try{this.toStringToBuffer(e)}finally{(n=this.localContexts)==null||n.forEach(([a])=>{a.values.pop()})}return e.length===1?"callbacks"in e?Xe(w(e[0],e.callbacks)).toString():e[0]:Ve(e,e.callbacks)}toStringToBuffer(e){const t=this.tag,n=this.props;let{children:a}=this;e[0]+=`<${t}`;const r=O&&L(O)==="svg"?i=>st(K(i)):i=>K(i);for(let[i,s]of Object.entries(n))if(i=r(i),i!=="children"){if(i==="style"&&typeof s=="object"){let l="";Me(s,(c,g)=>{g!=null&&(l+=`${l?";":""}${c}:${g}`)}),e[0]+=' style="',N(l,e),e[0]+='"'}else if(typeof s=="string")e[0]+=` ${i}="`,N(s,e),e[0]+='"';else if(s!=null)if(typeof s=="number"||s.isEscaped)e[0]+=` ${i}="${s}"`;else if(typeof s=="boolean"&&ot.includes(i))s&&(e[0]+=` ${i}=""`);else if(i==="dangerouslySetInnerHTML"){if(a.length>0)throw"Can only set one of `children` or `props.dangerouslySetInnerHTML`.";a=[w(s.__html)]}else if(s instanceof Promise)e[0]+=` ${i}="`,e.unshift('"',s);else if(typeof s=="function"){if(!i.startsWith("on"))throw`Invalid prop '${i}' of type 'function' supplied to '${t}'.`}else e[0]+=` ${i}="`,N(s.toString(),e),e[0]+='"'}if(ft.includes(t)&&a.length===0){e[0]+="/>";return}e[0]+=">",oe(a,e),e[0]+=`</${t}>`}},G=class extends A{toStringToBuffer(e){const{children:t}=this,n=this.tag.call(null,{...this.props,children:t.length<=1?t[0]:t});if(!(typeof n=="boolean"||n==null))if(n instanceof Promise)if($.length===0)e.unshift("",n);else{const a=$.map(r=>[r,r.values.at(-1)]);e.unshift("",n.then(r=>(r instanceof A&&(r.localContexts=a),r)))}else n instanceof A?n.toStringToBuffer(e):typeof n=="number"||n.isEscaped?(e[0]+=n,n.callbacks&&(e.callbacks||(e.callbacks=[]),e.callbacks.push(...n.callbacks))):N(n,e)}},Le=class extends A{toStringToBuffer(e){oe(this.children,e)}},ge=!1,Q=(e,t,n)=>{if(!ge){for(const a in ie)J[a][se]=ie[a];ge=!0}return typeof e=="function"?new G(e,t,n):J[e]?new G(J[e],t,n):e==="svg"||e==="head"?(O||(O=Ge("")),new A(e,t,[new G(O,{value:e},n)])):new A(e,t,n)},ct=({children:e})=>new Le("",{children:e},Array.isArray(e)?e:e?[e]:[]);function R(e,t,n){let a;if(!t||!("children"in t))a=Q(e,t,[]);else{const r=t.children;a=Array.isArray(r)?Q(e,t,r):Q(e,t,[r])}return a.key=n,a}var D="_hp",ut={Change:"Input",DoubleClick:"DblClick"},vt={svg:"2000/svg",math:"1998/Math/MathML"},I=[],le=new WeakMap,M=void 0,ht=()=>M,b=e=>"t"in e,Y={onClick:["click",!1]},ye=e=>{if(!e.startsWith("on"))return;if(Y[e])return Y[e];const t=e.match(/^on([A-Z][a-zA-Z]+?(?:PointerCapture)?)(Capture)?$/);if(t){const[,n,a]=t;return Y[e]=[(ut[n]||n).toLowerCase(),!!a]}},pe=(e,t)=>M&&e instanceof SVGElement&&/[A-Z]/.test(t)&&(t in e.style||t.match(/^(?:o|pai|str|u|ve)/))?t.replace(/([A-Z])/g,"-$1").toLowerCase():t,dt=(e,t,n)=>{var a;t||(t={});for(let r in t){const i=t[r];if(r!=="children"&&(!n||n[r]!==i)){r=K(r);const s=ye(r);if(s){if((n==null?void 0:n[r])!==i&&(n&&e.removeEventListener(s[0],n[r],s[1]),i!=null)){if(typeof i!="function")throw new Error(`Event handler for "${r}" is not a function`);e.addEventListener(s[0],i,s[1])}}else if(r==="dangerouslySetInnerHTML"&&i)e.innerHTML=i.__html;else if(r==="ref"){let l;typeof i=="function"?l=i(e)||(()=>i(null)):i&&"current"in i&&(i.current=e,l=()=>i.current=null),le.set(e,l)}else if(r==="style"){const l=e.style;typeof i=="string"?l.cssText=i:(l.cssText="",i!=null&&Me(i,l.setProperty.bind(l)))}else{if(r==="value"){const c=e.nodeName;if(c==="INPUT"||c==="TEXTAREA"||c==="SELECT"){if(e.value=i==null||i===!1?null:i,c==="TEXTAREA"){e.textContent=i;continue}else if(c==="SELECT"){e.selectedIndex===-1&&(e.selectedIndex=0);continue}}}else(r==="checked"&&e.nodeName==="INPUT"||r==="selected"&&e.nodeName==="OPTION")&&(e[r]=i);const l=pe(e,r);i==null||i===!1?e.removeAttribute(l):i===!0?e.setAttribute(l,""):typeof i=="string"||typeof i=="number"?e.setAttribute(l,i):e.setAttribute(l,i.toString())}}}if(n)for(let r in n){const i=n[r];if(r!=="children"&&!(r in t)){r=K(r);const s=ye(r);s?e.removeEventListener(s[0],i,s[1]):r==="ref"?(a=le.get(e))==null||a():e.removeAttribute(pe(e,r))}}},mt=(e,t)=>{t[C][0]=0,I.push([e,t]);const n=t.tag[se]||t.tag,a=n.defaultProps?{...n.defaultProps,...t.props}:t.props;try{return[n.call(null,a)]}finally{I.pop()}},Re=(e,t,n,a,r)=>{var i,s;(i=e.vR)!=null&&i.length&&(a.push(...e.vR),delete e.vR),typeof e.tag=="function"&&((s=e[C][1][Fe])==null||s.forEach(l=>r.push(l))),e.vC.forEach(l=>{var c;if(b(l))n.push(l);else if(typeof l.tag=="function"||l.tag===""){l.c=t;const g=n.length;if(Re(l,t,n,a,r),l.s){for(let u=g;u<n.length;u++)n[u].s=!0;l.s=!1}}else n.push(l),(c=l.vR)!=null&&c.length&&(a.push(...l.vR),delete l.vR)})},gt=e=>{for(;;e=e.tag===D||!e.vC||!e.pP?e.nN:e.vC[0]){if(!e)return null;if(e.tag!==D&&e.e)return e.e}},xe=e=>{var t,n,a,r,i,s;b(e)||((n=(t=e[C])==null?void 0:t[1][Fe])==null||n.forEach(l=>{var c;return(c=l[2])==null?void 0:c.call(l)}),(a=le.get(e.e))==null||a(),e.p===2&&((r=e.vC)==null||r.forEach(l=>l.p=2)),(i=e.vC)==null||i.forEach(xe)),e.p||((s=e.e)==null||s.remove(),delete e.e),typeof e.tag=="function"&&(x.delete(e),U.delete(e),delete e[C][3],e.a=!0)},ce=(e,t,n)=>{e.c=t,Oe(e,t,n)},Ee=(e,t)=>{if(t){for(let n=0,a=e.length;n<a;n++)if(e[n]===t)return n}},ke=Symbol(),Oe=(e,t,n)=>{var g;const a=[],r=[],i=[];Re(e,t,a,r,i),r.forEach(xe);const s=n?void 0:t.childNodes;let l,c=null;if(n)l=-1;else if(!s.length)l=0;else{const u=Ee(s,gt(e.nN));u!==void 0?(c=s[u],l=u):l=Ee(s,(g=a.find(o=>o.tag!==D&&o.e))==null?void 0:g.e)??-1,l===-1&&(n=!0)}for(let u=0,o=a.length;u<o;u++,l++){const f=a[u];let h;if(f.s&&f.e)h=f.e,f.s=!1;else{const d=n||!f.e;b(f)?(f.e&&f.d&&(f.e.textContent=f.t),f.d=!1,h=f.e||(f.e=document.createTextNode(f.t))):(h=f.e||(f.e=f.n?document.createElementNS(f.n,f.tag):document.createElement(f.tag)),dt(h,f.props,f.pP),Oe(f,h,d))}f.tag===D?l--:n?h.parentNode||t.appendChild(h):s[l]!==h&&s[l-1]!==h&&(s[l+1]===h?t.appendChild(s[l]):t.insertBefore(h,c||s[l]||null))}if(e.pP&&delete e.pP,i.length){const u=[],o=[];i.forEach(([,f,,h,d])=>{f&&u.push(f),h&&o.push(h),d==null||d()}),u.forEach(f=>f()),o.length&&requestAnimationFrame(()=>{o.forEach(f=>f())})}},yt=(e,t)=>!!(e&&e.length===t.length&&e.every((n,a)=>n[1]===t[a][1])),U=new WeakMap,V=(e,t,n)=>{var i,s,l,c,g,u;const a=!n&&t.pC;n&&(t.pC||(t.pC=t.vC));let r;try{n||(n=typeof t.tag=="function"?mt(e,t):F(t.props.children)),((i=n[0])==null?void 0:i.tag)===""&&n[0][ae]&&(r=n[0][ae],e[5].push([e,r,t]));const o=a?[...t.pC]:t.vC?[...t.vC]:void 0,f=[];let h;for(let d=0;d<n.length;d++){Array.isArray(n[d])&&n.splice(d,1,...n[d].flat());let v=De(n[d]);if(v){typeof v.tag=="function"&&!v.tag[we]&&($.length>0&&(v[C][2]=$.map(p=>[p,p.values.at(-1)])),(s=e[5])!=null&&s.length&&(v[C][3]=e[5].at(-1)));let m;if(o&&o.length){const p=o.findIndex(b(v)?y=>b(y):v.key!==void 0?y=>y.key===v.key&&y.tag===v.tag:y=>y.tag===v.tag);p!==-1&&(m=o[p],o.splice(p,1))}if(m)if(b(v))m.t!==v.t&&(m.t=v.t,m.d=!0),v=m;else{const p=m.pP=m.props;if(m.props=v.props,m.f||(m.f=v.f||t.f),typeof v.tag=="function"){const y=m[C][2];m[C][2]=v[C][2]||[],m[C][3]=v[C][3],!m.f&&((m.o||m)===v.o||(c=(l=m.tag)[Je])!=null&&c.call(l,p,m.props))&&yt(y,m[C][2])&&(m.s=!0)}v=m}else if(!b(v)&&M){const p=L(M);p&&(v.n=p)}if(!b(v)&&!v.s&&(V(e,v),delete v.f),f.push(v),h&&!h.s&&!v.s)for(let p=h;p&&!b(p);p=(g=p.vC)==null?void 0:g.at(-1))p.nN=v;h=v}}t.vR=a?[...t.vC,...o||[]]:o||[],t.vC=f,a&&delete t.pC}catch(o){if(t.f=!0,o===ke){if(r)return;throw o}const[f,h,d]=((u=t[C])==null?void 0:u[3])||[];if(h){const v=()=>Z([0,!1,e[2]],d),m=U.get(d)||[];m.push(v),U.set(d,m);const p=h(o,()=>{const y=U.get(d);if(y){const k=y.indexOf(v);if(k!==-1)return y.splice(k,1),v()}});if(p){if(e[0]===1)e[1]=!0;else if(V(e,d,[p]),(h.length===1||e!==f)&&d.c){ce(d,d.c,!1);return}throw ke}}throw o}finally{r&&e[5].pop()}},De=e=>{if(!(e==null||typeof e=="boolean")){if(typeof e=="string"||typeof e=="number")return{t:e.toString(),d:!0};if("vR"in e&&(e={tag:e.tag,props:e.props,key:e.key,f:e.f,type:e.tag,ref:e.props.ref,o:e.o||e}),typeof e.tag=="function")e[C]=[0,[]];else{const t=vt[e.tag];t&&(M||(M=Te("")),e.props.children=[{tag:M,props:{value:e.n=`http://www.w3.org/${t}`,children:e.props.children}}])}return e}},Ie=(e,t,n)=>{e.c===t&&(e.c=n,e.vC.forEach(a=>Ie(a,t,n)))},Ce=(e,t)=>{var n,a;(n=t[C][2])==null||n.forEach(([r,i])=>{r.values.push(i)});try{V(e,t,void 0)}catch{return}if(t.a){delete t.a;return}(a=t[C][2])==null||a.forEach(([r])=>{r.values.pop()}),(e[0]!==1||!e[1])&&ce(t,t.c,!1)},x=new WeakMap,Se=[],Z=async(e,t)=>{e[5]||(e[5]=[]);const n=x.get(t);n&&n[0](void 0);let a;const r=new Promise(i=>a=i);if(x.set(t,[a,()=>{e[2]?e[2](e,t,i=>{Ce(i,t)}).then(()=>a(t)):(Ce(e,t),a(t))}]),Se.length)Se.at(-1).add(t);else{await Promise.resolve();const i=x.get(t);i&&(x.delete(t),i[1]())}return r},pt=(e,t)=>{const n=[];n[5]=[],n[4]=!0,V(n,e,void 0),n[4]=!1;const a=document.createDocumentFragment();ce(e,a,!0),Ie(e,a,t),t.replaceChildren(a)},Et=(e,t)=>{pt(De({tag:"",props:{children:e}}),t)},kt=(e,t,n)=>({tag:D,props:{children:e},key:n,e:t,p:1}),ee=0,Fe=1,te=2,ne=3,re=new WeakMap,je=(e,t)=>!e||!t||e.length!==t.length||t.some((n,a)=>n!==e[a]),Ct=void 0,Ae=[],Be=e=>{var s;const t=()=>typeof e=="function"?e():e,n=I.at(-1);if(!n)return[t(),()=>{}];const[,a]=n,r=(s=a[C][1])[ee]||(s[ee]=[]),i=a[C][0]++;return r[i]||(r[i]=[t(),l=>{const c=Ct,g=r[i];if(typeof l=="function"&&(l=l(g[0])),!Object.is(l,g[0]))if(g[0]=l,Ae.length){const[u,o]=Ae.at(-1);Promise.all([u===3?a:Z([u,!1,c],a),o]).then(([f])=>{if(!f||!(u===2||u===3))return;const h=f.vC;requestAnimationFrame(()=>{setTimeout(()=>{h===f.vC&&Z([u===3?1:0,!1,c],f)})})})}else Z([0,!1,c],a)}])},ue=(e,t)=>{var l;const n=I.at(-1);if(!n)return e;const[,a]=n,r=(l=a[C][1])[te]||(l[te]=[]),i=a[C][0]++,s=r[i];return je(s==null?void 0:s[1],t)?r[i]=[e,t]:e=r[i][0],e},St=e=>{const t=re.get(e);if(t){if(t.length===2)throw t[1];return t[0]}throw e.then(n=>re.set(e,[n]),n=>re.set(e,[void 0,n])),e},At=(e,t)=>{var l;const n=I.at(-1);if(!n)return e();const[,a]=n,r=(l=a[C][1])[ne]||(l[ne]=[]),i=a[C][0]++,s=r[i];return je(s==null?void 0:s[1],t)&&(r[i]=[e(),t]),r[i][0]},bt=Te({pending:!1,data:null,method:null,action:null}),be=new Set,wt=e=>{be.add(e),e.finally(()=>be.delete(e))},ve=(e,t)=>At(()=>n=>{let a;e&&(typeof e=="function"?a=e(n)||(()=>{e(null)}):e&&"current"in e&&(e.current=n,a=()=>{e.current=null}));const r=t(n);return()=>{r==null||r(),a==null||a()}},[e]),T=Object.create(null),H=Object.create(null),_=(e,t,n,a,r)=>{if(t!=null&&t.itemProp)return{tag:e,props:t,type:e,ref:t.ref};const i=document.head;let{onLoad:s,onError:l,precedence:c,blocking:g,...u}=t,o=null,f=!1;const h=q[e];let d;if(h.length>0){const y=i.querySelectorAll(e);e:for(const k of y)for(const E of q[e])if(k.getAttribute(E)===t[E]){o=k;break e}if(!o){const k=h.reduce((E,S)=>t[S]===void 0?E:`${E}-${S}-${t[S]}`,e);f=!H[k],o=H[k]||(H[k]=(()=>{const E=document.createElement(e);for(const S of h)t[S]!==void 0&&E.setAttribute(S,t[S]),t.rel&&E.setAttribute("rel",t.rel);return E})())}}else d=i.querySelectorAll(e);c=a?c??"":void 0,a&&(u[W]=c);const v=ue(y=>{if(h.length>0){let k=!1;for(const E of i.querySelectorAll(e)){if(k&&E.getAttribute(W)!==c){i.insertBefore(y,E);return}E.getAttribute(W)===c&&(k=!0)}i.appendChild(y)}else if(d){let k=!1;for(const E of d)if(E===y){k=!0;break}k||i.insertBefore(y,i.contains(d[0])?d[0]:i.querySelector(e)),d=void 0}},[c]),m=ve(t.ref,y=>{var S;const k=h[0];if(n===2&&(y.innerHTML=""),(f||d)&&v(y),!l&&!s)return;let E=T[S=y.getAttribute(k)]||(T[S]=new Promise((X,We)=>{y.addEventListener("load",X),y.addEventListener("error",We)}));s&&(E=E.then(s)),l&&(E=E.catch(l)),E.catch(()=>{})});if(r&&g==="render"){const y=q[e][0];if(t[y]){const k=t[y],E=T[k]||(T[k]=new Promise((S,X)=>{v(o),o.addEventListener("load",S),o.addEventListener("error",X)}));St(E)}}const p={tag:e,type:e,props:{...u,ref:m},ref:m};return p.p=n,o&&(p.e=o),kt(p,i)},Pt=e=>{const t=ht(),n=t&&L(t);return n!=null&&n.endsWith("svg")?{tag:"title",props:e,type:"title",ref:e.ref}:_("title",e,void 0,!1,!1)},Tt=e=>!e||["src","async"].some(t=>!e[t])?{tag:"script",props:e,type:"script",ref:e.ref}:_("script",e,1,!1,!0),Nt=e=>!e||!["href","precedence"].every(t=>t in e)?{tag:"style",props:e,type:"style",ref:e.ref}:(e["data-href"]=e.href,delete e.href,_("style",e,2,!0,!0)),$t=e=>!e||["onLoad","onError"].some(t=>t in e)||e.rel==="stylesheet"&&(!("precedence"in e)||"disabled"in e)?{tag:"link",props:e,type:"link",ref:e.ref}:_("link",e,1,"precedence"in e,!0),Mt=e=>_("meta",e,void 0,!1,!1),_e=Symbol(),Lt=e=>{const{action:t,...n}=e;typeof t!="function"&&(n.action=t);const[a,r]=Be([null,!1]),i=ue(async g=>{const u=g.isTrusted?t:g.detail[_e];if(typeof u!="function")return;g.preventDefault();const o=new FormData(g.target);r([o,!0]);const f=u(o);f instanceof Promise&&(wt(f),await f),r([null,!0])},[]),s=ve(e.ref,g=>(g.addEventListener("submit",i),()=>{g.removeEventListener("submit",i)})),[l,c]=a;return a[1]=!1,{tag:bt,props:{value:{pending:l!==null,data:l,method:l?"post":null,action:l?t:null},children:{tag:"form",props:{...n,ref:s},type:"form",ref:s}},f:c}},He=(e,{formAction:t,...n})=>{if(typeof t=="function"){const a=ue(r=>{r.preventDefault(),r.currentTarget.form.dispatchEvent(new CustomEvent("submit",{detail:{[_e]:t}}))},[]);n.ref=ve(n.ref,r=>(r.addEventListener("click",a),()=>{r.removeEventListener("click",a)}))}return{tag:e,props:n,type:e,ref:n.ref}},Rt=e=>He("input",e),xt=e=>He("button",e);Object.assign(ie,{title:Pt,script:Tt,style:Nt,link:$t,meta:Mt,form:Lt,input:Rt,button:xt});function Ot(){const[e,t]=Be(0);return R(ct,{children:[R("button",{onClick:()=>t(n=>n+1),children:"Increment"}),R("button",{onClick:()=>t(n=>n-1),children:"Decrement"}),R("div",{children:e})]})}const qe=document.getElementById("counter");if(!qe)throw new Error("Root element not found");Et(R(Ot,{}),qe);
