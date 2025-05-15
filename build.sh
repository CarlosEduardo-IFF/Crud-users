ECR_REGISTRY="237487375715.dkr.ecr.us-east-1.amazonaws.com"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REGISTRY
docker build -t crud_repository .
docker tag crud_repository:latest $ECR_REGISTRY/crud_repository:latest
docker push $ECR_REGISTRY/crud_repository:latest