resource "aws_s3_bucket" "vite_app_files" {
  bucket = "my-vite-app-files-${random_id.bucket_suffix.hex}"
  acl    = "private"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "GET"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  versioning {
    enabled = true
  }
}

resource "random_id" "bucket_suffix" {
  byte_length = 2
}