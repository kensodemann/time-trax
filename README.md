# TimeTrax

[![Build Status][travis-badge]][travis-badge-url]

## Deploying to Github Pages

Build, then deploy:

- `ng build --prod --base-href "/time-trax/"`
- `cp dist/index.html dist/404.html`
- `ngh --message='chore: deploy version x.y.z'`

For more information, see [angular-cli-ghpages](https://github.com/angular-buch/angular-cli-ghpages) 


[travis-badge]: https://travis-ci.org/kensodemann/time-trax.svg?branch=master
[travis-badge-url]: https://travis-ci.org/kensodemann/time-trax
