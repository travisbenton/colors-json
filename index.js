const fs = require('fs')
const COLORS = require('./colors.json')

const disclaimer = `
// =================================================================================================
//
//       WARNING: This file has been auto-generated. Update colors in color.json file instead
//
// =================================================================================================\r\r\r
`
const template = (fn, join) => Object.keys(COLORS).map(fn).join(join || '')
const lessTemplate = `${disclaimer}${template(color => `@${color}: #${COLORS[color]};\n`)}`
const jsTemplate = `${disclaimer}${template(color => `const ${color} = '#${COLORS[color]}'`, '\n')}\n\nexport default {\n\xa0\xa0${template(color => `${color}`, ',\n\xa0\xa0')}\n}`

// regex to weed out any non-hex color values in colors.json file
const badColors = Object.keys(COLORS).filter(key => !COLORS[key].match(/^[0-9a-f]{3,6}$/i))

if (badColors.length) {
  console.log('ERROR: INVALID HEX CODE FOUND. PLEASE CHECK THE FOLLOWING DEFINITIONS');
  console.log(badColors.map(key => `"${key}": "${COLORS[key]}"`).join(', '));
} else {
  fs.writeFile('./colors/colors.less', lessTemplate, () => console.log('.less file compiled succesfully'))
  fs.writeFile('./colors/colors.js', jsTemplate, () => console.log('.js file compiled succesfully'))
}
