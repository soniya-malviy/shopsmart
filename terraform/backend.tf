terraform {
  backend "s3" {
    bucket = "shopsmart-terraform-state-us"
    key    = "rubrics/terraform.tfstate"
    region = "us-east-1"
  }
}
