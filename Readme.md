# Simple S3 Uploader
_Minimalist and basic application used for uploading various file types to your S3 bucket._

Two features are available for upload:

- Select your files
- Drag and drop your files (hidden in tablet and mobile view)

>❗️ The number of files for upload is limited to 20; however, can be changed.

## Requirements
- AWS Account
- S3 Bucket
- IAM User dedicated to the project

## Implementation
### Part 1 - Project Cloning & User Creation
1. Clone the project to your local device with the code below:
`git clone https://github.com/kkeles/simple-s3-uploader`
2. Find policies folder in the project and copy everything in _userUploadPolicy-v1.json_ file
3. Navigate to your AWS console. Head to IAM &rarr; Access Management &rarr; Policies &rarr; Create Policy
<br> Select JSON for Policy Editor, delete everything and paste the policy you copied earlier from _userUploadPolicy-v1.json_ file. Name the new policy as you like.
4. Access Management &rarr; Users &rarr; Create User. Name the user as you like,  with no console access. <br>Select "Attach Policies Directly" at permission options. Find and select the policy you created in previous step. Create the user.
5. Select the new user in your Users dashboard. Navigate to "Security credentials". Create access key, select "Local code" option and acknowledge the recommendation. Either download securely, or save _accessKeyId_ & _secretAccessKey_ to a safe credential management tool (1password, Dashlane etc). At Summary part, also find the _ARN_ of your user and save it together with previous credentials.

### Part 2 - S3 Bucket Creation
1. At AWS Console, navigate to S3 &rarr; Create bucket. Give a unique name to your bucket. Note the bucket name and the AWS region selected. Don't enable ACLs and block all public access. Leave everything else in default setting.
2. Select your new bucket. Head to Permissions column. Edit the Bucket Policy of your S3 Bucket. In project, at policies folder you will find _s3BucketPolicy.json_ file. Copy the entire JSON policy and paste to your bucket policy. 
<br> - Replace **YOUR\_USER\_ARN_HERE** text with USER_ARN you saved in previous step.
<br> - Replace **YOUR\_S3\_BUCKET\_NAME\_HERE** text with the unique name you gave to your S3 bucket. Make sure your S3 bucket name is followed with  **/*** in the end.
3. Edit your Cross-origin resource sharing (CORS) policy. In project, at policies folder you will find _s3CORSPolicy.json_ file. Copy the entire JSON policy and paste to your CORS policy.

### Part 3 - Project Authentication
In your project, find _awsConfig.js_ file in js folder. The content should be similar to this:
```javascript
	AWS.config.update({
	region: "YOUR_REGION_HERE",
	accessKeyId: "YOUR_ACCESS_KEY_HERE",
	secretAccessKey: "YOUR_SECRET_ACCESS_KEY_HERE"
	});
```
- Declare the region you selected when you created your S3 bucket (eu-west-1, us-east-1, eu-central-1 etc.).
- Type _accessKeyId_ and _secretAccessKey_ noted earlier.

>❗️ Never share your credentials outside your local device. Don't push it to your repository or don't publish in another source.

### Final Part - Usage
You can run index.html in your preferred web browser.
<br>This version of the project is intended for local use with simplified context.
<br>For bugs, questions and recommendations feel free to reach out to me at kkelesh@gmail.com



