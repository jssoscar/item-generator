/*
 * @Author			jishengsheng
 * @Date			2021-02-01 19:26:53
 * @Version			1.0
 * @Description
 */

const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = (relativePath) => path.resolve(appDirectory, relativePath);

gulp.task('copy', async () => {
    // 复制package.json / readme
    console.log('teessafdsafdsfsaf');
    await gulp
        .src([resolvePath('./src/package.json'), esolvePath('./src/README')])
        .pipe(resolvePath('./dist'));

    await gulp.src(resolvePath('./src/**/*.d.ts')).pipe(resolvePath('./dist'));
});

gulp.task('default', ['copy']);
