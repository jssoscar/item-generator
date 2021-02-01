#!/bin/bash

source ~/.nvm/nvm.sh
nvm use v10.16.0
npm install -g dnpm --registry=http://registry.npm.xiaojukeji.com
echo "====== 当前目录 ======"
BASE_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
echo "$BASE_DIR"

OUTPUT_DIR=$BASE_DIR/output
rm -rf $OUTPUT_DIR
mkdir $OUTPUT_DIR
rm -rf node_modules
echo "====== 安装npm依赖 ======"
dnpm install
INSTALL_RET=$?
if [ $INSTALL_RET -ne 0 ];then
    echo "===== npm install failure ====="
    exit $INSTALL_RET
else
    echo "===== npm install success ====="
fi

echo "====== 编译代码 ======"
npm run build
BUILD_RET=$?
if [ $BUILD_RET -ne 0 ];then
    echo "===== npm build failure ====="
    exit $BUILD_RET
else
    echo "===== npm build success ====="
fi

echo "====== 1. 拷贝build 文件  ======"
mkdir -p $OUTPUT_DIR
(
    cp -rf ./build/ $OUTPUT_DIR/build/
) || { echo "===== 拷贝file  ====="; exit 2; }

echo "====== 2. 拷贝 nginx配置 脚本 ======"
(
    cp -f $BASE_DIR/server.conf $OUTPUT_DIR/
) || { echo "===== 拷贝 nginx配置 脚本 failure ====="; exit 2; }

echo "====== 3. 上传cdn 脚本 ====="
npm run upload
echo "====== 构建结束 ======="