A CSV file with all torrent infohashes and names from thepiratebay.org on the moment of `2019-Sep-14`. 

You can conveniently browse this database on the [Github Pages of this repo](https://darksun-misc.github.io/piratebay-db-dump/) (do not open with mobile connection, it loads 200 MiB of data!)

Alrernatively, you can manually lookup the content you need by the name and download the data by inserting the infohash into your favourite torrent client like [deluge](https://github.com/deluge-torrent/deluge) (you will need to [convert the hash](https://base64.guru/converter/decode/hex) from base64 to hex).

Most editors die when I try to open this 200 MiB file, but [vim](https://github.com/vim/vim) eats it like a piece of cake.

I added a package.json, so you should be able to add this repo as npm dependency with something like this in your app package.json:
```
"dependencies": {
  "piratebay-db-dump": "git+https://github.com/darksun-misc/piratebay-db-dump.git#master",
}
```

Will possibly update this repo with more recent dumps, maybe dumps from other trackers, maybe some convenient js scripts.

Feel free to create pull requests to add any torrents you have to the `random_torrent_contributions.csv`.

(will scratch some automated duplication check testing tool if there will be many contributions at some point)



Just found a very similar project:
~~https://gitlab.com/dessalines/torrents.csv~~ https://codeberg.org/heretic/torrents-csv-data

Dunno what I should do now...
