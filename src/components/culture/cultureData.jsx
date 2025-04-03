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
    {
      id: 1,
      name: "Angklung",
      from: "West Java",
      image: Music1,
      desc: "Angklung is a traditional musical instrument made of bamboo and played by shaking. It originated in West Java and is often used in cultural events or art performances. Angklung has a distinctive sound and is often played in groups.",
    },
    {
      id: 2,
      name: "Gamelan",
      from: "Bali/Java",
      image: Music2,
      desc: "Gamelan is a traditional Indonesian music ensemble consisting of various musical instruments, mainly gongs, xylophones and drums. Gamelan music is very popular in Bali and Java,",
    },
    { id: 3, 
      name: "Sasando",
      from: "NTT",
      image: Music3,
      desc: "Sasando is a traditional musical instrument originating from East Nusa Tenggara (NTT). It has a harp-like shape and is played by plucking. This music depicts the natural beauty of NTT and is often performed in various cultural events." 
    },
    {
      id: 4,
      name: "Rebab",
      from: "Java/Sumatra",
      image: Music4,
      desc: "Rebab is a traditional violin-shaped musical instrument originating from Java and Sumatra. Having two strings that are played by strumming, the rebab is usually used in gamelan performances or as an accompaniment to traditional music.",
    },
    { id: 5,
      name: "Saluang",
      from: "West Sumatra",
      image: Music5,
      desc:"Saluang is a traditional wind instrument originating from Minangkabau, West Sumatra. Made of bamboo, saluang is played by blowing and produces a soft melodic sound, often used in traditional Minangkabau music performances."
    },
    { id: 6,
      name: "Japen",
      from: "Central Kalimantan",
      image: Music6,
      desc:"Japen is a traditional musical instrument from Central Kalimantan that has a shape similar to a stringed instrument. It is usually played in traditional events or traditional Dayak art performances. Japen has a distinctive sound and symbolizes the rich culture of the Dayak tribe."
    },
  ],

  Traditions: [
    { id: 7,
      name: "Ngaben",
      from: "Bali",
      image: Tradition1,
      desc:"Ngaben is a traditional cremation ceremony that is very important in Balinese culture. The ceremony serves not only to burn the body, but also as a ritual to free the spirits from the body and escort them to the spirit world."
    },
    {
      id: 8,
      name: "Rambu Solo",
      from: "Toraja,South Sulawesi",
      image: Tradition2,
      desc:"Rambu Solo is a very complex and important funeral ceremony in Torajan culture. The ceremony involves a series of rituals and celebrations performed to honor the deceased, with the aim of helping their souls achieve a good afterlife."
    },
    { id: 9, 
      name: "Tabuik", 
      from: "Pariaman,West Sumatra", 
      image: Tradition3,
      desc:"Tabuik is an annual tradition held in Pariaman, West Sumatra, to commemorate the event of Ashura, which is part of Islamic history. The festival involves the making and parading of tabuik (replicas of graves) which are paraded around the city with various art and cultural performances."
    },
    { id: 10, 
      name: "Bakar batu", 
      from: "Papua", 
      image: Tradition4,
      desc:"Bakar Batu is a communal eating tradition originating from Papua, which involves the traditional cooking of food using hot stones. This ceremony is usually carried out in traditional events or big celebrations as a form of community togetherness and unity."
    },
    {
      id: 11,
      name: "Kebo-keboan",
      from: "Banyuwangi,East Java",
      image: Tradition5,
      desc:"Kebo-Keboan is a traditional ceremony from Banyuwangi that involves a parade of people wearing buffalo-like costumes and masks. This tradition aims to invoke God for a bountiful harvest, as well as to preserve regional cultural customs."
    },
    { id: 12, 
      name: "Fahombo", 
      from: "Nias, North Sumatra", 
      image: Tradition6,
      desc:"Fahombo is a famous stone jumping tradition in Nias, North Sumatra. It involves men jumping over large rocks as part of a physical test and a symbol of respect for strength and courage. Fahombo also symbolizes one's readiness to become a respected member of the community."
    },
  ],

  "Traditional-Dance": [
    { id: 13, 
      name: "Saman dance", 
      from: "Aceh", 
      image: Dance1,
      desc:"Saman is a traditional dance from Aceh that is famous for its fast and dynamic movements and involves many dancers. The dance is usually accompanied by energetic sing-alongs and is performed in traditional events or large celebrations to welcome guests or celebrate victories"
    },
    { id: 14, 
      name: "Piring dance", 
      from: "West Sumatra", 
      image: Dance2,
      desc:"Piring Dance originated in West Sumatra and uses plates as the main property. The dancers hold the plate which is used as a symbol of agility and skill in dancing. This dance is often performed in traditional Minangkabau ceremonies as a form of entertainment and respect."
    },
    { id: 15, 
      name: "Jaipong dance",
      from: "West Java", 
      image: Dance3,
      desc:"Jaipong is a dance originating from West Java that combines traditional Sundanese movements with a modern twist. This dance is highly energetic, with flexible and rhythmic body movements, and is often performed in various entertainment and celebratory events."
    },
    { id: 16, 
      name: "Reog dance", 
      from: "East Java", 
      image: Dance4 ,
      desc:"Reog is a traditional dance from East Java that is famous for its large lion-shaped masks and challenging attractions performed by the dancers. The dance depicts the battle between the forces of good and evil in Ponorogo folklore, and is usually performed in traditional ceremonies or festivals."
    },
    { id: 17, 
      name: "Tor-tor dance", 
      from: "North Sumatra", 
      image: Dance5 ,
      desc:"Tor-Tor is a traditional dance of the Batak tribe in North Sumatra, which is usually performed during traditional ceremonies, weddings or major celebrations. The dance depicts life stories, and dancers usually perform meaningful movements while accompanied by traditional Batak music."
    },
    { id: 18, 
      name: "Topeng dance", 
      from: "Central Java", 
      image: Dance6,
      desc:"Topeng is a traditional dance originating from Central Java, where dancers wear masks to portray various characters or figures in the story. This dance usually contains elements of drama and is performed in various cultural events and traditional ceremonies to convey moral messages or legendary stories."
    },
  ],
};

export default culturalData;
