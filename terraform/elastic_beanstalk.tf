resource "aws_elastic_beanstalk_application" "application" {
    name = "wisewallet"  
}

resource "aws_elastic_beanstalk_environment" "environment" {
  name                = "wisewallet-environment"
  cname_prefix        = "gaoqiangzhouwisewallet"
  application         = aws_elastic_beanstalk_application.application.name
  solution_stack_name = "64bit Amazon Linux 2 v5.8.8 running Node.js 18"
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }
}