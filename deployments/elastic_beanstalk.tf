resource "aws_elastic_beanstalk_application" "application" {
    name = "wisewallet"  
}

resource "aws_elastic_beanstalk_environment" "environment" {
  name                = "wisewallet-environment"
  cname_prefix        = "noelsmathewwisewallet"
  application         = aws_elastic_beanstalk_application.application.name
  solution_stack_name = "64bit Amazon Linux 2023 v4.0.6 running Python 3.9"
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }
}