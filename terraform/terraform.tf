terraform {
  backend "s3" {
    bucket = "terraform-state-wisewallet-chaol12" 
    key    = "core/terraform.tfstate"
    region = "us-east-2"
  }
}