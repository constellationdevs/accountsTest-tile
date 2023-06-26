# Getting Started: Account Aggregator Test Tile

This tile allows you to visually see all accounts for a member - when testing your Account Aggregator Connector

- You can use it to see which accounts are being returned for you user by the core, as well as the json data structure for those accounts.

## How to deploy

1. Ensure that the script and link tags in the index.html file between `<!-- LOCAL DEVELOPMENT ONLY -->` are removed or commented out before deploying the tile

2. Upload the following files to the tile project in the portal:
- tile.js
- jsonview.js
- index.html
- tilestrings-en.json
- tileicon.png
- tile.less

3. Make sure to add your new tile to the authenticated group via the "Add to Test CU's" button.

4. Now all you have to do is login as a test member and open the tile. You should see a list of accounts that member has access to. Click on an account to see the json object.
