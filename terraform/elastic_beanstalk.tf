resource "aws_elastic_beanstalk_application" "application" {
    name = "nodejs-app"  
}

resource "aws_elastic_beanstalk_environment" "environment" {
  name                = "nodejs-environment"
  cname_prefix        = "chaol12wisewallet"
  application         = aws_elastic_beanstalk_application.application.name
  solution_stack_name = "64bit Amazon Linux 2023 v6.0.3 running Node.js 18"
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }
}