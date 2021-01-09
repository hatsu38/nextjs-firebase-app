import * as path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'
import { createCanvas, loadImage } from 'canvas'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const width = 600
  const height = 315
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')

  context.fillStyle = '#FFFF00'
  context.fillRect(0, 0, width, height)

  const backgroundImage = await loadImage(
    path.resolve('./images/bg_image.jpg')
  )
  context.drawImage(backgroundImage, 0, 0, width, height)

  context.font = '30px ipagp'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText('testテスト', 100, 50)


  const buffer = canvas.toBuffer()

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  })
  res.end(buffer, 'binary')
}