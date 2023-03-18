import * as fs from 'fs'

const MusicsController = {

    async index(req, res) {
        res.status(200).json([{
            path: '08-The-Real-Slim-Shady.mp3'
        }])
    },

    async stream(req, res) {
        const range = req.headers.range
        console.log(range)
        const musicPath = `../storage/${req.params.id}`
        console.log(musicPath)
        // Total Size file
        const musicSize = fs.statSync(musicPath).size
        console.log(fs.statSync(musicPath))
        // Size of the file parts
        const chunkSize = 16 * 1024
        // Start of the file (nb of bytes) of each chunk (the 1st = 0, the 2nd = 16024, ...)
        const start = Number(range.replace(/\D/g, ''));
        // End of the file (nb of bytes) of each chunk (the 1st = 16024, the 2nd = 32048, ...)
        // For the last chunk, we use the musicSize -1
        const end = Math.min(start + chunkSize, musicSize - 1);
        // The content size of each parts
        const contentLength = end - start + 1;

        const headers = {
            'Content-Range': `bytes ${start}-${end}/${musicSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': 'audio/mpeg',
        };

        res.writeHead(206, headers)

        const stream = fs.createReadStream(musicPath, { start, end });
        stream.pipe(res)

    }
}

export default MusicsController