/*
 * @Author			jssoscar
 * @Date			2021-02-01 12:06:28
 * @Version			1.0
 * @Description
 */

import React, { PureComponent } from 'react';
import { Form, Button, Row } from 'antd';
import City from './City';
import Hooks from './Hooks';

import ItemGenerator, { setGlobalConfig, register } from '../src';
import '../src/style';

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
            item: {
                options: {
                    rules: [
                        {
                            required: true,
                            message: '请输入'
                        }
                    ]
                }
            }
        },
        selectRequired: {
            item: {
                options: {
                    rules: [
                        {
                            required: true,
                            message: '请选择'
                        }
                    ]
                }
            }
        }
    }
});

// 注册城市组件
register('city', City);

// 注册hooks组件
register('hooks', Hooks, true);

class Test extends PureComponent {
    state = {
        status: 1,
        colable: true
    };

    btnClicked = (status) => {
        this.setState({
            status
        });
    };

    resetForm = () => {
        const { form } = this.props;
        form.resetFields();
    };

    config = [
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

    query = () => {
        const { form } = this.props;
        console.log('表单数据：', form.getFieldsValue());
    };

    render() {
        const { form } = this.props;
        const { status, colable } = this.state;
        const { config } = this;
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
                    item: {
                        id: 'name',
                        label: 'input基础类型',
                        options: {
                            rules: [
                                {
                                    pattern: '/\\d+/',
                                    message: '请输入有效手机号'
                                }
                            ]
                        }
                    },
                    logic: 'nameNotRequired'
                },
                {
                    item: {
                        id: 'nametrim',
                        label: 'input去空格',
                        type: 'input.trim',
                        options: {
                            rules: [
                                {
                                    pattern: '/a\\w+/ig',
                                    message: '请输入有效正则'
                                }
                            ]
                        }
                    },
                    logic: {
                        test: '{age} == 1',
                        item: {
                            options: {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入'
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    item: {
                        id: 'number',
                        label: '数字(级联)',
                        type: 'number',
                        options: {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入'
                                }
                            ]
                        }
                    },
                    logic: [
                        {
                            test: '{ageMulit}.includes(1)',
                            item: {
                                options: {
                                    rules: [
                                        {
                                            required: false,
                                            message: '请输入'
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            test: `{age} == 1`,
                            item: {
                                type: 'textarea'
                            }
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
                            shouldOptionDisabled: (val) => val == 2,
                            showTooltip: true,
                            tooltip: 'value',
                            tooltipProps: {
                                placement: 'right'
                            },
                            showPleaseSel: true,
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
                        id: 'treeselect',
                        label: '树形Select',
                        type: 'treeselect',
                        data: config,
                        params: {
                            shouldOptionDisabled: (val) => val == 2
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
                            optGroup: true
                        }
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
                        data: config,
                        params: {
                            shouldOptionDisabled: (val) => val == 1
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
                        id: 'text',
                        label: '文本类型',
                        type: 'text'
                    }
                },
                {
                    item: {
                        label: '非表单元素',
                        template: <div>我是非表单元素展示到表单中</div>,
                        formable: false
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
                    item: {
                        id: 'hooks',
                        label: '自定义hooks组件',
                        type: 'hooks'
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
                            sm: 20
                        }
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
                            sm: 20
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
                name: '测试账号',
                age: -1,
                ageMulit: [1, 10],
                ageGroup: 20,
                id: 1,
                cascader: [2, 20],
                treeselect: 1,
                checkboxgroup: [1, 2],
                radiogroupbutton: [1, 2],
                text: '自定义文本'
            },
            colable,
            logic: {
                nameNotRequired: {
                    test: '{age} == 1',
                    item: {
                        options: {
                            rules: [
                                {
                                    required: false,
                                    message: '请输入'
                                }
                            ]
                        }
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
            >
                <Row gutter={10}>
                    <ItemGenerator form={form} options={options} />
                </Row>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 10
                    }}
                >
                    {getBtn('查看状态', {
                        onClick: () => this.btnClicked(0)
                    })}
                    {getBtn('编辑状态', {
                        onClick: () => this.btnClicked(2)
                    })}
                    {getBtn('查询', {
                        onClick: this.query
                    })}
                    {getBtn('重置', {
                        onClick: this.resetForm
                    })}
                    {getBtn('切换布局', {
                        onClick: () =>
                            this.setState({
                                colable: !colable
                            })
                    })}
                </div>
            </Form>
        );
    }
}

export default Form.create()(Test);
