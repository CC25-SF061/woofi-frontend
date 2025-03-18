// Traditional-Music data
import Music1 from "../../assets/cultureHistory/traditional-music/image2.webp";
import Music2 from "../../assets/cultureHistory/traditional-music/image3.webp";
import Music3 from "../../assets/cultureHistory/traditional-music/image4.webp";
import Music4 from "../../assets/cultureHistory/traditional-music/image5.webp";
import Music5 from "../../assets/cultureHistory/traditional-music/image6.webp";
import Music6 from "../../assets/cultureHistory/traditional-music/image7.webp";

//Traditions
import Tradition1 from "../../assets/cultureHistory/traditions/traditions1.webp";
import Tradition2 from "../../assets/cultureHistory/traditions/traditions2.webp";
import Tradition3 from "../../assets/cultureHistory/traditions/traditions3.webp";
import Tradition4 from "../../assets/cultureHistory/traditions/traditions4.webp";
import Tradition5 from "../../assets/cultureHistory/traditions/traditions5.webp";
import Tradition6 from "../../assets/cultureHistory/traditions/traditions6.webp";

// Traditional Dance
import Dance1 from "../../assets/cultureHistory/traditional-dance/Dance1.webp";
import Dance2 from "../../assets/cultureHistory/traditional-dance/Dance2.webp";
import Dance3 from "../../assets/cultureHistory/traditional-dance/Dance3.webp";
import Dance4 from "../../assets/cultureHistory/traditional-dance/Dance4.webp";
import Dance5 from "../../assets/cultureHistory/traditional-dance/Dance5.webp";
import Dance6 from "../../assets/cultureHistory/traditional-dance/Dance6.webp";

const culturalData = {
    "Traditional-Music": [
      { id: 1, name: "Angklung", from: "West Java", image:Music1},
      { id: 2, name: "Gamelan", from: "Bali/Java", image: Music2  },
      { id: 3, name: "Sasando", from: "NTT", image: Music3},
      { id: 4,name: "Rebab", from: "Java/Sumatra", image:Music4 },
      { id: 5,name: "Saluang", from: "West Sumatra", image: Music5},
      { id: 6,name: "Japen", from: "Central Kalimantan", image: Music6 },
      
    ],
    "Traditions": [
      { id: 7, name: "Ngaben", from: "Bali", image:Tradition1 },
      { id: 8, name: "Rambu Solo", from: "Toraja,South Sulawesi", image: Tradition2 },
      { id: 9, name: "Tabuik", from: "Pariaman,West Sumatra", image: Tradition3 },
      { id: 10, name: "Bakar batu", from: "Papua", image: Tradition4},
      { id: 11, name: "Kebo-keboan", from: "Banyuwangi,East Java", image: Tradition5},
      { id: 12, name: "Fahombo", from: "Nias, North Sumatra", image: Tradition6},
    ],

    "Traditional-Dance": [
      { id: 13, name: "Saman dance", from: "Aceh", image: Dance1},
      { id: 14, name: "Piring dance", from: "West Sumatra", image: Dance2},
      { id: 15, name: "Jaipong dance", from: "West Java", image: Dance3},
      { id: 16, name: "Reog dance", from: "East Java", image: Dance4},
      { id: 17, name: "Tor-tor dance", from: "North Sumatra", image: Dance5 },
      { id: 18, name: "Topeng dance", from: "Central Java", image: Dance6},
    ],
  };

export default culturalData;