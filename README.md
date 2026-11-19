# AWLabs developer website

A lightweight, responsive website for AWLabs and Vice Guide, built with plain HTML and CSS. No installation or build step is required.

## Pages

- Home: developer introduction, featured app and support information.
- Vice Guide: app overview, features and download link.
- Privacy: link to the app's existing published privacy policy.

Shared styles and the original vector favicon are in assets/. The root app-ads.txt file supports advertising verification and must remain publicly accessible.

## Local development

From the project directory, run:

    node tools/validate.mjs

    node tools/serve.mjs

Then open http://127.0.0.1:8080/ . Stop the server with Ctrl+C.

## GitHub Pages

Publish from main at /(root) in the repository's Settings > Pages. The .nojekyll file enables plain static serving. Check the homepage, subpages and root app-ads.txt after deployment.

The public support email remains a clearly marked placeholder until an approved address is supplied. Never commit private credentials, keys or personal contact information.
