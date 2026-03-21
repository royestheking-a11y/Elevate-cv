import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import cloudinary from './config/cloudinary.js';
import User from './models/User.js';
import CV from './models/CV.js';
import CoverLetter from './models/CoverLetter.js';
import Template from './models/Template.js';
import Asset from './models/Asset.js';
import Message from './models/Message.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ASSETS_DIR = path.resolve(__dirname, '../src/assets');

// ─── IMAGE MAP: local filename → Cloudinary upload ─────────
// 10 unique CV template images
const CV_IMAGES = {
  'fa6cddfe339dc9d1dcadfe8d4a21097618bb09b4.png': 'cv_modern_professional',
  '49703a1aacca74b339a73d242b5ea68aa2cadf2f.png': 'cv_classic_minimalist',
  '9578458b44a32b3f9e4ffbdd84a5b421a580496c.png': 'cv_corporate_standard',
  'adae69e22bdbf070cab4ab6e16ca8bdfb98ed950.png': 'cv_creative_modern',
  'e07b416d0e8b7a6ff712ff729ccda017d9641967.png': 'cv_sleek_mono',
  '0fb6f0bc0756356d3fe6f7901db968c9aea80dfa.png': 'cv_nature_corporate',
  'c342ff76309f72861ae17fc942135b7cb140c282.png': 'cv_marketing_exec',
  '85c48ced7cedf222e84b8f3dfa51c0279b5e92f9.png': 'cv_executive_pro',
  '44c1bac3352a48c55a72a51b75188e1cff79a5bc.png': 'cv_modern_executive',
  '93235516fed88e6d982b772d5ca4f68713162b26.png': 'cv_creative_vision',
};

// 5 unique cover letter template images
const CL_IMAGES = {
  'af0877775499e60889fbbe26670465895d5dd19d.png': 'cl_classic_professional',
  'aa4c3adcafef56d2035efd6126b7327ccee544b4.png': 'cl_simple_modern',
  'd3c0c3dbe8f7672b8ee3a4f4284172c594631da2.png': 'cl_modern_minimalist',
  'ed8fde17d860802590343caabf29ccd3ad6b70b0.png': 'cl_minimalist_bold',
  '058ac8a47e82aeabdb22c3102bf807853cc22af9.png': 'cl_beige_white',
};

// Landing page / how-it-works step images
const STEP_IMAGES = {
  '295019edb15a9f3dee662d71444c2d0c9a1007fb.png': 'step_1_prewritten',
  '4a8a0f663038668c69a04370e9497d90df409c74.png': 'step_2_customize',
  '509abf385fe92f465ad29fb96c156d89ceca9b7c.png': 'step_3_download',
  '9a0414946b3039cba7d8bed77d88ce3d8ae6885a.png': 'step_4_apply',
};

