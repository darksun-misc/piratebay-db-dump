A CSV file with all torrent infohashes and names from thepiratebay.org on the moment of 2019-Sep-14. You can lookup the content you need by the name and download the data by inserting the infohash into your favourite torrent client like deluge (you will need to convert the hash from base64 to hex, google some online tool).

Most editors die when I try to open this 200 MiB file, but vim eats it like a piece of cake.

I added a package.json, so you should be able to add this repo as npm dependency with something like this in your app package.json:
```
"dependencies": {
  "gds-utils": "git+https://github.com/klesun/piratebay-db-dump.git#master",
}
```

Will possibly update this repo with more recent dumps, maybe dumps from other trackers, maybe some convenient js scripts.

Feel free to create pull requests to add any torrents you have to the `random_torrent_contributions.csv`.

(will scratch some automated duplication check testing tool if there will be many contributions at some point)
