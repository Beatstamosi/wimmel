import friendlyMonsters from "../assets/Friendly_Monsters/friendly_monsters.jpeg";
import snail from "../assets/Friendly_Monsters/friendly_monsters_char_1.png";
import bear from "../assets/Friendly_Monsters/friendly_monsters_char_2.png";
import tanne from "../assets/Friendly_Monsters/friendly_monsters_char_3.png";
import capy from "../assets/Friendly_Monsters/friendly_monsters_char_4.png";
import bird from "../assets/Friendly_Monsters/friendly_monsters_char_5.png";

import whatIsNewYork from "../assets/What_is_New_York/what_is_new_york.webp";
import jeff from "../assets/What_is_New_York/what_is_new_york_char_1.png";
import pidgeon from "../assets/What_is_New_York/what_is_new_york_char_2.png";
import racoon from "../assets/What_is_New_York/what_is_new_york_char_3.png";
import tony from "../assets/What_is_New_York/what_is_new_york_char_4.png";
import brian from "../assets/What_is_New_York/what_is_new_york_char_5.png";

import bartonSprings from "../assets/Barton_Springs/barton_springs.jpeg";
import ryan from "../assets/Barton_Springs/barton_springs_char_1.png";
import meghan from "../assets/Barton_Springs/barton_springs_char_2.png";
import rolf from "../assets/Barton_Springs/barton_springs_char_3.png";
import sue from "../assets/Barton_Springs/barton_springs_char_4.png";
import brooklyn from "../assets/Barton_Springs/barton_springs_char_5.png";

import dennys from "../assets/Dennys_Japan/dennys.jpeg";
import bob from "../assets/Dennys_Japan/dennys_char_1.png";
import zoey from "../assets/Dennys_Japan/dennys_char_2.png";
import amelie from "../assets/Dennys_Japan/dennys_char_3.png";
import gato from "../assets/Dennys_Japan/dennys_char_4.png";
import louis from "../assets/Dennys_Japan/dennys_char_5.png";

import artisticAvenue from "../assets/Artistic_Avenues/artistic_avenue.jpeg";
import zazou from "../assets/Artistic_Avenues/artistic_avenue_char_1.png";
import maya from "../assets/Artistic_Avenues/artistic_avenue_char_2.png";
import ross from "../assets/Artistic_Avenues/artistic_avenue_char_3.png";
import franky from "../assets/Artistic_Avenues/artistic_avenue_char_4.png";
import moelle from "../assets/Artistic_Avenues/artistic_avenue_char_5.png";

import battleOfWaldo from "../assets/Battle_of_Waldo/battle_of_waldo.jpeg";
import waldo from "../assets/Battle_of_Waldo/battle_of_waldo_char_1.png";
import wilma from "../assets/Battle_of_Waldo/battle_of_waldo_char_2.png";
import wizard from "../assets/Battle_of_Waldo/battle_of_waldo_char_3.png";
import odlaw from "../assets/Battle_of_Waldo/battle_of_waldo_char_4.png";

