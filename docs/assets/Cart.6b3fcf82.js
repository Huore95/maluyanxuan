import{_ as N,D as U,g as $,E as A,i as R,H as m,I as E,N as M,J as P,K as T,L as q,M as D,O as F,P as G,o as u,c as h,m as a,w as n,a as i,F as H,d as J,u as c,Q as K,R as O,e as Q,f as g,T as j,p as z,q as W}from"./index.c307a268.js";/* empty css              *//* empty css               *//* empty css              *//* empty css               *//* empty css               *//* empty css               */import{u as X}from"./cartStore.d899d564.js";import"./index.e04da3cd.js";const Y=l=>(z("data-v-6b91fae3"),l=l(),W(),l),Z={class:"cart-box"},ee={class:"swipe-wraper"},te={class:"goods"},oe=Y(()=>i("span",null,"\u4FEE\u6539\u5730\u5740",-1)),se={__name:"Cart",setup(l){let s=X();const v=U();let p=$([]),{cartList:C}=A(s);R(()=>{s.getCartListAsync()});let f=m(()=>s.cartList.reduce((t,o)=>t+(o.checked?o.goodsCount*o.sellingPrice*100:0),0)),b=()=>{s.putCartListAsync(item.cartItemId,item.goodsCount)},k=t=>{s.delCartListAsync(t)},d=m({get(){return s.cartList.every(t=>t.checked)},set(t){s.cartList.forEach(o=>o.checked=t)}}),I=()=>{C.value.filter(t=>{t.checked&&p.value.push(t.cartItemId)}),localStorage.setItem("cartCheckedGoodsIds",p.value),v.push("/addressList")};return(t,o)=>{const V=E,L=M,x=P,_=T,S=q,w=D,y=F,B=G;return u(),h("div",Z,[a(L,{title:"\u8D2D\u7269\u8F66","left-arrow":"",onClickLeft:o[0]||(o[0]=e=>t.$router.back())},{right:n(()=>[a(V,{name:"ellipsis"})]),_:1}),i("div",ee,[(u(!0),h(H,null,J(c(s).cartList,e=>(u(),Q(y,{key:e.goodsId},{right:n(()=>[a(x,{onClick:r=>c(k)(e.cartItemId),class:"delete-button",square:"",type:"danger",text:"\u5220\u9664"},null,8,["onClick"])]),default:n(()=>[i("div",te,[a(_,{class:"btn",modelValue:e.checked,"onUpdate:modelValue":r=>e.checked=r},null,8,["modelValue","onUpdate:modelValue"]),a(w,{num:e.goodsCount,price:e.sellingPrice,desc:e.goodsName,title:e.goodsName,class:"goods-card",thumb:e.goodsCoverImg},{num:n(()=>[a(S,{onChange:r=>c(b)(e),modelValue:e.goodsCount,"onUpdate:modelValue":r=>e.goodsCount=r},null,8,["onChange","modelValue","onUpdate:modelValue"])]),_:2},1032,["num","price","desc","title","thumb"])])]),_:2},1024))),128))]),K(a(B,{price:c(f),"button-text":"\u7ED3\u7B97",onSubmit:c(I)},{tip:n(()=>[g(" \u4F60\u7684\u6536\u8D27\u5730\u5740\u4E0D\u652F\u6301\u540C\u57CE\u9001, "),oe]),default:n(()=>[a(_,{modelValue:c(d),"onUpdate:modelValue":o[1]||(o[1]=e=>j(d)?d.value=e:d=e)},{default:n(()=>[g("\u5168\u9009")]),_:1},8,["modelValue"])]),_:1},8,["price","onSubmit"]),[[O,c(s).cartList.length]])])}}},_e=N(se,[["__scopeId","data-v-6b91fae3"]]);export{_e as default};
