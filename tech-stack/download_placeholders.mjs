import fs from 'fs';
import https from 'https';
import path from 'path';

const imagesDir = path.resolve('public', 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

const files = [
    { name: 'codevita12.png', url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop' },
    { name: 'codevita11.png', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop' },
    { name: 'gssoc.png', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop' },
    { name: 'acm100days.png', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop' },
    { name: 'blockathon.png', url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop' }
];

files.forEach(file => {
    https.get(file.url, (res) => {
        const dest = fs.createWriteStream(path.join(imagesDir, file.name));
        res.pipe(dest);
    }).on('error', (err) => {
        console.error('Error downloading ' + file.name, err);
    });
});
