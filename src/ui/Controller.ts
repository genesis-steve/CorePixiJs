import { Inject } from 'typescript-ioc';
import { Config, IConfig } from 'core/src/ui/Config';
import { View } from 'core/src/ui/View';
import { IKeyboardDownEventData, IKeyboardPressEventData, KeyboardManager } from 'core/src/core/KeyboardManager';
import { GamePadManager, IGamePadAxesEventData, IGamePadButtonEventData } from 'core/src/core/GamePadManager';

export class Controller implements IController {

	@Inject
	protected keyboardManager: KeyboardManager;

	@Inject
	protected gamePadManager: GamePadManager;

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
		this.addListeners();
	}

	protected addListeners (): void {
		this.keyboardManager.onKeyDownSignal.add( this.onKeyDown, this );
		this.keyboardManager.onKeyPressSignal.add( this.onKeyPress, this );
		this.keyboardManager.onKeyUpSignal.add( this.onKeyUp, this );
		this.gamePadManager.onButtonUpdateSignal.add( this.onGamePadButtonUpdate, this );
		this.gamePadManager.onAxesUpdateSignal.add( this.onGamePadAxesUpdate, this );
	}

	protected onKeyDown ( data: IKeyboardDownEventData ): void {
		// switch ( data.code ) {
		// }
	}

	protected onKeyUp ( data: IKeyboardDownEventData ): void {
		// switch ( data.code ) {
		// }
	}

	protected onKeyPress ( data: IKeyboardPressEventData ): void {
		// for ( let i: number = 0; i < data.buttons.length; i++ ) {
		// 	const code: string = data.buttons[ i ].code;
		// }
	}

	protected onGamePadButtonUpdate ( data: IGamePadButtonEventData ): void {
		// data.buttons.forEach( button => {
		// 	switch ( button.key ) {
		// 	}
		// } );
	}

	protected onGamePadAxesUpdate ( data: IGamePadAxesEventData ): void {
		// data.axes.forEach( axes => {
		// 	switch ( axes.key ) {
		// 	}
		// } );
	}

	public updateFrame (): void {
		//
	}
}

export interface IController {
	updateFrame: () => void;
}