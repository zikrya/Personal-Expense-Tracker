terraform {
  backend "s3" {
    bucket = "wisewallet-gaoqiangzhou" 
    key    = "core/terraform.tfstate"
    region = "us-east-2"
  }
}