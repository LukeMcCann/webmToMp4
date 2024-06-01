# Webm To MP4

Webm is not widely supported by Apple products. Thus, if we are to allow users to upload
Webm files the responsibility of displaying them should be on us. In this case, we should
convert the Webm file for the user to a format which can be displayed on all browsers.

We can do this using the ffmpeg library.

This is an experimental POC script which can be run via: `node index.js ./testData/output.webm ./output`

be sure to pull the repository and run a `node install` first, personally I prefer yarn so use `yarn install`
