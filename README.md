# item-generator

* 基于antd 3.0表单方案，从API使用转化为JSON配置化，提升开发效率

* 类型增强：增加了input.trim、textarea.trim两种trim类型，内置text文本、hidden、html、suggest类型

* 支持表单状态：1份json配置，支持编辑、查看状态配置

* 支持基础的表单类型配置、表单级联

* 支持注册自定义类型组件及hooks组件、组件自定义模板

* 拉平数据类型处理(如：moment类型)

* 拉平不同表单配置(如：valueProp的处理)

* 解决不同表单元素类型展示UI出现错乱的问题(如：inputNumber、RangePicker等)

## 如何使用？

* PS：请确保已经安装React / Antd <strong className="red">3.19.0以上版本</strong>

```bash
npm i item-generator@latest -S
```

### css引用

<p><strong className="red">特别注意</strong></p>
<p>使用了babel-import插件来进行antd的异步加载，代码层次需要引入style模块</p>
<p>否则babel-import无法加载item-generator中引用到的antd组件样式</p>
<p>反之，如果代码直接 import 'antd/dist/antd.(css|less)'这种全量引入，则不需要引入</p>

```jsx
 // 项目入口引用一次即可，保证antd的babel-import样式是引入的
 import 'item-generator/style'
```


接下来，在页面中按照如下方式使用

```jsx
import React from 'react';
import ItemGenerator from 'item-generator';

<ItemGenerator form={form} options={{
    config: []
}} />
```

详细使用请参考代码演示

## 代码演示

```js
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
    baseItemConfig: {
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
                    logic: 'nameRequired'
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
                nameRequired: [
                    {
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
                ]
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
```

## 全局配置

全局自定义ItemGenerator属性配置

### setGlobalConfig(config)

#### config.params

* 此处Params配置，可以参考API中各类型params参数说明

| 参数名 | 说明 | 类型 | 默认值 | 必需 |
| -------- | ----------- | ---- | ------- | --------- |
| showPleaseSel | 是否展示Select类型的【请选择】 | boolean | true | 否 |
| pleaseSelValue | 【请选择】选项的值配置 | string/number | '' | 否 |
| initText | select默认placeholder | string | '请选择' | 否 | 
| label | options中label属性key | string | 'value' | 否 |
| value | options中value属性key | string | 'id' | 否 |
| children | 子节点字段key | string | 'children' | 否 |

#### config.colProps

| 参数名 | 说明 | 类型 | 默认值 | 必需 |
| -------- | ----------- | ---- | ------- | --------- |
| colProps | colable为true，则应用此配置（属性参考<a href="https://3x.ant.design/components/grid-cn/#Col" target="_blank">Col</a>） | object | {} | 否 |

#### config.descriptionsProps

| 参数名 | 说明 | 类型 | 默认值 | 必需 |
| -------- | ----------- | ---- | ------- | --------- |
| descriptionsProps | 查看状态下，描述列表配置（属性参考<a href="https://3x.ant.design/components/descriptions-cn/#Descriptions" target="_blank">Descriptions</a>） | object | {}| 否 |

#### config.emptyText

| 参数名 | 说明 | 类型 | 默认值 | 必需 |
| -------- | ----------- | ---- | ------- | --------- |
| emptyText | 查看状态下空值(undefined/null)的处理 | string | '无' | 否 |


#### config.logic

此场景下，建议配置一些常用布局、必填的常规配置，这样不需要每个元素进行配置规则

具体参考<a href="#Logic">Logic</a>


### 全局配置demo

```jsx
import { setGlobalConfig } from 'item-generator';

setGlobalConfig({
    params: {
        showPleaseSel: false, // 不显示select的【请选择】选项
        label: 'name', // 所有配置类数据的展示文本
        value: 'id' // 所有配置类数据的值
    },
    colProps: {
        span: 8
    },
    descriptionsProps: {
        bordered: true
    },
    emptyText: '--',
    logic: {
        inputRequired: { // 配置一个全局的必填
            test: true,
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
        selectRequired: {  // 配置一个全局的必选
            test: true,
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
```

## 注册自定义类型组件

### register(type, Component, isHookComponent)

* 注册自定义类型组件

