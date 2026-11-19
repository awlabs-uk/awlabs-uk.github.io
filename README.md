# AWLabs developer website

Standalone static HTML/CSS website for https://awlabs-uk.github.io/ and Vice Guide's AdMob app-ads.txt verification. No framework, dependencies, backend, analytics, cookies, trackers or build step. The Vice Guide Flutter project is separate and unchanged.

## Files

- index.html: AWLabs homepage, featured app and support placeholder.
- vice-guide/index.html: overview, features, links and unofficial companion disclaimer.
- privacy/index.html: links to the existing policy without replacing its disclosures.
- assets/styles.css and assets/favicon.svg: responsive styling and original AWLabs vector mark.
- app-ads.txt: exact supplied publisher record, UTF-8 without BOM or trailing newline.
- .nojekyll: serve plain static files.
- tools/serve.mjs and tools/validate.mjs: optional Node.js local preview and checks, using built-in modules only.

## Before publishing - confirmation required

Ask the owner to confirm the complete record below against AdMob > Apps > View all apps > app-ads.txt > How to set up app-ads.txt. This local preparation does not confirm account ownership or the record currently displayed in AdMob. Do not publish until confirmed.

    google.com, pub-4480134787985012, DIRECT, f08c47fec0942fa0

A public support email has NOT been supplied. The homepage clearly marks its contact placeholder; replace it only with an explicitly approved public support address. No dummy email or personal contact information is included.

## Local preview and checks (PowerShell, separate commands)

    Set-Location 'E:\Development\AWLabsWebsite'

    node tools/validate.mjs

    node tools/serve.mjs

Open http://127.0.0.1:8080/ . Check /vice-guide/, /privacy/ and /app-ads.txt. Stop with Ctrl+C. Use an HTTP server rather than opening the HTML as a file because navigation uses root-relative URLs, matching the production user-site domain. No npm install required.

## GitHub Pages deployment - manual only

Target repository: https://github.com/awlabs-uk/awlabs-uk.github.io . Nothing has been committed, pushed or published by this task.

1. Confirm the publisher record and review the site. Add an approved public support email when available.
2. Inspect the remote repository before uploading, and preserve any existing files. If it already has commits, clone it into a separate directory and copy these website files into its root after reviewing differences. Do not force-push or overwrite repository history. If empty, initialise Git here on main and add the existing repository as origin only when you are ready.
3. Review git status and git diff; commit and push the reviewed files to main yourself. Do not include local credentials or .preview screenshots.
4. In the repository Settings > Pages, choose Deploy from a branch, main, /(root), and Save. Do not select /docs or add a custom domain for this setup. Enable HTTPS when available.
5. Verify https://awlabs-uk.github.io/ , https://awlabs-uk.github.io/vice-guide/ and https://awlabs-uk.github.io/privacy/ . The separate policy stays at https://awlabs-uk.github.io/vice-guide-privacy/ .
6. Verify https://awlabs-uk.github.io/app-ads.txt returns HTTP 200, Content-Type text/plain, and the exact publisher record directly without redirect or authentication. Do not use the GitHub repository URL or raw.githubusercontent.com as the developer website.

## Verify production bytes and redirects

Run after deployment in PowerShell (each command separately):

    curl.exe -I https://awlabs-uk.github.io/app-ads.txt

    curl.exe --fail --silent --show-error https://awlabs-uk.github.io/app-ads.txt

For an exact byte check without writing a file:

    node -e "(async()=>{const r=await fetch('https://awlabs-uk.github.io/app-ads.txt',{redirect:'manual'});const b=Buffer.from(await r.arrayBuffer());const e=Buffer.from('google.com, pub-4480134787985012, DIRECT, f08c47fec0942fa0');if(r.status!==200||!r.headers.get('content-type')?.startsWith('text/plain')||!b.equals(e))throw Error('Verification failed');console.log('PASS: HTTP 200, text/plain, exact bytes, no redirect');})().catch(e=>{console.error(e.message);process.exitCode=1})"

## Connect Google Play and AdMob

Set the Vice Guide Google Play developer website / store listing contact website to https://awlabs-uk.github.io/ . Keep its privacy policy URL at https://awlabs-uk.github.io/vice-guide-privacy/ . AdMob discovers app-ads.txt from the store-listed developer hostname; the website alone does not update the store listing. Store publication/review status can affect discovery.

After the site and store website link are live, inspect AdMob > Apps > View all apps > app-ads.txt and request a recheck if offered. Google notes that store-website changes can take up to 24 hours to be detected. Verification is not guaranteed until AdMob reports it. No AdMob or Play Console settings were changed here.

Official references:

- https://support.google.com/admob/answer/9363762?hl=en
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Security

Never add service-account keys, API credentials, personal contact details, .env files or signing files. The publisher ID in app-ads.txt is intentionally public, not an AdMob API credential. All public artwork here is original CSS/inline vector typography; no Rockstar images or logos are bundled. The policy link is an external existing document, not a new privacy promise.
