class AnalyticsEvent {
	trackingUpsell(resourceFrom) {
		if (typeof (ga) === 'function') {
			window.ga('send', 'event', {
				eventCategory: 'UPSELLITEM',
				eventAction: 'add_to_cart',
				eventLabel: resourceFrom,
				eventValue: 0,
			});
		}
	}
}

// eslint-disable-next-line import/prefer-default-export
export const gaEvent = new AnalyticsEvent();
