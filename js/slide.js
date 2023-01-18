export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.3;
    return this.dist.finalPosition - this.dist.movement;
  }

  //inicio
  onStart(event) {
    event.preventDefault();

    //proprie do event
    this.dist.startX = event.clientX;

    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  //mouse move
  onMove(event) {
    const finalyPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalyPosition);
  }

  //end
  onEnd(event) {
    this.wrapper.removeEventListener("mousemove", this.onMove);
    this.dist.finalPosition = this.dist.movePosition
  }

  //add eventos de slides
  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  //add bind
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  //iniciar
  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
