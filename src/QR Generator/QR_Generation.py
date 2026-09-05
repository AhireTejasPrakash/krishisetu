import qrcode

# Put any URL here
url = "https://krishisetu-1-jk62.onrender.com/"

# Generate QR code
qr = qrcode.QRCode(
    version=1,
    box_size=10,
    border=4
)

qr.add_data(url)
qr.make(fit=True)

# Create image
img = qr.make_image(fill_color="black", back_color="white")

# Save
img.save("krishisetu_qr.png")

print("QR code generated successfully!")