const levels = [
  {
    id: 1,
    name: "Friendly Monsters",
    difficulty: "Easy",
    image: friendlyMonsters,
    source_url:
      "https://www.reddit.com/r/wimmelbilder/comments/1mhus3h/group_photo_by_me/",
    artist: "DrScitt",
    characters: [
      {
        name: "Snail",
        image: snail,
        coordinates: { x1: 7288, y1: 6584, x2: 7527, y2: 6824 },
      },
      {
        name: "Bear",
        image: bear,
        coordinates: { x1: 7330, y1: 2080, x2: 7500, y2: 2300 },
      },
      {
        name: "Tanne",
        image: tanne,
        coordinates: { x1: 2940, y1: 4060, x2: 3370, y2: 4630 },
      },
      {
        name: "Capy",
        image: capy,
        coordinates: { x1: 5170, y1: 2350, x2: 5480, y2: 2630 },
      },
      {
        name: "Bird",
        image: bird,
        coordinates: { x1: 1128, y1: 4870, x2: 1590, y2: 5340 },
      },
    ],
  },
  {
    id: 2,
    name: "What is New York",
    difficulty: "Easy",
    image: whatIsNewYork,
    source_url:
      "https://www.reddit.com/r/wimmelbilder/comments/1l1p8r7/what_is_new_york_art_by_david_regone/",
    artist: "David Regone",
    characters: [
      {
        name: "Jeff",
        image: jeff,
        coordinates: { x1: 513, y1: 1175, x2: 580, y2: 1240 },
      },
      {
        name: "Pidgeon",
        image: pidgeon,
        coordinates: { x1: 230, y1: 560, x2: 292, y2: 615 },
      },
      {
        name: "Racoon",
        image: racoon,
        coordinates: { x1: 54, y1: 620, x2: 110, y2: 680 },
      },
      {
        name: "Tony",
        image: tony,
        coordinates: { x1: 1035, y1: 230, x2: 1078, y2: 280 },
      },
      {
        name: "Brian",
        image: brian,
        coordinates: { x1: 520, y1: 830, x2: 580, y2: 890 },
      },
    ],
  },
  {
    id: 3,
    name: "Barton Springs, Austin's crown Jewel",
    difficulty: "Medium",
    image: bartonSprings,
    source_url:
      "https://www.reddit.com/r/wimmelbilder/comments/1ks112k/barton_springs_austins_crown_jewel_about_300/",
    artist: "David Regone",
    characters: [
      {
        name: "Ryan",
        image: ryan,
        coordinates: { x1: 2310, y1: 2040, x2: 2445, y2: 2145 },
      },
      {
        name: "Meghan",
        image: meghan,
        coordinates: { x1: 6844, y1: 1736, x2: 6930, y2: 1810 },
      },
      {
        name: "Rolf",
        image: rolf,
        coordinates: { x1: 3514, y1: 1276, x2: 3640, y2: 1378 },
      },
      {
        name: "Sue",
        image: sue,
        coordinates: { x1: 484, y1: 2950, x2: 634, y2: 3084 },
      },
      {
        name: "Brooklyn",
        image: brooklyn,
        coordinates: { x1: 2950, y1: 1154, x2: 3050, y2: 1250 },
      },
    ],
  },
  {
    id: 4,
    name: "Dennys Japan",
    difficulty: "Medium",
    image: dennys,
    source_url:
      "https://www.reddit.com/r/wimmelbilder/comments/1j1suhs/got_this_at_a_dennys_restaurant_in_japan_artist/",
    artist: "Unknown",
    characters: [
      {
        name: "Bob",
        image: bob,
        coordinates: { x1: 696, y1: 1601, x2: 772, y2: 1664 },
      },
      {
        name: "Zoey",
        image: zoey,
        coordinates: { x1: 819, y1: 353, x2: 886, y2: 413 },
      },
      {
        name: "Amelie",
        image: amelie,
        coordinates: { x1: 1218, y1: 1360, x2: 1283, y2: 14128 },
      },
      {
        name: "Gato",
        image: gato,
        coordinates: { x1: 2037, y1: 236, x2: 2100, y2: 296 },
      },
      {
        name: "Louis",
        image: louis,
        coordinates: { x1: 1743, y1: 1607, x2: 1800, y2: 1666 },
      },
    ],
  },
  {
    id: 5,
    name: "Artistic Avenues | Scavenger Hunt Two Dots",
    difficulty: "Hard",
    image: artisticAvenue,
    source_url:
      "https://www.reddit.com/r/wimmelbilder/comments/1hin5u3/artistic_avenues_scavenger_hunt_two_dots_by_mauro/",
    artist: "Mauro Martins",
    characters: [
      {
        name: "Zazou",
        image: zazou,
        coordinates: { x1: 681, y1: 850, x2: 753, y2: 907 },
      },
      {
        name: "Maya",
        image: maya,
        coordinates: { x1: 1433, y1: 529, x2: 1497, y2: 584 },
      },
      {
        name: "Ross",
        image: ross,
        coordinates: { x1: 1930, y1: 68, x2: 1961, y2: 105 },
      },
      {
        name: "Franky",
        image: franky,
        coordinates: { x1: 1716, y1: 1006, x2: 1765, y2: 1047 },
      },
      {
        name: "Moelle",
        image: moelle,
        coordinates: { x1: 440, y1: 451, x2: 485, y2: 495 },
      },
    ],
  },
  {
    id: 6,
    name: "Battle of Waldo",
    difficulty: "Hard",
    image: battleOfWaldo,
    source_url:
      "https://www.amazon.de/Wheres-Waldo-Deluxe-Martin-Handford/dp/0763645257",
    artist: "Martin Handford",
    characters: [
      {
        name: "Waldo",
        image: waldo,
        coordinates: { x1: 452, y1: 1524, x2: 495, y2: 1564 },
      },
      {
        name: "Wilma",
        image: wilma,
        coordinates: { x1: 2120, y1: 1372, x2: 2158, y2: 1409 },
      },
      {
        name: "Wizard",
        image: wizard,
        coordinates: { x1: 804, y1: 233, x2: 833, y2: 259 },
      },
      {
        name: "Odlaw",
        image: odlaw,
        coordinates: { x1: 2426, y1: 1482, x2: 2468, y2: 1521 },
      },
    ],
  },
];

export default levels;
