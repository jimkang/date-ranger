test:
	node tests/date-ranger-tests.js

pushall:
	git push origin master && npm publish
