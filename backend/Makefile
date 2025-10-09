include .env
export $(shell sed 's/=.*//' .env)
POSTGRES_CONTAINER ?= postgres


up:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose down
	docker-compose up -d

psql:
	docker exec -it solar_database psql -U $(POSTGRES_USER) -d $(POSTGRES_DB)