zip -r "react_deploy-$1.zip" ./public ./src .babelrc .eslintrc.cjs index.html jest.config.cjs package-lock.json package.json pnpm-lock.yaml postcss.config.js README.md tailwind.config.js vite.config.js 

aws s3 cp "react_deploy-$1.zip" s3://aappacode-wisewallet

aws elasticbeanstalk create-application-version --application-name react --source-bundle S3Bucket="aappacode-wisewallet",S3Key="react_deploy-$1.zip" --version-label "versionOne-$1" --description "assignment 3 deployment" --region "us-east-1"

aws elasticbeanstalk update-environment --environment-name react-environment --version-label "versionOne-$1" --region "us-east-1"