resource "aws_elastic_beanstalk_application" "application" {
    name = "react"  
}

resource "aws_elastic_beanstalk_environment" "environment" {
  name                = "react-environment"
  cname_prefix        = "aappacodereact"
  application         = aws_elastic_beanstalk_application.application.name
  solution_stack_name = "64bit Amazon Linux 2023 v4.0.1 running Python 3.11"
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }
}