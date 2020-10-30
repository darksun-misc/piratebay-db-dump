import {Dom} from "./web_client/Dom.js";

const Papa = window.Papa;

const escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");

/** @see https://stackoverflow.com/a/39460727/2750743 */
function base64ToHex(str) {
    const raw = atob(str);
    let result = '';
    for (let i = 0; i < raw.length; i++) {
        const hex = raw.charCodeAt(i).toString(16);
        result += (hex.length === 2 ? hex : '0' + hex);
    }
    return result.toUpperCase();
}

/** @param {RegExp} reg */
const getRegexIterator = function*(superstring, reg) {
    let match;
    const statefulRegex = new RegExp(reg);
    while (match = statefulRegex.exec(superstring)) {
        yield match.index;
    }
}

const parseRowAt = (csvText, index) => {
    const prevBr = csvText.lastIndexOf('\n', index);
    const start = prevBr === -1 ? 0 : prevBr + 1;
    const nextBr = csvText.indexOf('\n', index);
    const end = nextBr === -1 ? csvText.length : nextBr;

    const line = csvText.slice(start, end);
    if (line.trim() === '') {
        return null;
    }

    const parsed = Papa.parse(line, {delimiter: ';'});
    const valuesTuple = parsed.data[0];

    return valuesTuple;
};

const gui = {
    statusPanel: document.getElementById('status-panel'),
    searchForm: document.forms[0],
    matchedEntriesList: document.getElementById('matched-entries-list'),
    responsiveEntriesList: document.getElementById('responsive-entries-list'),
};

let bytesLoaded = 0;
const csvFetchStartMs = Date.now();
const trackBytesLoaded = rs => {
    const reader = rs.body.getReader();
    const stream = new ReadableStream({
        start(controller) {
            const pump = () => {
                return reader.read().then(({ done, value }) => {
                    if (done) {
                        controller.close();
                    } else {
                        bytesLoaded += value.length;
                        gui.statusPanel.textContent = 'Bytes Loaded: ' + (bytesLoaded / 1024 / 1024).toFixed(3) + ' MiB / ~200 MiB in ' + (Date.now() - csvFetchStartMs) + ' ms';
                        controller.enqueue(value);
                        return pump();
                    }
                });
            };
            return pump();
        },
    });
    return new Response(stream);
};

const OFFENSIVE_REGEXES = [
    'fuck', 'fucks', 'fucked', 'fucker', 'cum', 'cums', 'nude', 'nudes', 'pussy', 'pussies', 'playboy', 'sex', 'XXX', 'anal', 'rape', 'raped', 'rapes',
    'glory hole', 'gloryHole', 'porn', 'porns', 'uncensored', 'penis', 'penises', 'dick', 'dicks', 'cock', 'dildo', 'erotic',
    /*'hentai', moshiboroshihujoshi titles would not offend anyone I think*/
].flatMap(word => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    const anyCaseRegex = new RegExp('\\b' + escapeRegex(word) + '\\b', 'i');
    const capitalizedRegex = new RegExp('([a-z0-9_]|\\b)' + escapeRegex(capitalized) + '([A-Z0-9_]|\\b)');
    return [anyCaseRegex, capitalizedRegex];
});

const isOffensive = (torrentName) => {
    return OFFENSIVE_REGEXES.some(regex => torrentName.match(regex));
};

gui.statusPanel.textContent = 'Retrieving CSV (~200 MiB)...\n';

const urlToCsvTextPromise = url => fetch(url)
    .then(trackBytesLoaded)
    .then(rs => rs.text());

const halfPromise = urlToCsvTextPromise('./piratebay_db_dump_2015_10_27T04_10_50_to_2019_09_14T22_09_31.csv');
const secondPromise = halfPromise.then(() => urlToCsvTextPromise('./piratebay_db_dump_2004_03_25T22_03_00_to_2015_10_27T04_10_22.csv'));

const csvTextPromises = [
    urlToCsvTextPromise('./random_torrent_contributions.csv'),
    halfPromise,
    secondPromise,
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_2.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_8.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_9.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_10.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_11.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_18.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_19.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_20.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_22.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_23.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_24.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_25.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_26.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_28.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_29.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_31.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_33.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_34.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_35.csv',)),
    secondPromise.then(() => urlToCsvTextPromise('./rutracker_2020_09_27/category_37.csv',)),
];

