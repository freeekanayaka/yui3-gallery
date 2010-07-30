YUI.add("gallery-aui-node-base",function(N){var D=N.Lang,J=D.isArray,K=D.isString,C=D.isUndefined,Q=D.isValue,F=N.ClassNameManager.getClassName,M=false,B="helper",S=F(B,"hidden"),O=F(B,"unselectable"),P="innerHTML",R="nextSibling",H="none",G="parentNode",I="script",E="value";var L=document.createElement("div");L.innerHTML="&nbsp;";if(L.attachEvent&&L.fireEvent){L.attachEvent("onclick",function(){M=true;L.detachEvent("onclick",arguments.callee);});L.cloneNode(true).fireEvent("onclick");}N.mix(N.Node.prototype,{ancestors:function(T){var A=this;var V=[];var W=A.getDOM();while(W&&W.nodeType!==9){if(W.nodeType===1){V.push(W);}W=W.parentNode;}var U=new N.all(V);if(T){U=U.filter(T);}return U;},ancestorsByClassName:function(V){var A=this;var U=[];var T=new RegExp("\\b"+V+"\\b");var W=A.getDOM();while(W&&W.nodeType!==9){if(W.nodeType===1&&T.test(W.className)){U.push(W);}W=W.parentNode;}return N.all(U);},appendTo:function(T){var A=this;N.one(T).append(A);return A;},attr:function(T,U){var A=this;if(!C(U)){return A.set(T,U);}else{return A.get(T)||A.getAttribute(T);}},clone:(function(){var A;if(M){A=function(){return N.Node.create(this.outerHTML());};}else{A=function(){return this.cloneNode(true);};}return A;})(),center:function(X){var A=this;X=(X&&N.one(X))||N.getBody();var V=X.get("region");var U=A.get("region");var W=V.left+(V.width/2);var T=V.top+(V.height/2);A.setXY([W-(U.width/2),T-(U.height/2)]);},empty:function(){var A=this;A.all(">*").remove();var T=N.Node.getDOMNode(A);while(T.firstChild){T.removeChild(T.firstChild);}return A;},getDOM:function(){var A=this;return N.Node.getDOMNode(A);},guid:function(U){var T=this;var A=T.get("id");if(!A){A=N.stamp(T);T.set("id",A);}return A;},hide:function(T){var A=this;A.addClass(T||A._hideClass||S);return A;},html:function(){var A=arguments,T=A.length;if(T){this.set(P,A[0]);}else{return this.get(P);}return this;},outerHTML:function(){var A=this;var U=A.getDOM();if("outerHTML" in U){return U.outerHTML;}var T=N.Node.create("<div></div>").append(this.cloneNode(true));try{return T.html();}catch(V){}finally{T=null;}},placeAfter:function(T){var A=this;return A._place(T,A.get(R));},placeBefore:function(T){var A=this;return A._place(T,A);},prependTo:function(T){var A=this;N.one(T).prepend(A);return A;},radioClass:function(T){var A=this;A.siblings().removeClass(T);A.addClass(T);return A;},resetId:function(T){var A=this;A.attr("id",N.guid(T));return A;},selectText:function(Y,U){var A=this;var T=A.getDOM();var W=A.val().length;U=Q(U)?U:W;Y=Q(Y)?Y:0;try{if(T.setSelectionRange){T.setSelectionRange(Y,U);}else{if(T.createTextRange){var V=T.createTextRange();V.moveStart("character",Y);V.moveEnd("character",U-W);V.select();}else{T.select();}}}catch(X){}return A;},selectable:function(){var A=this;A.getDOM().unselectable="off";A.detach("selectstart");A.setStyles({"MozUserSelect":"","KhtmlUserSelect":""});A.removeClass(O);return A;},show:function(T){var A=this;A.removeClass(T||A._hideClass||S);return A;},swallowEvent:function(T,U){var A=this;var V=function(W){W.stopPropagation();if(U){W.preventDefault();W.halt();}return false;};if(J(T)){N.Array.each(T,function(W){A.on(W,V);});return this;}else{A.on(T,V);}return A;},text:function(U){var A=this;var T=A.getDOM();if(!C(U)){U=N.DOM._getDoc(T).createTextNode(U);return A.empty().append(U);}return A._getText(T.childNodes);},toggle:function(T){var A=this;var U="hide";var V=T||A._hideClass||S;if(A.hasClass(V)){U="show";}A[U](V);return A;},unselectable:function(){var A=this;A.getDOM().unselectable="on";A.swallowEvent("selectstart",true);A.setStyles({"MozUserSelect":H,"KhtmlUserSelect":H});A.addClass(O);return A;},val:function(T){var A=this;if(C(T)){return A.get(E);}else{return A.set(E,T);}},_getText:function(X){var A=this;var V=X.length;var U;var W=[];for(var T=0;T<V;T++){U=X[T];if(U&&U.nodeType!=8){if(U.nodeType!=1){W.push(U.nodeValue);}if(U.childNodes){W.push(A._getText(U.childNodes));}}}return W.join("");},_place:function(U,T){var A=this;var V=A.get(G);if(V){if(D.isString(U)){U=N.Node.create(U);}V.insertBefore(U,T);}return A;}},true);N.NodeList.importMethod(N.Node.prototype,["after","appendTo","attr","before","empty","hide","html","outerHTML","prepend","prependTo","selectText","selectable","show","text","toggle","unselectable","val"]);N.mix(N.NodeList.prototype,{all:function(U){var T=this;var Y=[];var V=T._nodes;var X=V.length;var A;for(var W=0;W<X;W++){A=N.Selector.query(U,V[W]);if(A&&A.length){Y.push.apply(Y,A);}}Y=N.Array.unique(Y);return N.all(Y);},getDOM:function(){var A=this;return N.NodeList.getDOMNodes(this);},one:function(T){var A=this;var W=null;var U=A._nodes;var X=U.length;for(var V=0;V<X;V++){W=N.Selector.query(T,U[V],true);if(W){W=N.one(W);break;}}return W;}});N.mix(N,{getBody:function(){var A=this;if(!A._bodyNode){A._bodyNode=N.one(document.body);}return A._bodyNode;},getDoc:function(){var A=this;if(!A._documentNode){A._documentNode=N.one(document);}return A._documentNode;},getWin:function(){var A=this;if(!A._windowNode){A._windowNode=N.one(window);}return A._windowNode;}});},"gallery-2010.06.07-17-52",{requires:["gallery-aui-base"]});