async function uploadToCloudinary(filename, publicId) {
  const filePath = path.join(ASSETS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${filename}`);
    return null;
  }
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'elevatecv',
      public_id: publicId,
      overwrite: true,
    });
    return result;
  } catch (err) {
    console.error(`❌ Failed to upload ${filename}: ${err.message}`);
    return null;
  }
}

async function seedData() {
  try {
    await connectDB();
    console.log('\n🌱 Starting FULL seed...\n');

    // ═══════════════════════════════════════════════
    // 1. CLEAR ALL COLLECTIONS
    // ═══════════════════════════════════════════════
    await User.deleteMany({});
    await CV.deleteMany({});
    await CoverLetter.deleteMany({});
    await Template.deleteMany({});
    await Asset.deleteMany({});
    await Message.deleteMany({});
    console.log('🗑️  Cleared all collections');

    // ═══════════════════════════════════════════════
    // 2. UPLOAD ALL IMAGES TO CLOUDINARY
    // ═══════════════════════════════════════════════
    console.log('\n📸 Uploading images to Cloudinary...');
    const uploadedUrls = {};

    // Upload CV template images
    for (const [filename, publicId] of Object.entries(CV_IMAGES)) {
      const result = await uploadToCloudinary(filename, publicId);
      if (result) {
        uploadedUrls[filename] = result.secure_url;
        await Asset.create({
          cloudinaryId: result.public_id,
          url: result.secure_url,
          type: 'image',
          folder: 'elevatecv',
        });
        console.log(`  ✅ ${publicId}`);
      }
    }

    // Upload Cover Letter template images
    for (const [filename, publicId] of Object.entries(CL_IMAGES)) {
      const result = await uploadToCloudinary(filename, publicId);
      if (result) {
        uploadedUrls[filename] = result.secure_url;
        await Asset.create({
          cloudinaryId: result.public_id,
          url: result.secure_url,
          type: 'image',
          folder: 'elevatecv',
        });
        console.log(`  ✅ ${publicId}`);
      }
    }

    // Upload step images
    for (const [filename, publicId] of Object.entries(STEP_IMAGES)) {
      const result = await uploadToCloudinary(filename, publicId);
      if (result) {
        uploadedUrls[filename] = result.secure_url;
        await Asset.create({
          cloudinaryId: result.public_id,
          url: result.secure_url,
          type: 'image',
          folder: 'elevatecv',
        });
        console.log(`  ✅ ${publicId}`);
      }
    }

    console.log(`\n📦 Uploaded ${Object.keys(uploadedUrls).length} images to Cloudinary`);

    // ═══════════════════════════════════════════════
    // 3. SEED CV TEMPLATES (20)
    // ═══════════════════════════════════════════════
    console.log('\n📋 Seeding CV templates...');
    const cvTemplates = [
      { templateId: 'modern-professional', name: 'Modern Professional', description: 'Two-column layout, clean structure.', imageFile: 'fa6cddfe339dc9d1dcadfe8d4a21097618bb09b4.png' },
      { templateId: 'minimalist', name: 'Classic Minimalist', description: 'Traditional top-down layout, ATS optimized.', imageFile: '49703a1aacca74b339a73d242b5ea68aa2cadf2f.png' },
      { templateId: 'corporate', name: 'Corporate Standard', description: 'Professional ATS-friendly.', imageFile: '9578458b44a32b3f9e4ffbdd84a5b421a580496c.png' },
      { templateId: 'creative', name: 'Creative Modern', description: 'Slightly bold, good for design.', imageFile: 'adae69e22bdbf070cab4ab6e16ca8bdfb98ed950.png' },
      { templateId: 'black-white-modern', name: 'Sleek Mono', description: 'Clean typography focused.', imageFile: 'e07b416d0e8b7a6ff712ff729ccda017d9641967.png' },
      { templateId: 'green-modern', name: 'Nature Corporate', description: 'Fresh take on standard layouts.', imageFile: '0fb6f0bc0756356d3fe6f7901db968c9aea80dfa.png' },
      { templateId: 'blue-white-marketing', name: 'Marketing Exec', description: 'Focus on results and metrics.', imageFile: 'c342ff76309f72861ae17fc942135b7cb140c282.png' },
      { templateId: 'black-white-pro', name: 'Executive Pro', description: 'Strictly professional layout.', imageFile: '85c48ced7cedf222e84b8f3dfa51c0279b5e92f9.png' },
      { templateId: 'pro-modern-alt', name: 'Modern Executive', description: 'Strong headings and dividers.', imageFile: '44c1bac3352a48c55a72a51b75188e1cff79a5bc.png' },
      { templateId: 'pink-maroon-photo', name: 'Creative Vision', description: 'Stand out with bold colors.', imageFile: '93235516fed88e6d982b772d5ca4f68713162b26.png' },
      { templateId: 'ats-harvard', name: 'ATS Harvard', description: 'Classic academic serif style.', imageFile: '49703a1aacca74b339a73d242b5ea68aa2cadf2f.png' },
      { templateId: 'ats-tech-modern', name: 'ATS Tech Modern', description: 'Clean sans-serif, perfect for tech.', imageFile: 'fa6cddfe339dc9d1dcadfe8d4a21097618bb09b4.png' },
      { templateId: 'ats-executive', name: 'ATS Executive', description: 'Direct and highly professional.', imageFile: '85c48ced7cedf222e84b8f3dfa51c0279b5e92f9.png' },
      { templateId: 'ats-finance', name: 'ATS Finance Strict', description: 'No fluff, standard alignment.', imageFile: '9578458b44a32b3f9e4ffbdd84a5b421a580496c.png' },
      { templateId: 'ats-creative', name: 'ATS Creative Clean', description: 'Minimalist with subtle color.', imageFile: 'adae69e22bdbf070cab4ab6e16ca8bdfb98ed950.png' },
      { templateId: 'ats-consulting', name: 'ATS Consulting Pro', description: 'Dense but highly readable.', imageFile: 'e07b416d0e8b7a6ff712ff729ccda017d9641967.png' },
      { templateId: 'ats-startup', name: 'ATS Startup Agile', description: 'Modern bullets and spacing.', imageFile: 'c342ff76309f72861ae17fc942135b7cb140c282.png' },
      { templateId: 'ats-healthcare', name: 'ATS Healthcare Standard', description: 'Robust section blocks.', imageFile: '0fb6f0bc0756356d3fe6f7901db968c9aea80dfa.png' },
      { templateId: 'ats-engineering', name: 'ATS Engineering Focused', description: 'Emphasis on skills mapping.', imageFile: '44c1bac3352a48c55a72a51b75188e1cff79a5bc.png' },
      { templateId: 'ats-legal', name: 'ATS Legal Formal', description: 'Strictly structured, left-aligned.', imageFile: '49703a1aacca74b339a73d242b5ea68aa2cadf2f.png' },
    ];

    for (const t of cvTemplates) {
      await Template.create({
        templateId: t.templateId,
        name: t.name,
        description: t.description,
        type: 'cv',
        imageUrl: uploadedUrls[t.imageFile] || '',
        cloudinaryId: `elevatecv/${CV_IMAGES[t.imageFile] || CL_IMAGES[t.imageFile] || ''}`,
      });
    }
    console.log(`  ✅ ${cvTemplates.length} CV templates seeded`);

    // ═══════════════════════════════════════════════
    // 4. SEED COVER LETTER TEMPLATES (9)
    // ═══════════════════════════════════════════════
    console.log('\n📝 Seeding Cover Letter templates...');
    const clTemplates = [
      { templateId: 'classic-professional', name: 'Classic Professional', imageFile: 'af0877775499e60889fbbe26670465895d5dd19d.png' },
      { templateId: 'simple-modern', name: 'Simple Modern', imageFile: 'aa4c3adcafef56d2035efd6126b7327ccee544b4.png' },
      { templateId: 'modern-minimalist', name: 'Modern Minimalist', imageFile: 'd3c0c3dbe8f7672b8ee3a4f4284172c594631da2.png' },
      { templateId: 'modern-minimalist-alt', name: 'Minimalist Bold', imageFile: 'ed8fde17d860802590343caabf29ccd3ad6b70b0.png' },
      { templateId: 'beige-white', name: 'Beige & White Pro', imageFile: '058ac8a47e82aeabdb22c3102bf807853cc22af9.png' },
      { templateId: 'elegant-serif', name: 'Elegant Serif', imageFile: 'af0877775499e60889fbbe26670465895d5dd19d.png' },
      { templateId: 'creative-sidebar', name: 'Creative Sidebar', imageFile: 'aa4c3adcafef56d2035efd6126b7327ccee544b4.png' },
      { templateId: 'executive-direct', name: 'Executive Direct', imageFile: 'd3c0c3dbe8f7672b8ee3a4f4284172c594631da2.png' },
      { templateId: 'ats-standard-letter', name: 'ATS Standard', imageFile: 'af0877775499e60889fbbe26670465895d5dd19d.png' },
    ];

    for (const t of clTemplates) {
      await Template.create({
        templateId: t.templateId,
        name: t.name,
        description: '',
        type: 'cover-letter',
        imageUrl: uploadedUrls[t.imageFile] || '',
        cloudinaryId: `elevatecv/${CL_IMAGES[t.imageFile] || ''}`,
      });
    }
    console.log(`  ✅ ${clTemplates.length} Cover Letter templates seeded`);

    // ═══════════════════════════════════════════════
    // 5. SEED USERS
    // ═══════════════════════════════════════════════
    console.log('\n👤 Seeding users...');
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@elevatecv.com',
      password: 'cvbuild878',
      role: 'admin',
    });
    console.log('  ✅ Admin: admin@elevatecv.com / cvbuild878');

    const sampleUser = await User.create({
      name: 'Sunny Doe',
      email: 'sunny@example.com',
      password: 'password123',
      role: 'user',
    });
    console.log('  ✅ User: sunny@example.com / password123');

    // ═══════════════════════════════════════════════
    // 6. SEED CV DATA
    // ═══════════════════════════════════════════════
    console.log('\n📄 Seeding CV data...');
    await CV.create({
      userId: sampleUser._id,
      personal: {
        fullName: 'Sunny Doe',
        jobTitle: 'Senior Frontend Engineer',
        email: 'sunny@example.com',
        phone: '+1 (555) 123-4567',
        website: 'sunnydoe.dev',
        location: 'San Francisco, CA',
      },
      summary: 'Passionate frontend developer with 5+ years of experience building scalable web applications. Expert in React, TypeScript, and modern CSS frameworks. Proven track record of improving site performance and user engagement.',
      skills: [
        { id: '1', name: 'React', level: 'Expert' },
        { id: '2', name: 'TypeScript', level: 'Expert' },
        { id: '3', name: 'Tailwind CSS', level: 'Advanced' },
        { id: '4', name: 'Node.js', level: 'Intermediate' },
      ],
      experience: [
        { id: '1', title: 'Senior Frontend Engineer', company: 'TechCorp Inc.', startDate: '2021', endDate: 'Present', current: true, description: 'Led a team of 4 developers to rebuild the core customer portal. Improved load times by 40% and reduced bug reports by 25%.' },
        { id: '2', title: 'Frontend Developer', company: 'StartupX', startDate: '2018', endDate: '2021', current: false, description: 'Developed key features for the main SaaS product. Implemented responsive designs and integrated with REST APIs.' },
      ],
      education: [
        { id: '1', degree: 'B.S. Computer Science', school: 'University of Technology', startDate: '2014', endDate: '2018', description: 'Graduated with Honors. President of the Web Development Club.' },
      ],
      selectedTemplateId: 'modern-professional',
      themeColor: '#3B2F2F',
    });
    console.log('  ✅ Sample CV created');

    // ═══════════════════════════════════════════════
    // 7. SEED COVER LETTER DATA
    // ═══════════════════════════════════════════════
    await CoverLetter.create({
      userId: sampleUser._id,
      recipientName: 'Hiring Manager',
      companyName: 'Company Name',
      jobTitle: 'Frontend Developer',
      body: 'I am writing to express my interest in the Frontend Developer position at your company. With my background in React and passion for building intuitive user interfaces, I believe I would be a great fit for your team.\n\nIn my previous role, I successfully delivered several key projects...',
      selectedTemplateId: 'classic-professional',
    });
    console.log('  ✅ Sample Cover Letter created');

    // ═══════════════════════════════════════════════
    // 8. SEED MESSAGES
    // ═══════════════════════════════════════════════
    console.log('\n💬 Seeding contact messages...');
    const messages = [
      { name: 'Alice Cooper', email: 'alice@example.com', message: 'Help with ATS matching' },
      { name: 'David Miller', email: 'david@example.com', message: 'Billing question' },
      { name: 'Sophie Clark', email: 'sophie@example.com', message: 'Feature request: Dark mode' },
    ];
    for (const m of messages) {
      await Message.create(m);
    }
    console.log(`  ✅ ${messages.length} messages seeded`);

    // ═══════════════════════════════════════════════
    // SUMMARY
    // ═══════════════════════════════════════════════
    const totalAssets = await Asset.countDocuments();
    const totalTemplates = await Template.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalCVs = await CV.countDocuments();
    const totalCLs = await CoverLetter.countDocuments();
    const totalMsgs = await Message.countDocuments();

    console.log('\n═══════════════════════════════════════');
    console.log('🎉 FULL SEED COMPLETED!');
    console.log('═══════════════════════════════════════');
    console.log(`  📸 Assets (Cloudinary): ${totalAssets}`);
    console.log(`  📋 Templates:           ${totalTemplates} (${cvTemplates.length} CV + ${clTemplates.length} CL)`);
    console.log(`  👤 Users:               ${totalUsers}`);
    console.log(`  📄 CVs:                 ${totalCVs}`);
    console.log(`  📝 Cover Letters:       ${totalCLs}`);
    console.log(`  💬 Messages:            ${totalMsgs}`);
    console.log('═══════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seedData();
