import {Platform} from 'react-native';

class LoadingHelper {
  instance: any = undefined;

  constructor() {
    this.setInstance = this.setInstance.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  setInstance(instance: any) {
    this.instance = instance;
  }

  show = () => {
    setTimeout(
      () => {
        this.instance?.show();
      },
      Platform.OS === 'ios' ? 250 : 0,
    );
    // this.instance?.show();
  };

  hide = () => {
    setTimeout(
      () => {
        this.instance?.hide();
      },
      Platform.OS === 'ios' ? 350 : 0,
    );
    // this.instance?.hide();
  };

  getStatus = () => {
    return this.instance?.getStatus();
  };
}

export default new LoadingHelper();
