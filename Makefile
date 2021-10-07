all: server_build server_run web_start

build: server_build web_build

server_build:
	cd server && yarn build
	cd ..

server_run:
	cd server && start cmd /c yarn start
	cd ..

server_dev:
	cd server && start cmd /c yarn dev
	cd ..

web_build:
	start cmd /c yarn build

web_start:
	cd . && start cmd /c yarn start