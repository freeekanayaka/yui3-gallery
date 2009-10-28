/**
 * @class FormField
 * @extends Widget
 * @param config {Object} Configuration object
 * @constructor
 * @description A representation of an individual form field.
 */
function FormField () {
    FormField.superclass.constructor.apply(this,arguments);
}

Y.mix(FormField, {
    
    /**
     * @property FormField.NAME
     * @type String
     * @static
     * @description The identity of the widget.
     */
    NAME : 'form-field',
    
    /**
     * @property FormField.ATTRS
     * @type Object
     * @protected
     * @static
     * @description Static property used to define the default attribute configuration of
     * the Widget.
     */    
    ATTRS : {
        /**
         * @attribute id
         * @type String
         * @default Either a user defined ID or a randomly generated by Y.guid()
         * @description A randomly generated ID that will be assigned to the field and used 
         * in the label's for attribute
         */
        id : {
            value : Y.guid()
        },
                
        /**
         * @attribute name
         * @type String
         * @default ""
         * @writeOnce
         * @description The name attribute to use on the field
         */        
        name : {
            value : '',
            validator : Y.Lang.isString,
            writeOnce : true
        },
        
        /**
         * @attribute value
         * @type String
         * @default ""
         * @description The current value of the form field
         */
        value : {
            value : '',
            validator : Y.Lang.isString
        },
        
        /**
         * @attribute label
         * @type String
         * @default ""
         * @description Label of the form field
         */
        label : {
            value : '',
            validator : Y.Lang.isString
        },
        
        /**
         * @attribute validator
         * @type Function
         * @default function () { return true; }
         * @description Used to validate this field by the Form class
         */
        validator : {
            value : function (val) {
                return true;
            },
            validator : Y.Lang.isFunction
        },
        
        /**
         * @attribute required
         * @type Boolean
         * @default false
         * @description Set true if this field must be filled out when submitted
         */
        required : {
            value : false,
            validator : Y.Lang.isBoolean
        }
    },

	tabIndex : 0,

    INPUT_TEMPLATE : '<input type="{type}" name="{name}" id="{id}" value="{value}">',
    TEXTAREA_TEMPLATE : '<textarea name="{name}" id="{id}">{value}</textarea>',
    LABEL_TEMPLATE : '<label for="{id}">{label}</label>',
    SELECT_TEMPLATE : '<select name="{name}" id="{id}" {multiple}></select>'
});

Y.extend(FormField, Y.Widget, {
    /**
     * @property _labelNode
     * @protected
     * @type Object
     * @description The label node for this form field
     */
    _labelNode : null,

    /**
     * @property _fieldNode
     * @protected
     * @type Object
     * @description The form field itself
     */    
    _fieldNode : null,

    /**
     * @property _errorNode
     * @protected
     * @type Object
     * @description If a validation error occurs, it will be displayed in this node
     */    
    _errorNode : null,
    
    _nodeType : 'text',
    
    /**
     * @method initializer
     * @description Initializes the various methods
     */
    initializer : function () {
        this.publish('blur');
        this.publish('change');
        this.publish('focus');
    },
    destructor : function (config) {
    
    },

    _renderLabelNode : function () {
        var contentBox = this.get('contentBox'),
            labelNode = contentBox.query('label');
        
        if (!labelNode || labelNode.get('for') != this.get('id')) {
            labelNode = Y.Node.create(Y.substitute(FormField.LABEL_TEMPLATE, {
                label : this.get('label'),
                id : this.get('id')
            }));
            contentBox.appendChild(labelNode);
        }
        
        this._labelNode = labelNode;     
    },
    
    _renderFieldNode : function () {
        var contentBox = this.get('contentBox'),
            field = contentBox.query('#' + this.get('id'));
                
        if (!field) {
            field = Y.Node.create(Y.substitute(FormField.INPUT_TEMPLATE, {
                name : this.get('name'), 
                type : this._nodeType,
                id : this.get('id'),
                value : this.get('value')
            }));
            contentBox.appendChild(field);
        }

		field.setAttribute('tabindex', FormField.tabIndex);
		FormField.tabIndex++;

        this._fieldNode = field;
    },
    
    showError : function (errMsg) {
        var contentBox = this.get('contentBox'),
            errorNode = Y.Node.create('<span>' + errMsg + '</span>');
        
        errorNode.addClass('error');
        console.log(this._labelNode);
        contentBox.insertBefore(errorNode,this._labelNode);
        
        this._errorNode = errorNode;
    },
    
    clearError : function () {
        if (this._errorNode) {
            var contentBox = this.get('contentBox');
            contentBox.removeChild(this._errorNode);
            this._errorNode = null;
        }
    },
    
    _checkRequired : function () {
        var ok = true;
        if (this.get('required') === true && this.get('value').length === 0) {
            ok = false;
        }
        return ok;
    },
    
    validate : function () {
        var value = this.get('value'),
            validator = this.get('validator');

        this.clearError();

        if (!this._checkRequired()) {
            this.showError('This field is required');
            return false;
        }

                            
        return validator.call(this, value);
    },

    /**
     * @method renderUI
     * @description Draws the UI elements of the field
     */    
    renderUI : function () {
        this._renderLabelNode();
        this._renderFieldNode();
    },

    bindUI : function () {
        if (this._fieldNode) {
            this._fieldNode.on('change', Y.bind(function (e) {
                this.set('value', this._fieldNode.get('value'));
            }, this, true));
        }
        
        this.on('valueChange', Y.bind(function (b, e) {
            this._fieldNode.set('value', e.newVal);
        }, this, true)); 
    },
    /**
     * Synchronizes the DOM state with the attribute settings
     *
     * @method syncUI
     */    
    syncUI : function () {
		this.get('boundingBox').removeAttribute('tabindex');
    },

    /**
     * Clears the value of this field
     *
     * @method clear
     */
     clear : function () {
        this.set('value', '');
        this._fieldNode.set('value', '');
    }
});

Y.FormField = FormField;