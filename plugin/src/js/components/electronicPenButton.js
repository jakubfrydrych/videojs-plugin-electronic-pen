import { videojs } from 'global/window';

const Component = videojs.getComponent('ClickableComponent');

class ElectronicPenButton extends Component {
  constructor(player) {
    super(player);
    this.player = player;
    this.controlText(this.player.localize('Activate electronic pen'));
    this.handlePlayerPaused();

    this.enableDraw = false;
  }

  setComponentDefault() {
    this.enableDraw = false;
    this.trigger('electronicPen-draw-disable');
    this.removeClass('running');
  }

  handlePlayerPaused() {
    this.player.on('click', this.showHideComponent.bind(this));
  }

  handleClick() {
    // trigger event electronicPen-draw-enable for other component use
    if (this.enableDraw) {
      this.enableDraw = false;
      this.trigger('electronicPen-draw-disable');
      this.removeClass('running');

      // FIXME JFy using event call in big button component
      document.getElementsByClassName('vjs-big-play-button')[0].style.display = '';
    } else {
      this.enableDraw = true;
      this.trigger('electronicPen-draw-enable');
      this.addClass('running');

      // FIXME JFy using event call in big button component
      document.getElementsByClassName('vjs-big-play-button')[0].style.display = 'none';
    }
  }

  // Check player paused
  // FIXME JFy adding event handler for pausing fron click-screen component
  showHideComponent() {
    if (this.player.paused()) {
      this.addClass('vissible');
    } else {
      this.removeClass('vissible');
      this.player.trigger('electronicPen-screen-disable');
      this.setComponentDefault();
    }
  }

  createEl() {
    return super.createEl('div', {
      className: 'vjs-electronicPen-btn'
    });
  }

}

// FIXME JFy automatic registration component from folder to videojs
export default ElectronicPenButton;
videojs.registerComponent('electronicPenButton', ElectronicPenButton);

