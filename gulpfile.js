const { src, dest, series, watch } = require('gulp')
const del = require('del')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const plugins = require('gulp-load-plugins')()

//压缩js uglify js
function js(cb) {
    src('js/*.js')
        //下一个处理环节
        .pipe(plugins.uglify())
        .pipe(dest('./dist/js'))
        .pipe(reload({ stream: true }))
    cb()
}

function css(cb) {
    src('css/*.scss')
        .pipe(plugins.sass({ outputStyle: 'compressed' }))
        .pipe(
            plugins.autoprefixer({
                cascade: false,
                remove: false,
            })
        )
        .pipe(dest('./dist/css'))
        .pipe(reload({ stream: true }))
    cb()
}

function watcher(cb) {
    watch('js/*.js', js)
    watch('css/*.scss', css)
    cb()
}

function clean(cb) {
    del('./dist')
    cb()
}

function serve(cb) {
    browserSync.init({
        server: {
            baseDir: './',
        },
    })
    cb()
}

exports.scripts = js
exports.clean = clean
exports.styles = css
exports.default = series([clean, js, css, serve, watcher])
