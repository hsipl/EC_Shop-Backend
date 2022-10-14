MIGRATE_CONFIG:="./migrations/dbconfig.yaml"
EC_ENV:=${EC_ENV}

migrate-up:
	@if test -z $(EC_ENV); then\
		sql-migrate up -config=$(MIGRATE_CONFIG) -env="localhost";\
	else\
		sql-migrate up -config=$(MIGRATE_CONFIG) -env=$(EC_ENV);\
	fi

migrate-down:
	@if test -z $(EC_ENV); then\
		sql-migrate down -config=$(MIGRATE_CONFIG) -env="localhost";\
	else\
		sql-migrate down -config=$(MIGRATE_CONFIG) -env=$(EC_ENV);\
	fi

proto-go:
	protoc --go_out=plugins=grpc:./ ./proto/*.proto