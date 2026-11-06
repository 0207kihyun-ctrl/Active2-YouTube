# Active2 YouTube Test

A minimal Tizen Web app prototype for Galaxy Watch Active2 (Tizen 4.0+).

## Current test scope
- Video viewport is 16:9 by default.
- Two-finger pinch gesture zooms the video from 1x to 3x.
- Plus/minus and reset controls are included for testing.
- Loads a regular YouTube video by its 11-character video ID or standard video URL.

## Important limitations
- This is a playback feasibility prototype, not a finished YouTube client.
- YouTube may block playback in the Active2's older Tizen Web runtime. Successful build does not prove playback works.
- YouTube search and Shorts filtering are not implemented in this first test.
- A signed package and a device-specific distributor certificate are required for installation on a real Active2.
- Do not reset or unpair the watch to test this prototype.

## Build
Package as a Tizen wearable Web application (.wgt) using Tizen Studio and a Samsung wearable certificate profile.
