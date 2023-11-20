terraform {
  backend "s3" {
    bucket = "terraform-state-wisewallet-chaol12" 
    region = "us-east-2"
  }
}