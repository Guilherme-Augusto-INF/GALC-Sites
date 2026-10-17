from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json, base64
root=Path("img")
source=Image.open(root/"galc-logo-icon.png").convert("RGBA")
alpha=source.getchannel("A")
bbox=alpha.getbbox()
assert bbox, "empty logo"
mark=source.crop(bbox)
outputs=[]
def save_icon(size,name):
    im=mark.copy()
    im.thumbnail((size,size),Image.Resampling.LANCZOS)
    canvas=Image.new("RGBA",(size,size),(255,255,255,0))
    canvas.alpha_composite(im,((size-im.width)//2,(size-im.height)//2))
    canvas.save(root/name,optimize=True)
    outputs.append(root/name)
for size,name in [(96,"galc-symbol-v25-96.png"),(32,"favicon-v25-32.png"),(64,"favicon-v25-64.png"),(180,"apple-touch-icon-v25.png")]:
    save_icon(size,name)
canvas=Image.new("RGB",(1200,630),"#f7f6f2")
m=mark.copy();m.thumbnail((320,320),Image.Resampling.LANCZOS)
canvas.paste(m,(88+(320-m.width)//2,120+(320-m.height)//2),m)
draw=ImageDraw.Draw(canvas)
def font(size,bold=False):
    return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans"+("-Bold" if bold else "")+".ttf",size)
draw.text((458,160),"GALC-Sites",font=font(68,True),fill="#151a23")
draw.text((462,274),"Sites para",font=font(40),fill="#151a23")
draw.text((462,330),"pequenos negocios.".replace("negocios","negócios"),font=font(40),fill="#355bee")
draw.text((88,544),"galc-sites.pages.dev",font=font(27),fill="#4d5868")
canvas.save(root/"og-image-v25.png",optimize=True);outputs.append(root/"og-image-v25.png")
metadata={"source_size":source.size,"source_bytes":(root/"galc-logo-icon.png").stat().st_size,"alpha_extrema":alpha.getextrema(),"bbox":bbox,"outputs":[{"path":str(p),"bytes":p.stat().st_size,"size":Image.open(p).size} for p in outputs]}
print("BRAND_METADATA="+json.dumps(metadata))
for p in outputs:
    print("BRAND_ASSET="+json.dumps({"path":str(p),"base64":base64.b64encode(p.read_bytes()).decode()}))