* Antd 3表单使用Class component，如果开发hooks表单组件嵌入到Form中，需要forwardref，此场景配置第三个参数为true即可。

| 参数名 | 说明 | 类型 | 默认值 | 必需 |
| -------- | ----------- | ---- | ------- | --------- |
| type | 组件名称 | String | '' | 是 |
| Component | 自定义注册组件 | React.ReactNode | null | 是 |
| isHookComponent | 是否为hooks组件 | boolean | false | 否 |

### unregister(type)

取消已注册自定义类型组件

| 参数名 | 说明 | 类型 | 默认值 | 必需 |
| -------- | ----------- | ---- | ------- | --------- |
| type | 组件名称 | String | '' | 是 |

```jsx
import { register, unregister } from 'item-generator';

// 注册组件
register('city', City);

// 取消注册
unregister('city');
```

### 自定义组件渲染

* <strong>自定义组件会自动注入当前表单form对象、当前表单状态status</strong>

```jsx
import { register, unregister } from 'item-generator';

// 注册组件
register('city', City);

// 渲染时候，会自动注入属性：
<City form={form} status={0|1} 自定义的props />
```

## API

| 参数名 | 说明 | 类型 | 默认值 | 必需 |
| -------- | ----------- | ---- | ------- | --------- |
| form | antd表单对象实例 | object | - | 是 |
| options | 表单项配置，具体参考<a href="#Options">Options</a> | object | - | 是 |

### Options

| 参数名 | 说明 | 类型 | 默认值 | 必需 |
| -------- | ----------- | ---- | ------- | --------- |
| status | 表单状态（0：查看态，1：编辑态） | number | 1 | 否 |
| data | 表单初始化数据 | object | {} | 否 |
| colProps | colable为true，则应用此配置（属性参考<a href="https://3x.ant.design/components/grid-cn/#Col" target="_blank">Col</a>） | object | {} | 否 |
| descriptionsProps | 查看状态下，描述列表配置（属性参考<a href="https://3x.ant.design/components/descriptions-cn/#Descriptions" target="_blank">Descriptions</a>） | object | {}| 否 |
| colable | 是否以Col封装 | boolean | false | 否 |
| config | 表单项配置，具体参考<a href="#Config">Config</a> | array | [] | 是 |
| logic | 局部级联规则配置(如果表单元素配置string类型，则根据当前配置来匹配相应级联规则) | {key: Logic[]} | {} | 否 |

### Config

| 参数名 | 说明 | 类型 | 默认值 | 必需 |
| -------- | ----------- | ---- | ------- | --------- | ---------- |
| show | 是否展示 | boolean | true | 否 |
| colProps | colable为true，则应用此配置（属性参考<a href="https://3x.ant.design/components/grid-cn/#Col" target="_blank">Col</a>） | object | {} | 否 |
| formItemProps | 表单Item属性（属性参考<a href="https://3x.ant.design/components/form-cn/#Form.Item" target="_blank">Form.Item</a>） | object | {} | 否 |
| item | 表单元素配置，具体参考<a href="#Item">Item</a> | object | - | 是 |
| logic | 表单级联配置方案，具体参考<a href="#Logic">Logic</a> | string/Logic/Logic[] | '' | 否 |

#### Item

| 参数名 | 说明 | 类型 | 默认值 | 必需 |
| -------- | ----------- | ---- | ------- | --------- | ---------- |
| id | 表单项ID | string | - | 否 |
| label | 表单label | ReactNode | '' | 否 |
| name | 表单名称。<a href="#常见问题">为何提供name配置？</a> | string | '' | 否 |
| type | 表单类型（<strong className="red">忽略大小写</strong>）。现有类型：<div>text/hidden/input.trim/password/select/treeselect/number</div><div>textarea/textarea.trim/switch/slider/checkbox/checkboxgroup</div><div>radio/radiogroup/radiogroupbutton/rangepicker/yearpicker</div><div>cascader/datepicker/weekpicker/monthpicker/timepicker</div><div>html/suggest</div> | string | input.trim | 否 |
| options | 表单包装配置（属性参考：<a href="https://3x.ant.design/components/form-cn/#getFieldDecorator(id,-options)-%E5%8F%82%E6%95%B0" target="_blank">getFieldDecorator</a>）| object | {} | 否 |
| props | 表单元素属性，类似<a href="https://3x.ant.design/components/select-cn/#Select-props" target="_blank">Select</a>。 | object | {} | 否 |
| descriptionProps | 查看态元素样式（属性参考：<a href="https://3x.ant.design/components/descriptions-cn/#DescriptionItem" target="_blank">DescriptionItem</a>）| object | {} | 否 |
| template | 自定义渲染模板，如果未设置则默认为input.trim类型 | <div>ReactNode</div><div>string（html类型建议传递类型为string类型）</div>| null | 否 |
| data | Select/TreeSelect/Suggest/Checkbox/Radio/Cascader下拉配置数据 | array | [] | 否 |
| params | 方法调用参数，在select/checkboxgroup/radiogroup/cascader场景下可能需要 | object | {} | 否 |
| emptyText | 查看状态下空值(undefined/null/'')的处理 | string | '无' | 否 |
| formable | 是否以表单getFieldDecorator包装 | boolean | true | 否 |

