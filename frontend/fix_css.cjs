const fs = require('fs');

let css = fs.readFileSync('d:\\Dharmjivan-oil-mill\\frontend\\src\\styles\\user.css', 'utf-8');

// Replace :root with & for nesting context (or .storefront-root variables)
css = css.replace(/:root\s*\{/, '& {');

// Remove the import statement
css = css.replace(/@import url\('[^']+'\);\n?/, '');

// Wrap the entire CSS inside .storefront-root
const newCss = `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

.storefront-root {
${css}
}
`;

fs.writeFileSync('d:\\Dharmjivan-oil-mill\\frontend\\src\\styles\\user.css', newCss);
console.log('CSS transformed successfully!');
