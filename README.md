# finnish-holidays-web

## Setup

```bash
yarn
yarn start
```

## Deploy

Install the AWS CLI by running `pip install awscli --upgrade --user`.

Add your S3 access keys to `~/.aws/credentials`.

```bash
yarn deploy
```

## Renew Let's Encrypt SSL certificate

1. Install **Certbot**: `brew install certbot`.
2. Install **AWS CLI**: `pip install awscli --upgrade --user`.
3. Add an AWS profile called `ericnishio` (in **~/.aws/credentials**). Requires write access to S3 and ACM.
4. Run `sudo scripts/certbot.sh` (this creates and imports the certificate into ACM).
5. Go to CloudFront (https://console.aws.amazon.com/cloudfront/home?region=us-east-1).
6. Select the Web distribution, and click **Edit**.
7. Under **Custom SSL Certificate**, select the new certificate.
8. Deploy the changes by hitting **Yes, Edit**.
