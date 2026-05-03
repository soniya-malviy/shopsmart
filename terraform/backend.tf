terraform {
  backend "s3" {
    bucket = "finalsubmissionbucket"
    key    = "rubrics/terraform.tfstate"
    region = "us-east-1"
  }
}
