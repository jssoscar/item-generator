/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:52:44
 * @Version			1.0
 * @Description
 */
export var ITEMTYPES = {
    TEXT: 'text',
    SELECT: 'select',
    SUGGEST: 'suggest',
    TREESELECT: 'treeselect',
    INPUT: 'input',
    INPUT_TRIM: 'input.trim',
    NUMBER: 'number',
    TEXTAREA: 'textarea',
    TEXTAREA_TRIM: 'textarea.trim',
    HIDDEN: 'hidden',
    SWITCH: 'switch',
    SLIDER: 'slider',
    /**
     * checkbox
     */
    CHECKBOX: 'checkbox',
    CHECKBOXGROUP: 'checkboxgroup',
    /**
     * radio
     */
    RADIO: 'radio',
    RADIOGROUP: 'radiogroup',
    RADIOGROUPBUTTON: 'radiogroupbutton',
    /**
     * picker
     */
    RANGEPICKER: 'rangepicker',
    DATEPICKER: 'datepicker',
    WEEKPICKER: 'weekpicker',
    MONTHPICKER: 'monthpicker',
    TIMEPICKER: 'timepicker',
    CASCADER: 'cascader',
    HTML: 'html'
};
/**
 * 编辑状态
 *
 * @param status
 */
export var isEdit = function (status) { return status === 1; };
/**
 * 查看状态
 * @param status
 */
export var isView = function (status) { return !status; };
//# sourceMappingURL=const.js.map