const path = require('node:path');
const fs = require('node:fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const process = require('process');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const ensureDirectoryExists = (filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const MAIN = async () => {
  try {
    const args = process.argv.slice(2);
    if (args.length < 2) {
      console.error('Please provide input and output file paths.');
      return process.exit(1);
    }

    const filePath = path.resolve(args.shift());
    let outputPath = path.resolve(args.shift());

    if (!outputPath.endsWith('.mp4')) {
      outputPath = path.join(outputPath, 'output.mp4');
    }

    console.log('Input file path:', filePath);
    console.log('Output file path:', outputPath);

    ensureDirectoryExists(outputPath);

    ffmpeg(filePath)
      .output(outputPath)
      .on('start', (commandLine) => {
        console.log('Spawned ffmpeg with command:', commandLine);
      })
      .on('progress', (progress) => {
        console.log('Processing:', progress.percent + '% done');
      })
      .on('end', () => {
        console.log('Finished processing');
        process.exit(0);
      })
      .on('error', (err) => {
        console.error('ffmpeg error:', err.message);
        process.exit(1);
      })
      .run();
  } catch (error) {
    console.error('Error:', error);
    return process.exit(1);
  }
}

MAIN();
