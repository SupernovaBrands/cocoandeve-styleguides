# CE Style Guides

Here we have all the CORE, COMPONENTS, COMPOUND, SECTIONS and TEMPLATE scss-code organized in the same waas is done on the Shopify repo.

In addition to the SCSS we also save the HTML for each of them.

Development of a new CORE, COMPONENTS, COMPOUND, SECTIONS and TEMPLATE must always start from here.

Once the HTML and SCSS is fine a works well, code is integrate in Shopify repo with liquid.

URL for viewing HTML in browser: https://supernovabrands.github.io/cocoandeve-styleguides/

## Setup
1. Run `npm install` to install dependencies
2. Run `npm start` to start gulp server and watch files

## HTML
__DO NOT__ modify any html files, these will be generated from their `.hbs`, including `index.html`.

Only modify files in `src/docs` and `src/partials`.

See the [Handlebars Helpers](#handlebars-helpers) below for custom helpers
- `src/partials` is the components or sections. Similar to Shopify theme snippets.
- `src/docs` is the pages. Similar to Shopify theme templates.

## Critical CSS
Run `npm run critical` after building the files.
The critical css will be created from html in `dist/templates/` folder and outputed in `dist/critical/` folder.

## Images
Can use https://placeholder.com/ for placeholder images. i.e:
- 150x150: `https://via.placeholder.com/150`
- 375x223 jpg: `https://via.placeholder.com/375x223.jpg`
- 30x30 png: `https://via.placeholder.com/30.png`

## Font Icon
1. Optimize SVG using this online tool: https://jakearchibald.github.io/svgomg/
2. Put Optimizes SVG in `fonts/svgs`
3. Run `npm run buildfont` to build the font icon

## Handlebars Helpers
- `times`: index start with 1. Have 3 data: `@first` (boolean), `@last` (boolean),  `@index` (integer)
	```
	{{#times 5}}
		{{#if @first}}
			first
		{{else if @last}}
			last
		{{else}}
			{{@index}}
		{{/if}}
	{{/times}}
	```
	compiles to
	```
	first
	2
	3
	4
	last
	```
- `eq`: equation (`===`) function for if block. Returns boolean.
	```
	{{#if (eq 'equal' 'equal')}} equal {{else}} not equal {{/if}}
	{{#if (eq '1' 1)}} equal {{else}} not equal {{/if}}
	```
	compiles to
	```
	equal
	not equal
	```
