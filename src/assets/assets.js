import image1 from '../assets/hero/image-1.jpg';
import image2 from '../assets/hero/image-2.png';
import image3 from '../assets/hero/image-3.jpg';
import image4 from '../assets/hero/image-4.jpg';
import image5 from '../assets/hero/image-5.jpg';

import CartIcon from './layout/cart_icon.png';
import SearchIcon from './layout/search_icon.png';
import MenuIcon from './layout/menu_icon.png';
import logo from '../../app/favicon.ico';
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
  { name: "Necklaces",     image: "/collections/Necklaces.jpg",  slug: "necklaces" },
  { name: "Bridal Sets",   image: "/collections/bridalsets.jpg", slug: "bridal-sets" },
  { name: "Maalas",        image: "/collections/malas.png",       slug: "Maalas" },
  { name: "Rings",         image: "/collections/rings-fixed.jpg",      slug: "Rings" },
  { name: "Bracelets",     image: "/collections/bracelets.jpg",  slug: "Bracelets" },
  { name: "Bangles",       image: "/collections/bangles.png",    slug: "Bangles" },
  { name: "Combo Sets",       image: "/collections/combos.jpg",    slug: "combo-sets" },
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
    stock:12,
    inStock:true
  },
  {
    _id: "p002",
    name: "Pearl Stud Earrings",
    description: "Classic pearl stud earrings with a timeless design.",
    price: 130,
    image: [image1],
    category: "Earrings",
    stock:12,
    inStock:true
  },

  /* ================= NECKLACES ================= */
  {
    _id: "p003",
    name: "Silver Chain Necklace",
    description: "A sleek silver chain necklace that complements any outfit.",
    price: 200,
    image: [image2, image3],
    category: "necklaces",
    stock:12,
    inStock:true
  },
  {
    _id: "p004",
    name: "Gold Pendant Necklace",
    description: "Minimal gold pendant necklace for daily wear.",
    price: 180,
    image: [image3],
    category: "necklaces",
    stock:0,
    inStock:false
  },

  /* ================= BRIDAL SETS ================= */
  {
    _id: "p005",
    name: "Royal Bridal Jewelry Set",
    description: "Luxurious bridal jewelry set for weddings and receptions.",
    price: 850,
    image: [image4],
    category: "bridal-sets",
    stock:0,
    inStock:false
  },
  {
    _id: "p006",
    name: "Classic Bridal Set",
    description: "Traditional bridal set with elegant craftsmanship.",
    price: 720,
    image: [image4],
    category: "bridal-sets",
    stock:0,
    inStock:false
  },

  /* ================= MAALAS ================= */
  {
    _id: "p007",
    name: "Traditional Gold Maala",
    description: "Traditional gold-toned maala with intricate detailing.",
    price: 320,
    image: [image2],
    category: "Maalas",
    stock:0,
    inStock:false
  },
  {
    _id: "p008",
    name: "Pearl Maala Necklace",
    description: "Elegant pearl maala suitable for festive occasions.",
    price: 290,
    image: [image1],
    category: "Maalas",
    stock:0,
    inStock:false
  },

  /* ================= RINGS ================= */
  {
    _id: "p009",
    name: "Gold Statement Ring",
    description: "Bold gold ring with a premium finish.",
    price: 150,
    image: [image3],
    category: "Rings",
    stock:0,
    inStock:false
  },
  {
    _id: "p010",
    name: "Minimal Silver Ring",
    description: "Minimalist silver ring for everyday styling.",
    price: 95,
    image: [image2],
    category: "Rings",
    stock:0,
    inStock:false
  },

  /* ================= BRACELETS ================= */
  {
    _id: "p011",
    name: "Gold Cuff Bracelet",
    description: "Stylish gold cuff bracelet perfect for casual or formal wear.",
    price: 110,
    image: [image3],
    category: "Bracelets",
    stock:0,
    inStock:false
  },
  {
    _id: "p012",
    name: "Charm Bracelet",
    description: "Delicate charm bracelet with a modern touch.",
    price: 125,
    image: [image4],
    category: "Bracelets",
    stock:0,
    inStock:false
  },

  /* ================= BANGLES ================= */
  {
    _id: "p013",
    name: "Traditional Gold Bangles",
    description: "Set of traditional gold bangles with detailed patterns.",
    price: 260,
    image: [image5],
    category: "Bangles",
    stock:0,
    inStock:false
  },
  {
    _id: "p014",
    name: "Modern Slim Bangles",
    description: "Lightweight slim bangles for everyday wear.",
    price: 210,
    image: [image5],
    category: "Bangles",
    stock:0,
    inStock:false
  },

  /* ================= COMBO SETS ================= */
  {
    _id: "p015",
    name: "Necklace & Earrings Combo",
    description: "Perfectly matched necklace and earrings combo set.",
    price: 340,
    image: [image1, image2],
    category: "combo-sets",
    stock:0,
    inStock:false
  },
  {
    _id: "p016",
    name: "Festive Jewelry Combo Set",
    description: "Complete jewelry combo set ideal for festive occasions.",
    price: 420,
    image: [image3, image4],
    category: "combo-sets",
    stock:0,
    inStock:false
  },
];
