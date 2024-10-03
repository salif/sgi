#!/usr/bin/env -S just -f

curl := "curl -sL -o"

_:
	@just --list

download-catppuccin:
	{{ curl }} catppuccin.css \
		"https://unpkg.com/@catppuccin/palette/css/catppuccin.css"

build-demo:
	cat demo.head.html > demo.html
	pandoc -f gfm -t html5 demo.md >> demo.html
	cat demo.body.html >> demo.html

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
