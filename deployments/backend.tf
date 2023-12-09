terraform {
  backend "s3" {
    bucket = "terraform-start-wisewallet-noelsmathew" 
    key    = "core/terraform.tfstate"
    region = "us-east-2"
  }
}