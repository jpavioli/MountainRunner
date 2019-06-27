class Sound
{
  constructor(src)
  {
    this.sound = document.createElement("video");
    this.sound.src = src;
    this.sound.type = "audio/mp3"
    this.sound.autoplay = true
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.append(this.sound);
  }
}
