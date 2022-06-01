install: install-deps

install-deps:
	npm ci

test:
	npm test

watch:
	npm test -- --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish