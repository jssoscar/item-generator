/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:52:57 
 * @Version			1.0 
 * @Description	
 */

import { ColProps } from 'antd/es/grid';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/es/form/Form';
import { FormItemProps } from 'antd/es/form/FormItem';
import { DescriptionsProps } from 'antd/es/descriptions';
import React from 'react';

export interface Empty {
    [name: string]: any;
}

enum Status {
    /** 查看状态表单 */
    VIEW = 0,
    /** 编辑状态，会根据传入data进行初始化 */
    ADD = 1
}

export interface SingleItem extends Empty {
    /** formItem文案，默认也会将label设置为placeholder */
    label?: React.ReactNode;
    /** 表单ID */
    id?: string;
    /**
     *  对于详情数据，以业务线字段(bizType)为例：新增/编辑数据为0/1，查看则返回的(bizTypeName|bizTypeText)类似此字段名。
     *  一般后端为了方便维护，会使用单model维护，所以在新增/编辑/查看状态配置的id需要不同。
     *  id属性主要为了元素的id设置，所以此处设置name属性来进行查看状态字段取值处理。
     *  如果表单状态为查看态，默认取name属性，否则取id属性。即：name > id优先级。
     */
    name?: string;
    /** 表单类型，默认为input.trim */
    type?: string;
    /** antd表单元素的options配置项 */
    options?: GetFieldDecoratorOptions;
    /** 表单元素props */
    props?: Empty;
    /** 查看态：Description.Item属性配置 */
    descriptionProps?: Empty;
    /** 自定义渲染模板 */
    template?: JSX.Element;
    /** select/checkboxgroup/radiogroup配置数据 */
    data?: Object[];
    /** 方法调用参数 */
    params?: Object;
    /** 查看状态下空值处理 */
    emptyText?: string | null | undefined;
    /** 是否以表单getFieldDecorator包装，默认为true */
    formable?: boolean;
}

export interface Config extends Empty {
    /** FormItem的props配置 */
    formItemProps?: FormItemProps;
    /** 表单元素配置 */
    item: SingleItem;
    /** Col样式，如果colable设置为true，则会应用此配置 */
    colProps?: ColProps;
    /** 是否展示当前元素，默认：true */
    show?: boolean;
    /** 元素级联逻辑配置 */
    logic?: string | string[] | Logic | Logic[];
    /** 继承基础配置 */
    extends?: string | string[];
}

/** 级联对象逻辑 */
export interface Logic extends Omit<Config, 'logic'>, Config {
    /** 是否应用当前规则 */
    test: string | boolean | function;
}

/**
 * 逻辑map配置
 */
export interface LogicMap {
    [key: string]: Logic[] | Logic;
}

/**
 * ItemGenerator 配置对象
 */
export interface Options extends Empty {
    /** Col样式，如果colable设置为true，则会应用此配置 */
    colProps?: ColProps;
    /** 查看状态下详情容器样式 */
    descriptionsProps?: DescriptionsProps;
    /** 查看状态下，null/undefined字段的兜底展示 */
    emptyText?: string;
    /** 是否以Col封装：默认为false */
    colable?: boolean;
    /** 表单数据，会使用数据进行初始化 */
    data?: Empty;
    /** 页面状态， 0：查看，1：编辑。默认为 1 - 新增状态 */
    status?: Status;
    /** 表单配置项 */
    config: Config[];
    /** 级联map规则 */
    logic?: LogicMap;
    /** 元素继承配置 */
    extends?: {
        [key: string]: Config
    }
}

export interface ItemProps extends Empty {
    /** antd表单对象，查看态非必需 */
    form?: WrappedFormUtils;
    /** 表单配置 */
    options: Options;
}

export default ItemProps;
