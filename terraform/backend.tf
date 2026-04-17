terraform {
  backend "s3" {
    bucket = "shopsmart-terraform-soniya-bucket"
    key    = "rubrics/terraform.tfstate"
    region = "us-east-1"
  }
}
