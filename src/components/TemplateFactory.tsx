/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:53:04
 * @Version			1.0
 * @Description
 */

import React from 'react';
import {
    Input,
    InputNumber,
    Switch,
    Slider,
    DatePicker,
    Checkbox,
    Radio,
    TimePicker,
    Cascader,
    TreeSelect,
    Form
} from 'antd';
import { ITEMTYPES } from './const';
import buildSelect from '../utils/buildSelect';
import translateOption from '../utils/translateOption';
import WithTrim from '../custom/WithTrim';
import DangerHtml from '../custom/DangerHtml';
import { getInitialValue, getMiddleId } from './utils';
import Suggest from '../custom/Suggest';
import { getGlobalConfig } from '../utils/globalConfig';
import { getRegisteredComponent } from '../utils/registerComponent';
import { extend } from '../utils/logic';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { RangePicker, WeekPicker, MonthPicker, YearPicker } = DatePicker;
const { Group: CheckboxGroup } = Checkbox;
const { Group: RadioGroup, Button: RadioButton } = Radio;
const TrimInput = WithTrim(Input);
const TrimTextarea = WithTrim(TextArea);

const {
    HIDDEN,
    TEXT,
    NUMBER,
    INPUT_TRIM,
    TEXTAREA,
    TEXTAREA_TRIM,

    SWITCH,
    SLIDER,
    SELECT,
    SUGGEST,
    TREESELECT,

    CHECKBOX,
    CHECKBOXGROUP,

    RADIO,
    RADIOGROUP,
    RADIOGROUPBUTTON,

    RANGEPICKER,
    DATEPICKER,
    WEEKPICKER,
    MONTHPICKER,
    TIMEPICKER,
    YEARPICKER,

    CASCADER,
    HTML
} = ITEMTYPES;

export default ({ data, options, form }) => {
    const { item, formItemProps } = data;
    const { data: initData = {}, emptyText } = options;
    const {
        id = '',
        type = INPUT_TRIM,
        label,
        data: configData,
        params = {},
        props,
        formable = true
    } = item;
    let initialValue = getInitialValue(type, initData[getMiddleId(id)]);
    const realType = `${type}`.toLowerCase();
    const globalConfig = getGlobalConfig();
    const parsedParams = {
        ...globalConfig.params,
        ...params
    };

    const realFormItemProps = extend(true, {}, options.formItemProps, formItemProps);

    let formItemParsedProps = {
        label,
        initialValue,
        ...realFormItemProps
    };

    // 表单类型 & 存在id
    if (formable && id) {
        // 类型不可为text文本/html类型
        if (![HTML, TEXT].includes(realType)) {
            formItemParsedProps.name = id;
        }
    }

    // hidden类型元素
    if (realType === HIDDEN) {
        formItemParsedProps.hidden = true;
    }

    /**
     * checkbox/switch时，如果不设置valuePropName属性，再表单中无法重置数据
     */
    if ([CHECKBOX, SWITCH].includes(type)) {
        formItemParsedProps.valuePropName = 'checked';
    }

    const defaultProps = {
        placeholder: typeof label != 'object' ? label : '', // label存在为JSX情况，所以JSX不主动设置placeholder
        ...props
    };

    const defaultStyle = {
        style: {
            width: '100%'
        }
    };

    const itemOptions = translateOption(configData, parsedParams);

    const renderFormItem = (template: React.ReactNode) => {
        return <FormItem {...formItemParsedProps}>{template}</FormItem>;
    };

    const TYPES = {
        [INPUT_TRIM]: <TrimInput {...defaultProps} />,
        [NUMBER]: <InputNumber {...defaultStyle} {...defaultProps} />,
        [TEXTAREA]: <TextArea {...defaultProps} />,
        [TEXTAREA_TRIM]: <TrimTextarea {...defaultProps} />,

        [CHECKBOX]: <Checkbox {...defaultProps} />,
        [CHECKBOXGROUP]: <CheckboxGroup {...defaultProps} options={itemOptions} />,

        [RADIO]: <Radio {...defaultProps} />,
        [RADIOGROUP]: <RadioGroup {...props} options={itemOptions} />,
        [RADIOGROUPBUTTON]: (
            <RadioGroup {...props}>
                {itemOptions.map(({ label, value, disabled }) => (
                    <RadioButton value={value} key={value} disabled={disabled}>
                        {label}
                    </RadioButton>
                ))}
            </RadioGroup>
        ),

        [SWITCH]: <Switch {...defaultProps} />,
        [SLIDER]: <Slider {...defaultProps} />,

        [SELECT]: buildSelect(configData, props, parsedParams),
        [SUGGEST]: <Suggest {...defaultStyle} {...defaultProps} params={parsedParams} />,
        [TREESELECT]: (
            <TreeSelect {...defaultStyle} allowClear treeData={itemOptions} {...defaultProps} />
        ),

        [RANGEPICKER]: (
            <RangePicker {...defaultStyle} placeholder={['开始时间', '结束时间']} {...props} />
        ),
        [DATEPICKER]: <DatePicker {...defaultStyle} {...defaultProps} />,
        [WEEKPICKER]: <WeekPicker {...defaultStyle} {...defaultProps} />,
        [MONTHPICKER]: <MonthPicker {...defaultStyle} {...defaultProps} />,
        [TIMEPICKER]: <TimePicker {...defaultStyle} {...defaultProps} />,
        [YEARPICKER]: <YearPicker {...defaultStyle} {...defaultProps} />,

        [CASCADER]: <Cascader {...defaultStyle} {...defaultProps} options={itemOptions} />
    };

    // 用户：注册组件
    const registeredComponents = getRegisteredComponent();
    if (registeredComponents[realType]) {
        const Comp = registeredComponents[realType];
        return renderFormItem(<Comp form={form} status={1} {...props} />);
    }

    // HTML类型
    if (realType === HTML) {
        const html = item.template || initialValue;

        // 配置了type: html  且  template为string类型
        if (typeof html === 'string') {
            return renderFormItem(<DangerHtml html={html} {...props} />);
        }

        // html类型非表单元素，则直接返回模板或者当前值
        console.warn('type为html类型时，建议template设置为string类型!');
        return renderFormItem(html);
    }

    // 文字节点
    if (realType === TEXT) {
        let content = initialValue;
        // 空字符串处理
        typeof content === 'string' && (content = content.trim());

        if ([undefined, ''].includes(content)) {
            const defaultEmptyText = emptyText || item.emptyText || (globalConfig as any).emptyText;
            content = defaultEmptyText == undefined ? '无' : defaultEmptyText;
        }

        return renderFormItem(item.template || content);
    }

    // 非表单元素
    if (!formable) {
        return renderFormItem(item.template);
    }

    let template = TYPES[realType];

    // 内置类型，未配置自定义模板
    if (!template) {
        template = <Input type={realType || 'text'} {...defaultProps} />;
    }

    // 自定义模板优先级最高
    item.template && (template = item.template);

    return renderFormItem(template);
};
