zip -r "wisewallet_deploy-$1.zip" ./wisewallet ./.ebextensions wsgi.py setup.py setup.cfg requirements.txt wisewallet.cfg celery_worker.py

aws s3 cp "wisewallet_deploy-$1.zip" s3://terraform-start-wisewallet-noelsmathew

aws elasticbeanstalk create-application-version --application-name wisewallet --source-bundle S3Bucket="terraform-start-wisewallet-noelsmathew",S3Key="core/terraform.tfstate" --version-label "ver-$1" --description "file permissions" --region "us-east-2"

aws elasticbeanstalk update-environment --environment-name wisewallet-environment --version-label "ver-$1" --region "us-east-2"