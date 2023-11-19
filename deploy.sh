zip -r "wisewallet_deploy-$1.zip" ./public ./src .eslintrc.cjs index.html package-lock.json package.json pnpm-lock.yaml postcss.config.js tailwind.config.js vite.config.js

aws s3 cp "wisewallet-gaoqiangzhou-$1.zip" s3://wisewalletapp

aws elasticbeanstalk create-application-version --application-name wisewallet --source-bundle S3Bucket="wisewallet-gaoqiangzhou",S3Key="wisewallet-gaoqiangzhou-$1.zip" --version-label "ver-$1" --description "file permissions" --region "us-east-2"

aws elasticbeanstalk update-environment --environment-name wisewallet-environment --version-label "ver-$1" --region "us-east-2"