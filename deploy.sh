zip -r "react_deploy-$1.zip" ./public ./src .babelrc .eslintrc.cjs index.html jest.config.js package-lock.json package.json pnpm-lock.yaml postcss.config.js README.md tailwind.config.js vite.config.js 

aws s3 cp "react_deploy-$1.zip" s3://reactapp

aws elasticbeanstalk create-application-version --application-name react --source-bundle S3Bucket="reactapp",S3Key="react_deploy-$1.zip" --version-label "ver-$1" --description "file permissions" --region "us-east-1"

aws elasticbeanstalk update-environment --environment-name react-environment --version-label "ver-$1" --region "us-east-1"