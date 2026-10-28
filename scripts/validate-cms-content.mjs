import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'))
const home = readJson('src/content/home.json')
const pages = readJson('src/data/pages.json')
const catalog = readJson('src/data/catalog.json')
const postDir = 'src/content/posts'
const postFiles = readdirSync(postDir).filter((file) => file.endsWith('.json'))
const fail = (message) => { throw new Error(`CMS content: ${message}`) }

function checkText(value, path) {
  if (typeof value !== 'string' || !value.trim()) fail(`${path} must contain text`)
}

function checkSection(value, path) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(`${path} must be an object`)
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === 'object') checkSection(item, `${path}.${key}`)
    else checkText(item, `${path}.${key}`)
  }
}

for (const key of ['announcement', 'hero', 'categories', 'arrivals', 'story', 'work', 'showroom', 'journal']) {
  if (!(key in home)) fail(`homepage is missing ${key}`)
}
checkSection(home, 'homepage')

const paths = new Set([
  '/', '/shop/', '/the-collection/', '/quote/', '/my-account-3/', '/request-a-catalogue/',
  '/contact/', '/business-enquiries/', '/business-partnerships/', '/franchise-interest/', '/franchise-shops/',
  ...pages.map((page) => page.path),
  ...catalog.products.map((product) => product.path),
  ...catalog.categories.map((category) => category.path),
])

for (const file of postFiles) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.json$/.test(file)) fail(`invalid post filename ${file}`)
  const path = `/${file.slice(0, -5)}/`
  if (paths.has(path)) fail(`post route conflicts with an existing page: ${path}`)
  paths.add(path)
  const post = readJson(join(postDir, file))
  checkText(post.title, `${file}.title`)
  checkText(post.content, `${file}.content`)
  if (post.date && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(post.date)) fail(`${file}.date has an invalid format`)
}

for (const card of [home.journal.first, home.journal.second]) {
  if (!paths.has(card.path)) fail(`journal card links to an unknown page: ${card.path}`)
  if (!card.image.startsWith('/media/') || card.image.includes('..') || card.image.includes('\\')) fail(`invalid journal image path: ${card.image}`)
  if (!existsSync(join('public', card.image.slice(1)))) fail(`journal image is missing: ${card.image}`)
}

console.log(`CMS content valid: homepage and ${postFiles.length} posts`)
