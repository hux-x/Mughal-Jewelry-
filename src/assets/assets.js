import image1 from '../assets/hero/image-1.jpg';
import image2 from '../assets/hero/image-2.png';
import image3 from '../assets/hero/image-3.jpg';
import image4 from '../assets/hero/image-4.jpg';
import image5 from '../assets/hero/image-5.jpg';

import CartIcon from './layout/cart_icon.png';
import SearchIcon from './layout/search_icon.png';
import MenuIcon from './layout/menu_icon.png';
import logo from '../assets/layout/logo.png';
import bin_icon from './layout/bin_icon.png'

export const assets = {
  hero_images: [image1, image2, image3, image4, image5],
  cart_icon: CartIcon,
  search_icon: SearchIcon,
  menu_icon: MenuIcon,
  logo: logo,
  bin_icon
};


export const collections = [
  { name: "Ear Rings",     image: "/collections/earrings-2.jpg", slug: "Earrings" },
  { name: "Necklaces",     image: "/collections/Necklaces.jpg",  slug: "Necklaces" },
  { name: "Bridal Sets",   image: "/collections/bridalsets.jpg", slug: "Bridal Sets" },
  { name: "Maalas",        image: "/collections/malas.png",       slug: "Maalas" },
  { name: "Rings",         image: "/collections/rings-fixed.jpg",      slug: "Rings" },
  { name: "Bracelets",     image: "/collections/bracelets.jpg",  slug: "Bracelets" },
  { name: "Bangles",       image: "/collections/bangles.png",    slug: "Bangles" },
  { name: "Combo Sets",       image: "/collections/combos.jpg",    slug: "Combo Sets" },
];





export const products = [
  /* ================= EARRINGS ================= */
  {
    _id: "p001",
    name: "Gold Hoop Earrings",
    description: "Elegant gold hoop earrings suitable for everyday wear or special occasions.",
    price: 100,
    image: [image1],
    category: "Earrings",
    date: 1716634345448,
    bestseller: true,
  },
  {
    _id: "p002",
    name: "Pearl Stud Earrings",
    description: "Classic pearl stud earrings with a timeless design.",
    price: 130,
    image: [image1],
    category: "Earrings",
    date: 1716722345448,
    bestseller: true,
  },

  /* ================= NECKLACES ================= */
  {
    _id: "p003",
    name: "Silver Chain Necklace",
    description: "A sleek silver chain necklace that complements any outfit.",
    price: 200,
    image: [image2, image3],
    category: "necklaces",
    date: 1716821345448,
    bestseller: true,
  },
  {
    _id: "p004",
    name: "Gold Pendant Necklace",
    description: "Minimal gold pendant necklace for daily wear.",
    price: 180,
    image: [image3],
    category: "necklaces",
    date: 1716921345448,
    bestseller: false,
  },

  /* ================= BRIDAL SETS ================= */
  {
    _id: "p005",
    name: "Royal Bridal Jewelry Set",
    description: "Luxurious bridal jewelry set for weddings and receptions.",
    price: 850,
    image: [image4],
    category: "Bridal Sets",
    date: 1717024545448,
    bestseller: true,
  },
  {
    _id: "p006",
    name: "Classic Bridal Set",
    description: "Traditional bridal set with elegant craftsmanship.",
    price: 720,
    image: [image4],
    category: "Bridal Sets",
    date: 1717124545448,
    bestseller: false,
  },

  /* ================= MAALAS ================= */
  {
    _id: "p007",
    name: "Traditional Gold Maala",
    description: "Traditional gold-toned maala with intricate detailing.",
    price: 320,
    image: [image2],
    category: "Maalas",
    date: 1717223423448,
    bestseller: true,
  },
  {
    _id: "p008",
    name: "Pearl Maala Necklace",
    description: "Elegant pearl maala suitable for festive occasions.",
    price: 290,
    image: [image1],
    category: "Maalas",
    date: 1717323423448,
    bestseller: false,
  },

  /* ================= RINGS ================= */
  {
    _id: "p009",
    name: "Gold Statement Ring",
    description: "Bold gold ring with a premium finish.",
    price: 150,
    image: [image3],
    category: "Rings",
    date: 1717421345448,
    bestseller: true,
  },
  {
    _id: "p010",
    name: "Minimal Silver Ring",
    description: "Minimalist silver ring for everyday styling.",
    price: 95,
    image: [image2],
    category: "Rings",
    date: 1717521345448,
    bestseller: false,
  },

  /* ================= BRACELETS ================= */
  {
    _id: "p011",
    name: "Gold Cuff Bracelet",
    description: "Stylish gold cuff bracelet perfect for casual or formal wear.",
    price: 110,
    image: [image3],
    category: "Bracelets",
    date: 1717621345448,
    bestseller: true,
  },
  {
    _id: "p012",
    name: "Charm Bracelet",
    description: "Delicate charm bracelet with a modern touch.",
    price: 125,
    image: [image4],
    category: "Bracelets",
    date: 1717721345448,
    bestseller: false,
  },

  /* ================= BANGLES ================= */
  {
    _id: "p013",
    name: "Traditional Gold Bangles",
    description: "Set of traditional gold bangles with detailed patterns.",
    price: 260,
    image: [image5],
    category: "Bangles",
    date: 1717824545448,
    bestseller: true,
  },
  {
    _id: "p014",
    name: "Modern Slim Bangles",
    description: "Lightweight slim bangles for everyday wear.",
    price: 210,
    image: [image5],
    category: "Bangles",
    date: 1717924545448,
    bestseller: false,
  },

  /* ================= COMBO SETS ================= */
  {
    _id: "p015",
    name: "Necklace & Earrings Combo",
    description: "Perfectly matched necklace and earrings combo set.",
    price: 340,
    image: [image1, image2],
    category: "Combo Sets",
    date: 1718021345448,
    bestseller: true,
  },
  {
    _id: "p016",
    name: "Festive Jewelry Combo Set",
    description: "Complete jewelry combo set ideal for festive occasions.",
    price: 420,
    image: [image3, image4],
    category: "Combo Sets",
    date: 1718121345448,
    bestseller: false,
  },
];
