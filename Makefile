.PHONY: install help version help-all

install:
	npm ci

help:
	node bin/gendiff.js -h

version:
	node bin/gendiff.js -V

help-all:
	@echo "📋 Доступные команды:"
	@echo "  make install  - Установить зависимости (npm ci)"
	@echo "  make help     - Показать справку gendiff"
	@echo "  make version  - Показать версию gendiff"