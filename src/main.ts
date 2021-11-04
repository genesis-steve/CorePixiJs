import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';
window.PIXI = PIXI;
import './style.css';
import { IMainConfig, MainConfig } from 'src/config/MainConfig';
import { AssetLoader } from 'src/utils/AssetLoader';
import * as AssetList from 'src/config/AssetList';
import { Viewport } from 'src/core/Viewport';
import { KeyboardManager } from 'src/core/KeyboardManager';
import { Inject } from 'typescript-ioc';
import { GamePadManager } from 'src/core/GamePadManager';
import { Controller } from 'src/ui/Controller';

window.onload = () => {
	new GameApplication();
};

export class GameApplication {

	@Inject
	protected viewport: Viewport;

	@Inject
	protected keyboardManager: KeyboardManager;

	@Inject
	protected gamePadManager: GamePadManager;

	protected assetLoader: AssetLoader;

	protected appConfig: IMainConfig;
	protected mainContainer: HTMLDivElement;
	protected pixi: PIXI.Application;

	protected controllerList: Array<Controller>;

	constructor () {
		this.appConfig = new MainConfig();
		this.controllerList = new Array<Controller>();
		document.title = this.appConfig.title;
		document.body.style.overflow = 'hidden';
		this.setBindings();
		this.mainContainer = <HTMLDivElement> document.getElementById( 'mainContainer' );
		this.viewport.width = this.appConfig.width;
		this.viewport.height = this.appConfig.height;
		this.assetLoader = new AssetLoader();
		this.assetLoader.loadResource( AssetList.list );
		this.addListners();
		this.tickStart();
	}

	protected setBindings (): void {
		//
	}

	protected addListners (): void {
		this.assetLoader.onCompleteSignal.add( this.onLoadAssetComplete, this );
	}

	protected onLoadAssetComplete (): void {
		this.pixi = new PIXI.Application( this.appConfig );
		this.addComponents();
	}

	protected addComponents (): void {
		//
	}

	protected addChild ( child: PIXI.DisplayObject ): void {
		this.pixi.stage.addChild( child );
	}

	protected tickStart (): void {
		requestAnimationFrame( () => {
			this.animate()
		} );
	}

	protected animate (): void {
		TWEEN.update();
		this.updateKeyboard();
		this.updateGamePad();
		this.updateComponents();
		requestAnimationFrame( () => {
			this.animate()
		} );
	}

	protected updateKeyboard (): void {
		this.keyboardManager.updateKeyboard();
	}

	protected updateGamePad (): void {
		let gamepads: Array<Gamepad> = navigator.getGamepads();
		if ( !gamepads || !gamepads[ 0 ] ) {
			return;
		}
		this.gamePadManager.updateGamePad( gamepads[ 0 ] );
	}

	protected updateComponents (): void {
		this.controllerList.forEach( controller => {
			controller.updateFrame();
		} );
	}

}