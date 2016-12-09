﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
*/
(function(){function p(a){function b(a,b,x){var u=a.name,h;b?x?("div"==u&&(h=a.getFirst("figure"),a.replaceWith(h),a=h),a.attributes["data-cke-centered"]=!0,h=a.getFirst("img")):"figure"==u&&a.hasClass("caption")&&(h=a.getFirst("img")):"img"==u&&(h=a);if(h){for(var g in c)(b=h.attributes[g])&&b.match(d)&&delete h.attributes[g];return a}}var d=/^\s*(\d+\%)\s*$/i,c={width:1,height:1};return a?function(a){return b(a,!0,i(a))}:function(a){return b(a)}}function i(a){if(!(a.name in{div:1,p:1}))return!1;
var b=a.children;if(1!==b.length)return!1;a=CKEDITOR.tools.parseCssText(a.attributes.style||"");if(!a["text-align"]||"center"!=a["text-align"])return!1;b=b[0];a=b.name;return"img"==a||"figure"==a&&b.hasClass("caption")?!0:!1}function y(a){var b=CKEDITOR.tools.extend({},a.data,!1,{width:1,height:1}),a=a.parts.image,d;for(d in b)b[d]?a.setAttribute(d,b[d]):a.removeAttribute(d)}function z(a){var b=a.editor,d=b.document,c=d.createElement("span");c.addClass("cke_image2_resizer");c.setAttribute("title",
b.lang.image2.resizer);c.append(new CKEDITOR.dom.text("​",d));if(a.inline)a.wrapper.append(c);else{var f=a.element.getFirst(),e=d.createElement("span");e.addClass("cke_image2_resizer_wrapper");e.append(a.parts.image);e.append(c);a.element.append(e,!0);f.is("span")&&f.remove()}c.on("mousedown",function(c){function e(a,h,b){var g=CKEDITOR.document,c=[];d.equals(g)||c.push(g.on(a,h));c.push(d.on(a,h));if(b)for(a=c.length;a--;)b.push(c.pop())}function h(){m=i+f*q;n=0|m/o}function g(){n=p-l;m=0|n*o}var v=
a.parts.image,f="right"==a.data.align?-1:1,j=c.data.$.screenX,k=c.data.$.screenY,i=v.$.clientWidth,p=v.$.clientHeight,o=i/p,s=[],w,m,n,t,q,l,r;b.fire("saveSnapshot");e("mousemove",function(a){w=a.data.$;q=w.screenX-j;l=k-w.screenY;r=Math.abs(q/l);1==f?0>=q?0>=l?h():r>=o?h():g():0>=l?r>=o?g():h():g():0>=q?0>=l?r>=o?g():h():g():0>=l?h():r>=o?h():g();15<=m&&15<=n?(v.setAttributes({width:m,height:n}),t=!0):t=!1},s);e("mouseup",function(){for(var h;h=s.pop();)h.removeListener();t&&(a.setData({width:m,
height:n}),b.fire("saveSnapshot"));t=!1})});a.on("data",function(){c["right"==a.data.align?"addClass":"removeClass"]("cke_image2_resizer_left")})}function A(a){var b=[];return function(d){var c=a.getCommand("justify"+d);if(c){b.push(function(){c.refresh(a,a.elementPath())});if(d in{right:1,left:1,center:1})c.on("exec",function(c){var e=k(a);if(e){e.setData("align",d);for(e=b.length;e--;)b[e]();c.cancel()}});c.on("refresh",function(b){var c=k(a),i={right:1,left:1,center:1};c&&(this.setState(c.data.align==
d?CKEDITOR.TRISTATE_ON:d in i?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED),b.cancel())})}}}function k(a){return(a=a.widgets.focused)&&a.name in{image2inline:1,image2block:1}?a:null}CKEDITOR.plugins.add("image2",{lang:"en",requires:"widget,dialog",icons:"image2",hidpi:!0,onLoad:function(){CKEDITOR.addCss(".cke_image2_resizer{display:none;position:absolute;bottom:2px;width: 0px;height: 0px;border-style:solid;right:2px;border-width:0 0 10px 10px;border-color:transparent transparent #ccc transparent;"+
CKEDITOR.tools.cssVendorPrefix("box-shadow","1px 1px 0px #777",!0)+";cursor:se-resize;}.cke_image2_resizer_wrapper{position:relative;display:inline-block;line-height:0;}.cke_image2_resizer.cke_image2_resizer_left{right:auto;left:2px;border-width:10px 0 0 10px;border-color:transparent transparent transparent #ccc;"+CKEDITOR.tools.cssVendorPrefix("box-shadow","-1px 1px 0px #777",!0)+";cursor:sw-resize;}.cke_widget_wrapper:hover .cke_image2_resizer{display:block;}")},init:function(a){a.widgets.add("image2inline",
B);a.widgets.add("image2block",C);a.addCommand("image2",{exec:function(){var b=k(a);b?b.edit():a.execCommand("image2inline")}});a.ui.addButton&&a.ui.addButton("image2",{label:a.lang.common.image,command:"image2",toolbar:"insert,10"});a.contextMenu&&(a.addMenuGroup("image2",10),a.addMenuItem("image2",{label:a.lang.image2.menu,command:"image2",group:"image2"}),a.contextMenu.addListener(function(){return k(a)?{image2:CKEDITOR.TRISTATE_OFF}:null}));CKEDITOR.dialog.add("image2",this.path+"dialogs/image2.js")},
afterInit:function(a){var b={left:1,right:1,center:1,block:1},a=A(a),d;for(d in b)a(d)}});var s={contentTransformations:[["img[width]: sizeToAttribute"]],data:function(){var a=this,b=a.editor,d=a.data;a.shiftState({element:a.element,oldState:a.oldData,newState:d,destroy:function(){this.destroyed||(b.widgets.destroy(a),this.destroyed=!0)},init:function(c){if(this.destroyed)a=b.widgets.initOn(c,"image2"+(d.hasCaption||"center"==d.align?"block":"inline"),a.data);else{var c=a,f=c.wrapper,e=c.data.align;
"center"==e?(c.inline||f.setStyle("text-align","center"),f.removeStyle("float")):(c.inline||f.removeStyle("text-align"),"none"==e?f.removeStyle("float"):f.setStyle("float",e))}}});a.parts.image.setAttributes({src:a.data.src,"data-cke-saved-src":a.data.src,alt:a.data.alt});y(a);a.oldData=CKEDITOR.tools.extend({},a.data)},dialog:"image2",init:function(){var a=this.parts.image,b={hasCaption:!!this.parts.caption,src:a.getAttribute("src"),alt:a.getAttribute("alt")||"",width:a.getAttribute("width")||"",
height:a.getAttribute("height")||""};this.element.data("cke-centered")?(this.element.data("cke-centered",!1),b.align="center"):(b.align=this.element.getStyle("float")||a.getStyle("float")||"none",this.element.removeStyle("float"),a.removeStyle("float"));b.hasCaption||this.wrapper.setStyle("line-height","0");this.setData(b);z(this);this.shiftState=CKEDITOR.plugins.image2.stateShifter(this.editor)},downcast:function(a){var b=a.attributes,d=this.data.align;if(!this.inline){var c=a.getFirst("span"),f=
c.getFirst("img");c.replaceWith(f)}d&&"none"!=d&&(c=CKEDITOR.tools.parseCssText(b.style||""),"center"==d&&"p"!=a.name?a=a.wrapWith(new CKEDITOR.htmlParser.element("img"==a.name?"p":"div",{style:"text-align:center"})):d in{left:1,right:1}&&(c["float"]=d),CKEDITOR.tools.isEmpty(c)||(b.style=CKEDITOR.tools.writeCssText(c)));return a}},B=CKEDITOR.tools.extend({allowedContent:{img:{attributes:"!src,alt,width,height",styles:"float"}},inline:!0,parts:{image:"img"},template:'<img alt="" src="" />',upcast:p()},
s),C=CKEDITOR.tools.extend({allowedContent:{figcaption:!0,figure:{classes:"!caption",styles:"float,display"},img:{attributes:"!src,alt,width,height"},div:{match:i,styles:"text-align"},p:{match:i,styles:"text-align"}},editables:{caption:{selector:"figcaption",allowedContent:"br em strong sub sup u; a[!href]"}},parts:{image:"img",caption:"figcaption"},template:'<figure class="caption"><img alt="" src="" /><figcaption>Caption</figcaption></figure>',upcast:p(!0)},s);CKEDITOR.plugins.image2={stateShifter:function(a){function b(a,
b){return a.oldState?a.oldState[b]!==a.newState[b]:!1}function d(b){var g=a.document.createElement(f,{styles:{"text-align":"center"}});c(g,b);b.move(g);return g}function c(b,c){if(c.getParent()){var d=a.createRange();d.moveToPosition(c,CKEDITOR.POSITION_BEFORE_START);i.insertElementIntoRange(b,d);c.remove()}else b.replace(c)}var f=a.config.enterMode==CKEDITOR.ENTER_P?"p":"div",e=["hasCaption","align"],i=a.editable(),k={align:function(a,c,e){var f=a.newState.hasCaption,j=a.element;if(b(a,"align")){if(!f&&
("center"==e&&(a.destroy(),a.element=d(j)),!b(a,"hasCaption")&&"center"==c&&"center"!=e))a.destroy(),c=j.findOne("img"),c.replace(j),a.element=c}else"center"==e&&(b(a,"hasCaption")&&!f)&&(a.destroy(),a.element=d(j));j.is("figure")&&("center"==e?j.setStyle("display","inline-block"):j.removeStyle("display"))},hasCaption:function(d,g,e){if(b(d,"hasCaption"))if(g=d.element,d.destroy(),e){var e=g.findOne("img")||g,f=CKEDITOR.dom.element.createFromHtml('<figure class="caption"><img alt="" src="" /><figcaption>Caption</figcaption></figure>',
a.document);c(f,g);e.replace(f.findOne("img"));d.element=f}else e=g.findOne("img"),e.replace(g),d.element=e}};return function(a){for(var b=a.oldState,c=a.newState,d,f=0;f<e.length;f++)d=e[f],k[d](a,b?b[d]:null,c[d]);a.init(a.element)}}}})();