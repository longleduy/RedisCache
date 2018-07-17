import path from 'path'
import fs from 'fs'
import mime from 'mime'
export const randomKey = (value) => {
  let text = "";
  let string = `${value}ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789`;

  for (var i = 0; i < 7; i++)
    text += string.charAt(Math.floor(Math.random() * string.length));

  return text;
}
export const convertToBase64 = (fileName) => {
  let filePath = path.join('./public/images', fileName);
  let fileMime = mime.getType(filePath);
  let data = fs.readFileSync(filePath);
  let dataBase64 = `data:${fileMime};base64`
  let imgBase64 = `${dataBase64},${data.toString('base64')}`;
  return imgBase64;
}