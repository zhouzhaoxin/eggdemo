start:
	sudo docker-compose up -d
	sudo docker execute deploy_weba_1 npm run docker-start
	sudo docker execute deploy_webb_1 npm run docker-start
stop:
	sudo docker-compose stop
fullstart:
	sudo docker-compose up -d --build
	sudo docker execute deploy_weba_1 npm run docker-start
	sudo docker execute deploy_webb_1 npm run docker-start