// could potentially allow searching without waiting for full data
// to load... will need to integrate with ReadableStream more tightly then

const fetchedCsvTexts = [];
csvTextPromises.forEach(promise => promise.then(csvText => {
    document.body.classList.toggle('results-outdated', true);
    fetchedCsvTexts.push(csvText);
}));

const findRecordsByRegex = function*({csvText, regex}) {
    const colsBr = csvText.indexOf('\n');
    const indexesIter = getRegexIterator(csvText, regex);

    for (const index of indexesIter) {
        const valuesTuple = parseRowAt(csvText, index + 1);
        if (!valuesTuple) {
            continue; // empty lines in CSV, trailing line break for example
        }
        if (index < colsBr) {
            continue; // column headers matched the pattern
        }
        const [addedDt, infohashBase64, name, size] = valuesTuple;
        const infoHash = base64ToHex(infohashBase64);
        yield {addedDt, infoHash, name, size};
    }
};

const updateTable = ({csvText, tbody, maxEntries, regex, namePred}) => {
    const matchedRecords = [];

    for (const record of findRecordsByRegex({csvText, regex})) {
        const {addedDt, infoHash, name, size} = record;
        if (!namePred(name)) {
            continue;
        }
        matchedRecords.push(record);

        const statusHolder = Dom('div', {
            class: 'status-holder',
            style: 'font-size: 12px',
        });

        const tr = Dom('tr', {
            class: 'torrent-item-row',
            'data-info-hash': infoHash,
        }, [
            Dom('td', {'data-name': 'addedDt'}, addedDt),
            Dom('td', {'data-name': 'infohash'}, [
                Dom('a', {'href': 'magnet:?xt=urn:btih:' + infoHash}, [
                    Dom('span', {}, '🧲 '),
                ]),
                Dom('a', {'href': 'magnet:?xt=urn:btih:' + infoHash}, [
                    Dom('span', {class: 'info-hash-text'}, infoHash),
                ]),
            ]),
            // would be nice to highlight the part of text that was matched
            Dom('td', {'data-name': 'name'}, name),
            Dom('td', {'data-name': 'size'}, (size / 1024 / 1024).toFixed(3) + ' MiB'),
            Dom('td', {'data-name': 'status'}, [statusHolder]),
            // TODO: add here "Watch" button that redirects to the respective kunkka-torrent page
        ]);
        tbody.appendChild(tr);
        if (matchedRecords.length >= maxEntries) {
            break;
        }
    }

    return {matchedRecords};
};

const prepareUpdateParams = (csvText, totalMatchesFound) => {
    const tbody = gui.matchedEntriesList;
    const nameSubstring = gui.searchForm['nameSubstring'].value.trim();
    const totalMaxEntries = +gui.searchForm['maxEntriesPerPage'].value;

    if (nameSubstring) {
        document.body.classList.toggle('first-search-submitted', true);
        document.body.classList.toggle('results-outdated', false);
    }

    const regSrc = nameSubstring
        ? gui.searchForm['useRegex'].checked
            ? nameSubstring
            : nameSubstring.split(' ')
                .map(escapeRegex)
                .join('[\ \_\.]')
        : '\\n';
    let regex;
    try {
        regex = new RegExp(regSrc, 'ig');
    } catch (exc) {
        alert('Invalid regex format - ' + exc);
        throw exc;
    }
    const maxEntries = totalMaxEntries - totalMatchesFound;
    const namePred = name => {
        // ignore if text search matched the hex string
        const matchedWrongValue = nameSubstring && !name.match(regex);
        const hideAsOffensive = gui.searchForm['hideOffensiveFlag'].checked && isOffensive(name);
        return !matchedWrongValue && !hideAsOffensive;
    };
    return {
        csvText, tbody, maxEntries, regex, namePred,
    };
};

