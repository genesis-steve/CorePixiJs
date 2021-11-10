import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';
import { Inject } from 'typescript-ioc';
window.PIXI = PIXI;
import 'core/src/style.css';
import { IMainConfig, MainConfig } from 'core/src/config/MainConfig';
import { AssetLoader } from 'core/src/utils/AssetLoader';
import * as AssetList from 'core/src/config/AssetList';
import { Viewport } from 'core/src/core/Viewport';
import { KeyboardManager } from 'core/src/core/KeyboardManager';
import { GamePadManager } from 'core/src/core/GamePadManager';
import { Controller } from 'core/src/ui/Controller';
import { IAsset } from 'core/src/config/AssetList';

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
		this.setBindings();
		this.appConfig = new MainConfig();
		this.controllerList = new Array<Controller>();
		document.title = this.appConfig.title;
		document.body.style.overflow = 'hidden';
		this.mainContainer = <HTMLDivElement> document.getElementById( 'mainContainer' );
		this.viewport.width = this.appConfig.width;
		this.viewport.height = this.appConfig.height;
		this.assetLoader = new AssetLoader();
		this.assetLoader.onCompleteSignal.add( this.onLoadAssetComplete, this );
		this.assetLoader.loadResource( this.getAssetList() );
		this.addListners();
		this.tickStart();
	}

	protected setBindings (): void {
		//
	}

	protected getAssetList (): Array<IAsset> {
		return AssetList.list;
	}

	protected addListners (): void {
		//
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
		const deltaTime: number = requestAnimationFrame( () => {
			this.animate()
		} );
		this.updateComponents( deltaTime );
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

	protected updateComponents ( deltaTime: number ): void {
		this.controllerList.forEach( controller => {
			controller.updateFrame( deltaTime );
		} );
	}

}