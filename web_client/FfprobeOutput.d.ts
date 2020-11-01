
type StaticStreamBase = {
    "codec_tag_string": "[0][0][0][0]",
    "codec_tag": "0x0000",
    "time_base": "1/1000",
    "start_time": "0.000000",
};

type VideoStreamBase = {
    "index": 0,
    "codec_name": "h264",
    "codec_long_name": "H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10",
    "profile": "High",
    "codec_type": "video",
    "codec_time_base": "1001/48000",
};

type AudioStreamBase = {
    "index": 1,
    "codec_name": "aac",
    "codec_long_name": "AAC (Advanced Audio Coding)",
    "profile": "LC",
    "codec_type": "audio",
    "codec_time_base": "1/48000",
};

type SubtitleStreamBase = {
    "index": 2,
    "codec_name": "subrip",
    "codec_long_name": "SubRip subtitle",
    "codec_type": "subtitle",
    "codec_time_base": "0/1",
};

type StreamBase = StaticStreamBase & (VideoStreamBase | AudioStreamBase | SubtitleStreamBase);

export type FfprobeOutput = {
    "format": {
        "filename": "http://localhost:36865/torrent-stream?infoHash=BA0B39DE2C19CEADCFB1B441D8B6D668E57458EF&filePath=Avatar%20-%20The%20Last%20Airbender%20(2005%20-%202008)%20%5B1080p%5D%2FBook%20Three%20-%20Fire%2FAvatar%20-%20The%20Last%20Airbender%20-%20S03E04%20-%20Sokka's%20Master.mkv",
        "nb_streams": 4,
        "nb_programs": 0,
        "format_name": "matroska,webm",
        "format_long_name": "Matroska / WebM",
        "start_time": "0.000000",
        "duration": "1475.167000",
        "size": "258821648",
        "bit_rate": "1403619",
        "probe_score": 100,
        "tags": {"COMPATIBLE_BRANDS":"isomiso2avc1mp41","MAJOR_BRAND":"isom","MINOR_VERSION":"512","ENCODER":"Lavf58.25.100"}
    },
    "streams": [
        VideoStreamBase & {
            "width": 1440,
            "height": 1080,
            "coded_width": 1440,
            "coded_height": 1088,
            "has_b_frames": 2,
            "sample_aspect_ratio": "1:1",
            "display_aspect_ratio": "4:3",
            "pix_fmt": "yuv420p",
            "level": 50,
            "chroma_location": "left",
            "field_order": "progressive",
            "refs": 1,
            "is_avc": "true",
            "nal_length_size": "4",
            "r_frame_rate": "24000/1001",
            "avg_frame_rate": "24000/1001",
            "start_pts": 0,
            "bits_per_raw_sample": "8",
            "disposition": {
                "default": 1,
                "dub": 0,
                "original": 0,
                "comment": 0,
                "lyrics": 0,
                "karaoke": 0,
                "forced": 0,
                "hearing_impaired": 0,
                "visual_impaired": 0,
                "clean_effects": 0,
                "attached_pic": 0,
                "timed_thumbnails": 0
            },
            "tags": {"HANDLER_NAME":"VideoHandler","DURATION":"00:24:35.162000000"}
        },
        AudioStreamBase & {
            "sample_fmt": "fltp",
            "sample_rate": "48000",
            "channels": 6,
            "channel_layout": "5.1",
            "bits_per_sample": 0,
            "start_pts": 0,
            "disposition": {
                "default": 1,
                "dub": 0,
                "original": 0,
                "comment": 0,
                "lyrics": 0,
                "karaoke": 0,
                "forced": 0,
                "hearing_impaired": 0,
                "visual_impaired": 0,
                "clean_effects": 0,
                "attached_pic": 0,
                "timed_thumbnails": 0
            },
            "tags": {"HANDLER_NAME":"SoundHandler","DURATION":"00:24:35.167000000"}
        },
        SubtitleStreamBase & {
            "start_pts": 0,
            "duration_ts": 1475167,
            "duration": "1475.167000",
            "disposition": {
                "default": 0,
                "dub": 0,
                "original": 0,
                "comment": 0,
                "lyrics": 0,
                "karaoke": 0,
                "forced": 0,
                "hearing_impaired": 0,
                "visual_impaired": 0,
                "clean_effects": 0,
                "attached_pic": 0,
                "timed_thumbnails": 0
            },
            "tags": {
                "language": "eng",
                "BPS": "54",
                "BPS-eng": "54",
                "DURATION-eng": "00:23:37.206000000",
                "NUMBER_OF_FRAMES": "287",
                "NUMBER_OF_FRAMES-eng": "287",
                "NUMBER_OF_BYTES": "9660",
                "NUMBER_OF_BYTES-eng": "9660",
                "_STATISTICS_WRITING_APP": "mkvmerge v8.1.0 ('Psychedelic Postcard') 64bit",
                "_STATISTICS_WRITING_APP-eng": "mkvmerge v8.1.0 ('Psychedelic Postcard') 64bit",
                "_STATISTICS_WRITING_DATE_UTC": "2018-12-31 18:19:07",
                "_STATISTICS_WRITING_DATE_UTC-eng": "2018-12-31 18:19:07",
                "_STATISTICS_TAGS": "BPS DURATION NUMBER_OF_FRAMES NUMBER_OF_BYTES",
                "_STATISTICS_TAGS-eng": "BPS DURATION NUMBER_OF_FRAMES NUMBER_OF_BYTES",
                "DURATION": "00:23:40.729000000"
            }
        },
        SubtitleStreamBase & {
            "r_frame_rate": "0/0",
            "avg_frame_rate": "0/0",
            "start_pts": 0,
            "duration_ts": 1475167,
            "duration": "1475.167000",
            "disposition": {
                "default": 0,
                "dub": 0,
                "original": 0,
                "comment": 0,
                "lyrics": 0,
                "karaoke": 0,
                "forced": 0,
                "hearing_impaired": 0,
                "visual_impaired": 0,
                "clean_effects": 0,
                "attached_pic": 0,
                "timed_thumbnails": 0
            },
            "tags": {
                "language": "eng",
                "title": "SDH",
                "BPS": "58",
                "BPS-eng": "58",
                "DURATION-eng": "00:23:47.842000000",
                "NUMBER_OF_FRAMES": "334",
                "NUMBER_OF_FRAMES-eng": "334",
                "NUMBER_OF_BYTES": "10429",
                "NUMBER_OF_BYTES-eng": "10429",
                "_STATISTICS_WRITING_APP": "mkvmerge v8.1.0 ('Psychedelic Postcard') 64bit",
                "_STATISTICS_WRITING_APP-eng": "mkvmerge v8.1.0 ('Psychedelic Postcard') 64bit",
                "_STATISTICS_WRITING_DATE_UTC": "2018-12-31 18:19:07",
                "_STATISTICS_WRITING_DATE_UTC-eng": "2018-12-31 18:19:07",
                "_STATISTICS_TAGS": "BPS DURATION NUMBER_OF_FRAMES NUMBER_OF_BYTES",
                "_STATISTICS_TAGS-eng": "BPS DURATION NUMBER_OF_FRAMES NUMBER_OF_BYTES",
                "DURATION": "00:23:51.365000000"
            }
        }
    ],
};