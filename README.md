# serverless-lambda-puppeteer

This is a demo on running Puppeteer on AWS Lambda using Serverless framework.
To get it running in your local serverless-offline environment
```
yarn install
yarn serverless
```
It will be running on http://localhost:3003/dev/puppeteer/pdf

To deploy to your AWS environment, you need to have your AWS account credentials stored properly, ie run `aws configure` and replace the profile name in `serverless.yml`.

To deploy you will need to run
```
yarn sls deploy
```

In my setup, it will be serving at `https://labs.mianio.com/demo/puppeteer/pdf`. Note that you must send a GET request with `Accept: 'application/pdf'` header for API Gateway to respond properly.

Original Github repository
https://github.com/crespowang/serverless-lambda-puppeteer

Blog text of the author
https://medium.com/swlh/how-to-create-pdf-in-lambda-using-puppeteer-6355348b8a82?
