# Created By Enrique Plata

SHELL = /bin/bash

include .env

.DEFAULT_GOAL := help

.PHONY: start
start: ## (Local): Start API emulator
	@ sam local start-api

.PHONY: run
run: ## (Local): Test locally
	@ sam build
	@ sam local invoke Tokenizer --event events/event.json

.PHONY: clean
clean: ## (Local): Clean Docker
	@ docker rm $(docker ps -f status=exited -q)
	@ docker rm $(docker ps -f status=created -q)
	@ docker image prune --filter="dangling=true"

.PHONY: package
package: ## (Cloud): Package code
	@ cd ./tokenization/ && docker image build -t tokenizer:latest .
	@ sam build
	@ sam package --output-template-file packaged-template.yaml \
		--region ${REGION} \
		--image-repository ${ELASTIC-CONTAINER-REGISTRY}

.PHONY: deploy
deploy: ## (Cloud): Deploy code
	@ sam deploy \
		--template-file packaged-template.yaml \
		--stack-name ${STACK-NAME} \
		--capabilities CAPABILITY_IAM \
		--region ${REGION} \
		--image-repository ${ELASTIC-CONTAINER-REGISTRY}

.PHONY: undeploy
undeploy: ## (Cloud): Deploy code
	@ aws cloudformation delete-stack --stack-name ${STACK-NAME}

help:
	@ echo "Please use \`make <target>' where <target> is one of"
	@ perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m  %-25s\033[0m %s\n", $$1, $$2}'
