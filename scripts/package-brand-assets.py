from pathlib import Path
from PIL import Image

root = Path('/home/ubuntu/masonnguyengeo/assets/brand')
source = root / 'mason-nguyen-owl-mark.png'
image = Image.open(source).convert('RGBA')

for size, name in [
    (16, 'favicon-16x16.png'),
    (32, 'favicon-32x32.png'),
    (48, 'favicon-48x48.png'),
    (180, 'apple-touch-icon.png'),
    (192, 'android-chrome-192x192.png'),
    (512, 'android-chrome-512x512.png'),
]:
    image.resize((size, size), Image.Resampling.LANCZOS).save(root / name, optimize=True)

image.save(root / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
print('Packaged favicon and app-icon assets.')
