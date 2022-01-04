# item-generator4

基于Antd 4的配置化表单解决方案

## Changelog

### 0.6.8

-   数据绑定处理：修复initialValue处理缺少数据兜底的bug

### 0.6.7

-   数据绑定处理：支持数据{a:{b:{c:1}}} 此与'a.b.c' id的处理
### 0.6.6

-   Select类型：优化Option组件key处理

### 0.6.5

-   Select类型：支持配置Option组件key
### 0.6.4

-   Select类型：shouldOptionDisabled增加当前options、当前配置数据参数传递

-   属性类型定义：修复id类型为antd NamePath类型
### 0.6.3

-   查看组件： 增加html/rate类型组件的全局属性配置处理

### 0.6.2

-   全局配置：增加antProvider配置，支持自定义antd默认组件属性配置

### 0.6.1

-   Style: 增加rate评分类型

### 0.6.0

-   内置类型：增加rate评分类型

### 0.5.9

-   修改默认导出配置

### 0.5.8

-   index.d.ts：优化ItemGenerator导出定义

### 0.5.7

-   优化全局导出配置

### 0.5.6

-   修复导出异常的warning

### 0.5.5

-   修改index.d.ts默认导出

### 0.5.4

-   查看态： 增加rangepicker展示逻辑处理

### 0.5.3

-   ItemGenerator4：属性增加form参数实例配置


### 0.5.2-3

-   rebuildForm方法：getFieldValue不做a.b.c此类id转换

### 0.5.2-2

-   增加rebuildForm方法：处理antd 3中存在a.b.c此类id的表单字段

### 0.5.2-1

-   options配置：增加局部FormItemProps属性以及配置合并处理

### 0.5.2

-   extends：增加logic中配置extends的解析

-   register: 增加再次注册已注册组件的提示

### 0.5.1

-   修复ts编译报错的bug

### 0.5.0

-   全局配置：baseItemConfig修改为extends关键字

### 0.4.9

-   组件：内置类型/自定义类型统一处理为小写，降低用户配置type大小写导致展示异常问题

-   注册组件： 增加已注册组件，再次注册时的warn提示
### 0.4.8

-   组件Factory：修复用户自定义组件type转换小写导致组件失效的bug

### 0.4.7

-   元素extends： 修复全局覆盖元素配置的bug

-   级联： 优化类型合并处理

### 0.4.6

-   级联：优化string/object/(string|object)[]类型配置处理

### 0.4.5

-   全局配置： 将logic改为baseItemConfig，提供全局表单元素配置合并

-   级联：支持string/object/(string|object)[]类型配置
### 0.4.4

-   修复.d.ts导出异常的bug

### 0.4.3

-   全局配置：增加logic全局配置/优化合并处理

### 0.4.2

-   Select - 增加【请选择】默认值配置

### 0.4.1

-   级联 - 增加对象类型的解析处理（优化级联结构配置）
### 0.4.0

-   级联 - 增加字符串类型规则配置与解析

### 0.3.9

-   级联 - 修复级联规则合并失效的bug

### 0.3.8

-   级联 - 修复规则解析报错的bug

### 0.3.7

-   级联 - 优化rules中pattern字符串类型转换逻辑

### 0.3.6

-   属性定义d.ts ： 移除无用定义

### 0.3.5

-   表单验证 - 增加字符串正则解析处理逻辑

-   表单级联： logic规则字段rule修改为test
  
### 0.3.4

-   ItemGenerator - 修复d.ts文件导出缺少setGlobalConfig/register/unregister的bug
### 0.3.3

-   表单级联：函数类型规则增加form参数传递
### 0.3.2

-   表单级联：优化数据合并处理逻辑

### 0.3.1

-   编辑态：增加表单级联逻辑

### 0.3.0

-   编辑态：增加text文本类型，展示文本内容

### 0.2.9

-   查看态：修复select/checkbox/cascader/tree类型数据文本展示异常的bug

### 0.2.8

-   用户自定义注册组件：组件增加视图状态属性注入

-   用户自定义注册组件：查看态 - 支持组件的渲染处理

### 0.2.7

-   增加：用户自定义注册组件（优先级最高）- register(type, component)

-   增加：取消已注册组件 - unregister(type)

### 0.2.6

-   查看态：支持带有配置数据类型的值显示为文本

-   select：tooltip元素支持自定义tooltip属性配置

### 0.2.5

-   Suggest: 优化防抖时间

### 0.2.4

-   全局配置：优化数据合并处理

### 0.2.3

-   全局配置：增加emptyText的全局配置

### 0.2.2

-   Suggest: 优化搜索提示防抖时间为1秒

### 0.2.1

-   Select：优化搜索提示warn

-   Template模板：移除console

### 0.2.0

-   ViewItem: 优化默认值展示处理

### 0.1.9

-   Util: 优化translateOption方法，支持select/treeSelect不同数据结构的转换

### 0.1.8

-   type: 新增treeselect类型(树状数据选择)

### 0.1.7

-   Style: 新增Spin组件样式依赖

### 0.1.6

-   Suggest类型：优化查询为空时，loading的bug

### 0.1.5

-   自定义配置：增加setGlobalConfig全局配置属性

### 0.1.4

-   suggest类型: 属性配置allowClear设置为true（默认false，不可清除）

-   select类型：增加默认可清除属性配置

### 0.1.3

-   新增类型：搜索提示suggest类型

### 0.1.2

-   修复html类型设置表单ID的bug

### 0.1.1

-   优化遍历key为undefined的bug

-   修复cascader类型数据转换异常的bug

### 0.1.0

-   FormItem : 优化属性处理

### 0.0.9

-   Style: 新增antd form样式引用

### 0.0.8

-   修复非表单元素设置FormItem ID后导致的数据获取bug

### 0.0.7

-   hidden: 优化colable处理/优化formItem处理

### 0.0.6

-   优化hidden类型处理

### 0.0.3

-   Style: 修复引用顺序异常导致hidden展示异常bug

### 0.0.2

-   增加password/yearpicker类型

### 0.0.3

-   修复复type:hidden类型在colable:true的展示bug

### 0.0.2

-   增加id转换处理

-   优化数据类型抹平处理

### 0.0.1

-   基于 antd 表单方案，增加基础配置表单

-   支持表单状态配置，新增、编辑、查看状态配置

-   支持组件的自定义模板，支持基础的表单类型配置
