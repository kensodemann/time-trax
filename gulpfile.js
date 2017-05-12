var gulp = require('gulp');
var gutil = require('gulp-util');
var git = require('gulp-git');

gulp.task('checkReleaseParams', function() {
  if (!gutil.env.type) {
    console.error('You must specify a type of release [major, minor, patch]');
    console.error('Example: gulp release --type=patch');
    process.exit(1);
  }

  if ((gutil.env.type !== 'major' && gutil.env.type !== 'minor' && gutil.env.type !== 'patch')) {
    console.error('release type must be "major", "minor", or "patch"');
    process.exit(1);
  }
});

var nextVersion;
gulp.task('generateNextVersion', ['checkReleaseParams'], function() {
  var fs = require('fs');
  var semver = require('semver');
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  nextVersion = semver.inc(pkg.version, gutil.env.type);
});

gulp.task('bumpVersion', ['generateNextVersion'], function() {
  var bump = require('gulp-bump');
  return gulp.src('./package.json')
    .pipe(bump({ version: nextVersion }))
    .pipe(gulp.dest('./'));
});

gulp.task('updateVersionFile', ['generateNextVersion'], function() {
  var jeditor = require('gulp-json-editor');
  var adjNoun = require('adj-noun');
  var moment = require('moment');
  adjNoun.seed(moment().valueOf());
  return gulp.src('./src/assets/version.json')
    .pipe(jeditor({
      'id': nextVersion,
      'name': adjNoun().join(' '),
      'date': moment().format('YYYY-MM-DD')
    }))
    .pipe(gulp.dest('./src/assets'));
});

gulp.task('generateChangelog', ['bumpVersion'], function() {
  var conventionalChangelog = require('gulp-conventional-changelog');
  return gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('commitRelease', ['generateChangelog', 'updateVersionFile'], function() {
  return gulp.src(['./CHANGELOG.md', './package.json', './src/assets/version.json'])
    .pipe(git.add())
    .pipe(git.commit('chore: release version ' + nextVersion));
});

gulp.task('tagRelease', ['commitRelease'], function() {
  git.tag(nextVersion, '', function(err) {
    if (err) throw err;
  });
});

// End user tasks
gulp.task('release', ['tagRelease']);
