/**
 * <p>This plugin makes electronic pen function.</b></p>
 * <p>
 *  When source pauset, showing enable/disable button for electronic pen.<br>
 *  If electronic pen enabled, button is green. <br>
 *  For drawing press and hold key D <br>
 *  For erase drawing disable and enable electronic pen
 * </p>
 *
 * <h3>Custom events tracking:</h3>
 * <b>electronicPen-screen-enable</b> - electronic pen enabled trigger
 * <b>electronicPen-screen-disable</b> - electronic pen disabled trigger
 * @module plugins/ElectronicPen
 *
 */
import '../css/electronic-pen.scss';

import { videojs } from 'global/window';
import electronicPenButton from './components/electronicPenButton';
import electronicPenDrawScreen from './components/electronicPenDrawScreen';

class ElectronicPen {
  
  constructor(player) {
    this.player = player;
  }

  init() {
    // Create enable/disable electronic-pen button component
    const ElectronicPenButton = videojs.getComponent('electronicPenButton');
    const enableButtonComponent = new ElectronicPenButton(this.player);
    this.player.addChild(enableButtonComponent);
    this.listenButtonEvents(enableButtonComponent);

    // Create electronic-pen draw screen component
    const ElectronicPenDrawScreen = videojs.getComponent('electronicPenDrawScreen');
    const drawScreenComponent = new ElectronicPenDrawScreen(this.player);
    this.player.addChild(drawScreenComponent);
  }

  listenButtonEvents(component) {
    component.on('electronicPen-draw-enable', () => { this.eventFromButtonComponent(true); });
    component.on('electronicPen-draw-disable', () => { this.eventFromButtonComponent(false); });
  }

  eventFromButtonComponent(state) {
    if (state) {
      this.player.trigger('electronicPen-screen-enable');
    } else {
      this.player.trigger('electronicPen-screen-disable');
    }
  }
}

const electronicPenPlugin = function electronicPenPlugin() {
  const plugin = new ElectronicPen(this);
  plugin.init();
  console.log('electronicPen plugin initialized');
};

videojs.registerPlugin('electronicPen', electronicPenPlugin);
