import middy from "middy"
import chromium from "chrome-aws-lambda"
import puppeteer from "puppeteer-core"
import {
  cors,
  doNotWaitForEmptyEventLoop,
  httpHeaderNormalizer,
  httpErrorHandler
} from "middy/middlewares"

const handler = async (event: any) => {
  const executablePath = event.isOffline
    ? "node_modules/puppeteer/.local-chromium/linux-674921/chrome-linux/chrome"
    : await chromium.executablePath

  const browser = await puppeteer.launch({
    args: [
        ...chromium.args,
        '--no-sandbox',
        '--single-process',
    ],
    executablePath
  })

  const page = await browser.newPage()

  await page.goto(event.queryStringParameters.reportUrl, {
    waitUntil: ["networkidle0", "load", "domcontentloaded"]
  })

  const pdfStream = await page.pdf()
  await browser.close()

  return {
    statusCode: 200,
    isBase64Encoded: true,
    headers: {
      "Content-type": "application/pdf"
    },
    body: pdfStream.toString("base64")
  }
}

export const generate = middy(handler)
  .use(httpHeaderNormalizer())
  .use(cors())
  .use(doNotWaitForEmptyEventLoop())
  .use(httpErrorHandler())
