#!/usr/bin/env -S just -f

_:
	@just --list

minify-js:
	terser sgi.js -o sgi.min.js

minify-css:
	cleancss -o sgi.min.css sgi.css

minify: minify-js minify-css

[confirm]
gh-pages:
	git add sgi.min.js sgi.min.css
	git diff --cached --quiet
	git push
