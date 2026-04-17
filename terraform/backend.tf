terraform {
  backend "s3" {
    bucket = "shopsmart-terraform-state"
    key    = "rubrics/terraform.tfstate"
    region = "us-east-1"
  }
}