## 表单级联方案

* 表单级联方案，根据规则应用所对应的配置

* 合并时，如果是数组类型，则浅拷贝进行覆盖；如果非数组，则进行深拷贝合并

* 同时满足多条规则时，从后到前进行拷贝，规则越靠前，配置越优先

* 字段级联时，如果是字符串模板，需要提供占位符 {XXX}。 比如： '{aa} == 1' 会自动根据aa字段的值来解析，然后执行表达式

### Logic

| 参数名 | 说明 | 类型 | 默认值 | 必需 |
| -------- | ----------- | ---- | ------- | --------- | ---------- |
| test | 级联应用规则 | string/boolean/function<div>如果是function类型，参数透传表单实例form对象</div> | - | 是 |
| 其他属性 | 其他属性 | 具体参考<a href="#Config">Config</a> | 否 |

### (Select|TreeSelect|Suggest|Checkbox|Radio|Cascader).Params

| 参数名 | 说明 | 类型 | 默认值 | 必需 |
| -------- | ----------- | ---- | ------- | --------- | ---------- |
| label | options中label属性key | string | 'value' | 否 |
| value | options中value属性key | string | 'id' | 否 |
| shouldOptionDisabled | 选项是否为disabled，参数名当前数据项value | function | () => false | 否 |


### Select.Params

| 参数名 | 说明 | 类型 | 默认值 | 必需 |
| -------- | ----------- | ---- | ------- | --------- | ---------- |
| showTooltip | 是否以tooltip包装 | boolean | false | 否 |
| tooltip | tooltip字段，如果showTooltip为true，则取此配置字段key作为tooltip内容 | boolean | 'remark' | 否 |
| tooltipProps | tooltip属性，具体参考<a href="https://3x.ant.design/components/tooltip-cn/#API" target="_blank">Tooltip</a>。 | Object | false | 否 |
| showPleaseSel | 是否展示【请选择】选项 | boolean | true | 否 |
| pleaseSelValue | 【请选择】选项的值配置 | string/number | '' | 否 |
| initText | 默认placeholder | string | '请选择' | 否 | 
| optGroup | 是否支持select分组 | boolean | false | 否 |

### Suggest.Params

| 参数名 | 说明 | 类型 | 默认值 | 必需 |
| -------- | ----------- | ---- | ------- | --------- | ---------- |
| onSearch | 搜索钩子函数 | Function | (val：输入值) => Promise | 是 |

### (Cascader|TreeSelect).Params

| 参数名 | 说明 | 类型 | 默认值 | 必需 |
| -------- | ----------- | ---- | ------- | --------- | ---------- |
| children | 子节点字段key | string | 'children' | 否 |

## 常见问题

### 表单Item配置为何需要name属性？
*  对于详情数据，以业务线字段(bizType)为例：新增/编辑数据为0/1，查看则返回的(bizTypeName|bizTypeText)类似此字段名。
*  一般后端为了方便维护，会使用单model维护，所以在新增/编辑/查看状态配置的id需要不同。
*  id属性主要为了元素的id设置，所以此处设置name属性来进行查看状态字段取值处理。
*  如果表单状态为查看态，默认取name属性，否则取id属性。即：name > id优先级。
```
