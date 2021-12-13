/*
 * @Author			jssoscar
 * @Date			2021-02-01 12:06:28
 * @Version			1.0
 * @Description
 */

import React, { useState } from 'react';
import { Form, Button, Row } from 'antd';

import ItemGenerator, { setGlobalConfig, register } from '../src';
import '../src/style';

import City from './City';

setGlobalConfig({
    params: {
        showPleaseSel: false // 不显示select的【请选择】选项
    },
    colProps: {
        span: 8
    },
    descriptionsProps: {
        bordered: true
    },
    emptyText: '--',
    extends: {
        inputRequired: {
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '请输入'
                    }
                ]
            }
        },
        selectRequired: {
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '请选择'
                    }
                ]
            }
        },
        textareaProps: {
            item: {
                props: {
                    autosize: {
                        minRows: 10
                    }
                }
            }
        },
        notRequired: {
            formItemProps: {
                rules: []
            }
        }
    },
    itemProvider: {
        select: {
            allowClear: true
        },
        input: {
            allowClear: true
        },
        textarea: {
            autoSize: {
                minRows: 4
            }
        },
        rate: {
            tooltips: ['差', '一般', '好', '很好', '完美']
        }
    }
});

register('city', City);

export default () => {
    const [status, setStatus] = useState(1);
    const [colable, setColable] = useState(true);

    const [form] = Form.useForm();

    const btnClicked = (status) => {
        setStatus(status);
    };

    const resetForm = () => {
        form.resetFields();
    };

    const config = [
        {
            id: 1,
            value: '未成年人',
            children: [
                {
                    id: 10,
                    value: '0-10岁'
                }
            ]
        },
        {
            id: 2,
            value: '成年人',
            children: [
                {
                    id: 20,
                    value: '16-60岁'
                },
                {
                    id: 21,
                    value: '60岁以上'
                }
            ]
        },
        {
            id: 3,
            value: '未知'
        }
    ];

    const query = () => {
        console.log('表单数据：', form.getFieldsValue());
    };

    const options = {
        config: [
            {
                item: {
                    id: 'id',
                    label: 'ID',
                    type: 'hidden'
                }
            },
            {
                formItemProps: {
                    dependencies: ['age']
                },
                item: {
                    id: ['driver', 'name'],
                    label: 'input基础类型'
                },
                logic: 'nameNotRequired',
                extends: 'inputRequired'
            },
            {
                item: {
                    id: 'nametrim',
                    label: 'input去空格',
                    type: 'input.trim',
                    props: {
                        maxLength: 12
                    }
                },
                extends: 'inputRequired'
            },
            {
                formItemProps: {
                    dependencies: ['age']
                },
                item: {
                    id: 'password',
                    label: '密码类型',
                    type: 'password'
                },
                logic: {
                    test: '{age} == 1',
                    extends: 'notRequired'
                },
                extends: 'inputRequired'
            },
            {
                formItemProps: {
                    dependencies: ['ageMulit', 'age'],
                    rules: [
                        {
                            required: true,
                            message: '请输入'
                        }
                    ]
                },
                item: {
                    id: 'number',
                    label: '数字(级联)',
                    type: 'number'
                },
                logic: [
                    {
                        test: '{ageMulit}.includes(1)',
                        formItemProps: {
                            rules: [
                                {
                                    required: false,
                                    message: '请输入'
                                }
                            ]
                        }
                    },
                    {
                        test: `{age} == 1`,
                        show: false
                    }
                ]
            },
            {
                item: {
                    id: 'age',
                    type: 'select',
                    label: '基础Select',
                    data: config,
                    params: {
                        showPleaseSel: true,
                        shouldOptionDisabled: (val) => val == 2,
                        pleaseSelValue: -1
                    }
                },
                extends: 'selectRequired'
            },
            {
                item: {
                    id: 'ageMulit',
                    type: 'select',
                    label: 'Select多选',
                    data: config,
                    props: {
                        mode: 'multiple'
                    }
                },
                extends: 'selectRequired'
            },
            {
                item: {
                    id: 'ageGroup',
                    type: 'select',
                    label: 'Select分组',
                    data: config,
                    params: {
                        optGroup: true,
                        initText: '测试配置'
                    }
                },
                extends: 'selectRequired'
            },
            {
                item: {
                    id: 'treeselect',
                    label: '树形Select',
                    type: 'treeselect',
                    data: config
                },
                extends: 'selectRequired'
            },
            {
                item: {
                    id: 'checkbox',
                    label: '复选框',
                    type: 'checkbox'
                }
            },
            {
                item: {
                    id: 'checkboxgroup',
                    label: '多选框',
                    type: 'checkboxgroup',
                    data: config,
                    params: {
                        shouldOptionDisabled: (val) => val == 1
                    }
                }
            },
            {
                item: {
                    id: 'cascader',
                    label: '级联选择',
                    type: 'cascader',
                    data: [
                        {
                            id: 1,
                            value: '未成年人',
                            child: [
                                {
                                    id: 10,
                                    value: '0-10岁'
                                }
                            ]
                        },
                        {
                            id: 2,
                            value: '成年人',
                            child: [
                                {
                                    id: 20,
                                    value: '16-60岁'
                                },
                                {
                                    id: 21,
                                    value: '60岁以上'
                                }
                            ]
                        }
                    ],
                    params: {
                        shouldOptionDisabled: (val) => val == 1,
                        children: 'child'
                    }
                }
            },
            {
                item: {
                    id: 'radio',
                    label: '单选框',
                    type: 'radio'
                }
            },
            {
                item: {
                    id: 'radiogroup',
                    label: '单选框组合',
                    type: 'radiogroup',
                    params: {
                        shouldOptionDisabled: (val) => val == 1
                    },
                    data: config
                }
            },
            {
                item: {
                    id: 'radiogroupbutton',
                    label: '多单选按钮框',
                    type: 'radiogroupbutton',
                    params: {
                        shouldOptionDisabled: (val) => val == 1
                    },
                    data: config
                }
            },
            {
                item: {
                    id: 'datepicker',
                    type: 'datepicker',
                    label: '日期'
                }
            },
            {
                item: {
                    id: 'rangepicker',
                    type: 'rangepicker',
                    label: '区间'
                }
            },
            {
                item: {
                    id: 'weekpicker',
                    type: 'weekpicker',
                    label: '周'
                }
            },
            {
                item: {
                    id: 'monthpicker',
                    type: 'monthpicker',
                    label: '月份'
                }
            },
            {
                item: {
                    id: 'timepicker',
                    type: 'timepicker',
                    label: '时间'
                }
            },
            {
                item: {
                    id: 'yearpicker',
                    type: 'yearpicker',
                    label: '年'
                }
            },
            {
                item: {
                    id: 'switch',
                    label: 'Switch开关',
                    type: 'switch'
                }
            },
            {
                item: {
                    id: 'slider',
                    label: '滑动输入条',
                    type: 'slider'
                }
            },
            {
                item: {
                    label: 'html类型',
                    type: 'html',
                    template: '<a href="http://baidu.com" target="_blank">百度</a>'
                }
            },
            {
                item: {
                    id: 'customer',
                    label: '自定义模板',
                    template: <div>我是自定义模板</div>
                }
            },
            {
                item: {
                    id: 'formable',
                    label: '非表单元素',
                    template: <div>我是非表单元素展示到表单中</div>,
                    formable: false
                }
            },
            {
                item: {
                    id: 'text',
                    label: '文本节点',
                    type: 'text'
                }
            },
            {
                item: {
                    id: 'textarea',
                    label: '文本框',
                    type: 'textarea'
                }
            },
            {
                formItemProps: {
                    labelCol: {
                        sm: 2
                    },
                    wrapperCol: {
                        sm: 22
                    }
                },
                colProps: {
                    span: 24
                },
                item: {
                    id: 'textareatrim',
                    label: '文本框trim',
                    type: 'textarea.trim'
                }
            },
            {
                colProps: {
                    span: 24
                },
                formItemProps: {
                    labelCol: {
                        sm: 2
                    },
                    wrapperCol: {
                        sm: 22
                    }
                },
                item: {
                    label: '自定义注册组件',
                    type: 'city',
                    formable: false,
                    props: {
                        province: 'province1',
                        city: 'city1'
                    }
                }
            }
        ],
        status,
        data: {
            driver: {
                name: '测试账号'
            },
            age: 1,
            ageMulit: [1, 2],
            ageGroup: 20,
            id: 1,
            cascader: [2, 20],
            datepicker: '2020-07-29 11:51:27',
            search1: '测试账号',
            search2: ['测试1', '测试2'],
            treeselect: 2,
            text: '文本节点内容'
        },
        colable,
        colProps: {
            span: 8
        },
        logic: {
            nameNotRequired: {
                test: '{age} == 1',
                formItemProps: {
                    rules: [
                        {
                            required: false,
                            message: '请输入'
                        }
                    ]
                }
            }
        }
    };

    const getBtn = (text, props) => (
        <Button
            type="primary"
            style={{
                marginRight: 10
            }}
            {...props}
        >
            {text}
        </Button>
    );

    return (
        <Form
            autoComplete="off"
            labelCol={{
                sm: 6
            }}
            wrapperCol={{
                sm: 18
            }}
            style={{
                padding: '20px 40px'
            }}
            form={form}
        >
            {colable ? (
                <Row gutter={20}>
                    <ItemGenerator options={options} />
                </Row>
            ) : (
                <ItemGenerator options={options} />
            )}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                {getBtn('查看状态', {
                    onClick: () => btnClicked(0)
                })}
                {getBtn('编辑状态', {
                    onClick: () => btnClicked(1)
                })}
                {getBtn('查询', {
                    onClick: query
                })}
                {getBtn('重置', {
                    onClick: resetForm
                })}
                {getBtn('切换布局', {
                    onClick: () => setColable(!colable)
                })}
            </div>
        </Form>
    );
};
