const template = (rendered, updates) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vapor</title>
    </head>
    <body>
        <div id="recent-news">
            ${rendered}
        </div>
        <script>
            window.__updates__ = ${JSON.stringify(updates)}
        </script>
        <script src="bundle.js"></script>
    </body>
    </html>
`
}

module.exports = template;