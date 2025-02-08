set -e

pnpm run build-ghpages

cd dist-ghpages

git init
git add -A
git commit -m "deploy"

git push -f git@github.com:loelindstrom/maxbud.git master:deploy

cd -

