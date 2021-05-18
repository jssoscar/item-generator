# item-generator
基于Antd3的配置化表单解决方案

## Changelog

### 0.8.1

-   Style：增加rate评分类型

### 0.8.0

-   内置类型：增加rate评分类型

### 0.7.8

-   index.d.ts：优化ItemGenerator导出定义

### 0.7.7

-   优化全局导出配置

### 0.7.6

-   index.d.ts： 修复导出异常的warning

### 0.7.5

-   修改index.d.ts默认导出

-   注册组件：优化formwardRef组件处理

### 0.7.4

-   查看态： 增加rangepicker展示逻辑处理

### 0.7.3

-   register注册自定义组件：去除isHooks组件，自动判断注册组件类型

-   options配置：增加局部FormItemProps属性以及配置合并处理

### 0.7.2

-   extends：增加logic中配置extends的解析

### 0.7.1

-   register: 增加再次注册已注册组件的提示

### 0.7.0

-   全局配置：baseItemConfig修改为extends关键字


### 0.6.9

-   组件：内置类型/自定义类型统一处理为小写，降低用户配置type大小写导致展示异常问题

-   注册组件： 增加已注册组件，再次注册时的warn提示

### 0.6.8

-   register组件：修复ts下报错的bug

-   组件Factory：修复用户自定义组件type转换小写导致组件失效的bug

### 0.6.7

-   元素extends： 修复全局覆盖元素配置的bug

-   级联： 优化类型合并处理

### 0.6.6

-   级联：优化string/object/(string|object)[]类型配置处理

### 0.6.5

-   全局配置： 将logic改为baseItemConfig，提供全局表单元素配置合并

-   级联：支持string/object/(string|object)[]类型配置
### 0.6.4

-   修复.d.ts导出异常的bug

### 0.6.3

-   全局配置：增加logic全局配置/优化合并处理

### 0.6.2

-   Select - 增加【请选择】默认值配置

### 0.6.1

-   级联 - 增加对象类型的解析处理（优化级联结构配置）

### 0.6.0

-   级联 - 增加字符串类型规则配置与解析

### 0.5.9

-   级联 - 修复级联规则合并失效的bug

### 0.5.8

-   自定义注册组件： 增加hooks类型自定义主注册组件支持

### 0.5.7

-   级联 - 优化rules中pattern字符串类型转换逻辑

### 0.5.6

-   属性定义d.ts ： 移除无用定义

### 0.5.5

-   表单验证 - 增加字符串正则解析处理逻辑

-   表单级联： logic规则字段rule修改为test

### 0.5.4

-   ItemGenerator - 修复d.ts文件导出缺少setGlobalConfig/register/unregister的bug

### 0.5.3

-   表单级联：函数类型规则增加form参数传递

### 0.5.2

-   表单级联：优化数据合并处理逻辑

### 0.5.1

-   编辑态：增加表单级联逻辑

### 0.5.0

-   编辑态：增加text文本类型，展示文本内容

### 0.4.9

-   查看态：修复select/checkbox/cascader/tree类型数据文本展示异常的bug

### 0.4.8

-   用户自定义注册组件：组件增加视图状态属性注入

-   用户自定义注册组件：查看态 - 支持组件的渲染处理

### 0.4.7

-   增加：用户自定义注册组件（优先级最高）- register(type, component)

-   增加：取消已注册组件 - unregister(type)

### 0.4.6

-   查看态：支持带有配置数据类型的值显示为文本

-   select：tooltip元素支持自定义tooltip属性配置

### 0.4.5

-   移除console.log

### 0.4.4

-   Suggest：防抖时间调整为0.1秒

### 0.4.3

-   全局配置：增加emptyText全局配置

-   Suggest：防抖时间调整为1秒

### 0.4.2

-   ViewItem: 合并全局配置与自定义配置

### 0.4.1

-   ViewItem: 优化默认值展示处理

### 0.4.0

-   Util: 优化translateOption方法，支持select/treeSelect不同数据结构的转换

-   type: 增加搜索提示suggest类型

### 0.3.9

-   type: 新增treeselect类型(树状数据选择)

### 0.3.8

-   自定义配置：增加setGlobalConfig全局配置属性

### 0.3.7

-   select类型：增加默认可清除属性配置

### 0.3.5

-   修复cascader类型数据转换异常的bug

### 0.3.4

-   优化样式引用

### 0.3.2

-   修改类型为input.trim时，input元素类型设置为type='input.trim'的bug

### 0.3.1

-   修改外部babel-import方式下，select场景配置tooltip无样式的bug

### 0.3.0

-   优化html类型template非字符串类型的展示
-   优化查看态下html类型的展示逻辑

### 0.2.8

-   优化数据类型处理
-   修复 timepicker 数据未转化为 moment 的 bug

### 0.2.4

-   表单类型增加 html 类型

### 0.2.3

-   表单类型增加 cascader 类型

### 0.2.2

-   默认 type 设置为 input.trim

### 0.1.6

-   增加 input.trim/textarea.trim 去除空格语法糖

### 0.1.2

-   统一 select/checkbox/radiogroup 中参数配置

### 0.0.9

-   修复 antd 中 Col 无样式的 bug
-   优化 data 属性 initialValue 处理逻辑，支持 a.b.c 类型 id 初始化
-   拉平 Select/Radio 类型 Option 的 disabled 处理逻辑
-   Select 增加分组处理属性，optGroup：默认不分组

### 0.0.7

-   修复外部引用使用 babel-plugin-import 方式引入 antd 样式导致 ItemGenerator 无样式的 bug

### 0.0.6

-   移除对 React/Antd 依赖

-   配置增加 formItemProps 配置

-   ReadMe 增加 demo 代码

### 0.0.5

-   优化 Select 带有 Group 类型处理

-   修复 Select 类型 ts 属性类型 mode 参数导致的报错 bug

### 0.0.4

-   优化 Select 带有 Group 类型处理

-   修复 Select 类型 ts 属性类型 mode 参数导致的报错 bug

### 0.0.2

-   基于 antd 表单方案，增加基础配置表单

-   支持表单状态配置，新增、编辑、查看状态配置

-   支持组件的自定义模板，支持基础的表单类型配置
