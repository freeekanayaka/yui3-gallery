YUI.add("gallery-form",function(a){a.Form=a.Base.create("form",a.Widget,[a.WidgetParent],{toString:function(){return this.name;},CONTENT_TEMPLATE:"<form></form>",_ioIds:null,_validateMethod:function(b){if(!a.Lang.isString(b)){return false;}if(b.toLowerCase()!="get"&&b.toLowerCase()!="post"){return false;}return true;},_parseAction:function(b){var c=b.one("form");if(!c){c=b;}if(c){return c.get("action");}},_parseMethod:function(b){var c=b.one("form");if(!c){c=b;}if(c){return c.get("method");}},_parseFields:function(c){var e=c.all("*"),f=c.all("label"),b=[],d={text:a.TextField,hidden:a.HiddenField,file:a.FileField,checkbox:a.CheckboxField,radio:a.RadioField,reset:a.ResetButton,submit:a.SubmitButton,button:(a.Button||a.FormButton)};e.each(function(j,h,g){var n=j.get("nodeName"),l=j.get("id"),i,k,m=[];if(n=="INPUT"){i=j.get("type");k={type:(d[i]?d[i]:a.TextField),name:j.get("name"),value:j.get("value"),checked:j.get("checked")};if(k.type==d.button){k.label=j.get("value");}}else{if(n=="BUTTON"){k={type:d.button,name:j.get("name"),label:j.get("innerHTML")};}else{if(n=="SELECT"){j.all("option").each(function(p,q,o){m.push({label:p.get("innerHTML"),value:p.get("value")});});k={type:a.SelectField,name:j.get("name"),choices:m};}else{if(n=="TEXTAREA"){k={type:a.TextareaField,name:j.get("name"),value:j.get("innerHTML")};}}}}if(k){if(l){k.id=l;f.some(function(p,q,o){if(p.get("htmlFor")==l){k.label=p.get("innerHTML");}});}b.push(k);}j.remove();});return b;},_syncFormAttributes:function(){var b=this.get("contentBox");b.setAttrs({action:this.get("action"),method:this.get("method")});if(this.get("encodingType")===a.Form.MULTIPART_ENCODED){b.setAttribute("enctype","multipart/form-data");}},_runValidation:function(){var b=true;this.each(function(c){if(c.validateField()===false){b=false;}});return b;},_enableInlineValidation:function(){this.each(function(b){b.set("validateInline",true);});},_disableInlineValidation:function(){this.each(function(b){b.set("validateInline",false);});},_handleIOEvent:function(d,b,c){if(this._ioIds[b]!==undefined){this.fire(d,{response:c});}},reset:function(){var b=a.Node.getDOMNode(this.get("contentBox"));if(a.Lang.isFunction(b.reset)){b.reset();}this.each(function(c){c.resetFieldNode();c.set("error",null);});},submit:function(){if(this.get("skipValidationBeforeSubmit")===true||this._runValidation()){var c=this.get("action"),e=this.get("method"),d=this.get("submitViaIO"),f,b;if(d===true){b={method:e,form:{id:this.get("contentBox"),upload:(this.get("encodingType")===a.Form.MULTIPART_ENCODED)}};var g=this.get("io");f=g(c,b);this._ioIds[f.id]=f;}else{this.get("contentBox").submit();}}},getField:function(b){var c;if(a.Lang.isNumber(b)){c=this.item(b);}else{if(a.Lang.isString(b)){this.each(function(d){if(d.get("name")==b){c=d;}});}}return c;},initializer:function(b){this._ioIds={};this.publish("submit");this.publish("reset");this.publish("start");this.publish("success");this.publish("failure");this.publish("complete");this.publish("xdr");},destructor:function(){},renderUI:function(){},bindUI:function(){this.get("contentBox").on("submit",a.bind(function(b){b.halt();},this));this.after("inlineValidationChange",a.bind(function(b){if(b.newVal===true){this._enableInlineValidation();}else{this._disableInlineValidation();}},this));this.after("success",a.bind(function(b){if(this.get("resetAfterSubmit")===true){this.reset();}},this));a.on("io:start",a.bind(this._handleIOEvent,this,"start"));a.on("io:complete",a.bind(this._handleIOEvent,this,"complete"));a.on("io:xdr",a.bind(this._handleIOEvent,this,"xdr"));a.on("io:success",a.bind(this._handleIOEvent,this,"success"));a.on("io:failure",a.bind(this._handleIOEvent,this,"failure"));this.each(a.bind(function(b){if(b.name=="submit-button"){b.on("click",a.bind(this.submit,this));}else{if(b.name=="reset-button"){b.on("click",a.bind(this.reset,this));}}},this));},syncUI:function(){this._syncFormAttributes();if(this.get("inlineValidation")===true){this._enableInlineValidation();}}},{ATTRS:{defaultChildType:{valueFn:function(){return a.TextField;}},method:{value:"post",validator:function(b){return this._validateMethod(b);},setter:function(b){return b.toLowerCase();}},action:{value:".",validator:a.Lang.isString},fields:{setter:function(b){return this.set("children",b);}},inlineValidation:{value:false,validator:a.Lang.isBoolean},resetAfterSubmit:{value:true,validator:a.Lang.isBoolean},encodingType:{value:1,validator:a.Lang.isNumber},skipValidationBeforeSubmit:{value:false,validator:a.Lang.isBoolean},submitViaIO:{value:true,validator:a.Lang.isBoolean},io:{value:a.io}},HTML_PARSER:{action:function(b){return this._parseAction(b);},method:function(b){return this._parseMethod(b);},children:function(b){return this._parseFields(b);}},FORM_TEMPLATE:"<form></form>",URL_ENCODED:1,MULTIPART_ENCODED:2});a.FormField=a.Base.create("form-field",a.Widget,[a.WidgetParent,a.WidgetChild],{toString:function(){return this.name;},FIELD_TEMPLATE:"<input></input>",LABEL_TEMPLATE:"<label></label>",_labelNode:null,_fieldNode:null,_errorNode:null,_initialValue:null,_validateError:function(b){if(a.Lang.isString(b)){return true;}if(b===null||typeof b=="undefined"){return true;}return false;},_validateValidator:function(c){if(a.Lang.isString(c)){var b=/^(email|phone|ip|date|time|postal|special)$/;if(b.test(c)===true){return true;}}if(a.Lang.isFunction(c)){return true;}return false;},_setValidator:function(c){var b={email:a.FormField.VALIDATE_EMAIL_ADDRESS,phone:a.FormField.VALIDATE_PHONE_NUMBER,ip:a.FormField.VALIDATE_IP_ADDRESS,date:a.FormField.VALIDATE_DATE,time:a.FormField.VALIDATE_TIME,postal:a.FormField.VALIDATE_POSTAL_CODE,special:a.FormField.VALIDATE_NO_SPECIAL_CHARS};return(b[c]?b[c]:c);},_renderLabelNode:function(){if(!this.LABEL_TEMPLATE){return;}var b=this.get("contentBox"),c=b.one("label");if(!c||c.get("for")!=this.get("id")){c=a.Node.create(this.LABEL_TEMPLATE);b.appendChild(c);}this._labelNode=c;},_renderFieldNode:function(){var b=this.get("contentBox"),c=b.one("#"+this.get("id"));
if(!c){c=a.Node.create(this.FIELD_TEMPLATE);b.appendChild(c);}this._fieldNode=c;},_syncLabelNode:function(){if(this._labelNode){this._labelNode.setAttrs({innerHTML:this.get("label")});this._labelNode.setAttribute("for",this.get("id")+a.FormField.FIELD_ID_SUFFIX);}},_syncFieldNode:function(){var b=this.name.split("-")[0];if(!b){return;}this._fieldNode.setAttrs({name:this.get("name"),type:b,id:this.get("id")+a.FormField.FIELD_ID_SUFFIX,value:this.get("value")});this._fieldNode.setAttribute("tabindex",a.FormField.tabIndex);a.FormField.tabIndex++;},_syncError:function(){var b=this.get("error");if(b){this._showError(b);}},_syncDisabled:function(c){var b=this.get("disabled");if(b===true){this._fieldNode.setAttribute("disabled","disabled");}else{this._fieldNode.removeAttribute("disabled");}},_checkRequired:function(){if(this.get("required")===true&&this.get("value").length===0){return false;}return true;},_showError:function(c){var b=this.get("contentBox"),d=a.Node.create("<span>"+c+"</span>");d.addClass("error");b.insertBefore(d,this._labelNode);this._errorNode=d;},_clearError:function(){if(this._errorNode){var b=this.get("contentBox");b.removeChild(this._errorNode);this._errorNode=null;}},_enableInlineValidation:function(){this.after("valueChange",this.validateField,this);},_disableInlineValidation:function(){this.detach("valueChange",this.validateField,this);},validateField:function(d){var c=this.get("value"),b=this.get("validator");this.set("error",null);if(d&&d.src!="ui"){return false;}if(!this._checkRequired()){this.set("error",a.FormField.REQUIRED_ERROR_TEXT);return false;}else{if(!c){return true;}}return b.call(this,c,this);},resetFieldNode:function(){this.set("value",this._initialValue);this._fieldNode.set("value",this._initialValue);this.fire("nodeReset");},clear:function(){this.set("value","");this._fieldNode.set("value","");this._initialValue=null;this.fire("clear");},initializer:function(){this.publish("blur");this.publish("change");this.publish("focus");this.publish("clear");this.publish("nodeReset");this._initialValue=this.get("value");},destructor:function(b){},renderUI:function(){this._renderLabelNode();this._renderFieldNode();},bindUI:function(){this._fieldNode.on("change",a.bind(function(b){this.set("value",this._fieldNode.get("value"),{src:"ui"});},this));this.on("valueChange",a.bind(function(b){if(b.src!="ui"){this._fieldNode.set("value",b.newVal);}},this));this._fieldNode.on("blur",a.bind(function(b){this.set("value",this._fieldNode.get("value"),{src:"ui"});},this));this._fieldNode.on("focus",a.bind(function(b){this.fire("focus",b);},this));this.on("errorChange",a.bind(function(b){if(b.newVal){this._showError(b.newVal);}else{this._clearError();}},this));this.on("validateInlineChange",a.bind(function(b){if(b.newVal===true){this._enableInlineValidation();}else{this._disableInlineValidation();}},this));this.after("disabledChange",a.bind(function(b){this._syncDisabled();},this));},syncUI:function(){this.get("boundingBox").removeAttribute("tabindex");this._syncLabelNode();this._syncFieldNode();this._syncError();this._syncDisabled();if(this.get("validateInline")===true){this._enableInlineValidation();}}},{ATTRS:{id:{value:a.guid(),validator:a.Lang.isString,writeOnce:true},name:{validator:a.Lang.isString,writeOnce:true},value:{value:"",validator:a.Lang.isString},label:{value:"",validator:a.Lang.isString},validator:{value:function(b){return true;},validator:function(b){return this._validateValidator(b);},setter:function(b){return this._setValidator(b);}},error:{value:false,validator:function(b){return this._validateError(b);}},required:{value:false,validator:a.Lang.isBoolean},validateInline:{value:false,validator:a.Lang.isBoolean}},tabIndex:1,VALIDATE_EMAIL_ADDRESS:function(d,c){var b=/^([\w]+(?:\.[\w]+)*)@((?:[\w]+\.)*\w[\w]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;if(b.test(d)===false){c.set("error",a.FormField.INVALID_EMAIL_MESSAGE);return false;}return true;},INVALID_EMAIL_MESSAGE:"Please enter a valid email address",VALIDATE_PHONE_NUMBER:function(d,c){var b=/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;if(b.test(d)===false){c.set("error",a.FormField.INVALID_PHONE_NUMBER);return false;}return true;},INVALID_PHONE_NUMBER:"Please enter a valid phone number",VALIDATE_IP_ADDRESS:function(f,e){var c=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,b,d=true;if(c.test(f)===false){d=false;}b=f.split(".");a.Array.each(b,function(h,j,g){var k=parseInt(h,10);if(k<0||k>255){d=false;}});if(d===false){e.set("error",a.FormField.INVALID_IP_MESSAGE);}return d;},INVALID_IP_MESSAGE:"Please enter a valid IP address",VALIDATE_DATE:function(d,c){var b=/^([1-9]|1[0-2])(\-|\/)([0-2][0-9]|3[0-1])(\-|\/)(\d{4}|\d{2})$/;if(b.test(d)===false){c.set("error",a.FormField.INVALID_DATE_MESSAGE);return false;}return true;},INVALID_DATE_MESSAGE:"Please enter a a valid date",VALIDATE_TIME:function(d,c){var b=/^([1-9]|1[0-2]):[0-5]\d(:[0-5]\d(\.\d{1,3})?)?$/;if(b.test(d)===false){c.set("error",a.FormField.INVALID_TIME_MESSAGE);return false;}return true;},INVALID_TIME_MESSAGE:"Please enter a valid time",VALIDATE_POSTAL_CODE:function(e,d){var b,c=true;if(e.length==6||e.length==7){b=/^[a-zA-Z]\d[a-zA-Z](-|\s)?\d[a-zA-Z]\d$/;}else{if(e.length==5||e.length==10){b=/^\d{5}((-|\s)\d{4})?$/;}else{if(e.length>0){c=false;}}}if(c===false||(b&&b.test(e)===false)){d.set("error",a.FormField.INVALID_POSTAL_CODE_MESSAGE);return false;}return true;},INVALID_POSTAL_CODE_MESSAGE:"Please enter a valid postal code",VALIDATE_NO_SPECIAL_CHARS:function(d,c){var b=/^[a-zA-Z0-9]*$/;if(b.test(d)===false){c.set("error",a.FormField.INVALID_SPECIAL_CHARS);return false;}return true;},INVALID_SPECIAL_CHARS:"Please use only letters and numbers",REQUIRED_ERROR_TEXT:"This field is required",FIELD_ID_SUFFIX:"-field"});a.TextField=a.Base.create("text-field",a.FormField,[a.WidgetChild]);a.PasswordField=a.Base.create("password-field",a.FormField,[a.WidgetChild]);a.CheckboxField=a.Base.create("checkbox-field",a.FormField,[a.WidgetChild],{_syncChecked:function(){this._fieldNode.set("checked",this.get("checked"));
},initializer:function(){a.CheckboxField.superclass.initializer.apply(this,arguments);},syncUI:function(){a.CheckboxField.superclass.syncUI.apply(this,arguments);this._syncChecked();},bindUI:function(){a.CheckboxField.superclass.bindUI.apply(this,arguments);this.after("checkedChange",a.bind(function(b){if(b.src!="ui"){this._fieldNode.set("checked",b.newVal);}},this));this._fieldNode.after("change",a.bind(function(b){this.set("checked",b.currentTarget.get("checked"),{src:"ui"});},this));}},{ATTRS:{"checked":{value:false,validator:a.Lang.isBoolean}}});a.RadioField=a.Base.create("radio-field",a.FormField,[a.WidgetChild]);a.HiddenField=a.Base.create("hidden-field",a.FormField,[a.WidgetChild],{_valueDisplayNode:null,_renderValueDisplayNode:function(){if(this.get("displayValue")===true){var c=a.Node.create("<div></div>"),b=this.get("contentBox");b.appendChild(c);this._valueDisplayNode=c;}},renderUI:function(){a.HiddenField.superclass.renderUI.apply(this,arguments);this._renderValueDisplayNode();},bindUI:function(){a.HiddenField.superclass.bindUI.apply(this,arguments);if(this.get("displayValue")===true){this.after("valueChange",a.bind(function(b,c){this._valueDisplayNode.set("innerHTML",c.newVal);},this,true));}},clear:function(){}},{ATTRS:{displayValue:{value:false,writeOnce:true,validator:a.Lang.isBoolean}}});a.TextareaField=a.Base.create("textarea-field",a.FormField,[a.WidgetChild],{FIELD_TEMPLATE:"<textarea></textarea>"});a.ChoiceField=a.Base.create("choice-field",a.FormField,[a.WidgetParent,a.WidgetChild],{_validateChoices:function(d){if(!a.Lang.isArray(d)){return false;}var c=0,b=d.length;for(;c<b;c++){if(!a.Lang.isObject(d[c])){delete d[c];continue;}if(!d[c].label||!a.Lang.isString(d[c].label)||!d[c].value||!a.Lang.isString(d[c].value)){delete d[c];continue;}}if(d.length===0){return false;}return true;},_renderFieldNode:function(){var d=this.get("contentBox"),e=this.get("choices"),b=this.get("multi"),c=(b===true?a.CheckboxField:a.RadioField);a.Array.each(e,function(k,h,g){var f={value:k.value,id:(this.get("id")+"_choice"+h),name:this.get("name"),label:k.label},j=new c(f);j.render(d);},this);this._fieldNode=d.all("input");},_syncFieldNode:function(){var b=this.get("value");if(b){this._fieldNode.some(function(d,c,e){if(d.get("value")==b){d.set("checked",true);return true;}},this);}},clear:function(){this._fieldNode.each(function(c,b,d){c.set("checked",false);},this);this.set("value","");},bindUI:function(){this._fieldNode.on("change",a.bind(function(b){this._fieldNode.each(function(d,c,e){if(d.get("checked")===true){this.set("value",d.get("value"));}},this);},this));}},{ATTRS:{choices:{validator:function(b){return this._validateChoices(b);}},multi:{validator:a.Lang.isBoolean,value:false}}});a.SelectField=a.Base.create("select-field",a.ChoiceField,[a.WidgetParent,a.WidgetChild],{FIELD_TEMPLATE:"<select></select>",_renderFieldNode:function(){a.SelectField.superclass.constructor.superclass._renderFieldNode.apply(this,arguments);this._renderOptionNodes();},_renderOptionNodes:function(){var c=this.get("choices"),b;if(this.get("useDefaultOption")===true){b=a.Node.create(a.SelectField.OPTION_TEMPLATE);this._fieldNode.appendChild(b);}a.Array.each(c,function(f,e,d){b=a.Node.create(a.SelectField.OPTION_TEMPLATE);this._fieldNode.appendChild(b);},this);},_syncFieldNode:function(){a.SelectField.superclass.constructor.superclass._syncFieldNode.apply(this,arguments);this._fieldNode.setAttrs({multiple:(this.get("multi")===true?"multiple":"")});},_syncOptionNodes:function(){var f=this.get("choices"),b=this.get("contentBox"),d=b.all("option"),e=this.get("useDefaultOption"),c=this.get("value");if(e===true){f.unshift({label:a.SelectField.DEFAULT_OPTION_TEXT,value:""});}d.each(function(j,i,h){var g=f[i].label,k=f[i].value;j.setAttrs({innerHTML:g,value:k});if(c==k){j.setAttrs({selected:true,defaultSelected:true});}},this);},clear:function(){this._fieldNode.value="";},bindUI:function(){a.SelectField.superclass.constructor.superclass.bindUI.apply(this,arguments);},syncUI:function(){a.SelectField.superclass.syncUI.apply(this,arguments);this._syncOptionNodes();}},{OPTION_TEMPLATE:"<option></option>",DEFAULT_OPTION_TEXT:"Choose one",ATTRS:{useDefaultOption:{validator:a.Lang.isBoolean,value:true}}});a.FormButton=a.Base.create("button-field",a.FormField,[a.WidgetChild],{FIELD_TEMPLATE:"<button></button>",LABEL_TEMPLATE:"",_syncFieldNode:function(){this._fieldNode.setAttrs({innerHTML:this.get("label"),id:this.get("id")+a.FormField.FIELD_ID_SUFFIX});this.get("contentBox").addClass("first-child");},_setClickHandler:function(){if(!this._fieldNode){return;}var b=this.get("onclick");a.Event.purgeElement(this._fieldNode,true,"click");a.on("click",a.bind(b.fn,b.scope,true),this._fieldNode);},bindUI:function(){this.after("onclickChange",a.bind(this._setClickHandler,this,true));this._setClickHandler();}},{ATTRS:{onclick:{validator:function(b){if(a.Lang.isObject(b)===false){return false;}if(typeof b.fn=="undefined"||a.Lang.isFunction(b.fn)===false){return false;}return true;},value:{fn:function(b){}},setter:function(b){b.scope=b.scope||this;b.argument=b.argument||{};return b;}}}});a.FileField=a.Base.create("file-field",a.FormField,[a.WidgetChild]);a.SubmitButton=a.Base.create("submit-button",a.FormField,[a.WidgetChild],{LABEL_TEMPLATE:""});a.ResetButton=a.Base.create("reset-button",a.FormField,[a.WidgetChild],{LABEL_TEMPLATE:""});},"@VERSION@",{requires:["node","widget-base","widget-htmlparser","io-form","widget-parent","widget-child","base-build","substitute"]});