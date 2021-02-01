const Minio = require('minio');
const fs = require('fs');
const path = require('path');

const BUCKET_NAME = '';
const UPLOAD_PATH = path.resolve('./build/static');
const CLOUND_PATH = 'static';

const minioClient = new Minio.Client({
    endPoint: '', // gift的资源url
    accessKey: '', // gift的accessKey
    secretKey: '' // gift的secretKey
});

const diffFile = (dirs, cloudPath) => {
    if (!fs.existsSync(dirs)) {
        throw new Error('目录不存在');
    }

    fs.readdirSync(dirs).forEach((value) => {
        const Urlpath = path.join(dirs, value);
        const stats = fs.statSync(Urlpath);
        if (stats.isDirectory()) {
            diffFile(Urlpath, `${cloudPath}/${value}`);
        }
        // 上传文件
        if (stats.isFile()) {
            minioClient.fPutObject(BUCKET_NAME, `${cloudPath}/${value}`, Urlpath, (error) => {
                if (error) {
                    console.error('上传失败', error);
                    process.exit(0);
                }
                console.log('上传成功', value);
            });
        }
    });
};

console.log(`检测 ${BUCKET_NAME} 空间是否存在！`);

minioClient.bucketExists(BUCKET_NAME, (error, exists) => {
    if (error || !exists) {
        if (!exists) {
            console.error(`${BUCKET_NAME}空间不存在！`);
        } else {
            console.error(`${BUCKET_NAME}空间检测异常：`, error);
        }
        process.exit(0);
    }

    console.log(`开始上传静态资源至 ${BUCKET_NAME} 空间！`);
    diffFile(UPLOAD_PATH, CLOUND_PATH);
});
