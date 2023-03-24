import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web/build/player/lottie_light';
import { ControlMessageComponent } from './components/control-message/control-message.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

export function playerFactory() {
	return player;
}

@NgModule({
	declarations: [HeaderComponent, FooterComponent, ControlMessageComponent],
	imports: [CommonModule, RouterModule, LottieModule.forRoot({ player: playerFactory })],
	exports: [HeaderComponent, FooterComponent, ControlMessageComponent, LottieModule, RouterModule],
})
export class SharedModule {}
