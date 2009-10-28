YUI.add("gallery-form",function(A){function G(){G.superclass.constructor.apply(this,arguments);}A.mix(G,{NAME:"form",ATTRS:{method:{value:"post",validator:function(K){return this._validateAction(K);},setter:function(K){return K.toLowerCase();}},action:{value:"",validator:A.Lang.isString},fields:{writeOnce:true,validator:function(K){return this._validateFields(K);},setter:function(K){K=K||[];var O=0,M=K.length,P,L,N;for(;O<M;O++){if(!K[O]._classes){N=K[O].type;if(A.Lang.isFunction(N)){L=N;}else{if(N=="hidden"){L=A.HiddenField;}else{if(N=="checkbox"){L=A.CheckboxField;}else{if(N=="textarea"){L=A.TextareaField;}else{if(N=="select"){L=A.SelectField;}else{if(N=="choice"){L=A.ChoiceField;}else{if(N=="button"||N=="submit"||N=="reset"){L=A.Button;if(N=="submit"){K[O].onclick={fn:this.submit,scope:this};}else{if(N=="reset"){K[O].onclick={fn:this.reset,scope:this};}}}else{L=A.TextField;}}}}}}}P=new L(K[O]);K[O]=P;}}return K;}},errors:{validator:function(N){if(!A.Lang.isArray(N)){return false;}var M=true,L=0,K=N.length;for(;L<K;L++){if(!A.Lang.isObject(N[L])||!N[L].name||!N[L].message){M=false;break;}}return M;}}},HTML_PARSER:{form:"form",fields:function(L){var M=L.all("*"),N=L.all("label"),K=[];M.each(function(Q,P,O){var U=Q.get("nodeName"),S=Q.get("id"),R,T=[];if(U=="INPUT"){R={type:Q.get("type"),name:Q.get("name"),value:Q.get("value")};if(R.type=="submit"||R.type=="reset"||R.type=="button"){R.label=Q.get("value");}}else{if(U=="BUTTON"){R={type:"button",name:Q.get("name"),label:Q.get("innerHTML")};}else{if(U=="SELECT"){Q.all("option").each(function(W,X,V){T.push({label:W.get("innerHTML"),value:W.get("value")});});R={type:"select",name:Q.get("name"),choices:T};}}}if(R){if(S){R.id=S;N.some(function(W,X,V){if(W.get("htmlFor")==S){R.label=W.get("innerHTML");}});}K.push(R);}Q.remove();});return K;}},FORM_TEMPLATE:'<form method="{method}" action="{action}"></form>'});A.extend(G,A.Widget,{_formNode:null,_fields:null,_io:null,_validateAction:function(K){if(!A.Lang.isString(K)){return false;}if(K.toLowerCase()!="get"&&K.toLowerCase()!="post"){return false;}return true;},_validateFields:function(M){if(!A.Lang.isArray(M)){return false;}for(var L=0,K=M.length;L<K;L++){if(M[L]._classes){continue;}else{if(A.Lang.isObject(M[L])){if(!M[L].name){return false;}continue;}else{return false;}}}return true;},initializer:function(K){this._io={};this.publish("formSubmit");this.publish("formReset");},destructor:function(){this._formNode=null;},_renderFormNode:function(){var K=this.get("contentBox"),L=K.query("form");if(!L){L=A.Node.create(A.substitute(G.FORM_TEMPLATE,{method:this.get("method"),action:this.get("action")}));K.appendChild(L);}L.set("id",A.guid());this._formNode=L;},_renderFormFields:function(){var K=this.get("fields"),M=0,L=K.length;for(;M<L;M++){K[M].render(this._formNode);}},renderUI:function(){this._renderFormNode();this._renderFormFields();},bindUI:function(){A.on("submit",A.bind(function(K,L){L.halt();},this,true),this._formNode);A.on("io:failure",A.bind(function(M,K,L){if(this._io.ioId){delete this._io.ioId;this._handleIOFailure(L);}},this,true));A.on("io:success",A.bind(function(M,K,L){if(typeof this._io[K]!="undefined"){delete this._io.ioId;this._handleIOSuccess(L);}},this,true));},_setFormAttributes:function(){this._formNode.setAttribute("action",this.get("action"));this._formNode.setAttribute("method",this.get("method"));},_setErrors:function(){var N=this.get("errors"),M,L=0,K=N.length;for(;L<K;L++){M=this.getField(N[L].name);if(M){M.showError(N[L].message);}}this.reset("errors");},syncUI:function(){this._setFormAttributes();if(this.get("errors")){this._setErrors();}this.get("boundingBox").removeAttribute("tabindex");},_validateForm:function(){var L=this.get("fields"),N=0,M=L.length,O=true,K;for(;N<M;N++){K=L[N].validate();if(K===false){O=false;}}return O;},_handleIOSuccess:function(K){this.reset();this.fire("success",{response:K});},_handleIOFailure:function(K){alert("IO Error when submitting form");this.fire("failure",{response:K});},submit:function(){if(this._validateForm()){var M=this.get("action"),K=this.get("method"),N=this._formNode.get("id"),L={method:K,form:{id:N}},O=A.io(M,L);this._io[O.id]=O;}},getField:function(L){var K=this.get("fields"),N=0,M=K.length;if(A.Lang.isNumber(L)){return K[L];}else{if(A.Lang.isString(L)){for(;N<M;N++){if(K[N].get("name")==L){return K[N];}}}}},clearErrors:function(){for(var K=this.get("fields"),M=0,L=K.length;M<L;M++){K[M].clearError();}},reset:function(){this.clearErrors();this._formNode.reset();for(var K=this.get("fields"),M=0,L=K.length;M<L;M++){K[M].clear();}}});A.Form=G;function C(){C.superclass.constructor.apply(this,arguments);}A.mix(C,{NAME:"form-field",ATTRS:{id:{value:A.guid()},name:{value:"",validator:A.Lang.isString,writeOnce:true},value:{value:"",validator:A.Lang.isString},label:{value:"",validator:A.Lang.isString},validator:{value:function(K){return true;},validator:A.Lang.isFunction},required:{value:false,validator:A.Lang.isBoolean}},tabIndex:0,INPUT_TEMPLATE:'<input type="{type}" name="{name}" id="{id}" value="{value}">',TEXTAREA_TEMPLATE:'<textarea name="{name}" id="{id}">{value}</textarea>',LABEL_TEMPLATE:'<label for="{id}">{label}</label>',SELECT_TEMPLATE:'<select name="{name}" id="{id}" {multiple}></select>'});A.extend(C,A.Widget,{_labelNode:null,_fieldNode:null,_errorNode:null,_nodeType:"text",initializer:function(){this.publish("blur");this.publish("change");this.publish("focus");},destructor:function(K){},_renderLabelNode:function(){var K=this.get("contentBox"),L=K.query("label");if(!L||L.get("for")!=this.get("id")){L=A.Node.create(A.substitute(C.LABEL_TEMPLATE,{label:this.get("label"),id:this.get("id")}));K.appendChild(L);}this._labelNode=L;},_renderFieldNode:function(){var K=this.get("contentBox"),L=K.query("#"+this.get("id"));if(!L){L=A.Node.create(A.substitute(C.INPUT_TEMPLATE,{name:this.get("name"),type:this._nodeType,id:this.get("id"),value:this.get("value")}));K.appendChild(L);}L.setAttribute("tabindex",C.tabIndex);C.tabIndex++;this._fieldNode=L;
},showError:function(L){var K=this.get("contentBox"),M=A.Node.create("<span>"+L+"</span>");M.addClass("error");console.log(this._labelNode);K.insertBefore(M,this._labelNode);this._errorNode=M;},clearError:function(){if(this._errorNode){var K=this.get("contentBox");K.removeChild(this._errorNode);this._errorNode=null;}},_checkRequired:function(){var K=true;if(this.get("required")===true&&this.get("value").length===0){K=false;}return K;},validate:function(){var L=this.get("value"),K=this.get("validator");this.clearError();if(!this._checkRequired()){this.showError("This field is required");return false;}return K.call(this,L);},renderUI:function(){this._renderLabelNode();this._renderFieldNode();},bindUI:function(){if(this._fieldNode){this._fieldNode.on("change",A.bind(function(K){this.set("value",this._fieldNode.get("value"));},this,true));}this.on("valueChange",A.bind(function(K,L){this._fieldNode.set("value",L.newVal);},this,true));},syncUI:function(){this.get("boundingBox").removeAttribute("tabindex");},clear:function(){this.set("value","");this._fieldNode.set("value","");}});A.FormField=C;function H(){H.superclass.constructor.apply(this,arguments);}A.mix(H,{NAME:"text-field"});A.extend(H,A.FormField,{_nodeType:"text"});A.TextField=H;function D(){D.superclass.constructor.apply(this,arguments);}A.mix(D,{NAME:"checkbox-field"});A.extend(D,A.FormField,{_nodeType:"checkbox"});A.CheckboxField=D;function J(){J.superclass.constructor.apply(this,arguments);}A.mix(J,{NAME:"hidden-field",ATTRS:{displayValue:{value:false,validator:A.Lang.isBoolean}}});A.extend(J,A.FormField,{_nodeType:"hidden",_valueDisplayNode:null,renderUI:function(){J.superclass.renderUI.apply(this,arguments);if(this.get("displayValue")===true){var L=A.Node.create("<div></div>"),K=this.get("contentBox");K.appendChild(L);this._valueDisplayNode=L;}},bindUI:function(){J.superclass.bindUI.apply(this,arguments);if(this.get("displayValue")===true){this.after("valueChange",A.bind(function(K,L){this._valueDisplayNode.set("innerHTML",L.newVal);},this,true));}}});A.HiddenField=J;function E(){E.superclass.constructor.apply(this,arguments);}A.mix(E,{NAME:"textarea-field"});A.extend(E,A.FormField,{_renderFieldNode:function(){var K=this.get("contentBox"),L=K.query("#"+this.get("id"));if(!L){L=A.Node.create(A.substitute(C.TEXTAREA_TEMPLATE,{name:this.get("name"),type:"text",id:this.get("id"),value:this.get("value")}));K.appendChild(L);}L.setAttribute("tabindex",A.FormField.tabIndex);A.FormField.tabIndex++;this._fieldNode=L;}});A.TextareaField=E;function B(){B.superclass.constructor.apply(this,arguments);}A.mix(B,{NAME:"select-field",ATTRS:{choices:{validator:function(M){if(!A.Lang.isArray(M)){return false;}for(var L=0,K=M.length;L<K;L++){if(!A.Lang.isObject(M[L])){return false;}if(!M[L].label||!A.Lang.isString(M[L].label)||!M[L].value||!A.Lang.isString(M[L].value)){return false;}}return true;}},multiple:{validator:A.Lang.isBoolean,value:false}}});A.extend(B,A.FormField,{_renderFieldNode:function(){var K=this.get("contentBox"),L=K.query("#"+this.get("id"));if(!L){L=A.Node.create(A.substitute(C.SELECT_TEMPLATE,{name:this.get("name"),id:this.get("id"),multiple:(this.get("multiple")===true?"multiple":"")}));K.appendChild(L);}this._fieldNode=L;this._renderOptionNodes();},_renderOptionNodes:function(){var N=this.get("choices"),L=0,K=N.length,M;if(this.get("multiple")===false){this._fieldNode.appendChild(new Option("Choose one",""));}for(;L<K;L++){M=new Option(N[L].label,N[L].value);this._fieldNode.appendChild(M);}},clear:function(){this._fieldNode.value="";}});A.SelectField=B;function I(){I.superclass.constructor.apply(this,arguments);}A.mix(I,{NAME:"choice-field"});A.extend(I,A.SelectField,{_choiceNodes:null,_renderLabelNode:function(){var K=this.get("contentBox"),L=A.Node.create("<span>"+this.get("label")+"</span>");K.appendChild(L);this._labelNode=L;},_renderFieldNode:function(){var M=this.get("contentBox"),Q=this.get("choices"),O=0,L=Q.length,N,P,K;this._choiceNodes=[];for(;O<L;O++){K=A.guid();N=A.Node.create(A.substitute(C.LABEL_TEMPLATE,{label:Q[O].label,id:K}));M.appendChild(N);P=A.Node.create(A.substitute(C.INPUT_TEMPLATE,{name:this.get("name"),type:(this.get("multiple")===true?"checkbox":"radio"),id:K,value:Q[O].value}));M.appendChild(P);this._choiceNodes.push({label:N,field:P});}},_checkRequired:function(){var M=false,N=this._choiceNodes,L=0,K=N.length;if(this.get("required")){for(;L<K;L++){if(N[L].field.get("checked")===true){M=true;break;}}}return M;},clear:function(){var M=this.choiceNodes,L=0,K=M.length;for(;L<K;L++){M[L].field.checked=false;}this.set("value","");}});A.ChoiceField=I;function F(){F.superclass.constructor.apply(this,arguments);}A.mix(F,{NAME:"button",HTML_PARSER:{},ATTRS:{onclick:{validator:function(K){if(A.Lang.isObject(K)===false){return false;}if(typeof K.fn=="undefined"||A.Lang.isFunction(K.fn)===false){return false;}return true;},value:{fn:function(K){}},setter:function(K){K.scope=K.scope||this;K.argument=K.argument||{};return K;}}},NODE_TEMPLATE:'<button id="{id}">{label}</button>'});A.extend(F,A.FormField,{_renderButtonNode:function(){var K=this.get("contentBox"),L;L=A.Node.create(A.substitute(F.NODE_TEMPLATE,{label:this.get("label"),id:this.get("id")}));K.appendChild(L);this._fieldNode=L;},_setClickHandler:function(){if(!this._fieldNode){return;}var K=this.get("onclick");A.Event.purgeElement(this._fieldNode,true,"click");A.on("click",A.bind(K.fn,K.scope,true),this._fieldNode);},renderUI:function(){this._renderButtonNode();},bindUI:function(){this.after("onclickChange",A.bind(this._setClickHandler,this,true));},syncUI:function(){F.superclass.syncUI.apply(this,arguments);this._setClickHandler();}});A.Button=F;},"@VERSION@",{requires:["node","attribute","widget","io-form","substitute"]});