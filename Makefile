dist: 
	rm -rf dist
	mkdir dist
	jspm bundle-sfx app.js dist/bundle.js
	./node_modules/.bin/html-dist index.html --remove-all --minify --insert bundle.js -o dist/index.html

.PHONY: dist
