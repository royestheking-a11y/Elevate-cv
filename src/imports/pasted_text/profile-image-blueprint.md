PROFILE IMAGE SYSTEM (FULL BLUEPRINT)
🎯 Where it fits

Inside CV Builder → Personal Info section

Fields:

Name

Email

Phone

Location

👉 Profile Photo (NEW)

⚙️ CORE FEATURES
1. 📤 Upload Image

Drag & drop OR click upload

Accept:

JPG / PNG / WEBP

Max size:

~2MB (optimize later)

2. ✂️ Image Cropper (IMPORTANT 🔥)

Don’t just upload → looks trash in templates.

👉 Add crop system:

Square (1:1)

Circle preview

Zoom in/out

Drag position

Libraries:

react-easy-crop (best choice)

or cropperjs

3. 🎨 Shape Options

Let user choose:

Circle (modern CV)

Square (corporate CV)

No image (toggle)

4. ⚡ Live Preview Sync

When user uploads:

👉 Instantly show in preview CV
No reload. No delay.

5. 🧠 Smart Positioning (Template Based)

Each template controls:

Image position:

Top left

Top right

Center header

So your template config should include:

imagePosition: "left" | "right" | "center"
imageShape: "circle" | "square"
6. 🔄 Replace / Remove Image

Buttons:

Change photo

Remove photo

7. 💾 Storage (Phase 1 vs 2)
Phase 1:

👉 Save as Base64 in localStorage

Phase 2:

👉 Upload to server / cloud:

Cloudinary (BEST)

AWS S3

8. 📥 EXPORT SUPPORT (VERY IMPORTANT)

When exporting PDF:

👉 Image MUST:

Keep exact position

Keep shape (circle mask)

Not blur or stretch

🎨 UI DESIGN (Make it feel premium)

Instead of boring upload button:

👉 Use this style:

Dashed border box

Icon (upload)

Text:
👉 “Upload Profile Photo”

Hover animation (glow / scale)

After upload:

Show image preview

Small edit icon ✏️