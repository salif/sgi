#!/usr/bin/env -S just -f

_:
	@just --list

minify:
	terser script.src.js -o script.min.js

[confirm]
gh-pages:
	git add script.min.js
	git diff --cached --quiet
	git push
