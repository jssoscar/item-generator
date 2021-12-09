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
    Rate
} from 'antd';
import { ITEMTYPES } from './const';
import buildSelect from '../utils/buildSelect';
import translateOption from '../utils/translateOption';
import WithTrim from '../custom/WithTrim';
import DangerHtml from '../custom/DangerHtml';
import { getGlobalConfig } from '../utils/globalConfig';
import { getRegisteredComponent } from '../utils/registerComponent';
import { getInitialValue, getParsedProps } from './utils';
import Suggest from '../custom/Suggest';

const { TextArea } = Input;
const { RangePicker, WeekPicker, MonthPicker } = DatePicker;
const { Group: CheckboxGroup } = Checkbox;
const { Group: RadioGroup, Button: RadioButton } = Radio;
const TrimInput = WithTrim(Input);
const TrimTextarea = WithTrim(TextArea);

const {
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

    CASCADER,
    HTML,
    RATE
} = ITEMTYPES;

export default ({ data, options, form }) => {
    const { item } = data;
    const { data: initData = {}, emptyText } = options;
    const { getFieldDecorator } = form;
    const {
        id = '',
        type = INPUT_TRIM,
        data: configData,
        params = {},
        props,
        formable = true
    } = item;
    const realType = `${type}`.toLowerCase();
    let formOptions: { [name: string]: any } = getInitialValue(id, initData, type);
    const { initialValue } = formOptions;

    /**
     * checkbox/switch时，如果不设置valuePropName属性，再表单中无法重置数据
     */
    if ([CHECKBOX, SWITCH].includes(realType)) {
        formOptions.valuePropName = 'checked';
    }

    const defaultProps = getParsedProps(item);
    const defaultStyle = {
        style: {
            width: '100%'
        }
    };
    const globalConfig = getGlobalConfig();
    const parsedParams = {
        ...globalConfig.params,
        ...params
    };
    const itemOptions = translateOption(configData, parsedParams);

    const TYPES = {
        [INPUT_TRIM]: <TrimInput {...defaultProps} />,
        [NUMBER]: <InputNumber {...defaultStyle} {...defaultProps} />,
        [TEXTAREA]: <TextArea {...defaultProps} />,
        [TEXTAREA_TRIM]: <TrimTextarea {...defaultProps} />,

        [CHECKBOX]: <Checkbox {...defaultProps} />,
        [CHECKBOXGROUP]: <CheckboxGroup {...defaultProps} options={itemOptions} />,

        [RADIO]: <Radio {...defaultProps} />,
        [RADIOGROUP]: <RadioGroup {...defaultProps} options={itemOptions} />,
        [RADIOGROUPBUTTON]: (
            <RadioGroup {...defaultProps}>
                {itemOptions.map(({ label, value, disabled }) => (
                    <RadioButton value={value} key={value} disabled={disabled}>
                        {label}
                    </RadioButton>
                ))}
            </RadioGroup>
        ),

        [SWITCH]: <Switch {...defaultProps} />,
        [SLIDER]: <Slider {...defaultProps} />,

        [SELECT]: buildSelect(configData, defaultProps, parsedParams),
        [SUGGEST]: <Suggest {...defaultStyle} {...defaultProps} params={parsedParams} />,
        [TREESELECT]: <TreeSelect {...defaultStyle} treeData={itemOptions} {...defaultProps} />,

        [RANGEPICKER]: <RangePicker {...defaultStyle} {...defaultProps} />,
        [DATEPICKER]: <DatePicker {...defaultStyle} {...defaultProps} />,
        [WEEKPICKER]: <WeekPicker {...defaultStyle} {...defaultProps} />,
        [MONTHPICKER]: <MonthPicker {...defaultStyle} {...defaultProps} />,
        [TIMEPICKER]: <TimePicker {...defaultStyle} {...defaultProps} />,

        [CASCADER]: <Cascader {...defaultStyle} {...defaultProps} options={itemOptions} />,
        [RATE]: <Rate {...defaultProps} />
    };

    const renderField = (template) =>
        getFieldDecorator(id, {
            ...formOptions,
            ...item.options
        })(template);

    // 用户：注册组件
    const registeredComponents = getRegisteredComponent();
    if (registeredComponents[realType]) {
        const Comp = registeredComponents[realType];
        const template = <Comp form={form} status={1} {...props} />;
        return formable ? renderField(template) : template;
    }

    // HTML类型
    if (realType === HTML) {
        const html = item.template || initialValue;

        // 配置了type: html  且  template为string类型
        if (typeof html === 'string') {
            return <DangerHtml html={html} {...defaultProps} />;
        }

        // html类型非表单元素，则直接返回模板或者当前值
        console.warn('type为html类型时，建议template设置为string类型!');
        return html;
    }

    // 文字节点
    if (realType === TEXT) {
        let content = initialValue;
        // 空字符串处理
        typeof content === 'string' && (content = content.trim());

        if ([undefined, ''].includes(content)) {
            const defaultEmptyText = emptyText || item.emptyText || globalConfig.emptyText;
            content = defaultEmptyText == undefined ? '无' : defaultEmptyText;
        }

        return item.template || content;
    }

    // 非表单元素
    if (!formable) {
        return item.template;
    }

    let template = TYPES[realType];

    // 内置类型，未配置自定义模板
    if (!template) {
        template = <Input type={realType || 'text'} {...defaultProps} />;
    }

    // 自定义模板优先级最高
    item.template && (template = item.template);

    return renderField(template);
};
