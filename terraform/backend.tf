terraform {
  backend "s3" {
    bucket = "terraform-state-wise-wallet-zikrya"
    key    = "terraform.tfstate"
    region = "us-east-2"
  }
}