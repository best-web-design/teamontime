const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Per-page / per-post SEO, all editable in admin.
const Seo = new Schema({
  metaTitle: String,
  metaDescription: String,
  canonical: String,
  ogImage: String,
  noindex: { type: Boolean, default: false },
  schema: String, // optional JSON-LD override (raw JSON string)
}, { _id: false });

// A section is { type, data } — data shape is defined by web/lib/sections.js.
const Section = new Schema({ type: { type: String, required: true }, data: Schema.Types.Mixed }, { _id: false });

const Page = model('Page', new Schema({
  slug: { type: String, required: true, unique: true }, // '' = home, 'services/strategy-ux-conversion'
  title: { type: String, required: true },
  template: { type: String, default: 'default' }, // service | engagement | industry | default
  sections: [Section],
  seo: Seo,
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true, minimize: false }));

const Post = model('Post', new Schema({
  slug: { type: String, required: true, unique: true },
  kind: { type: String, enum: ['case-study', 'article'], default: 'article' },
  category: String,
  title: { type: String, required: true },
  excerpt: String, // short description: cards, listing, default meta description
  status: String,
  cover: String,
  coverAlt: String,
  author: String,
  tags: { type: [String], index: true },
  content: String, // main article body (HTML from the admin editor)
  sections: [Section],
  seo: Seo,
  published: { type: Boolean, default: true },
  publishedAt: { type: Date, default: Date.now },
}, { timestamps: true, minimize: false }));

// Singleton: global site + SEO settings.
const Setting = model('Setting', new Schema({
  key: { type: String, default: 'site', unique: true },
  data: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true, minimize: false }));

const Submission = model('Submission', new Schema({
  form: { type: String, required: true }, // contact | audit | newsletter
  data: Schema.Types.Mixed,
  read: { type: Boolean, default: false },
}, { timestamps: true }));

const User = model('User', new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true }));

module.exports = { Page, Post, Setting, Submission, User };
