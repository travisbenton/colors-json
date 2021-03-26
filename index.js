const fs = require('fs')
const COLORS = require('./colors.json')

const disclaimer = `
// ============================================
// WARNING: This file has been auto-generated
// ============================================\r\r\r
`

const template = (fn, join) => Object.keys(COLORS).map(fn).join(join || '')

fs.writeFile(
	'./colors/colors.less',

	`${disclaimer}
	${template(color => `@${color}: ${COLORS[color]};\r`)}`,

	() => console.log('LESS VARIABLES DONE')
)

fs.writeFile(
	'./colors/colors.js',
	`${disclaimer}${template(color => `const ${color}= '${COLORS[color]}'`, '\r')}

export default {
	${template(color => `${color}`, ',\r\t')}
}
	`,
	() => console.log('JS VARIABLES DONE')
)