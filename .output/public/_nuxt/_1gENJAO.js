import{_ as $}from"./jQ3PsahE.js";import{_ as C,a as S,b as E}from"./rH2pvk52.js";import{r as d,o as h,c as g,a as e,t as n,K as L,b as m,x as l,z as M,h as O,w as R,F,y as I,M as j,aj as A}from"./XY3UzohT.js";import"./BIXwOgyL.js";import"./Dn4VB67O.js";import"./DxMA2Lzj.js";import"./BtLTBiAf.js";import"./C3zav7Mk.js";import"./CbyYoqDF.js";const B={key:0,class:"flex items-center justify-between mb-2 bg-green-200 py-2 px-4 rounded-md"},U={class:"text-green-800 font-semibold text-xs"},V={__name:"SelectionBar",props:{no_of_items:{default:0,type:Number}},emits:["updateInput"],setup(a,{emit:i}){const s=a,c=i;let t=d(!1);function u(_){_===!1?t.value=!1:(t.value=!1,c("updateInput"))}return(_,f)=>{const y=C;return a.no_of_items>0?(h(),g("div",B,[e("p",U,n(a.no_of_items)+" are selected ",1),e("div",null,[e("button",{onClick:f[0]||(f[0]=r=>L(t)?t.value=!0:t=!0),class:"text-xs bg-red-600/70 hover:bg-red-600 p-2 px-4 font-semibold rounded-md text-white"},"Delete")]),m(y,{id:1,title:"Do you want to delete these items?",description:"This action can not be undone",shouldOpen:l(t),path:s.deleteLink,onUpdateInput:u},null,8,["shouldOpen","path"])])):M("",!0)}}},P=a=>{console.log(a);let i=0;return Object.values(a).map(s=>{s&&i++}),i},T=(a,i)=>{let s=[];return Object.keys(a).map(c=>{a[c]&&s.push(i[c])}),s},H=["id"],z={class:"w-8 pl-4 py-3 text-xs text-gray-500"},K={class:"flex items-center"},Z=["onUpdate:modelValue"],q={class:"px-4 py-3 text-xs text-gray-500"},G={class:"flex items-center justify-center"},J={class:"px-2 py-2"},Q={class:"text-xs text-gray-600 text-center"},W={class:"px-2 py-2"},X={class:"text-xs text-gray-600 text-center"},Y={class:"px-2 py-2"},ee={class:"text-xs text-gray-600 text-center"},te={class:"px-2 py-2"},se={class:"text-xs text-gray-600 text-center"},ae={class:"px-2 py-2"},le={class:"text-xs text-gray-600 text-center"},oe={class:"px-2 py-2"},ne={class:"text-xs text-gray-600 text-center"},ie={class:"px-2 py-2"},ce={class:"text-xs text-gray-600 text-center"},k="/users",ge={__name:"index",setup(a){let i=d([{field:"First_Name",title:"First Name",sortable:!1,arrange:!1},{field:"Last_Name",title:"Last Name",sortable:!1,arrange:!1},{field:"Role",title:"Role",sortable:!1,arrange:!1},{field:"status",title:"status",sortable:!1,arrange:!1},{field:"phone",title:"phone",sortable:!1,arrange:!1},{field:"Email",title:"Email",sortable:!1,arrange:!1},{field:"created",title:"created",sortable:!1,arrange:!1}]),s=d(null),c=d(null);const t=d([]),u=d(0),_=d([{metaData:[{totalDocuments:14,page:1,perPage:"5"}],data:[{_id:"1",First_Name:"Rol1 Module ",Last_Name:"Rol1 Module ",Role:"rol1-module",status:"Active",phone:"019237540",email:"asdfmail.com",createdAt:"2024-04-29T06:52:30.664Z"}]}]);s.value=_.value[0].data,c.value=_.value[0].metaData;async function f(r){console.log(r)}const y=r=>{let p={};s.value.map((v,b)=>{p[b]=!!r}),t.value=p};return O(()=>t.value,()=>{u.value=P(t.value),T(t.value,s.value)},{deep:!0}),(r,p)=>{const v=$,b=V,N=E,w=S;return h(),g("section",null,[m(v),e("div",null,[m(b,{no_of_items:l(u),onUpdateInput:p[0]||(p[0]=o=>console.log("asdfasdf"))},null,8,["no_of_items"])]),m(w,{onCheckboxChanged:y,allSelected:l(t),data:l(i),last_page:l(c)?l(c)[0].page:1,first_Page:1,per_page:10,present_page:1,present_route:k,isEmpty:!l(s)},{default:R(()=>[(h(!0),g(F,null,I(l(s),(o,x)=>(h(),g("tr",{key:x+Math.random(1e3),id:"row"+o._id},[e("td",z,[e("div",K,[j(e("input",{type:"checkbox",class:"mr-2 h-3 w-3 rounded-sm","onUpdate:modelValue":D=>l(t)[x]=D},null,8,Z),[[A,l(t)[x]]])])]),e("td",q,[e("div",G,[e("p",null,n(x),1)])]),e("td",J,[e("p",Q,n(o.First_Name),1)]),e("td",W,[e("p",X,n(o.Last_Name),1)]),e("td",Y,[e("p",ee,n(o.Role),1)]),e("td",te,[e("p",se,n(o.status),1)]),e("td",ae,[e("p",le,n(o.phone),1)]),e("td",oe,[e("p",ne,n(o.email),1)]),e("td",ie,[e("p",ce,n(o.createdAt.substring(0,10)),1)]),m(N,{"row-id":123,"edit-link":k+"/edit/123","delete-link":r.path,onUpdateInput:f},null,8,["edit-link","delete-link"])],8,H))),128))]),_:1},8,["allSelected","data","last_page","isEmpty"])])}}};export{ge as default};
