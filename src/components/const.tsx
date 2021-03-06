/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:52:44 
 * @Version			1.0 
 * @Description	
 */

export const ITEMTYPES = {
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
    HTML: 'html',

    RATE: 'rate'
};

/**
 * 编辑状态
 *
 * @param status
 */
export const isEdit = (status) => status === 1;

/**
 * 查看状态
 * @param status
 */
export const isView = (status) => !status;
