/*
 * @Author			jssoscar
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
    await gulp
        .src([resolvePath('./src/package.json'), resolvePath('./src/README.md')])
        .pipe(gulp.dest(resolvePath('./dist')));

    // copy所有d.ts文件
    await gulp.src(resolvePath('./src/**/*.d.ts')).pipe(gulp.dest(resolvePath('./dist')));
});
