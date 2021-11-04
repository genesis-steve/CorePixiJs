import { Config, IConfig } from 'core/src/ui/Config';
import { View } from 'core/src/ui/View';

export class Controller implements IController {

	protected config: IConfig;
	protected view: View;

	public get mainContainer (): View {
		return this.view;
	}

	constructor () {
		this.init();
	}

	protected init (): void {
		this.config = new Config();
		this.view = new View( this.config );
	}

	public updateFrame (): void {
		//
	}
}

export interface IController {
	updateFrame: () => void;
}