terraform {
  backend "s3" {
    bucket = "terraform-state-wisewallet-aappacode" 
    key    = "core/terraform.tfstate"
    region = "us-east-1"
  }
}