import cloudinary
import cloudinary.uploader
import os

# Configuration from the .env found in chatbot-api
cloudinary.config(
  cloud_name = "duobzi17g",
  api_key = "555537582916689",
  api_secret = "hzyCwfl-hHEzLzTZK18WTBQCO5s",
  secure = True
)

# Path to the resume
resume_path = r"c:\Users\91800\Desktop\portfolio_website2\resume\Raghav_Ramani_Resume_v8.pdf"

try:
    print(f"Uploading {resume_path} to Cloudinary...")
    upload_result = cloudinary.uploader.upload(
        resume_path,
        folder="resumes",
        resource_type="raw"
    )
    url = upload_result['secure_url']
    print(f"Success! URL: {url}")
    with open("resume_url.txt", "w") as f:
        f.write(url)
except Exception as e:
    print(f"Error during upload: {e}")
