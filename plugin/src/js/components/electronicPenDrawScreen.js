import { videojs } from 'global/window';

const Component = videojs.getComponent('ClickableComponent');

class ElectronicPenDrawScreen extends Component {
  constructor(player) {
    super(player);
    this.player = player;
    this.controlText(this.player.localize('Electronic pen - draw screen'));
    this.drawEnable = false;
    this.handleDrawScreenEnable();

    this.canvas = this.el().getContext('2d');
    this.handleCanvasDraw();
    this.drawingCircle = this.drawingCircle.bind(this);
  }

  // Centered position from canvas and client mouse
  getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
  }

  // For every mousemove event on draw screen element
  drawingCircle(e) {
    const pos = this.getMousePos(this.el(), e);
    this.canvas.beginPath();
    this.canvas.arc(pos.x, pos.y, 3, 0, 2 * Math.PI, false);
    this.canvas.fillStyle = 'red';
    this.canvas.fill();
  }

  handleCanvasDraw() {
    // Handle keypress event for enable drawing
    document.addEventListener('keypress', (event) => {
      const keyName = event.key;
      if (keyName === 'D' || keyName == 'd' && this.drawEnable) {
        this.el().addEventListener('mousemove', this.drawingCircle);
      }
    });

    // Handle keyup event for disable drawing
    document.addEventListener('keyup', (event) => {
      const keyName = event.key;
      if (keyName === 'D' || keyName === 'd') {
        this.el().removeEventListener('mousemove', this.drawingCircle);
      }
    });
  }

  createEl() {
    return super.createEl('canvas', {
      className: 'vjs-electronicPen-drawScreen'
    }, {id: 'electronicPen-drawScreen'});
  }

  // Check event from player => electronicPenButton
  handleDrawScreenEnable() {
    this.player.on('electronicPen-screen-enable', () => { this.enableComponent(true); });
    this.player.on('electronicPen-screen-disable', () => { this.enableComponent(false); });
  }

  enableComponent(enable) {
    if (enable) {
      this.addClass('vissible');
      this.drawEnable = true;
    } else {
      this.removeClass('vissible');
      this.drawEnable = false;
      this.canvas.clearRect(0, 0, this.el().width, this.el().height);
    }
  }
}

// FIXME JFy automatic registration component from folder to videojs
export default ElectronicPenDrawScreen;
videojs.registerComponent('electronicPenDrawScreen', ElectronicPenDrawScreen);