halfPromise.then(async firstCsvText => {
    const tbody = gui.matchedEntriesList;
    gui.searchForm.onsubmit = (evt) => {
        evt.preventDefault();
        tbody.innerHTML = '';
        gui.responsiveEntriesList.innerHTML = '';
        let totalMatchesFound = 0;
        for (const csvText of fetchedCsvTexts) {
            const params = prepareUpdateParams(csvText, totalMatchesFound);
            const {matchedRecords} = updateTable(params);
            if (matchedRecords.length > 0) {
                scanInfoHashStatus(matchedRecords.map(r => r.infoHash));
            }
            totalMatchesFound += matchedRecords.length;
            if (matchedRecords >= params.maxEntries) {
                break;
            }
        }
        gui.statusPanel.textContent = 'Found ' + totalMatchesFound + ' matches\n';
    };
    // gosh, so much porn, make sure to never allow user to enter less than 3 characters long query
    // upd.: added bad words filtering, results seem to be more or less ok now
    // nameSubstring = nameSubstring.length >= 3 ? nameSubstring : '264';
    const params = prepareUpdateParams(firstCsvText, 0);
    updateTable(params);
});

const searchInput = gui.searchForm['nameSubstring'];
const checkRegexSyntax = () => {
    if (gui.searchForm['useRegex'].checked) {
        try {
            let regex = new RegExp(searchInput.value);
            'some random text'.match(regex);
            searchInput.setCustomValidity(''); // valid
            searchInput.title = '';
        } catch (exc) {
            let error = exc + '';
            searchInput.setCustomValidity(error); // invalid
            searchInput.title = error;
        }
    } else {
        searchInput.setCustomValidity('');
    }
};

const addStatusInfo = (tr, statusInfo) => {
    if (statusInfo.status !== 'TIMEOUT') {
        tr.remove();
        gui.responsiveEntriesList.appendChild(tr);
    }
    const statusHolder = tr.querySelector('.status-holder');

    statusHolder.innerHTML = '';
    const seconds = (statusInfo.msWaited / 1000).toFixed(2) + 's';
    if (statusInfo.status === 'META_AVAILABLE') {
        const data = statusInfo.metaInfo;
        const filesList = Dom('div', {}, [
            Dom('span', {}, seconds),
            Dom('span', {}, 'Show Files:'),
            Dom('input', {type: 'checkbox', class: 'hide-following-flag'}),
            Dom('table', {}, [
                Dom('thead', {}, [
                    Dom('tr', {}, [
                        Dom('th', {}, data.name),
                        Dom('th', {}, data.length),
                    ]),
                ]),
                Dom('tbody', {}, data.files.map(f => Dom('tr', {}, [
                    Dom('td', {}, f.path),
                    Dom('td', {}, f.length),
                ]))),
            ]),
        ]);
        statusHolder.appendChild(filesList);
    } else if (statusInfo.status === 'TIMEOUT') {
        const errorBlock = Dom('span', {}, seconds + ' no response');
        statusHolder.appendChild(errorBlock);
    } else {
        const errorBlock = Dom('span', {}, JSON.stringify(statusInfo));
        statusHolder.appendChild(errorBlock);
    }
};

let scanInfoHashStatus = (infoHashes) => {};
const initSocket = (socketIo) => {
    socketIo.on('connect', () => {
        scanInfoHashStatus = infoHashes => socketIo
            .send({messageType: 'SCAN_INFO_HASH_STATUS', infoHashes}, (response) => {
                if (response.status !== 'SCANNING_STARTED') {
                    console.error('Failed start scanning of infohash', response);
                }
            });
    });
    socketIo.on('message', (data, reply) => {
        if (data.messageType === 'INFO_HASH_STATUS') {
            [...document.querySelectorAll('.torrent-item-row[data-info-hash="' + data.messageData.infoHash + '"]')]
                .forEach(tr => addStatusInfo(tr, data.messageData));
            // no reply, cuz server is not requesting it
        } else {
            console.log('Unexpected message from server', data);
            reply({status: 'UNEXPECTED_MESSAGE_TYPE'});
        }
    });
    socketIo.on('error', (exc) => {
        console.error('Failed to initialize socket.io', exc);
    });
};

const main = () => {
    searchInput.addEventListener('input', checkRegexSyntax);
    gui.searchForm['useRegex'].addEventListener('change', checkRegexSyntax);
    gui.searchForm['hideUnresponsiveFlag'].onchange = () => {
        document.body.classList.toggle('hide-unresponsive', gui.searchForm['hideUnresponsiveFlag'].checked);
    };
    gui.searchForm['hideUnresponsiveFlag'].onchange();

    window.onSocketIoLoaded = (SocketIo) => {
        const socketIo = SocketIo('https://kunkka-torrent.online', {transport: ['websocket']});
        initSocket(socketIo);
    };
};

main();