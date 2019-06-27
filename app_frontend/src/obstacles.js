// REFERENCES FOR OBSTACLES

let obstacleArr = [
  {
    name: "Fire Skull",
    size_x: 89,
    size_y: 99,
    root: "./assets/obstacles/fire-skull.gif",
    speed_range: [4,7],
    height_range: [0.2*window.innerHeight,0.8*window.innerHeight],
    size_range: [1.5,2.0], //multiple of origininal
    target_ratio: 0.8
  },
  {
    name: "Demon",
    size_x: 157,
    size_y: 125,
    root: "./assets/obstacles/demon.gif",
    speed_range: [3,4],
    height_range: [0.2*window.innerHeight,0.8*window.innerHeight],
    size_range: [1.5,2.5], //multiple of origininal
    target_ratio: 0.8
  },
  {
    name: "Night-mare",
    size_x: 119,
    size_y: 77,
    root: "./assets/obstacles/night-mare.gif",
    speed_range: [5,8],
    height_range: [rockBottom-30,rockBottom],
    size_range: [2,3], //multiple of origininal
    target_ratio: 0.9
  },
  {
    name: "Bee",
    size_x: 37,
    size_y: 39,
    root: "./assets/obstacles/bee.gif",
    speed_range: [6,7],
    height_range: [0.2*window.innerHeight,0.8*window.innerHeight],
    size_range: [2,3], //multiple of origininal
    target_ratio: 0.9
  },
  {
    name: "Demon Flower",
    size_x: 64,
    size_y: 64,
    root: "./assets/obstacles/demon-flower.gif",
    speed_range: [speed_x,speed_x],
    height_range: [rockBottom-60,rockBottom-30],
    size_range: [3,4], //multiple of origininal
    target_ratio: 0.6
  }
]
