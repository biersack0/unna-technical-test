import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root',
})
export class SeoService {
	constructor(private metaService: Meta, private titleService: Title) {}

	generateTags({ title = '', description = '', image = '', slug = '', keywords = '' }) {
		this.titleService.setTitle(title);
		this.metaService.updateTag({ name: 'keywords', content: keywords });

		// Metatags Twitter
		this.metaService.updateTag({ name: 'twitter:card', content: 'summary' });
		this.metaService.updateTag({
			name: 'twitter:site',
			content: `https://.com/${slug}`,
		});
		this.metaService.updateTag({ name: 'twitter:title', content: title });
		this.metaService.updateTag({
			name: 'twitter:description',
			content: description,
		});
		this.metaService.updateTag({ name: 'twitter:image', content: image });

		// Metatags Facebook
		this.metaService.updateTag({ property: 'og:type', content: 'website' });
		this.metaService.updateTag({
			property: 'og:site_name',
			content: 'GambetaTv',
		});
		this.metaService.updateTag({ property: 'og:title', content: title });
		this.metaService.updateTag({
			property: 'og:description',
			content: description,
		});
		this.metaService.updateTag({ property: 'og:image', content: image });
		this.metaService.updateTag({ property: 'og:image:alt', content: image });
		this.metaService.updateTag({ property: 'og:secure:alt', content: image });
		this.metaService.updateTag({
			property: 'og:image:secure_url',
			content: image,
		});
		this.metaService.updateTag({
			property: 'og:image:type',
			content: 'image/jpeg',
		});
		this.metaService.updateTag({
			property: 'og:url',
			content: `https://.com/${slug}`,
		});
	}
}
